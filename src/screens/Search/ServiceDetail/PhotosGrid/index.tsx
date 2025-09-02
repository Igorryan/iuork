// styles
import * as S from './styles';

// libs
import { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@routes/stack.routes';

// application
import { Section } from '../Section';

// consts

// types

type PhotosGridProps = {
  serviceImages: string[];
};

export const PhotosGrid: React.FC<PhotosGridProps> = ({ serviceImages }) => {
  // hooks
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // refs

  // states

  // variables

  const servicePhotosInGrid = useMemo(() => {
    const photos = serviceImages.filter((img, i) => i < 9);

    return photos || [];
  }, [serviceImages]);

  // callbacks

  function handleNavigateToGalleryPage() {
    navigation.navigate('ServicePhotoGallery', { images: serviceImages });
  }
  // effects

  // renders
  return (
    <S.Container>
      <Section onPress={handleNavigateToGalleryPage} title={`Fotos (${serviceImages.length})`}>
        <S.DisplayGrid>
          {servicePhotosInGrid.map((image, index) =>
            index < 8 ? (
              <TouchableOpacity key={image} activeOpacity={1}>
                <S.PhotoGrid
                  source={{
                    uri: image,
                  }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity key={image} onPress={handleNavigateToGalleryPage} activeOpacity={1}>
                <S.PhotoGrid
                  source={{
                    uri: image,
                  }}
                />
                <S.MoreView>
                  <S.MoreViewPhotoQuantityText>
                    + {serviceImages.length - 8}
                  </S.MoreViewPhotoQuantityText>
                </S.MoreView>
              </TouchableOpacity>
            ),
          )}
        </S.DisplayGrid>
      </Section>
    </S.Container>
  );
};
