export declare global {
  namespace ReactNavigation {
    interface RootParamsList {
      Home: undefined;
      Address: undefined;
      ConfirmAddress: undefined;
      ProfessionalProfile: undefined;
      Chat: {
        professionalId: string;
        professionalName: string;
        professionalImage: string;
        serviceId: string;
        serviceName: string;
      };
    }
  }
}
