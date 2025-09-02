import * as S from './styles';

import { useEffect, useMemo, useState } from 'react';
import { Animated } from 'react-native';

interface IProps {
  options: string[];
  setOptionSelected(value: string): void;
  optionSelected: string;
}

export const ContextSwitcher: React.FC<IProps> = ({
  options,
  optionSelected,
  setOptionSelected,
}) => {
  const [selectedContextComponentWidth, setSelectedContextComponentWidth] = useState(0);

  const toServicesContext = useMemo(() => {
    return new Animated.Value(selectedContextComponentWidth);
  }, [selectedContextComponentWidth]);

  function handleChangeContext(option: string) {
    setOptionSelected(option);
  }

  useEffect(() => {
    Animated.timing(toServicesContext, {
      toValue: optionSelected === options[0] ? selectedContextComponentWidth : 12,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [optionSelected, options, selectedContextComponentWidth, toServicesContext]);

  return (
    <S.Container
      onLayout={(event) =>
        setSelectedContextComponentWidth(
          event.nativeEvent.layout.width - event.nativeEvent.layout.width / 2,
        )
      }
    >
      <S.SelectedContainer
        style={{
          right: toServicesContext,
        }}
      ></S.SelectedContainer>
      {options.map((option) => (
        <S.OptionButton key={option} onPress={() => handleChangeContext(option)}>
          <S.OptionText isActive={optionSelected === option}>{option}</S.OptionText>
        </S.OptionButton>
      ))}
    </S.Container>
  );
};
