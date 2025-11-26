// styles
import { ViewProps } from 'react-native';
import * as S from './styles';

// libs

// application

// consts

// types
type PriceProps = ViewProps & {
  priceValue: number;
  pricingType?: 'FIXED' | 'HOURLY' | 'BUDGET';
};

export const Price: React.FC<PriceProps> = ({ priceValue, pricingType, ...rest }) => {
  // hooks

  // refs

  // states

  // variables

  // callbacks

  // effects

  // renders
  return (
    <S.Container {...rest}>
      <S.ServicePriceContainer>
        <S.ServicePriceValue>
          {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(priceValue)}
        </S.ServicePriceValue>
        <S.ServicePriceTitle>
          {pricingType === 'HOURLY' ? 'Por hora' : pricingType === 'FIXED' ? 'Por serviço' : 'Orçamento'}
        </S.ServicePriceTitle>
      </S.ServicePriceContainer>
    </S.Container>
  );
};
