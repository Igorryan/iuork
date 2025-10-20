import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import theme from '@theme/index';
import { Budget } from '@api/callbacks/budget';
import { Button } from '@components/Button';

interface BudgetInfoCardProps {
  budget: Budget;
  serviceName: string;
  professionalName: string;
  onRequestNewBudget: () => void;
}

export const BudgetInfoCard: React.FC<BudgetInfoCardProps> = ({
  budget,
  serviceName,
  professionalName,
  onRequestNewBudget,
}) => {
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

  const isExpired = budget.expiresAt && new Date(budget.expiresAt) < new Date();
  const price = parseFloat(budget.price);
  
  // Não mostrar se preço é 0 (ainda não definido)
  if (price === 0) {
    return null;
  }

  return (
    <Container>
      <Header>
        <IconContainer>
          <Ionicons name="document-text" size={24} color={theme.COLORS.SECONDARY} />
        </IconContainer>
        <HeaderContent>
          <HeaderTitle>Orçamento em Análise</HeaderTitle>
          <HeaderSubtitle>De {professionalName}</HeaderSubtitle>
        </HeaderContent>
      </Header>

      <InfoRow>
        <InfoLabel>ID do Orçamento:</InfoLabel>
        <InfoValue>{budget.id}</InfoValue>
      </InfoRow>

      <InfoRow>
        <InfoLabel>Serviço:</InfoLabel>
        <InfoValue>{serviceName}</InfoValue>
      </InfoRow>

      <PriceContainer>
        <PriceLabel>Valor Orçado:</PriceLabel>
        <Price>R$ {price.toFixed(2).replace('.', ',')}</Price>
      </PriceContainer>

      {budget.description && budget.description !== 'Solicitação de orçamento' && (
        <DescriptionContainer>
          <DescriptionLabel>Detalhes:</DescriptionLabel>
          <Description>{budget.description}</Description>
        </DescriptionContainer>
      )}

      <InfoRow>
        <InfoLabel>Status:</InfoLabel>
        <StatusBadge status={budget.status}>
          <StatusText status={budget.status}>
            {budget.status === 'PENDING' && 'Aguardando'}
            {budget.status === 'QUOTED' && 'Orçado'}
            {budget.status === 'ACCEPTED' && 'Aceito'}
            {budget.status === 'REJECTED' && 'Recusado'}
            {budget.status === 'EXPIRED' && 'Expirado'}
          </StatusText>
        </StatusBadge>
      </InfoRow>

      {budget.expiresAt && (
        <ExpiryInfo isExpired={!!isExpired}>
          <Ionicons 
            name="time-outline" 
            size={14} 
            color={isExpired ? theme.COLORS.ERROR : theme.COLORS.GREY_60} 
          />
          <ExpiryText isExpired={!!isExpired}>{formatExpiryDate(budget.expiresAt)}</ExpiryText>
        </ExpiryInfo>
      )}

      <Divider />

      <ButtonContainer>
        <Button onPress={onRequestNewBudget} style={{ backgroundColor: theme.COLORS.SECONDARY }}>
          Solicitar Novo Orçamento
        </Button>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.View`
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 12px;
  padding: 16px;
  margin: 12px 16px;
  shadow-color: ${({ theme }) => theme.COLORS.SHADOW};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
  border: 1px solid ${({ theme }) => theme.COLORS.GREY_20};
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

const IconContainer = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.COLORS.SECONDARY}20;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`;

const HeaderContent = styled.View`
  flex: 1;
`;

const HeaderTitle = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  color: ${({ theme }) => theme.COLORS.PRIMARY};
`;

const HeaderSubtitle = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SSM}px;
  color: ${({ theme }) => theme.COLORS.GREY_60};
  margin-top: 2px;
`;

const InfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const InfoLabel = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SSM}px;
  color: ${({ theme }) => theme.COLORS.GREY_60};
`;

const InfoValue = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: ${({ theme }) => theme.COLORS.GREY};
  flex: 1;
  text-align: right;
  margin-left: 8px;
`;

const PriceContainer = styled.View`
  background-color: ${({ theme }) => theme.COLORS.SECONDARY}10;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 12px;
`;

const PriceLabel = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SSM}px;
  color: ${({ theme }) => theme.COLORS.GREY_60};
  margin-bottom: 4px;
`;

const Price = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.XXL}px;
  color: ${({ theme }) => theme.COLORS.SECONDARY};
`;

const DescriptionContainer = styled.View`
  margin-bottom: 12px;
`;

const DescriptionLabel = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.SSM}px;
  color: ${({ theme }) => theme.COLORS.GREY};
  margin-bottom: 4px;
`;

const Description = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: ${({ theme }) => theme.COLORS.GREY_60};
  line-height: 20px;
`;

const StatusBadge = styled.View<{ status: string }>`
  padding: 4px 12px;
  border-radius: 12px;
  background-color: ${({ theme, status }) => {
    if (status === 'PENDING') return theme.COLORS.WARNING + '20';
    if (status === 'QUOTED') return theme.COLORS.SECONDARY + '20';
    if (status === 'ACCEPTED') return theme.COLORS.SUCCESS + '20';
    if (status === 'REJECTED') return theme.COLORS.ERROR + '20';
    if (status === 'EXPIRED') return theme.COLORS.GREY_60 + '20';
    return theme.COLORS.GREY_20;
  }};
`;

const StatusText = styled.Text<{ status: string }>`
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.SSM}px;
  color: ${({ theme, status }) => {
    if (status === 'PENDING') return theme.COLORS.WARNING;
    if (status === 'QUOTED') return theme.COLORS.SECONDARY;
    if (status === 'ACCEPTED') return theme.COLORS.SUCCESS;
    if (status === 'REJECTED') return theme.COLORS.ERROR;
    if (status === 'EXPIRED') return theme.COLORS.GREY_60;
    return theme.COLORS.GREY;
  }};
`;

const ExpiryInfo = styled.View<{ isExpired: boolean }>`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
`;

const ExpiryText = styled.Text<{ isExpired: boolean }>`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SSM}px;
  color: ${({ theme, isExpired }) => isExpired ? theme.COLORS.ERROR : theme.COLORS.GREY_60};
`;

const Divider = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.COLORS.GREY_20};
  margin: 12px 0;
`;

const ButtonContainer = styled.View`
  margin-top: 8px;
`;

