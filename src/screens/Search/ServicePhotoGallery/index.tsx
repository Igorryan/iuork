import { Dimensions, Image, TouchableOpacity } from 'react-native';

// styles
import * as S from './styles';

// libs

// components
import { Footer } from '../ServiceDetail/Footer';
import { Header } from '../ProfessionalProfile/Header';
import { useEffect, useMemo, useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';

// consts

// types
type RouteParamList = {
  Detail: {
    images: string[];
  };
};

export const ServicePhotoGallery: React.FC = () => {
  // hooks
  const route = useRoute<RouteProp<RouteParamList, 'Detail'>>();

  // refs

  // states
  const [galleryType, setGalleryType] = useState(1);

  // variables
  useMemo(() => {
    setGalleryType(route.params.images.length <= 15 ? 1 : 12);
  }, [route]);

  // callbacks

  // effects

  // renders
  return (
    <S.Container>
      <Header icon="arrow-left" />

      <S.Gallery>
        <S.GalleryContent>
          {galleryType === 1 && (
            <S.ImagesContainer>
              {route.params.images.map((img, i) => (
                <ImageWithOriginalHeight key={i} img={img} />
              ))}
            </S.ImagesContainer>
          )}

          {galleryType === 2 && (
            <S.ImagesContainer>
              {route.params.images.map((img, i) => (
                <TouchableOpacity activeOpacity={0.9} key={i}>
                  <Image
                    style={{
                      width: Dimensions.get('window').width / 3,
                      height: Dimensions.get('window').width / 3,
                    }}
                    resizeMode="cover"
                    source={{ uri: img }}
                  />
                </TouchableOpacity>
              ))}
            </S.ImagesContainer>
          )}
        </S.GalleryContent>
      </S.Gallery>

      <Footer servicePrice={80} key={1} />
    </S.Container>
  );
};

const ImageWithOriginalHeight = ({ img }: { img: string }) => {
  const [imageHeight, setImageHeight] = useState(0);

  useEffect(() => {
    // Obter dimensões da imagem original
    Image.getSize(img, (width, height) => {
      const screenWidth = Dimensions.get('window').width; // Largura da tela
      const aspectRatio = height / width; // Relação de aspecto da imagem
      setImageHeight(screenWidth * aspectRatio); // Calcula a altura proporcional
    });
  }, [img]);

  return (
    <TouchableOpacity activeOpacity={0.9}>
      <Image
        style={{
          width: Dimensions.get('window').width, // Largura da tela
          height: imageHeight, // Altura calculada dinamicamente
        }}
        resizeMode="cover"
        source={{ uri: img }}
      />
    </TouchableOpacity>
  );
};
