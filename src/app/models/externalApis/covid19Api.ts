export interface GlobalDataPoint {
  NewConfirmed: Number,
  TotalConfirmed: Number,
  NewDeaths: Number,
  TotalDeaths: Number,
  NewRecovered: Number,
  TotalRecovered: Number
}

export interface CountryDataPoint extends GlobalDataPoint {
  Country: string,
  CountryCode: string,
  Slug: string,
  Date: string
}

export interface SummaryResponse {
  Global: GlobalDataPoint,
  Countries: CountryDataPoint[],
  Date: string
}