import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '@hooks/auth';

const Profile: React.FC = () => {
  const { logout, user } = useAuth();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 }}>
      <Text>Perfil</Text>
      <Text>{user?.name}</Text>
      <TouchableOpacity onPress={logout} style={{ backgroundColor: '#111', padding: 12, borderRadius: 8 }}>
        <Text style={{ color: '#fff' }}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;


