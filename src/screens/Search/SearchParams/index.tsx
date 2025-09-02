import React from 'react';

import { useEffect, useMemo, useState } from 'react';
import * as Location from 'expo-location';
import { SafeAreaView, Platform } from 'react-native';
import * as S from './styles';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@routes/stack.routes';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

// components
import { Footer } from './Footer';
import { Where } from './Where';
import { IAddress } from 'src/types/address';
import { setUserAddress } from '@functions/getUserAddress';
import { findPlaceFromLatLng } from '@functions/PlacesWithGoogleMaps';

// types

export const SearchParams: React.FC = () => {
  // hooks
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { goBack } = useNavigation();

  // states
  const [addressViewFocused, setAddressViewFocused] = useState(true);
  const [address, setAddress] = useState<IAddress>();
  const [suggestedAddress, setSuggestedAddress] = useState<IAddress>();

  // effects
  useEffect(() => {
    if (address) {
      setAddressViewFocused(false);
    }
  }, [address]);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') return;

        const position = await Location.getCurrentPositionAsync({});
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const placeDetail = await findPlaceFromLatLng({ lat, lng });
        if (!placeDetail) return;

        const formatted = (placeDetail.address_components || []).reduce(
          (acc, curr) => ({
            ...acc,
            [curr.types[0]]: curr.long_name,
          }),
          {} as Record<string, string>,
        );

        const autoAddress: IAddress = {
          latitude: lat,
          longitude: lng,
          street: (formatted['route'] as string) || '',
          number: Number(formatted['street_number']) || 0,
          district: (formatted['sublocality_level_1'] as string) || '',
          city: (formatted['administrative_area_level_2'] as string) || '',
          state: (formatted['administrative_area_level_1'] as string) || '',
          postalcode: (formatted['postal_code'] as string) || '',
          distanceInMeters: null,
        };

        if (isMounted) setSuggestedAddress(autoAddress);
      } catch {
        // silently ignore failures; user can still search manually
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  // callbacks
  function handleOpenAddressView() {
    setAddressViewFocused(true);
  }

  function clearAll() {
    handleOpenAddressView();
    setAddress(undefined);
  }

  function navigate() {
    if (!address) return;
    setUserAddress(address);
    navigation.navigate('Home');
  }

  function handleNavigate() {
    navigate();
  }

  // calcs
  const searchButtonAvailable = useMemo(() => {
    if (!address) return false;
    return true;
  }, [address]);

  // renders
  return (
    <S.Container enabled behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar style="dark" />
      <SafeAreaView style={{ flex: 1 }}>
        <S.ContentView>
          <S.CloseIconContainer onPress={() => goBack()}>
            <S.CloseIcon name="close-outline" />
          </S.CloseIconContainer>

          <Where
            isActive={addressViewFocused}
            address={address}
            setAddress={setAddress}
            onPress={handleOpenAddressView}
            suggestedAddress={suggestedAddress}
          />
        </S.ContentView>

        <Footer
          clearAll={clearAll}
          onButtonPress={handleNavigate}
          buttonIsAvailable={!searchButtonAvailable}
        />
      </SafeAreaView>
    </S.Container>
  );
};
