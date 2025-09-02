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
};

export const Footer: React.FC<FooterProps> = ({ servicePrice }) => {
  // hooks
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <S.Container>
      <S.Footer>
        {servicePrice !== 0 && <Price style={{ marginRight: 30 }} priceValue={servicePrice} />}

        {servicePrice ? (
          <Button>Contratar</Button>
        ) : (
          <Button onPress={() => navigation.navigate('Chat')}>Orçar</Button>
        )}
      </S.Footer>
    </S.Container>
  );
};
