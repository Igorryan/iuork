import * as S from './styles';

type FooterProps = {
  clearAll(): void;
  onButtonPress(): void;
  buttonIsAvailable: boolean;
};

export const Footer: React.FC<FooterProps> = ({ clearAll, onButtonPress, buttonIsAvailable }) => {
  return (
    <S.Footer>
      <S.ClearAll onPress={clearAll}>
        <S.ClearAllText>{'Limpar tudo'}</S.ClearAllText>
      </S.ClearAll>

      <S.SearchButton onPress={onButtonPress} disabled={buttonIsAvailable}>
        <S.Icon name="search-outline" />
        <S.SearchButtonText>{'Buscar'}</S.SearchButtonText>
      </S.SearchButton>
    </S.Footer>
  );
};
