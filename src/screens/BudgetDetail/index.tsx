import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@routes/stack.routes';
import { Ionicons } from '@expo/vector-icons';
import theme from '@theme/index';
import * as S from './styles';
import { api } from '@config/api';
import { Budget, cancelBudget, createBudgetRequest } from '@api/callbacks/budget';
import { Button } from '@components/Button';
import { useAuth } from '@hooks/auth';

type BudgetDetailRouteParamList = {
  BudgetDetail: {
    budgetId: string;
  };
};

export const BudgetDetail: React.FC = () => {
  const route = useRoute<RouteProp<BudgetDetailRouteParamList, 'BudgetDetail'>>();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { user } = useAuth();
  const [budget, setBudget] = useState<Budget | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    loadBudget();
  }, [route.params.budgetId]);

  const loadBudget = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get<Budget>(`/api/budgets/${route.params.budgetId}`);
      setBudget(data);
    } catch (error) {
      console.error('Erro ao carregar orçamento:', error);
      Alert.alert('Erro', 'Não foi possível carregar o orçamento.');
      navigation.goBack();
    } finally {
      setIsLoading(false);
    }
  };

  const formatExpiryDate = (dateString: string | null) => {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'Expirado';
    if (diffDays === 0) return 'Expira hoje';
    if (diffDays === 1) return 'Expira amanhã';
    return `Expira em ${diffDays} dias`;
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PENDING': return 'Aguardando Resposta';
      case 'QUOTED': return 'Orçamento Enviado';
      case 'ACCEPTED': return 'Aceito';
      case 'REJECTED': return 'Recusado';
      case 'EXPIRED': return 'Expirado';
      default: return status;
    }
  };

  if (isLoading) {
    return (
      <S.Container>
        <S.Header>
          <S.BackButton onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={theme.COLORS.PRIMARY} />
          </S.BackButton>
          <S.HeaderTitle>Detalhes do Orçamento</S.HeaderTitle>
        </S.Header>
        <S.LoadingContainer>
          <ActivityIndicator size="large" color={theme.COLORS.SECONDARY} />
        </S.LoadingContainer>
      </S.Container>
    );
  }

  if (!budget) {
    return null;
  }

  const isExpired = budget.expiresAt && new Date(budget.expiresAt) < new Date();
  const price = parseFloat(budget.price);

  const handleOpenChat = () => {
    if (!budget.chat) {
      Alert.alert('Erro', 'Informações do chat não disponíveis.');
      return;
    }

    navigation.navigate('Chat', {
      professionalId: budget.chat.professionalId,
      professionalName: budget.chat.professional.name,
      professionalImage: budget.chat.professional.avatarUrl || '',
      serviceId: budget.serviceId,
      serviceName: budget.chat.service?.title || 'Serviço',
      budgetId: budget.id, // ✅ Passa o budgetId do orçamento
    });
  };

  const handleRefreshBudget = async () => {
    if (!budget || !user?.id) return;

    Alert.alert(
      'Refazer Orçamento',
      'Deseja realmente cancelar o orçamento atual e solicitar um novo? Esta ação não pode ser desfeita.',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim, Refazer',
          style: 'destructive',
          onPress: async () => {
            setIsRefreshing(true);
            
            try {
              // 1. Cancelar orçamento atual
              const cancelled = await cancelBudget(budget.id);
              
              if (!cancelled) {
                throw new Error('Falha ao cancelar orçamento');
              }

              // 2. Criar novo orçamento (retorna com dados do chat)
              const newBudget = await createBudgetRequest(
                user.id, 
                budget.chat.professionalId, 
                budget.serviceId
              );
              
              if (!newBudget || !newBudget.chat) {
                throw new Error('Falha ao criar novo orçamento');
              }

              // 3. Navegar para o chat do NOVO orçamento
              navigation.navigate('Chat', {
                professionalId: newBudget.chat.professionalId,
                professionalName: newBudget.chat.professional.name,
                professionalImage: newBudget.chat.professional.avatarUrl || '',
                serviceId: newBudget.serviceId,
                serviceName: newBudget.chat.service?.title || 'Serviço',
                budgetId: newBudget.id,
                sendBudgetRequest: true,
              });

              Alert.alert('Sucesso', 'Novo orçamento solicitado com sucesso!');
            } catch (error) {
              console.error('Erro ao refazer orçamento:', error);
              Alert.alert('Erro', 'Não foi possível refazer o orçamento. Tente novamente.');
            } finally {
              setIsRefreshing(false);
            }
          },
        },
      ]
    );
  };

  return (
    <S.Container>
      <S.Header>
        <S.BackButton onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.COLORS.PRIMARY} />
        </S.BackButton>
        <S.HeaderTitle>Detalhes do Orçamento</S.HeaderTitle>
      </S.Header>

      <S.Content>
        <S.Card>
          <S.IconContainer>
            <Ionicons name="document-text" size={48} color={theme.COLORS.SECONDARY} />
          </S.IconContainer>

          <S.Section>
            <S.Label>ID do Orçamento</S.Label>
            <S.Value>{budget.id}</S.Value>
          </S.Section>

          <S.Divider />

          <S.Section>
            <S.Label>Status</S.Label>
            <S.StatusBadge status={budget.status}>
              <S.StatusText status={budget.status}>
                {getStatusText(budget.status)}
              </S.StatusText>
            </S.StatusBadge>
          </S.Section>

          <S.Divider />

          <S.PriceSection>
            <S.Label>Valor Orçado</S.Label>
            <S.Price>R$ {price.toFixed(2).replace('.', ',')}</S.Price>
          </S.PriceSection>

          {budget.description && budget.description !== 'Solicitação de orçamento' && (
            <>
              <S.Divider />
              <S.Section>
                <S.Label>Detalhes</S.Label>
                <S.Description>{budget.description}</S.Description>
              </S.Section>
            </>
          )}

          {budget.expiresAt && (
            <>
              <S.Divider />
              <S.ExpirySection isExpired={!!isExpired}>
                <Ionicons 
                  name="time-outline" 
                  size={20} 
                  color={isExpired ? theme.COLORS.ERROR : theme.COLORS.GREY_60} 
                />
                <S.ExpiryText isExpired={!!isExpired}>
                  {formatExpiryDate(budget.expiresAt)}
                </S.ExpiryText>
              </S.ExpirySection>
            </>
          )}

          <S.Section>
            <S.Label>Criado em</S.Label>
            <S.Value>{new Date(budget.createdAt).toLocaleString('pt-BR')}</S.Value>
          </S.Section>

          {budget.updatedAt !== budget.createdAt && (
            <S.Section>
              <S.Label>Atualizado em</S.Label>
              <S.Value>{new Date(budget.updatedAt).toLocaleString('pt-BR')}</S.Value>
            </S.Section>
          )}

          <S.Divider />

          <Button onPress={handleOpenChat}>
            Abrir Conversa
          </Button>

          <S.RefreshButton onPress={handleRefreshBudget} disabled={isRefreshing}>
            <Ionicons name="refresh-outline" size={20} color={theme.COLORS.GREY_60} />
            <S.RefreshButtonText>{isRefreshing ? 'Refazendo...' : 'Refazer Orçamento'}</S.RefreshButtonText>
          </S.RefreshButton>
        </S.Card>
      </S.Content>
    </S.Container>
  );
};

