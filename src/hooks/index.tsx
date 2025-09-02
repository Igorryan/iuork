import React from 'react';

import { UserLocationProvider } from './userLocation';

interface IProps {
  children: React.ReactNode;
}

const AppProvider: React.FC<IProps> = ({ children }) => (
  <UserLocationProvider>{children}</UserLocationProvider>
);

export default AppProvider;
