// styles
import { Button } from '@components/Button';
import * as S from './styles';
import { Price } from '@components/Price';

// libs
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@routes/stack.routes';
import { useNavigation } from '@react-navigation/native';

// application

// consts

// types

type FooterProps = {
  servicePrice: number;
  pricingType?: 'FIXED' | 'HOURLY' | 'BUDGET';
  professionalData?: {
    id: string;
    name: string;
    image: string;
  };
  serviceId?: string;
  serviceName?: string;
};

export const Footer: React.FC<FooterProps> = ({ 
  servicePrice, 
  pricingType,
  professionalData,
  serviceId,
  serviceName,
}) => {
  // hooks
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  
  const handleBudgetPress = () => {
    if (!professionalData || !serviceId) return;
    
    navigation.navigate('Chat', {
      professionalId: professionalData.id,
      professionalName: professionalData.name,
      professionalImage: professionalData.image,
      serviceId,
      serviceName: serviceName || '',
    });
  };
  
  return (
    <S.Container>
      <S.Footer>
        {servicePrice !== 0 && <Price style={{ marginRight: 30 }} priceValue={servicePrice} pricingType={pricingType} />}

        {servicePrice ? (
          <Button>Contratar</Button>
        ) : (
          <Button onPress={handleBudgetPress}>Orçar</Button>
        )}
      </S.Footer>
    </S.Container>
  );
};
