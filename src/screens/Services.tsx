import React, { useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, RefreshControl, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import styled from 'styled-components/native';
import { useFocusEffect } from '@react-navigation/native';
import theme from '@theme/index';
import { getMyBookings, Booking } from '@api/callbacks/booking';
import { useSocket } from '@hooks/useSocket';

const Services: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const socket = useSocket();

  const loadBookings = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getMyBookings();
      setBookings(data);
    } catch (error: any) {
      console.error('Erro ao carregar serviços:', error);
      Alert.alert('Erro', 'Não foi possível carregar os serviços. Tente novamente.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadBookings();
    }, [loadBookings])
  );

  // Ouvir atualizações via WebSocket
  React.useEffect(() => {
    if (socket) {
      socket.on('booking-accepted', () => {
        loadBookings();
      });

      socket.on('booking-rejected', () => {
        loadBookings();
      });

      return () => {
        socket.off('booking-accepted');
        socket.off('booking-rejected');
      };
    }
  }, [socket, loadBookings]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    loadBookings();
  };

  const getStatusLabel = (status: Booking['status']) => {
    const labels: { [key: string]: string } = {
      REQUESTED: 'Aguardando aprovação',
      ACCEPTED: 'Aceito',
      IN_PROGRESS: 'Em andamento',
      COMPLETED: 'Concluído',
      CANCELLED: 'Cancelado',
      DISPUTED: 'Em disputa',
    };
    return labels[status] || status;
  };

  const getStatusColor = (status: Booking['status']) => {
    const colors: { [key: string]: string } = {
      REQUESTED: theme.COLORS.WARNING || '#FFA500',
      ACCEPTED: theme.COLORS.SUCCESS || '#70CF4F',
      IN_PROGRESS: theme.COLORS.SECONDARY,
      COMPLETED: theme.COLORS.SUCCESS || '#70CF4F',
      CANCELLED: theme.COLORS.ERROR || '#FF3B30',
      DISPUTED: theme.COLORS.ERROR || '#FF3B30',
    };
    return colors[status] || theme.COLORS.GREY_40;
  };

  const getStatusIcon = (status: Booking['status']) => {
    const icons: { [key: string]: string } = {
      REQUESTED: 'time-outline',
      ACCEPTED: 'checkmark-circle-outline',
      IN_PROGRESS: 'hourglass-outline',
      COMPLETED: 'checkmark-done-circle-outline',
      CANCELLED: 'close-circle-outline',
      DISPUTED: 'alert-circle-outline',
    };
    return icons[status] || 'help-circle-outline';
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Data não definida';
    const date = new Date(dateString);
    return format(date, "dd 'de' MMMM 'às' HH:mm");
  };

  const formatPrice = (price: string | undefined, pricingType: string | undefined) => {
    if (!price) return 'Preço não informado';
    const priceNum = parseFloat(price);
    if (pricingType === 'HOURLY') {
      return `R$ ${priceNum.toFixed(2).replace('.', ',')}/hora`;
    }
    if (pricingType === 'BUDGET') {
      return 'Orçamento sob consulta';
    }
    return `R$ ${priceNum.toFixed(2).replace('.', ',')}`;
  };

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.COLORS.BACKGROUND }} edges={['top']}>
        <Container>
          <Header>
            <Title>Meus Serviços</Title>
          </Header>
          <LoadingContainer>
            <ActivityIndicator size="large" color={theme.COLORS.PRIMARY} />
            <LoadingText>Carregando serviços...</LoadingText>
          </LoadingContainer>
        </Container>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.COLORS.BACKGROUND }} edges={['top']}>
      <Container
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
      >
        <Header>
          <Title>Meus Serviços</Title>
          {bookings.length > 0 && (
            <Badge>
              <BadgeText>{bookings.length}</BadgeText>
            </Badge>
          )}
        </Header>

        {bookings.length === 0 ? (
          <EmptyContainer>
            <EmptyIcon>
              <Ionicons name="briefcase-outline" size={64} color={theme.COLORS.GREY_40} />
            </EmptyIcon>
            <EmptyTitle>Nenhum serviço solicitado</EmptyTitle>
            <EmptySubtitle>
              Quando você solicitar serviços de profissionais, eles aparecerão aqui.
            </EmptySubtitle>
          </EmptyContainer>
        ) : (
          <BookingsList>
            {bookings.map((booking) => {
              const statusColor = getStatusColor(booking.status);
              const statusLabel = getStatusLabel(booking.status);
              const statusIcon = getStatusIcon(booking.status);

              return (
                <BookingCard key={booking.id}>
                  {/* Header com status */}
                  <StatusHeader statusColor={statusColor}>
                    <StatusRow>
                      <Ionicons name={statusIcon as any} size={20} color={theme.COLORS.WHITE} />
                      <StatusText>{statusLabel}</StatusText>
                    </StatusRow>
                  </StatusHeader>

                  {/* Informações do serviço */}
                  <ServiceSection>
                    <ServiceTitle>{booking.service.title}</ServiceTitle>
                    {booking.service.description && (
                      <ServiceDescription>{booking.service.description}</ServiceDescription>
                    )}
                    <ServicePrice>{formatPrice(booking.service.price, booking.service.pricingType)}</ServicePrice>
                    {booking.professional && (
                      <ProfessionalRow>
                        <Ionicons name="person-outline" size={16} color={theme.COLORS.GREY_60} />
                        <ProfessionalName>Profissional: {booking.professional.name}</ProfessionalName>
                      </ProfessionalRow>
                    )}
                  </ServiceSection>

                  {/* Data e horário */}
                  {booking.scheduledAt && (
                    <DateTimeSection>
                      <DateTimeRow>
                        <Ionicons name="calendar-outline" size={18} color={theme.COLORS.PRIMARY} />
                        <DateTimeText>{formatDate(booking.scheduledAt)}</DateTimeText>
                      </DateTimeRow>
                    </DateTimeSection>
                  )}

                  {/* Endereço */}
                  {booking.address && (
                    <AddressSection>
                      <AddressRow>
                        <Ionicons name="location-outline" size={18} color={theme.COLORS.SECONDARY} />
                        <AddressText>{booking.address}</AddressText>
                      </AddressRow>
                    </AddressSection>
                  )}

                  {/* Data de criação */}
                  <CreatedAtText>
                    Solicitado em {format(new Date(booking.createdAt), "dd 'de' MMMM 'às' HH:mm")}
                  </CreatedAtText>
                </BookingCard>
              );
            })}
          </BookingsList>
        )}
      </Container>
    </SafeAreaView>
  );
};

export default Services;

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${theme.COLORS.BACKGROUND};
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 24px 24px 16px;
`;

const Title = styled.Text`
  color: ${theme.COLORS.PRIMARY};
  font-family: ${theme.FONT_FAMILY.BOLD};
  font-size: ${theme.FONT_SIZE.XL}px;
`;

const Badge = styled.View`
  background-color: ${theme.COLORS.SECONDARY};
  border-radius: 12px;
  padding: 4px 10px;
  min-width: 24px;
  align-items: center;
  justify-content: center;
`;

const BadgeText = styled.Text`
  color: ${theme.COLORS.WHITE};
  font-family: ${theme.FONT_FAMILY.BOLD};
  font-size: 12px;
`;

const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 48px;
`;

const LoadingText = styled.Text`
  margin-top: 16px;
  color: ${theme.COLORS.GREY_60};
  font-family: ${theme.FONT_FAMILY.REGULAR};
  font-size: ${theme.FONT_SIZE.MD}px;
`;

const EmptyContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
`;

const EmptyIcon = styled.View`
  margin-bottom: 16px;
`;

const EmptyTitle = styled.Text`
  color: ${theme.COLORS.PRIMARY};
  font-family: ${theme.FONT_FAMILY.BOLD};
  font-size: ${theme.FONT_SIZE.LG}px;
  margin-bottom: 8px;
`;

const EmptySubtitle = styled.Text`
  color: ${theme.COLORS.GREY_60};
  font-family: ${theme.FONT_FAMILY.REGULAR};
  text-align: center;
  line-height: 22px;
`;

const BookingsList = styled.View`
  padding: 0 16px 100px;
  gap: 16px;
`;

const BookingCard = styled.View`
  background-color: ${theme.COLORS.WHITE};
  border-radius: 16px;
  overflow: hidden;
  shadow-color: ${theme.COLORS.SHADOW};
  shadow-opacity: 0.1;
  shadow-offset: 0px 2px;
  shadow-radius: 8px;
  elevation: 3;
`;

const StatusHeader = styled.View<{ statusColor: string }>`
  background-color: ${props => props.statusColor};
  padding: 12px 16px;
`;

const StatusRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const StatusText = styled.Text`
  color: ${theme.COLORS.WHITE};
  font-family: ${theme.FONT_FAMILY.BOLD};
  font-size: ${theme.FONT_SIZE.MD}px;
`;

const ServiceSection = styled.View`
  padding: 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.COLORS.GREY_10};
`;

const ServiceTitle = styled.Text`
  color: ${theme.COLORS.GREY_80};
  font-family: ${theme.FONT_FAMILY.BOLD};
  font-size: ${theme.FONT_SIZE.LG}px;
  margin-bottom: 8px;
`;

const ServiceDescription = styled.Text`
  color: ${theme.COLORS.GREY_60};
  font-family: ${theme.FONT_FAMILY.REGULAR};
  font-size: ${theme.FONT_SIZE.SM}px;
  line-height: 20px;
  margin-bottom: 12px;
`;

const ServicePrice = styled.Text`
  color: ${theme.COLORS.SECONDARY};
  font-family: ${theme.FONT_FAMILY.BOLD};
  font-size: ${theme.FONT_SIZE.MD}px;
  margin-bottom: 8px;
`;

const ProfessionalRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
`;

const ProfessionalName = styled.Text`
  color: ${theme.COLORS.GREY_60};
  font-family: ${theme.FONT_FAMILY.REGULAR};
  font-size: ${theme.FONT_SIZE.SM}px;
`;

const DateTimeSection = styled.View`
  padding: 12px 20px;
  background-color: ${theme.COLORS.PRIMARY}10;
`;

const DateTimeRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const DateTimeText = styled.Text`
  color: ${theme.COLORS.PRIMARY};
  font-family: ${theme.FONT_FAMILY.MEDIUM};
  font-size: ${theme.FONT_SIZE.MD}px;
  flex: 1;
`;

const AddressSection = styled.View`
  padding: 12px 20px;
  background-color: ${theme.COLORS.SECONDARY}10;
`;

const AddressRow = styled.View`
  flex-direction: row;
  align-items: flex-start;
  gap: 8px;
`;

const AddressText = styled.Text`
  color: ${theme.COLORS.GREY_80};
  font-family: ${theme.FONT_FAMILY.REGULAR};
  font-size: ${theme.FONT_SIZE.SM}px;
  flex: 1;
  line-height: 20px;
`;

const CreatedAtText = styled.Text`
  color: ${theme.COLORS.GREY_60};
  font-family: ${theme.FONT_FAMILY.REGULAR};
  font-size: ${theme.FONT_SIZE.XS}px;
  padding: 12px 20px;
  text-align: center;
`;
