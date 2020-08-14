import { Injectable, Inject, InjectionToken } from '@angular/core';
import { CovidDataPoint } from '../models/CovidDataPoint';

import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Country {
  // TODO: Move this somewhere where it makes more sense (maybe the country picker component)
  id: number;
  name: string;
  iso2: string;
  iso3: string;
  continent: string;
  lat: string;
  long: string;
}

export interface CovidDataApiSubService {
  getLatestGlobalData(): Observable<CovidDataPoint>;
  getLatestCountryData(country: Country): Observable<CovidDataPoint>;
}

export const COVID_DATA_API_SUB_SERVICE = new InjectionToken<
  CovidDataApiSubService
>('CovidDataApiSubService');

@Injectable({
  providedIn: 'root',
})
export class CovidDataApiService {
  constructor(
    // Inspired by (https://stackoverflow.com/a/35916788)
    // Each api service must have its own provider registered in app.module for the InjectionToken
    @Inject(COVID_DATA_API_SUB_SERVICE)
    private apiService: CovidDataApiSubService[]
  ) {}

  getLatestGlobalData(): Observable<CovidDataPoint> {
    // TODO: logic of when one service fails
    return this.apiService[0].getLatestGlobalData().pipe(
      catchError((err) => {
        this.handleError(err);
        return EMPTY;
      })
    );
  }

  getLatestCountryData(country: Country): Observable<CovidDataPoint> {
    // TODO: logic of when one service fails
    return this.apiService[0].getLatestCountryData(country).pipe(
      catchError((err) => {
        this.handleError(err);
        return EMPTY;
      })
    );
  }

  handleError(err: Error): void {
    // TODO: replace with something better when we have a error handler/logger implemented
    console.log(err);
  }
}

export const missingCountryError = (country: Country) =>
  new Error(
    `No matching country code found in response for code: ${country.iso2}, country ${country.name}`
  );
