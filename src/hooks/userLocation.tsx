import { createContext, useContext, useState } from 'react';

interface IUserLocationProps {
  latitude: number;
  longitude: number;
}

interface IUserLocationContextProps {
  userLocation: IUserLocationProps | undefined;
  setUserLocation(address: IUserLocationProps): void;
}

interface IProps {
  children: React.ReactNode;
}

const UserLocationContext = createContext<IUserLocationContextProps>(
  {} as IUserLocationContextProps,
);

const UserLocationProvider: React.FC<IProps> = ({ children }) => {
  const [userLocation, setUserLocation] = useState<IUserLocationProps>();

  return (
    <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
      {children}
    </UserLocationContext.Provider>
  );
};

function useUserLocation(): IUserLocationContextProps {
  const context = useContext(UserLocationContext);

  if (!context) {
    throw new Error('useUserLocation');
  }

  return context;
}

export { UserLocationProvider, useUserLocation };
