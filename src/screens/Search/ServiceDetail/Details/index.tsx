// styles
import * as S from './styles';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

// libs

// application

// consts

// types
type DetailsProps = {
  name: string;
  description: string;
  hasCarousel?: boolean;
};

export const Details: React.FC<DetailsProps> = ({ name, description, hasCarousel }) => {
  // hooks
  const { COLORS } = useTheme();

  // refs

  // states

  // variables

  // callbacks

  // effects

  // renders
  return (
    <S.Container hasCarousel={hasCarousel}>
      <S.ServiceTitle>{name}</S.ServiceTitle>
      <S.ServiceDescription>{description}</S.ServiceDescription>

      <S.ServiceDetailList>
        <S.ServiceDetailItem>
          <Feather name="star" size={16} color={COLORS.GREY_60} />
          <S.ServiceDetailDescription>4.5 (48 avaliações)</S.ServiceDetailDescription>
        </S.ServiceDetailItem>
        <S.ServiceDetailItem>
          <S.ServiceDetailItemIcon name="clock" size={16} />
          <S.ServiceDetailDescription>30 minutos</S.ServiceDetailDescription>
        </S.ServiceDetailItem>
      </S.ServiceDetailList>
    </S.Container>
  );
};
