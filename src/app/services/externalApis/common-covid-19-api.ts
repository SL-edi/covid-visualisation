import { Moment } from 'moment';

export interface GlobalSummaryDataPoint {
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
}

export interface CountrySummaryDataPoint extends GlobalSummaryDataPoint {
  Country: string;
  CountryCode: string;
  Slug: string;
  Date: string;
}

export interface CountryHistoricalDataPoint {
  Country: string;
  CountryCode: string;
  Province: string;
  City: string;
  CityCode: string;
  Lat: string;
  Lon: string;
  Confirmed: number;
  Deaths: number;
  Recovered: number;
  Active: number;
  Date: string;
}

export const date2ApiFormat = (date: Moment) => `${date.toISOString().slice(0, -2)}Z`;

export const BASE_URL = 'https://api.covid19api.com/';