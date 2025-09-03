import React, { useMemo, useState } from 'react';
import styled, { css } from 'styled-components/native';
import { ExpansiveView } from '@components/ExpansiveView';
import { addMonths, endOfMonth, format, getDay, startOfMonth, subMonths } from 'date-fns';

type WhenProps = {
  isActive: boolean;
  onPress(): void;
  date: Date | null;
  setDate(date: Date | null): void;
};

export const When: React.FC<WhenProps> = ({ isActive, onPress, date, setDate }) => {
  const [mode, setMode] = useState<'NOW' | 'PICK'>('NOW');
  const [visibleMonth, setVisibleMonth] = useState<Date>(new Date());

  const minimizedValue = useMemo(() => {
    if (date) return format(date, 'dd/MM/yyyy');
    return 'Agora';
  }, [date]);

  function handleSelectNow() {
    setMode('NOW');
    setDate(null);
  }

  function handlePick(d: Date) {
    setMode('PICK');
    setDate(d);
  }

  // calendar calculations
  const monthStart = startOfMonth(visibleMonth);
  const monthEnd = endOfMonth(visibleMonth);
  const firstWeekdayIndex = getDay(monthStart); // 0: Sunday ... 6: Saturday
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

  return (
    <ExpansiveView
      isActive={isActive}
      onPress={onPress}
      minimized={{ title: 'Quando', value: minimizedValue }}
      maximized={{ title: 'Para quando?' }}
    >
      <Segmented>
        <SegmentButton active={mode === 'NOW'} onPress={handleSelectNow}>
          <SegmentText active={mode === 'NOW'}>Agora</SegmentText>
        </SegmentButton>
        <SegmentButton active={mode === 'PICK'} onPress={() => setMode('PICK')}>
          <SegmentText active={mode === 'PICK'}>Escolher data</SegmentText>
        </SegmentButton>
      </Segmented>

      {mode === 'PICK' && (
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
            {weekDayLabels.map((label) => (
              <WeekDay key={label}>{label}</WeekDay>
            ))}
          </WeekDaysRow>

          <DaysGrid>
            {days.map((d, idx) => {
              if (!d)
                return <DayPlaceholder key={`empty-${idx}`} />;
              const isSelected = date ? format(date, 'yyyy-MM-dd') === format(d, 'yyyy-MM-dd') : false;
              return (
                <Day key={d.toISOString()} onPress={() => handlePick(d)} selected={isSelected}>
                  <DayText selected={isSelected}>{format(d, 'd')}</DayText>
                </Day>
              );
            })}
          </DaysGrid>
        </CalendarContainer>
      )}
    </ExpansiveView>
  );
};

const Segmented = styled.View`
  flex-direction: row;
  background-color: ${({ theme }) => theme.COLORS.GREY_10};
  border-radius: 999px;
  padding: 4px;
  margin-top: 8px;
`;

const SegmentButton = styled.TouchableOpacity<{ active: boolean }>`
  flex: 1;
  padding: 10px 12px;
  border-radius: 999px;
  align-items: center;
  ${(p) =>
    p.active &&
    css`
      background-color: ${p.theme.COLORS.WHITE};
      shadow-color: ${p.theme.COLORS.SHADOW};
      shadow-offset: 0px 1px;
      shadow-opacity: 0.05;
      shadow-radius: 4px;
      elevation: 1;
    `}
`;

const SegmentText = styled.Text<{ active: boolean }>`
  color: ${(p) => (p.active ? p.theme.COLORS.GREY_80 : p.theme.COLORS.GREY_60)};
  font-weight: 600;
`;

const CalendarContainer = styled.View`
  margin-top: 16px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
`;

const MonthHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const NavButton = styled.TouchableOpacity`
  padding: 8px 12px;
`;

const NavText = styled.Text`
  color: ${({ theme }) => theme.COLORS.GREY_80};
  font-weight: 700;
`;

const MonthTitle = styled.Text`
  text-align: center;
  color: ${({ theme }) => theme.COLORS.GREY_80};
`;

const WeekDaysRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const WeekDay = styled.Text`
  width: 13.5%;
  text-align: center;
  color: ${({ theme }) => theme.COLORS.GREY_60};
  font-weight: 600;
`;

const DaysGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Day = styled.TouchableOpacity<{ selected: boolean }>`
  width: 13.5%;
  aspect-ratio: 1;
  margin-bottom: 8px;
  border-radius: 999px;
  align-items: center;
  justify-content: center;
  ${(p) =>
    p.selected &&
    css`
      background-color: ${p.theme.COLORS.PRIMARY};
    `}
`;

const DayText = styled.Text<{ selected: boolean }>`
  color: ${(p) => (p.selected ? p.theme.COLORS.WHITE : p.theme.COLORS.GREY_80)};
`;

const DayPlaceholder = styled.View`
  width: 13.5%;
  aspect-ratio: 1;
  margin-bottom: 8px;
`;


