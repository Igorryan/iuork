import { View, TouchableOpacity, Text, Image } from 'react-native';
import styled from 'styled-components/native';

// libs

// types

// styles
export const Footer = styled(View)`
  flex-direction: column;

  elevation: 2;
  shadow-color: rgba(0, 0, 0, 1);
  shadow-offset: 1px -8px;
  shadow-opacity: 0.05;
  shadow-radius: 5px;

  width: 100%;

  background-color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const BudgetContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px;
  background-color: ${({ theme }) => theme.COLORS.GREY_10};
  border: 1px solid ${({ theme }) => theme.COLORS.GREY_20};
`;

export const BudgetTitle = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: ${({ theme }) => theme.COLORS.GREY_60};
  flex: 1;
  margin-right: 12px;
`;

export const BudgetButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

export const BudgetButtonTitle = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: ${({ theme }) => theme.COLORS.BLACK};
  text-decoration: underline;
`;

export const BudgetLinkContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding: 10px 14px;
  background-color: ${({ theme }) => theme.COLORS.GREY_10};
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.COLORS.GREY_20};
`;

export const BudgetLink = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  flex: 1;
`;

export const BudgetLinkText = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: ${({ theme }) => theme.COLORS.SECONDARY};
`;

export const RefreshBudgetButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 500px;
  border: 1px solid ${({ theme }) => theme.COLORS.GREY_40};
`;

export const RefreshBudgetText = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.SSM}px;
  color: ${({ theme }) => theme.COLORS.GREY_60};
`;

export const NoPriceContainer = styled(View)`
  margin: 30px 0 10px;
  padding: 0 20px;
`;

export const NoPriceText = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: ${({ theme }) => theme.COLORS.GREY_80};
  line-height: 20px;
`;

export const RequestBudgetButton = styled(TouchableOpacity)`
  flex: 1;
  padding: 16px 24px;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY};
  border-radius: 999px;
  align-items: center;
  justify-content: center;
`;

export const RequestBudgetText = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const PriceButtonContainer = styled(View)`
  flex-direction: row;
  padding: 0 20px;
  gap: 24px;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
`;

export const BudgetInfoContainer = styled(View)`
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 24px;
  overflow: hidden;
  shadow-color: ${({ theme }) => theme.COLORS.SHADOW};
  shadow-offset: 0px -4px;
  shadow-opacity: 0.1;
  shadow-radius: 12px;
  elevation: 8;
`;

export const BudgetHeader = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.COLORS.GREY_10};
`;

export const BudgetContent = styled(View)`
  padding: 24px 20px;
`;

export const StatusBadge = styled(View)<{ status: string }>`
  padding: 6px 12px;
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

export const StatusText = styled(Text)<{ status: string }>`
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

export const ServiceInfo = styled(View)`
  margin-bottom: 24px;
`;

export const ServiceName = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  color: ${({ theme }) => theme.COLORS.BLACK};
  margin-bottom: 8px;
`;

export const ServiceDescription = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: ${({ theme }) => theme.COLORS.GREY_60};
  line-height: 20px;
`;

export const ProfessionalInfo = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  padding: 12px;
  background-color: ${({ theme }) => theme.COLORS.GREY_10};
  border-radius: 12px;
`;

export const ProfessionalAvatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 12px;
`;

export const ProfessionalName = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: ${({ theme }) => theme.COLORS.GREY};
  flex: 1;
`;

export const BudgetPriceSection = styled(View)`
  background-color: ${({ theme }) => theme.COLORS.SECONDARY}15;
  padding: 12px;
  border-radius: 8px;
  align-items: center;
  margin-bottom: 20px;
`;

export const BudgetPriceLabel = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.SSM}px;
  color: ${({ theme }) => theme.COLORS.GREY_60};
  margin-bottom: 4px;
`;

export const BudgetPrice = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.XL}px;
  color: ${({ theme }) => theme.COLORS.SECONDARY};
`;

export const BudgetDescription = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: ${({ theme }) => theme.COLORS.GREY};
  line-height: 20px;
  margin-bottom: 20px;
`;

export const StatusInfo = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const BudgetExpiry = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

export const BudgetExpiryText = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SSM}px;
  color: ${({ theme }) => theme.COLORS.GREY_60};
`;

export const InfoText = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: ${({ theme }) => theme.COLORS.GREY_60};
  line-height: 20px;
  text-align: center;
`;

export const BudgetActions = styled(View)`
  padding: 0 20px;
  margin-top: 8px;
  width: 100%;
`;

export const ChatButton = styled(TouchableOpacity)`
  width: 100%;
  padding: 16px 24px;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY};
  border-radius: 999px;
  align-items: center;
  justify-content: center;
`;

export const ChatButtonText = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  color: ${({ theme }) => theme.COLORS.WHITE};
`;

// Estilos para footer de orçamento finalizado
export const BudgetFinalizedContainer = styled(View)`
  padding: 20px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const BudgetFinalizedHeader = styled(View)`
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 20px;
`;

export const BudgetFinalizedIconContainer = styled(View)`
  width: 24px;
  height: 24px;
  margin-right: 12px;
  margin-top: 2px;
  align-items: center;
  justify-content: center;

`;

export const BudgetFinalizedHeaderText = styled(Text)`
  flex: 1;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  color: ${({ theme }) => theme.COLORS.PRIMARY};
  line-height: 26px;
`;

export const BudgetFinalizedPriceCard = styled(View)`
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 12px;
  padding: 20px 16px;
  margin-bottom: 16px;
  border: 1px solid ${({ theme }) => theme.COLORS.GREY_20};
  align-items: center;
`;

export const BudgetFinalizedPriceLabel = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SSM}px;
  color: ${({ theme }) => theme.COLORS.GREY_60};
  margin-bottom: 8px;
  text-align: center;
  letter-spacing: 0.5px;
`;

export const BudgetFinalizedPrice = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.XXL}px;
  color: ${({ theme }) => theme.COLORS.PRIMARY};
  text-align: center;
`;

export const BudgetFinalizedActions = styled(View)`
  gap: 12px;
`;

export const ViewBudgetButton = styled(TouchableOpacity)`
  padding: 16px;
  background-color: ${({ theme }) => theme.COLORS.GREY_10};
  border-radius: 999px;
  align-items: center;
  justify-content: center;
`;

export const ViewBudgetButtonText = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  color: ${({ theme }) => theme.COLORS.GREY_60};
`;

export const ContractButton = styled(TouchableOpacity)`
  padding: 16px;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY};
  border-radius: 999px;
  align-items: center;
  justify-content: center;
`;

export const ContractButtonText = styled(Text)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  color: ${({ theme }) => theme.COLORS.WHITE};
`;
