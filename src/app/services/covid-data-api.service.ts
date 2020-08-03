import { Injectable, Inject, InjectionToken } from '@angular/core';
import { CovidDataPoint } from '../models/CovidDataPoint';
import { Country } from '../models/Country';

import { Observable, race, NEVER, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
    private apiServices: CovidDataApiSubService[]
  ) {}

  /**
   * Calls all api services and returns the first non-error response
   * If all lead to errors, returns an empty observable
   *
   * @param {Observable<CovidDataPoint>} method The method to be called
   */
  private getResultFromOneApiFor(
    country?: Country
  ): Observable<CovidDataPoint> {
    let errorCount = 0; // keep track of number or errored out requests for later

    return race( // only need result from one of the apis
      this.apiServices.map<Observable<CovidDataPoint>>((api, i, apis) =>
        new GetLatestDataCommand(api, country).call().pipe(
          catchError((err) => {
            errorCount += 1;
            this.handleError(err);
            return (errorCount === apis.length)
            ? throwError(noGoodApiResponseError())
            // If all other subservices errored out, return an error observable to end the race
            : NEVER; // Use NEVER so that an erroring out request doesn't end the race
          })
        )
      )
    )
  }

  getLatestGlobalData(): Observable<CovidDataPoint> {
    return this.getResultFromOneApiFor();
  }

  getLatestCountryData(country: Country): Observable<CovidDataPoint> {
    return this.getResultFromOneApiFor(country);
  }

  handleError(err: Error): void {
    // TODO: replace with something better when we have a error handler/logger implemented
    console.log(err);
  }
}

interface ApiFetchCommand {
  call(): Observable<CovidDataPoint>;
}

class GetLatestDataCommand implements ApiFetchCommand {
  constructor(private api: CovidDataApiSubService, private country?: Country) {}

  call(): Observable<CovidDataPoint> {
    return this.country
      ? this.api.getLatestCountryData(this.country)
      : this.api.getLatestGlobalData();
  }
}

export const missingCountryError = (country: Country) =>
  new Error(
    `No matching country code found in response for code: ${country.iso2}, country ${country.name}`
  );

export const noGoodApiResponseError = () =>
  new Error(`All Api sub-services responded with errors`);