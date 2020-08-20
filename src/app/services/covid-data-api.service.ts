import { Injectable, Inject, InjectionToken } from '@angular/core';
import { CovidDataPoint } from '../models/CovidDataPoint';
import { Country } from '../models/Country';

import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
   * Cycles through each api service, calling the method provided, till one returns a value
   * If all lead to errors, returns an empty observable
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
    return this.apiServices.reduce<Observable<T>>((result, service) => {
      return result !== EMPTY
        ? result // result has already been found, skip
        : service[method.name](...args) // call the method on the subservice, with the args
            .pipe(
              catchError((err) => {
                this.handleError(err);
                return EMPTY;
              })
            );
    }, EMPTY);
  }

  getLatestGlobalData(): Observable<CovidDataPoint> {
    // TODO: logic of when one service fails
    return this.getResultFromOneApiFor(this.getLatestGlobalData);
    // return this.apiServices.reduce<Observable<CovidDataPoint>>(
    //   (result, service) => {
    //     return result !== EMPTY
    //       ? result
    //       : service.getLatestGlobalData().pipe(
    //           catchError((err) => {
    //             this.handleError(err);
    //             return EMPTY;
    //           })
    //         );
    //   },
    //   EMPTY
    // );
    // return this.apiServices[0].getLatestGlobalData().pipe(
    //   catchError((err) => {
    //     this.handleError(err);
    //     return EMPTY;
    //   })
    // );
  }

  getLatestCountryData(country: Country): Observable<CovidDataPoint> {
    // TODO: logic of when one service fails
    return this.getResultFromOneApiFor(this.getLatestCountryData, country);
    // return this.apiServices[0].getLatestCountryData(country).pipe(
    //   catchError((err) => {
    //     this.handleError(err);
    //     return EMPTY;
    //   })
    // );
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
