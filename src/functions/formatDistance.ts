type props = {
  meters: number;
};

export function formatDistance({ meters }: props) {
  return meters > 999 ? `${(meters / 1000).toFixed(1)} km` : `${meters}m`;
}
