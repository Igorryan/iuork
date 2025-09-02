import { TextInputProps } from 'react-native';

import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';

import { GOOGLE_MAPS_API_KEY } from '@env';

import * as S from './style';
import { useTheme } from 'styled-components/native';
import { useMemo, useRef } from 'react';
import { IAddress } from '@api/mock/address';

type formatAddressProps = {
  administrative_area_level_1: string;
  administrative_area_level_2: string;
  country: string;
  postal_code: string;
  route: string;
  street_number: string;
  sublocality_level_1: string;
};

interface Props extends TextInputProps {
  changeAddress(address: IAddress): void;
}

export const InputFindAddress: React.FC<Props> = ({ changeAddress }) => {
  const { COLORS } = useTheme();
  const inputRef = useRef<GooglePlacesAutocompleteRef>(null);

  function handleSelectAddress(data: GooglePlaceData, details: GooglePlaceDetail | null) {
    if (!details) return;

    const formattedAddress = details.address_components.reduce(
      (acc, curr) => ({
        ...acc,
        [curr.types[0]]: curr.long_name,
      }),
      {},
    ) as formatAddressProps;

    const address = {
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
      street: formattedAddress.route,
      number: Number(formattedAddress.street_number || 0) || 0,
      district: formattedAddress.sublocality_level_1,
      city: formattedAddress.administrative_area_level_2,
      state: formattedAddress.administrative_area_level_1,
      postalcode: formattedAddress.postal_code,
      distanceInMeters: null,
    } as IAddress;

    changeAddress(address);
  }

  return (
    <S.Container>
      <S.Icon name="search-outline" />
      <GooglePlacesAutocomplete
        fetchDetails
        ref={inputRef}
        styles={{
          poweredContainer: { display: 'none' },
          container: { flex: 1 },
          listView: {
            position: 'absolute',
            top: 56 ,
            left: 0,
            right: 0,
            zIndex: 10,
            width: '100%',
            borderWidth: 1,
            borderColor: '#00000020',
            elevation: 8,
            borderRadius: 2,
            backgroundColor: '#fff',
          },
          textInputContainer: { flex: 1, height: 58, alignItems: 'center' },
        }}
        textInputProps={{
          autoFocus: true,
          placeholderTextColor: `${COLORS.GREY_60}`,
          style: {
            marginLeft: 32,
            flex: 1,
            height: 58,
            marginTop: -2,
          },
        }}
        debounce={500}
        minLength={5}
        placeholder={'Buscar endereço'}
        onPress={handleSelectAddress}
        query={{
          key: GOOGLE_MAPS_API_KEY,
          language: 'pt-BR',
        }}
      />
    </S.Container>
  );
};
