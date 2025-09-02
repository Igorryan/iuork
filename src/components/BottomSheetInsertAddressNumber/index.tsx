import { useMemo, useState } from 'react';
import { Modal } from 'react-native';

// import BottomSheet from '@gorhom/bottom-sheet';

import { Button } from '@components/Button';

import * as S from './styles';

interface BottomSheetProps {
  isOpen: boolean;
  title: string;
  subtitle: string;
  onSubmit(addressNumber: string): void;
  onCloseBottomSheet(): void;
}

export const BottomSheetInsertAddressNumber: React.FC<BottomSheetProps> = ({
  isOpen,
  title,
  subtitle,
  onSubmit,
  onCloseBottomSheet,
}) => {
  // const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [350], []);

  const [value, setInputValue] = useState('');

  // function expand() {
  //   setTimeout(() => bottomSheetRef.current?.expand(), 500);
  // }

  // function close() {
  //   setInputValue('');
  //   setTimeout(() => bottomSheetRef.current?.close(), 500);
  // }

  // useMemo(() => {
  //   isOpen ? expand() : close();
  // }, [isOpen]);

  return (
    <Modal animationType="fade" transparent visible={isOpen}>
      <S.Shadow />
      <S.BottomSheetContainer
        enablePanDownToClose
        index={-1}
        // ref={bottomSheetRef}
        snapPoints={snapPoints}
        detached={true}
        onClose={onCloseBottomSheet}
      >
        <S.Content>
          <S.Title>Informe o número do endereço</S.Title>
          <S.AddressDetailsContainer>
            <S.StreetAndNumberContainer>
              <S.StreetText>{title}</S.StreetText>
              <S.NumberText>{value && `, ${value}`}</S.NumberText>
            </S.StreetAndNumberContainer>

            <S.RestOfAddressText>{subtitle}</S.RestOfAddressText>
          </S.AddressDetailsContainer>

          <S.NumberInput
            mode="outlined"
            autoFocus
            label="Número"
            value={value}
            onChangeText={(value: string) => setInputValue(value)}
          />

          <Button disabled={!value} onPress={() => onSubmit(value)} activeOpacity={0.7}>
            Buscar com número
          </Button>

          <S.AddressWithoutNumberText>Endereço sem número</S.AddressWithoutNumberText>
        </S.Content>
      </S.BottomSheetContainer>
    </Modal>
  );
};
