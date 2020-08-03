// interfaces to type API response
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

// class to decouple application logic from api response structure
export class Country {
  constructor(
    private _name: string,
    private _newConfirmed: number,
    private _newDeaths: number,
    private _newRecovered: number,
    private _totalConfirmed: number,
    private _totalDeaths: number,
    private _totalRecovered: number
  ) {}

  get name(): string { return this._name; }
  get newConfirmed(): number { return this._newConfirmed; }
  get newDeaths(): number { return this._newDeaths; }
  get newRecovered(): number { return this._newRecovered; }
  get totalConfirmed(): number { return this._totalConfirmed; }
  get totalDeaths(): number { return this._totalDeaths; }
  get totalRecovered(): number { return this._totalRecovered; }
}