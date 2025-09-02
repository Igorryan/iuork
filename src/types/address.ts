export interface IAddress {
  latitude: number;
  longitude: number;
  street: string;
  number: number;
  district: string;
  city: string;
  state: string;
  postalcode: string;
  distanceInMeters: number | null;
}
EOF
# Re-export for @api/mock/address alias
mkdir -p src/api/mock
cat > src/api/mock/address.ts <<\"EOF\"
export type { IAddress } from "../../types/address";
EOF
# Type-check
npx tsc --noEmit | cat
# Align Expo-managed deps again now that peer conflicts are resolved
npx expo install --fix | cat
