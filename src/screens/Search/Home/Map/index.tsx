import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Platform } from 'react-native'; // Importa o módulo Platform para checar a plataforma

// styles
import * as S from './styles';
import theme from '../../../../theme';

// libs
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

// application
import { ProfessionalMarker } from '../ProfessionalMarker';

// types
import { ProfessionalFocusedProps } from '..';
import { Address, getUserAddress } from '@functions/getUserAddress';
import { Professional as IProfessional } from '../../../../types/domain';

type Props = {
  data: IProfessional[];
  setProfessionalFocused(data: ProfessionalFocusedProps): void;
  professionalFocused: ProfessionalFocusedProps;
};

type FocusMarkerProps = {
  latitude: number;
  longitude: number;
};

export const Map: React.FC<Props> = ({ data, professionalFocused, setProfessionalFocused }) => {
  // hooks
  const { MAPSTYLE } = theme;

  // refs
  const mapRef = useRef<MapView>(null);

  // states
  const [userAddress, setUserAddress] = useState<Address>();

  // callbacks
  const focusMarker = useCallback(({ latitude, longitude }: FocusMarkerProps) => {
    mapRef.current?.animateToRegion({
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.02,
    });
  }, []);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const savedAddress = await getUserAddress();
      if (!isMounted) return;
      setUserAddress(savedAddress);
      if (savedAddress) {
        focusMarker({
          latitude: savedAddress.latitude,
          longitude: savedAddress.longitude,
        });
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [focusMarker]);

  // effects
  useEffect(() => {
    if (professionalFocused) focusMarker(professionalFocused.location);
  }, [focusMarker, professionalFocused]);

  useEffect(() => {
    if (!data || data.length === 0) return;
    const first = data[0];
    if (!first?.address) return;
    setTimeout(() => {
      focusMarker({
        latitude: first.address.latitude,
        longitude: first.address.longitude,
      });
    }, 1000);
  }, [data, focusMarker]);

  // renders
  return (
    <S.Container>
      <S.Map
        ref={mapRef}
        customMapStyle={MAPSTYLE}
        region={{
          latitude: userAddress?.latitude ?? -19.4543572,
          longitude: userAddress?.longitude ?? -44.2696402,
          latitudeDelta: 0.01,
          longitudeDelta: 0.04,
        }}
        // Define o provedor com base na plataforma: Google Maps para Android e padrão (Apple Maps) para iOS
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
      >
        <S.UserMarker
          coordinate={{
            latitude: userAddress?.latitude ?? -19.4543572,
            longitude: userAddress?.longitude ?? -44.2696402,
          }}
        >
          <S.CustomUserMarker>
            <S.CircleCenter></S.CircleCenter>
          </S.CustomUserMarker>
        </S.UserMarker>

        {data.map(
          (professional) =>
            professional && (
              <ProfessionalMarker
                focused={professionalFocused?.id === professional.id}
                setProfessionalFocused={setProfessionalFocused}
                professional={professional}
                key={professional.id}
              />
            ),
        )}
      </S.Map>
    </S.Container>
  );
};
