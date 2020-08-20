import { Injectable, Inject, InjectionToken } from '@angular/core';
import { CovidDataPoint } from '../models/CovidDataPoint';
import { Country } from '../models/Country';

import { Observable, EMPTY, of, race, NEVER, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

interface CovidDataApiServiceInterface {
  getLatestGlobalData(): Observable<CovidDataPoint>;
  getLatestCountryData(country: Country): Observable<CovidDataPoint>;
}

export interface CovidDataApiSubService extends CovidDataApiServiceInterface {}

export const COVID_DATA_API_SUB_SERVICE = new InjectionToken<
  CovidDataApiSubService
>('CovidDataApiSubService');

@Injectable({
  providedIn: 'root',
})
export class CovidDataApiService implements CovidDataApiServiceInterface {
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
   * e.g. to call the 'foo' method of each subservice with args 1, 2, 3 call as
   * `this.getResultFromOneApiFor(this.foo, 1, 2, 3)`
   *
   * Only works if this method and each subservice implement the same interface/functions
   *
   * @param {Observable<T>} method The method to be called
   */
  private getResultFromOneApiFor<T>(
    method: (...args: any[]) => Observable<T>, // reference to a method with the same name being called
    ...args: any[]
  ): Observable<T> {
    // if the method is not a class method of this class throw an error
    if (
      !Object.getOwnPropertyNames(CovidDataApiService.prototype).includes(
        method.name
      )
    ) {
      throw new Error(
        `Method: ${method.name}() not found in Object: ${this.constructor.name}`
      );
    }
    let errorCount = 0; // keep track of number or errored out requests for later
    return race<T>( // only need result from one of the apis
      this.apiServices.map<Observable<T>>((s, i, arr) => 
        // call the wanted method from each api
        s[method.name](...args).pipe( 
          catchError((err) => {
            errorCount += 1;
            this.handleError(err);
            return (errorCount === arr.length) 
            ? throwError(noGoodApiResponseError(method.name)) 
            // If all other subservices errored out, return an error observable to end the race
            : NEVER; // Use NEVER so that an erroring out request doesn't end the race
          })
        )
      )
    )
  }

  getLatestGlobalData(): Observable<CovidDataPoint> {
    return this.getResultFromOneApiFor(this.getLatestGlobalData);
  }

  getLatestCountryData(country: Country): Observable<CovidDataPoint> {
    return this.getResultFromOneApiFor(this.getLatestCountryData, country);
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

export const noGoodApiResponseError = (methodNameCalled: string) => 
    new Error(
      `All Api sub-services responded with errors for call: ${methodNameCalled}`
    )