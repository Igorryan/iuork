import { useCallback, useEffect, useMemo } from 'react';
import { Animated, Easing } from 'react-native';

// styles
import * as S from './styles';

// libs
import { MapMarkerProps } from 'react-native-maps';

// types
import { ProfessionalFocusedProps } from '..';
import { Professional as IProfessional } from '../../../types/domain';

type Props = {
  professional: IProfessional;
  focused: boolean;
  setProfessionalFocused(data: ProfessionalFocusedProps): void;
} & Omit<MapMarkerProps, 'coordinate'>;

// relay

// component
export const ProfessionalMarker: React.FC<Props> = ({
  professional,
  focused,
  setProfessionalFocused,
}) => {
  // hooks
  const data = professional;

  // variables
  const animatedValue = useMemo(() => {
    return new Animated.Value(0);
  }, []);

  const scaleStyle = useMemo(() => {
    return {
      transform: [
        {
          scale: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.35],
          }),
        },
      ],
    };
  }, [animatedValue]);

  // callbacks
  function handleFocusMarker(professionalFocusedData: ProfessionalFocusedProps) {
    setProfessionalFocused(professionalFocusedData);
  }

  const scaleIn = useCallback(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [animatedValue]);

  const scaleOut = useCallback(() => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [animatedValue]);

  // effects
  useEffect(() => {
    if (focused) {
      scaleIn();
    } else {
      scaleOut();
    }
  }, [focused, scaleIn, scaleOut]);

  // renders
  if (!data.address) return null;

  return (
    <S.ProfessionalMarker
      onPress={() =>
        handleFocusMarker({
          location: {
            latitude: data.address?.latitude || 0,
            longitude: data.address?.longitude || 0,
          },
          id: data.id,
        })
      }
      coordinate={{
        latitude: data.address.latitude,
        longitude: data.address.longitude,
      }}
      zIndex={focused ? 1000 : 1}
    >
      <S.CustomProfessionalMarker>
        <S.MarkerImage
          style={scaleStyle}
          resizeMode="cover"
          source={{
            uri: data.image,
          }}
        />
      </S.CustomProfessionalMarker>
    </S.ProfessionalMarker>
  );
};
