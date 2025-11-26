import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Alert, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@hooks/auth';
import { api } from '@config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import theme from '@theme/index';

const USER_KEY = '@client_user';

const Profile: React.FC = () => {
  const { logout, user, isAuthenticated } = useAuth();
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);

  useEffect(() => {
    // Carregar avatar atual do usuário apenas quando autenticado
    if (user && isAuthenticated) {
      loadUserData();
    }
  }, [user, isAuthenticated]);

  const loadUserData = async () => {
    try {
      // Buscar dados do usuário atual (o interceptor do axios adiciona o token automaticamente)
      const { data } = await api.get('/auth/me');
      if (data?.avatarUrl) {
        setUserAvatar(data.avatarUrl);
      }
    } catch (error: any) {
      console.error('Erro ao carregar dados do usuário:', error);
      // Se for erro 401, o token pode estar inválido ou expirado
      if (error?.response?.status === 401) {
        console.warn('Token inválido ou expirado');
      }
    }
  };

  const pickAvatar = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Precisamos de permissão para acessar suas fotos.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setAvatarUri(result.assets[0].uri);
        await uploadAvatar(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Erro ao selecionar imagem:', error);
      Alert.alert('Erro', 'Não foi possível selecionar a imagem.');
    }
  };

  const uploadAvatar = async (uri: string) => {
    setIsUploading(true);
    try {
      const form = new FormData();
      const name = `avatar-${Date.now()}.jpg`;
      form.append('file', {
        uri,
        name,
        type: 'image/jpeg',
      } as any);

      const { data } = await api.post('/auth/me/avatar', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (data?.url) {
        setUserAvatar(data.url);
        setAvatarUri(null);
        
        // Atualizar avatarUrl no AsyncStorage
        try {
          const userJson = await AsyncStorage.getItem(USER_KEY);
          if (userJson) {
            const parsedUser = JSON.parse(userJson);
            parsedUser.avatarUrl = data.url;
            await AsyncStorage.setItem(USER_KEY, JSON.stringify(parsedUser));
          }
        } catch (error) {
          console.error('Erro ao atualizar avatar no storage:', error);
        }
        
        Alert.alert('Sucesso', 'Foto de perfil atualizada com sucesso!');
      }
    } catch (error: any) {
      console.error('Erro ao fazer upload:', error);
      const message = error?.response?.data?.message || 'Erro ao atualizar foto de perfil';
      Alert.alert('Erro', message);
      setAvatarUri(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', style: 'destructive', onPress: logout },
      ]
    );
  };

  const displayAvatar = avatarUri || userAvatar;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.COLORS.BACKGROUND }}>
      <Container>
        <Header>
          <HeaderTitle>Perfil</HeaderTitle>
        </Header>

        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          <ProfileSection>
            <AvatarContainer>
              {displayAvatar ? (
                <Avatar source={{ uri: displayAvatar }} />
              ) : (
                <AvatarPlaceholder>
                  <Ionicons name="person" size={60} color={theme.COLORS.GREY_40} />
                </AvatarPlaceholder>
              )}
              {isUploading && (
                <UploadingOverlay>
                  <ActivityIndicator size="large" color={theme.COLORS.WHITE} />
                </UploadingOverlay>
              )}
              <EditAvatarButton onPress={pickAvatar} disabled={isUploading}>
                <Ionicons name="camera" size={20} color={theme.COLORS.WHITE} />
              </EditAvatarButton>
            </AvatarContainer>

            <UserName>{user?.name || 'Usuário'}</UserName>
            {user?.email && <UserEmail>{user.email}</UserEmail>}
          </ProfileSection>

          <MenuSection>
            <MenuTitle>Configurações</MenuTitle>
            
            <MenuButton onPress={handleLogout}>
              <MenuButtonLeft>
                <MenuIconContainer style={{ backgroundColor: theme.COLORS.ERROR + '20' }}>
                  <Ionicons name="log-out-outline" size={20} color={theme.COLORS.ERROR} />
                </MenuIconContainer>
                <MenuButtonText>Sair</MenuButtonText>
              </MenuButtonLeft>
              <Ionicons name="chevron-forward" size={20} color={theme.COLORS.GREY_40} />
            </MenuButton>
          </MenuSection>
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
};

export default Profile;

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 24px 24px 16px;
`;

const HeaderTitle = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.XL}px;
  color: ${({ theme }) => theme.COLORS.PRIMARY};
`;

const ProfileSection = styled.View`
  align-items: center;
  padding: 32px 24px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  margin-bottom: 24px;
`;

const AvatarContainer = styled.View`
  position: relative;
  margin-bottom: 16px;
`;

const Avatar = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  background-color: ${({ theme }) => theme.COLORS.GREY_10};
`;

const AvatarPlaceholder = styled.View`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  background-color: ${({ theme }) => theme.COLORS.GREY_10};
  align-items: center;
  justify-content: center;
`;

const EditAvatarButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.COLORS.SECONDARY};
  align-items: center;
  justify-content: center;
  border-width: 3px;
  border-color: ${({ theme }) => theme.COLORS.WHITE};
  shadow-color: ${({ theme }) => theme.COLORS.SHADOW};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
  elevation: 4;
`;

const UploadingOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 60px;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
`;

const UserName = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.XL}px;
  color: ${({ theme }) => theme.COLORS.BLACK};
  margin-bottom: 4px;
`;

const UserEmail = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: ${({ theme }) => theme.COLORS.GREY_60};
`;

const MenuSection = styled.View`
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  padding: 16px 0;
`;

const MenuTitle = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: ${({ theme }) => theme.COLORS.GREY_60};
  padding: 0 24px 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const MenuButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.COLORS.GREY_10};
`;

const MenuButtonLeft = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

const MenuIconContainer = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`;

const MenuButtonText = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  color: ${({ theme }) => theme.COLORS.BLACK};
`;
