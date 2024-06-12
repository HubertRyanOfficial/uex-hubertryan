export type Location = {
  lat: number;
  long: number;
};

export interface MapsContextHandles {
  handleMapPosition: (location: Location | null) => void;
}
