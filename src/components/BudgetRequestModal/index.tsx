import React, { useEffect, useRef, useState } from 'react';
import { Modal, TouchableOpacity, Animated } from 'react-native';
import styled from 'styled-components/native';
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
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const modalTranslateY = useRef(new Animated.Value(300)).current;
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (visible) {
      // Primeiro mostra a sombra com fade in
      setShowModal(true);
      overlayOpacity.setValue(0);
      modalTranslateY.setValue(300);
      
      Animated.timing(overlayOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        // Depois mostra o modal deslizando de baixo para cima
        Animated.timing(modalTranslateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    } else {
      // Animação reversa ao fechar
      Animated.parallel([
        Animated.timing(modalTranslateY, {
          toValue: 300,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowModal(false);
      });
    }
  }, [visible]);

  if (!showModal) {
    return null;
  }

  return (
    <Modal
      transparent={true}
      visible={showModal}
      onRequestClose={onClose}
      animationType="none"
    >
      <AnimatedOverlay 
        style={{ opacity: overlayOpacity }}
        onPress={onClose}
        activeOpacity={1}
      >
        <AnimatedModalContainer 
          style={{ transform: [{ translateY: modalTranslateY }] }}
          onStartShouldSetResponder={() => true}
        >
          <Handle />
          <ContentContainer>
            <InfoText>
              Ao confirmar, uma conversa será iniciada e o profissional
              receberá sua solicitação de orçamento.
            </InfoText>
            <ConfirmButton onPress={onConfirm}>
              <ConfirmButtonText>Confirmar</ConfirmButtonText>
            </ConfirmButton>
          </ContentContainer>
        </AnimatedModalContainer>
      </AnimatedOverlay>
    </Modal>
  );
};

const AnimatedOverlay = styled(Animated.createAnimatedComponent(TouchableOpacity))`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
  align-items: center;
`;

const AnimatedModalContainer = styled(Animated.View)`
  background-color: ${({ theme }) => theme.COLORS.GREY};
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  width: 100%;
  padding-top: 12px;
  padding-bottom: 40px;
  shadow-color: ${({ theme }) => theme.COLORS.SHADOW};
  shadow-offset: 0px -4px;
  shadow-opacity: 0.2;
  shadow-radius: 12px;
  elevation: 8;
`;

const Handle = styled.View`
  width: 40px;
  height: 4px;
  background-color: ${({ theme }) => theme.COLORS.GREY_80};
  border-radius: 2px;
  align-self: center;
  margin-bottom: 24px;
`;

const ContentContainer = styled.View`
  padding: 0 24px;
  align-items: center;
`;

const InfoText = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  color: ${({ theme }) => theme.COLORS.WHITE};
  line-height: 22px;
  text-align: center;
  margin-bottom: 32px;
`;

const ConfirmButton = styled(TouchableOpacity)`
  width: 100%;
  padding: 18px 24px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 999px;
  align-items: center;
  justify-content: center;
`;

const ConfirmButtonText = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  color: ${({ theme }) => theme.COLORS.BLACK};
`;

