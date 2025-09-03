import React from 'react';

import { UserLocationProvider } from './userLocation';
import { AuthProvider } from './auth';

interface IProps {
  children: React.ReactNode;
}

const AppProvider: React.FC<IProps> = ({ children }) => (
  <AuthProvider>
    <UserLocationProvider>{children}</UserLocationProvider>
  </AuthProvider>
);

export default AppProvider;
