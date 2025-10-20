import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import theme from '@theme/index';
import { Budget } from '@api/callbacks/budget';

interface BudgetReceivedCardProps {
  budget: Budget;
  serviceName: string;
  professionalName: string;
}

export const BudgetReceivedCard: React.FC<BudgetReceivedCardProps> = ({
  budget,
  serviceName,
  professionalName,
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

  // Não mostrar se já foi respondido ou expirado
  if (budget.status !== 'PENDING' && budget.status !== 'QUOTED' || isExpired) {
    return null;
  }

  // Se o preço ainda é 0, não mostrar (ainda não foi definido pelo profissional)
  if (parseFloat(budget.price) === 0) {
    return null;
  }

  return (
    <Container>
      <Header>
        <IconContainer>
          <Ionicons name="pricetag" size={24} color={theme.COLORS.SECONDARY} />
        </IconContainer>
        <HeaderContent>
          <HeaderTitle>Orçamento Recebido</HeaderTitle>
          <HeaderSubtitle>De {professionalName}</HeaderSubtitle>
        </HeaderContent>
      </Header>

      <ServiceInfo>
        <ServiceLabel>Serviço:</ServiceLabel>
        <ServiceName>{serviceName}</ServiceName>
      </ServiceInfo>

      <PriceContainer>
        <PriceLabel>Valor:</PriceLabel>
        <Price>R$ {parseFloat(budget.price).toFixed(2).replace('.', ',')}</Price>
      </PriceContainer>

      {budget.description && budget.description !== 'Solicitação de orçamento' && (
        <DescriptionContainer>
          <DescriptionLabel>Detalhes:</DescriptionLabel>
          <Description>{budget.description}</Description>
        </DescriptionContainer>
      )}

      {budget.expiresAt && (
        <ExpiryInfo>
          <Ionicons name="time-outline" size={14} color={theme.COLORS.GREY_60} />
          <ExpiryText>{formatExpiryDate(budget.expiresAt)}</ExpiryText>
        </ExpiryInfo>
      )}
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
  border: 2px solid ${({ theme }) => theme.COLORS.SECONDARY};
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
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

const ServiceInfo = styled.View`
  margin-bottom: 12px;
`;

const ServiceLabel = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SSM}px;
  color: ${({ theme }) => theme.COLORS.GREY_60};
  margin-bottom: 4px;
`;

const ServiceName = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  color: ${({ theme }) => theme.COLORS.GREY};
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

const ExpiryInfo = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

const ExpiryText = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SSM}px;
  color: ${({ theme }) => theme.COLORS.GREY_60};
`;
