import { Injectable } from '@angular/core';
import {
  CovidDataApiSubService,
} from '../covid-data-api.service';
import { HttpClient } from '@angular/common/http';
import { CovidDataPoint } from '../../models/CovidDataPoint';
import { GlobalDataPoint, CountryDataPoint, BASE_URL } from './common-covid-19-api';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SummaryCovid19ApiService implements CovidDataApiSubService {
  readonly baseUrl = BASE_URL;

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

export interface SummaryResponse {
  Global: GlobalDataPoint;
  Countries: CountryDataPoint[];
  Date: string;
}
