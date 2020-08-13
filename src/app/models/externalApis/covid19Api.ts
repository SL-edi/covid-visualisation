export interface GlobalDataPoint {
  NewConfirmed: number,
  TotalConfirmed: number,
  NewDeaths: number,
  TotalDeaths: number,
  NewRecovered: number,
  TotalRecovered: number
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