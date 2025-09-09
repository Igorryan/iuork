import * as S from './styles';
import { useState } from 'react';

interface IProps {
  options: string[];
  setOptionSelected(value: string): void;
  optionSelected: string;
}

export const TabSwitcher: React.FC<IProps> = ({
  options,
  optionSelected,
  setOptionSelected,
}) => {
  function handleChangeTab(option: string) {
    setOptionSelected(option);
  }

  return (
    <S.Container>
      <S.TabContainer>
        {options.map((option) => (
          <S.TabButton key={option} onPress={() => handleChangeTab(option)}>
            <S.TabText isActive={optionSelected === option}>{option}</S.TabText>
            {optionSelected === option && <S.TabUnderline />}
          </S.TabButton>
        ))}
      </S.TabContainer>
    </S.Container>
  );
};
