import { Injectable } from '@angular/core';
import {
  CovidDataApiSubService,
} from '../covid-data-api.service';
import { HttpClient } from '@angular/common/http';
import { CovidDataPoint } from '../../models/CovidDataPoint';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Covid19ApiService implements CovidDataApiSubService {
  readonly baseUrl = 'https://api.covid19api.com/';

  constructor(private http: HttpClient) {}

  call(
    successCallback: (message: any) => void,
    errorCallback: (error?: any) => void
  ): void {
    this.http.get<SummaryResponse>(`${this.baseUrl}summary`).pipe(
      map((response: { Countries: CountryDataPoint[] }) =>
        response.Countries.map(countryData =>
          new CovidDataPoint(
            countryData.CountryCode,
            new Date(),
            countryData.TotalConfirmed,
            countryData.TotalDeaths,
            countryData.TotalRecovered
          )
        )
      )
    ).subscribe(
      successCallback,
      errorCallback
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
