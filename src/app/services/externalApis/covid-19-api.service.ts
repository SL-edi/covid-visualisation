import { Injectable } from '@angular/core';
import {
  CovidDataApiSubService,
  missingCountryError,
} from '../covid-data-api.service';
import { HttpClient } from '@angular/common/http';
import { CovidDataPoint } from '../../models/CovidDataPoint';
import { Country } from '../../models/Country';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Covid19ApiService implements CovidDataApiSubService {
  readonly baseUrl = 'https://api.covid19api.com/';

  constructor(private http: HttpClient) {}

  getLatestGlobalData(): Observable<CovidDataPoint> {
    return this.http.get<SummaryResponse>(`${this.baseUrl}summary`).pipe(
      map<SummaryResponse, CovidDataPoint>((summary) => {
        return new CovidDataPoint(
          'Global',
          new Date(summary.Date),
          summary.Global.TotalConfirmed,
          summary.Global.TotalDeaths,
          summary.Global.TotalRecovered
        );
      })
    );
  }

  getLatestCountryData(country: Country): Observable<CovidDataPoint> {
    return this.http.get<SummaryResponse>(`${this.baseUrl}summary`).pipe(
      map<SummaryResponse, CovidDataPoint>((summary) => {
        const countryData = summary.Countries.find(
          (cData) => cData.CountryCode === country.iso2
        );

        if (countryData === undefined) throw missingCountryError(country);

        return new CovidDataPoint(
          country.iso2,
          new Date(summary.Date),
          countryData.TotalConfirmed,
          countryData.TotalDeaths,
          countryData.TotalRecovered
        );
      })
    );
  }
}

interface GlobalDataPoint {
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
}

interface CountryDataPoint extends GlobalDataPoint {
  Country: string;
  CountryCode: string;
  Slug: string;
  Date: string;
}

export interface SummaryResponse {
  Global: GlobalDataPoint;
  Countries: CountryDataPoint[];
  Date: string;
}
