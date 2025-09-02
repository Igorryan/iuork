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
        <S.ServicePriceTitle>Preço</S.ServicePriceTitle>
        <S.ValuePriceContainer>
          <S.ServicePriceSymbol>R$ </S.ServicePriceSymbol>
          <S.ServicePriceValue>
            {priceValue}
            {pricingType === 'HOURLY' ? ' / hora' : pricingType === 'FIXED' ? ' (fixo)' : ''}
          </S.ServicePriceValue>
        </S.ValuePriceContainer>
      </S.ServicePriceContainer>
    </S.Container>
  );
};
