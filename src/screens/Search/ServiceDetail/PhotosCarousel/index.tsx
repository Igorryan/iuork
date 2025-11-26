import React, { useState, useRef, useEffect } from 'react';
import { ScrollView, TouchableOpacity, Dimensions, StatusBar, Platform, Modal } from 'react-native';
import * as S from './styles';
import { Ionicons } from '@expo/vector-icons';

type PhotosCarouselProps = {
  serviceImages: string[];
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const PhotosCarousel: React.FC<PhotosCarouselProps> = ({ serviceImages }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fullScreenScrollRef = useRef<ScrollView>(null);
  const carouselScrollRef = useRef<ScrollView>(null);
  const isScrollingProgrammatically = useRef(false);
  const initialScrollDone = useRef(false);
  const pendingIndex = useRef<number | null>(null);

  useEffect(() => {
    if (selectedImageIndex !== null && !modalVisible) {
      // Modal está abrindo pela primeira vez
      setModalVisible(true);
      initialScrollDone.current = false;
      isScrollingProgrammatically.current = true;
      setTimeout(() => {
        fullScreenScrollRef.current?.scrollTo({
          x: selectedImageIndex * SCREEN_WIDTH,
          animated: false,
        });
        setTimeout(() => {
          isScrollingProgrammatically.current = false;
          initialScrollDone.current = true;
        }, 300);
      }, 100);
    } else if (selectedImageIndex === null && modalVisible) {
      // Modal está fechando
      setModalVisible(false);
      initialScrollDone.current = false;
    }
  }, [selectedImageIndex, modalVisible]);

  if (!serviceImages || serviceImages.length === 0) {
    return null;
  }

  const handleImagePress = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleCloseFullScreen = () => {
    // Atualizar a galeria para mostrar a foto que estava sendo visualizada
    if (selectedImageIndex !== null) {
      setCurrentImageIndex(selectedImageIndex);
      // Fazer scroll da galeria para a foto atual
      setTimeout(() => {
        carouselScrollRef.current?.scrollTo({
          x: selectedImageIndex * SCREEN_WIDTH,
          animated: true,
        });
      }, 100);
    }
    setSelectedImageIndex(null);
  };

  const handlePreviousImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      const newIndex = selectedImageIndex - 1;
      pendingIndex.current = newIndex;
      isScrollingProgrammatically.current = true;
      setSelectedImageIndex(newIndex); // Atualizar imediatamente para os botões
      fullScreenScrollRef.current?.scrollTo({
        x: newIndex * SCREEN_WIDTH,
        animated: true,
      });
    }
  };

  const handleNextImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex < serviceImages.length - 1) {
      const newIndex = selectedImageIndex + 1;
      pendingIndex.current = newIndex;
      isScrollingProgrammatically.current = true;
      setSelectedImageIndex(newIndex); // Atualizar imediatamente para os botões
      fullScreenScrollRef.current?.scrollTo({
        x: newIndex * SCREEN_WIDTH,
        animated: true,
      });
    }
  };

  const handleScroll = (event: any) => {
    if (isScrollingProgrammatically.current) {
      return;
    }
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    if (index !== selectedImageIndex && index >= 0 && index < serviceImages.length) {
      setSelectedImageIndex(index);
    }
  };

  const handleScrollEnd = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    
    if (isScrollingProgrammatically.current) {
      // Se estamos fazendo scroll programático, apenas limpar a flag quando terminar
      if (pendingIndex.current !== null && index === pendingIndex.current) {
        pendingIndex.current = null;
        setTimeout(() => {
          isScrollingProgrammatically.current = false;
        }, 100);
      }
      return;
    }
    
    // Scroll manual do usuário
    if (index !== selectedImageIndex && index >= 0 && index < serviceImages.length) {
      setSelectedImageIndex(index);
    }
  };

  const handleCarouselScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    if (index >= 0 && index < serviceImages.length) {
      setCurrentImageIndex(index);
    }
  };

  const handleCarouselScrollEnd = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    if (index >= 0 && index < serviceImages.length) {
      setCurrentImageIndex(index);
    }
  };

  return (
    <>
      <S.Container>
        <ScrollView
          ref={carouselScrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 0 }}
          snapToInterval={SCREEN_WIDTH}
          decelerationRate="fast"
          pagingEnabled
          onScroll={handleCarouselScroll}
          onMomentumScrollEnd={handleCarouselScrollEnd}
          scrollEventThrottle={16}
        >
          {serviceImages.map((image, index) => (
            <TouchableOpacity
              key={`${image}-${index}`}
              activeOpacity={0.9}
              onPress={() => handleImagePress(index)}
            >
              <S.CarouselImage
                source={{ uri: image }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
        <S.CarouselCounter>
          <S.CarouselCounterText>
            {currentImageIndex + 1} / {serviceImages.length}
          </S.CarouselCounterText>
        </S.CarouselCounter>
      </S.Container>

      {/* Modal de visualização em tela cheia */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseFullScreen}
        statusBarTranslucent={true}
        presentationStyle="overFullScreen"
      >
        <S.FullScreenContainer>
          <StatusBar hidden={Platform.OS === 'ios'} />
          <S.CloseButton onPress={handleCloseFullScreen}>
            <Ionicons name="close" size={28} color="#FFFFFF" />
          </S.CloseButton>

          {selectedImageIndex !== null && selectedImageIndex > 0 && (
            <S.NavButton position="left" onPress={handlePreviousImage}>
              <Ionicons name="chevron-back" size={32} color="#FFFFFF" />
            </S.NavButton>
          )}

          {selectedImageIndex !== null && (
            <ScrollView
              ref={fullScreenScrollRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              onMomentumScrollEnd={handleScrollEnd}
              scrollEventThrottle={16}
            >
              {serviceImages.map((image, index) => (
                <S.FullScreenImage
                  key={`fullscreen-${image}-${index}`}
                  source={{ uri: image }}
                  resizeMode="contain"
                />
              ))}
            </ScrollView>
          )}

          {selectedImageIndex !== null && selectedImageIndex < serviceImages.length - 1 && (
            <S.NavButton position="right" onPress={handleNextImage}>
              <Ionicons name="chevron-forward" size={32} color="#FFFFFF" />
            </S.NavButton>
          )}

          {selectedImageIndex !== null && (
            <S.ImageCounter>
              {selectedImageIndex + 1} / {serviceImages.length}
            </S.ImageCounter>
          )}
        </S.FullScreenContainer>
      </Modal>
    </>
  );
};

