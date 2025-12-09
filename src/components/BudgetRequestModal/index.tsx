import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import styled from 'styled-components/native';
import theme from '@theme/index';
import BottomSheetModal, { BottomSheetModalRef } from '@components/BottomSheetModal';

interface BudgetRequestModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  serviceName: string;
  serviceDescription?: string;
  professionalName: string;
  professionalImage: string;
}

export const BudgetRequestModal: React.FC<BudgetRequestModalProps> = ({
  visible,
  onClose,
  onConfirm,
  serviceName,
  serviceDescription,
  professionalName,
  professionalImage,
}) => {
  const modalRef = useRef<BottomSheetModalRef>(null);

  useEffect(() => {
    if (visible) {
      modalRef.current?.open();
    } else {
      modalRef.current?.close();
    }
  }, [visible]);

  return (
    <BottomSheetModal
      ref={modalRef}
      snapPoints={[250]}
      onClose={onClose}
      showCloseButton={false}
      useScrollView={false}
      backdropPressBehavior="close"
      enableDynamicSizing={false}
    >
      <ContentContainer>
        <InfoText>
          Ao confirmar, uma conversa será iniciada e o profissional
          receberá sua solicitação de orçamento.
        </InfoText>
        <ConfirmButton onPress={onConfirm}>
          <ConfirmButtonText>Confirmar</ConfirmButtonText>
        </ConfirmButton>
      </ContentContainer>
    </BottomSheetModal>
  );
};

const ContentContainer = styled.View`
  padding: 24px;
  padding-bottom: 32px;
  align-items: center;
  justify-content: center;
  min-height: 200px;
`;

const InfoText = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  color: ${({ theme }) => theme.COLORS.GREY_80};
  line-height: 22px;
  text-align: center;
  margin-bottom: 32px;
`;

const ConfirmButton = styled(TouchableOpacity)`
  width: 100%;
  padding: 18px 24px;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY};
  border-radius: 999px;
  align-items: center;
  justify-content: center;
`;

const ConfirmButtonText = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  color: ${({ theme }) => theme.COLORS.WHITE};
`;
