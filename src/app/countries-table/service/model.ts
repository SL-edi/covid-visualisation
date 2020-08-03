export interface IGlobalData {
  Countries: ICountry[],
  Date: string,
  Global: ICovidStats
}

export interface ICountry extends ICovidStats {
  Country: string,
  CountryCode: string,
  Date: string,
  Premium: any,
  Slug: string,
}

export interface ICovidStats {
  NewConfirmed: number,
  NewDeaths: number,
  NewRecovered: number,
  TotalConfirmed: number,
  TotalDeaths: number,
  TotalRecovered: number
}