import React from 'react';

import { useEffect, useMemo, useState } from 'react';
import * as Location from 'expo-location';
import { SafeAreaView, Platform } from 'react-native';
import * as S from './styles';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@routes/stack.routes';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

// components
import { Footer } from './Footer';
import { Where } from './Where';
import { What } from './What';
import { IAddress } from 'src/types/address';
import { setUserAddress, getUserAddress } from '@functions/getUserAddress';
import { findPlaceFromLatLng } from '@functions/PlacesWithGoogleMaps';
import { setLastSearch } from '@functions/searchStorage';

// types

export const SearchParams: React.FC = () => {
  // hooks
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { goBack } = useNavigation();

  // states
  const [addressViewFocused, setAddressViewFocused] = useState(true);
  const [whatViewFocused, setWhatViewFocused] = useState(false);
  const [address, setAddress] = useState<IAddress>();
  const [suggestedAddress, setSuggestedAddress] = useState<IAddress>();
  const [keyword, setKeyword] = useState('');

  // effects
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const saved = await getUserAddress();
        if (isMounted && saved) setAddress(saved);
      } catch {}
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    // if opened from Home with openMinimized, keep both minimized
    const params = (route as any)?.params as { openMinimized?: boolean } | undefined;
    if (params?.openMinimized) {
      setAddressViewFocused(false);
      setWhatViewFocused(false);
    }
  }, [route]);

  useEffect(() => {
    if (address) {
      const params = (route as any)?.params as { openMinimized?: boolean } | undefined;
      if (!params?.openMinimized) {
        setAddressViewFocused(false);
        setWhatViewFocused(true);
      }
    }
  }, [address, route]);

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
    setWhatViewFocused(false);
  }

  function handleOpenWhatView() {
    setAddressViewFocused(false);
    setWhatViewFocused(true);
  }

  function handleAddressSelected() {
    setAddressViewFocused(false);
    setWhatViewFocused(true);
  }

  function clearAll() {
    handleOpenAddressView();
    setAddress(undefined);
    setKeyword('');
  }

  function navigate() {
    if (!address) return;
    setUserAddress(address);
    setLastSearch({ address, keyword: keyword.trim() });
    navigation.navigate('Tabs' as any, { screen: 'SearchTab' } as any);
  }

  function handleNavigate() {
    navigate();
  }

  // calcs
  const searchButtonAvailable = useMemo(() => {
    if (!address) return false;
    if (!keyword || keyword.trim().length < 2) return false;
    return true;
  }, [address, keyword]);

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
            onAddressSelected={handleAddressSelected}
          />

          <What
            isActive={whatViewFocused}
            value={keyword}
            setValue={setKeyword}
            onPress={handleOpenWhatView}
          />
        </S.ContentView>

        <Footer
          clearAll={clearAll}
          onButtonPress={handleNavigate}
          buttonIsAvailable={!searchButtonAvailable}
        />
        <S.BottomSafeArea />
      </SafeAreaView>
    </S.Container>
  );
};
