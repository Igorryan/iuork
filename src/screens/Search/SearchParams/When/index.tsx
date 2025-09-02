import React, { useMemo, useState } from 'react';
import styled, { css } from 'styled-components/native';
import { ExpansiveView } from '@components/ExpansiveView';
import { addDays, format } from 'date-fns';

type WhenProps = {
  isActive: boolean;
  onPress(): void;
  date: Date | null;
  setDate(date: Date | null): void;
};

export const When: React.FC<WhenProps> = ({ isActive, onPress, date, setDate }) => {
  const [mode, setMode] = useState<'NOW' | 'PICK'>('NOW');

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

  const today = new Date();
  const calendarDays = Array.from({ length: 31 }, (_, i) => addDays(today, i));

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
          <MonthTitle>{format(today, 'MMMM yyyy')}</MonthTitle>
          <DaysGrid>
            {calendarDays.map((d) => {
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

const MonthTitle = styled.Text`
  text-align: center;
  color: ${({ theme }) => theme.COLORS.GREY_80};
  margin-bottom: 8px;
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


