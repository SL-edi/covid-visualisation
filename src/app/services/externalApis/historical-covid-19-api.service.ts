import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CovidDataApiSubService } from '../covid-data-api.service';
import { GlobalDataPoint, CountryDataPoint, BASE_URL } from './common-covid-19-api';

@Injectable({
  providedIn: 'root'
})
export class HistoricalCovid19ApiService implements CovidDataApiSubService {
  readonly baseUrl = BASE_URL;

  constructor(private http: HttpClient) {}

  call(successCallback: (x: any) => void, errorCallback: (x?: any) => void): void {
    throw new Error('Method not implemented.');
  }
}
