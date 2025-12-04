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
  const lastDataKeyRef = useRef<string | null>(null);
  const isAdjustingZoomRef = useRef(false);

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
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  // Calcular coordenadas para ajustar o zoom
  const coordinatesToFit = useMemo(() => {
    const coords: Array<{ latitude: number; longitude: number }> = [];
    
    // Adicionar localização do usuário se disponível
    if (userAddress?.latitude && userAddress?.longitude) {
      coords.push({
        latitude: userAddress.latitude,
        longitude: userAddress.longitude,
      });
    }
    
    // Adicionar localizações dos profissionais
    data.forEach((professional) => {
      if (professional?.address?.latitude && professional?.address?.longitude) {
        coords.push({
          latitude: professional.address.latitude,
          longitude: professional.address.longitude,
        });
      }
    });
    
    return coords;
  }, [data, userAddress]);

  // Ajustar zoom para mostrar todos os profissionais (quando os dados mudarem - nova busca)
  useEffect(() => {
    // Só ajustar se houver coordenadas para mostrar (usuário ou profissionais)
    if (!mapRef.current || coordinatesToFit.length === 0) return;
    
    // Criar uma chave única baseada nos IDs dos profissionais e localização do usuário
    const dataKey = [
      data.map(p => p.id).sort().join(','),
      userAddress?.latitude ? String(userAddress.latitude) : '',
      userAddress?.longitude ? String(userAddress.longitude) : '',
    ].join('|');
    
    // Ajustar se for a primeira vez (lastDataKeyRef.current é null) ou se os dados mudaram (nova busca ou localização carregada)
    if (lastDataKeyRef.current === null || lastDataKeyRef.current !== dataKey) {
      lastDataKeyRef.current = dataKey;
      isAdjustingZoomRef.current = true;
      
      // Aguardar um pouco mais para garantir que o mapa está totalmente renderizado
      const timer = setTimeout(() => {
        if (mapRef.current && coordinatesToFit.length > 0) {
          mapRef.current.fitToCoordinates(coordinatesToFit, {
            edgePadding: {
              top: 100,
              right: 50,
              bottom: 200, // Espaço extra para a lista horizontal
              left: 50,
            },
            animated: true,
          });
          // Resetar flag após um tempo para permitir que focusMarker funcione novamente
          setTimeout(() => {
            isAdjustingZoomRef.current = false;
          }, 1000);
        }
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [coordinatesToFit, data, userAddress]);

  // Ordenar marcadores para que o focado seja renderizado por último (sobreposto)
  const orderedMarkers = useMemo(() => {
    // Separar profissionais focados e não focados
    const nonFocusedProfessionals = data.filter(
      (p) => p && professionalFocused?.id !== p.id
    );
    const focusedProfessional = data.find(
      (p) => p && professionalFocused?.id === p.id
    );

    return { nonFocusedProfessionals, focusedProfessional };
  }, [data, professionalFocused]);

  // effects
  useEffect(() => {
    // Só focar no marcador se não estivermos ajustando o zoom automaticamente
    if (professionalFocused && !isAdjustingZoomRef.current) {
      focusMarker(professionalFocused.location);
    }
  }, [focusMarker, professionalFocused]);

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

        {/* Renderizar primeiro os não focados */}
        {orderedMarkers.nonFocusedProfessionals.map((professional) => (
          <ProfessionalMarker
            focused={false}
            setProfessionalFocused={setProfessionalFocused}
            professional={professional}
            key={professional.id}
          />
        ))}
        {/* Renderizar por último o focado para que fique sobreposto */}
        {orderedMarkers.focusedProfessional && (
          <ProfessionalMarker
            focused={true}
            setProfessionalFocused={setProfessionalFocused}
            professional={orderedMarkers.focusedProfessional}
            key={orderedMarkers.focusedProfessional.id}
          />
        )}
      </S.Map>
    </S.Container>
  );
};
