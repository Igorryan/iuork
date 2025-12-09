import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import styled from 'styled-components/native';
import { format, addDays, startOfWeek, getDay, isSameDay, addMonths, subMonths, startOfMonth, endOfMonth } from 'date-fns';
import BottomSheetModal, { BottomSheetModalRef } from '@components/BottomSheetModal';
import { getProfessionalAvailability, Availability } from '@api/callbacks/availability';
import theme from '@theme/index';
import { getLastSearch } from '@functions/searchStorage';

interface ScheduleBookingModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (selectedDate: Date, selectedTime: string) => void;
  professionalId: string;
}

export const ScheduleBookingModal: React.FC<ScheduleBookingModalProps> = ({
  visible,
  onClose,
  onConfirm,
  professionalId,
}) => {
  const modalRef = React.useRef<BottomSheetModalRef>(null);
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [visibleMonth, setVisibleMonth] = useState<Date>(new Date());

  // Carregar data pré-selecionada da última busca
  useEffect(() => {
    if (visible) {
      const loadPreselectedDate = async () => {
        try {
          const lastSearch = await getLastSearch();
          if (lastSearch?.date) {
            const date = new Date(lastSearch.date);
            date.setHours(0, 0, 0, 0);
            setSelectedDate(date);
            setVisibleMonth(date);
          } else {
            // Se não tem data, usar hoje
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            setSelectedDate(today);
          }
        } catch (error) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          setSelectedDate(today);
        }
      };
      loadPreselectedDate();
    }
  }, [visible]);

  // Carregar disponibilidades
  useEffect(() => {
    if (visible && professionalId) {
      loadAvailabilities();
    }
  }, [visible, professionalId]);

  const loadAvailabilities = async () => {
    try {
      setIsLoading(true);
      const data = await getProfessionalAvailability(professionalId);
      setAvailabilities(data);
    } catch (error) {
      console.error('Erro ao carregar disponibilidades:', error);
      Alert.alert('Erro', 'Não foi possível carregar os horários disponíveis.');
    } finally {
      setIsLoading(false);
    }
  };

  // Abrir/fechar modal
  useEffect(() => {
    if (visible) {
      modalRef.current?.open();
    } else {
      modalRef.current?.close();
      setSelectedTime(null);
    }
  }, [visible]);

  // Calcular horários disponíveis para a data selecionada
  const availableTimes = useMemo(() => {
    if (!selectedDate) return [];

    const dayOfWeek = getDay(selectedDate); // 0 = Domingo, 6 = Sábado
    const dateStr = format(selectedDate, 'yyyy-MM-dd');

    const times: string[] = [];

    availabilities.forEach((avail) => {
      if (avail.type === 'WEEKLY' && avail.dayOfWeek === dayOfWeek) {
        // Disponibilidade semanal
        times.push(avail.startTime);
      } else if (avail.type === 'SPECIFIC' && avail.specificDate) {
        // Disponibilidade específica
        const availDate = format(new Date(avail.specificDate), 'yyyy-MM-dd');
        if (availDate === dateStr) {
          times.push(avail.startTime);
        }
      }
    });

    // Ordenar horários
    return times.sort((a, b) => a.localeCompare(b));
  }, [selectedDate, availabilities]);

  // Verificar se uma data tem disponibilidade
  const hasAvailability = useCallback((date: Date): boolean => {
    const dayOfWeek = getDay(date);
    const dateStr = format(date, 'yyyy-MM-dd');

    return availabilities.some((avail) => {
      if (avail.type === 'WEEKLY' && avail.dayOfWeek === dayOfWeek) {
        return true;
      }
      if (avail.type === 'SPECIFIC' && avail.specificDate) {
        const availDate = format(new Date(avail.specificDate), 'yyyy-MM-dd');
        return availDate === dateStr;
      }
      return false;
    });
  }, [availabilities]);

  // Calendário
  const monthStart = startOfMonth(visibleMonth);
  const monthEnd = endOfMonth(visibleMonth);
  const firstWeekdayIndex = getDay(monthStart);
  const totalDays = Number(format(monthEnd, 'd'));

  const days: (Date | null)[] = [];
  for (let i = 0; i < firstWeekdayIndex; i += 1) {
    days.push(null);
  }
  for (let day = 1; day <= totalDays; day += 1) {
    const d = new Date(monthStart.getFullYear(), monthStart.getMonth(), day);
    days.push(d);
  }

  const weekDayLabels = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert('Atenção', 'Por favor, selecione uma data e um horário.');
      return;
    }

    // Criar data completa com horário
    const fullDate = new Date(selectedDate);
    const [hours, minutes] = selectedTime.split(':');
    fullDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);

    onConfirm(fullDate, selectedTime);
  };

  return (
    <BottomSheetModal
      ref={modalRef}
      title="Selecionar Data e Horário"
      heightPercentage={0.85}
      onClose={onClose}
      showCloseButton={true}
      useScrollView={true}
    >
      <Container>
        {isLoading ? (
          <LoadingContainer>
            <ActivityIndicator size="large" color={theme.COLORS.PRIMARY} />
            <LoadingText>Carregando horários disponíveis...</LoadingText>
          </LoadingContainer>
        ) : (
          <>
            {/* Calendário */}
            <Section>
              <SectionTitle>Selecione a data</SectionTitle>
              <CalendarContainer>
                <MonthHeader>
                  <NavButton onPress={() => setVisibleMonth((m) => subMonths(m, 1))}>
                    <NavText>{'<'}</NavText>
                  </NavButton>
                  <MonthTitle>{format(visibleMonth, 'MMMM yyyy')}</MonthTitle>
                  <NavButton onPress={() => setVisibleMonth((m) => addMonths(m, 1))}>
                    <NavText>{'>'}</NavText>
                  </NavButton>
                </MonthHeader>

                <WeekDaysRow>
                  {weekDayLabels.map((label, index) => (
                    <WeekDay key={`weekday-${index}`}>{label}</WeekDay>
                  ))}
                </WeekDaysRow>

                <DaysGrid>
                  {days.map((d, idx) => {
                    if (!d) return <DayPlaceholder key={`empty-${idx}`} />;
                    const isSelected = selectedDate ? isSameDay(selectedDate, d) : false;
                    const available = hasAvailability(d);
                    const isPast = d < new Date(new Date().setHours(0, 0, 0, 0));
                    
                    return (
                      <Day
                        key={d.toISOString()}
                        onPress={() => {
                          if (!isPast && available) {
                            setSelectedDate(d);
                            setSelectedTime(null); // Resetar horário ao mudar data
                          }
                        }}
                        selected={isSelected}
                        available={available && !isPast}
                        disabled={isPast || !available}
                      >
                        <DayText selected={isSelected} available={available && !isPast} disabled={isPast || !available}>
                          {format(d, 'd')}
                        </DayText>
                      </Day>
                    );
                  })}
                  {/* Preencher espaços vazios na última linha para manter o layout */}
                  {Array.from({ length: (7 - (days.length % 7)) % 7 }).map((_, idx) => (
                    <DayPlaceholder key={`fill-${idx}`} />
                  ))}
                </DaysGrid>
              </CalendarContainer>
            </Section>

            {/* Horários disponíveis */}
            {selectedDate && (
              <Section>
                <SectionTitle>
                  Horários disponíveis - {format(selectedDate, "dd 'de' MMMM")}
                </SectionTitle>
                {availableTimes.length === 0 ? (
                  <NoTimesText>Nenhum horário disponível para esta data.</NoTimesText>
                ) : (
                  <TimesGrid>
                    {availableTimes.map((time) => (
                      <TimeButton
                        key={time}
                        onPress={() => setSelectedTime(time)}
                        selected={selectedTime === time}
                      >
                        <TimeText selected={selectedTime === time}>{time}</TimeText>
                      </TimeButton>
                    ))}
                  </TimesGrid>
                )}
              </Section>
            )}

            {/* Botão confirmar */}
            <ConfirmButton onPress={handleConfirm} disabled={!selectedDate || !selectedTime}>
              <ConfirmButtonText>Confirmar Agendamento</ConfirmButtonText>
            </ConfirmButton>
          </>
        )}
      </Container>
    </BottomSheetModal>
  );
};

const Container = styled.View`
  padding: 24px;
`;

const LoadingContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

const LoadingText = styled.Text`
  margin-top: 16px;
  font-family: ${theme.FONT_FAMILY.REGULAR};
  font-size: ${theme.FONT_SIZE.MD}px;
  color: ${theme.COLORS.GREY_60};
`;

const Section = styled.View`
  margin-bottom: 32px;
`;

const SectionTitle = styled.Text`
  font-family: ${theme.FONT_FAMILY.BOLD};
  font-size: ${theme.FONT_SIZE.LG}px;
  color: ${theme.COLORS.GREY_80};
  margin-bottom: 16px;
`;

const CalendarContainer = styled.View`
  background-color: ${theme.COLORS.WHITE};
  border-radius: 12px;
  padding: 16px;
`;

const MonthHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const NavButton = styled.TouchableOpacity`
  padding: 8px 12px;
`;

const NavText = styled.Text`
  color: ${theme.COLORS.PRIMARY};
  font-family: ${theme.FONT_FAMILY.BOLD};
  font-size: ${theme.FONT_SIZE.LG}px;
`;

const MonthTitle = styled.Text`
  text-align: center;
  color: ${theme.COLORS.GREY_80};
  font-family: ${theme.FONT_FAMILY.BOLD};
  font-size: ${theme.FONT_SIZE.MD}px;
  text-transform: capitalize;
`;

const WeekDaysRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const WeekDay = styled.Text`
  width: ${100 / 7}%;
  text-align: center;
  color: ${theme.COLORS.GREY_60};
  font-family: ${theme.FONT_FAMILY.MEDIUM};
  font-size: ${theme.FONT_SIZE.SM}px;
`;

const DaysGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Day = styled.TouchableOpacity<{ selected: boolean; available: boolean; disabled: boolean }>`
  width: ${100 / 7}%;
  aspect-ratio: 1;
  margin-bottom: 8px;
  border-radius: 999px;
  align-items: center;
  justify-content: center;
  ${(p) =>
    p.selected &&
    `
    background-color: ${theme.COLORS.PRIMARY};
  `}
  ${(p) =>
    !p.selected &&
    p.available &&
    `
    background-color: ${theme.COLORS.SECONDARY}20;
  `}
  ${(p) =>
    p.disabled &&
    `
    opacity: 0.3;
  `}
`;

const DayText = styled.Text<{ selected: boolean; available: boolean; disabled: boolean }>`
  color: ${(p) => {
    if (p.selected) return theme.COLORS.WHITE;
    if (p.disabled) return theme.COLORS.GREY_40;
    if (p.available) return theme.COLORS.SECONDARY;
    return theme.COLORS.GREY_60;
  }};
  font-family: ${theme.FONT_FAMILY.MEDIUM};
  font-size: ${theme.FONT_SIZE.SM}px;
`;

const DayPlaceholder = styled.View`
  width: ${100 / 7}%;
  aspect-ratio: 1;
  margin-bottom: 8px;
`;

const TimesGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
`;

const TimeButton = styled.TouchableOpacity<{ selected: boolean }>`
  padding: 12px 20px;
  border-radius: 8px;
  border-width: 2px;
  border-color: ${(p) => (p.selected ? theme.COLORS.PRIMARY : theme.COLORS.GREY_20)};
  background-color: ${(p) => (p.selected ? theme.COLORS.PRIMARY : theme.COLORS.WHITE)};
`;

const TimeText = styled.Text<{ selected: boolean }>`
  color: ${(p) => (p.selected ? theme.COLORS.WHITE : theme.COLORS.GREY_80)};
  font-family: ${theme.FONT_FAMILY.MEDIUM};
  font-size: ${theme.FONT_SIZE.MD}px;
`;

const NoTimesText = styled.Text`
  color: ${theme.COLORS.GREY_60};
  font-family: ${theme.FONT_FAMILY.REGULAR};
  font-size: ${theme.FONT_SIZE.MD}px;
  text-align: center;
  padding: 20px;
`;

const ConfirmButton = styled.TouchableOpacity<{ disabled: boolean }>`
  width: 100%;
  padding: 18px 24px;
  background-color: ${(p) => (p.disabled ? theme.COLORS.GREY_20 : theme.COLORS.PRIMARY)};
  border-radius: 999px;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
`;

const ConfirmButtonText = styled.Text`
  color: ${theme.COLORS.WHITE};
  font-family: ${theme.FONT_FAMILY.BOLD};
  font-size: ${theme.FONT_SIZE.MD}px;
`;

