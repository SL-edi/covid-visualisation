export interface Region {
  name: string;
  code: string;
  latitude: number;
  longitude: number;
}

export const regions: Region[] = [
  {
    name: 'The world',
    code: 'global',
    latitude: 0.0,
    longitude: 0.0
  },
  {
    name: 'United Kingdom',
    code: 'GB',
    latitude: 54.0,
    longitude: 2.0
  }
];
