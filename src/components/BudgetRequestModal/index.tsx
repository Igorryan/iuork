import React from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@components/Button';
import theme from '@theme/index';

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
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Overlay>
        <ModalContainer>
          <CloseButton onPress={onClose}>
            <Ionicons name="close" size={24} color={theme.COLORS.GREY_60} />
          </CloseButton>

          <IconContainer>
            <Ionicons name="document-text" size={48} color={theme.COLORS.SECONDARY} />
          </IconContainer>

          <Title>Solicitar Orçamento</Title>

          <InfoSection>
            <InfoLabel>Serviço:</InfoLabel>
            <InfoValue>{serviceName}</InfoValue>
          </InfoSection>

          {serviceDescription && (
            <InfoSection>
              <InfoLabel>Descrição:</InfoLabel>
              <InfoDescription numberOfLines={3}>{serviceDescription}</InfoDescription>
            </InfoSection>
          )}

          <ProfessionalSection>
            <ProfessionalAvatar source={{ uri: professionalImage }} />
            <ProfessionalInfo>
              <InfoLabel>Profissional:</InfoLabel>
              <InfoValue>{professionalName}</InfoValue>
            </ProfessionalInfo>
          </ProfessionalSection>

          <Divider />

          <MessageContainer>
            <MessageIcon>
              <Ionicons name="information-circle" size={20} color={theme.COLORS.SECONDARY} />
            </MessageIcon>
            <MessageText>
              Ao solicitar, uma conversa será iniciada e o profissional receberá sua solicitação de orçamento.
            </MessageText>
          </MessageContainer>

          <ButtonsContainer>
            <CancelButton onPress={onClose}>
              <CancelButtonText>Cancelar</CancelButtonText>
            </CancelButton>
            <ConfirmButton onPress={onConfirm}>
              <ConfirmButtonText>Solicitar Orçamento</ConfirmButtonText>
            </ConfirmButton>
          </ButtonsContainer>
        </ModalContainer>
      </Overlay>
    </Modal>
  );
};

const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const ModalContainer = styled.View`
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 20px;
  padding: 24px;
  width: 100%;
  max-width: 400px;
  shadow-color: ${({ theme }) => theme.COLORS.SHADOW};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 8px;
  elevation: 5;
`;

const CloseButton = styled(TouchableOpacity)`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 1;
`;

const IconContainer = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: ${({ theme }) => theme.COLORS.SECONDARY}15;
  align-items: center;
  justify-content: center;
  align-self: center;
  margin-bottom: 20px;
`;

const Title = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.XL}px;
  color: ${({ theme }) => theme.COLORS.PRIMARY};
  text-align: center;
  margin-bottom: 24px;
`;

const InfoSection = styled.View`
  margin-bottom: 16px;
`;

const InfoLabel = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.SSM}px;
  color: ${({ theme }) => theme.COLORS.GREY_60};
  margin-bottom: 4px;
`;

const InfoValue = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  color: ${({ theme }) => theme.COLORS.GREY};
`;

const InfoDescription = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: ${({ theme }) => theme.COLORS.GREY};
  line-height: 20px;
`;

const ProfessionalSection = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
  padding: 12px;
  background-color: ${({ theme }) => theme.COLORS.GREY_05};
  border-radius: 12px;
`;

const ProfessionalAvatar = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  margin-right: 12px;
`;

const ProfessionalInfo = styled.View`
  flex: 1;
`;

const Divider = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.COLORS.GREY_20};
  margin: 16px 0;
`;

const MessageContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.COLORS.SECONDARY}10;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 24px;
`;

const MessageIcon = styled.View`
  margin-right: 8px;
  margin-top: 2px;
`;

const MessageText = styled.Text`
  flex: 1;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SSM}px;
  color: ${({ theme }) => theme.COLORS.GREY_60};
  line-height: 18px;
`;

const ButtonsContainer = styled.View`
  flex-direction: row;
  gap: 12px;
`;

const CancelButton = styled(TouchableOpacity)`
  flex: 1;
  padding: 14px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.COLORS.GREY_20};
  align-items: center;
  justify-content: center;
`;

const CancelButtonText = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  color: ${({ theme }) => theme.COLORS.GREY_60};
`;

const ConfirmButton = styled(TouchableOpacity)`
  flex: 2;
  padding: 14px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.COLORS.SECONDARY};
  align-items: center;
  justify-content: center;
`;

const ConfirmButtonText = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  color: ${({ theme }) => theme.COLORS.WHITE};
`;

