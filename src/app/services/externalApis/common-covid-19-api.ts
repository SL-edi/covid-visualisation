export interface GlobalDataPoint {
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
}

export interface CountryDataPoint extends GlobalDataPoint {
  Country: string;
  CountryCode: string;
  Slug: string;
  Date: string;
}

export const BASE_URL = 'https://api.covid19api.com/';