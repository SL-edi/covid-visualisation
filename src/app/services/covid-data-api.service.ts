import { Injectable, Inject, InjectionToken } from '@angular/core';
import { CovidDataPoint } from '../models/CovidDataPoint';

import { Subject } from 'rxjs';

export interface CovidDataApiSubService {
  call(successCallback: (x: any) => void, errorCallback: (x?: any) => void): void;
}

export const COVID_DATA_API_SUB_SERVICE_SUMMARY = new InjectionToken<
  CovidDataApiSubService
>('CovidDataApiSubService');

export const COVID_DATA_API_SUB_SERVICE_HISTORICAL = new InjectionToken<
  CovidDataApiSubService
>('CovidDataApiSubService');

@Injectable({
  providedIn: 'root',
})
export class CovidDataApiService {
  summaryDataObserver: Subject<CovidDataPoint[]> = new Subject<CovidDataPoint[]>();
  constructor(
    // Inspired by (https://stackoverflow.com/a/35916788)
    // Each api service must have its own provider registered in app.module for the InjectionToken
    @Inject(COVID_DATA_API_SUB_SERVICE_SUMMARY)
    private apiServices: CovidDataApiSubService[]
  ) {
    this.getCovidSummaryData();
  }

  /**
   * Calls all api services and returns the first non-error response
   * If all lead to errors, prints an error message to the console
   */
  private getCovidSummaryData(): void {
    const callFunction = this.apiServices.reduceRight<(e?: any) => void>(
      (fallback: () => void, api: CovidDataApiSubService) => () => api.call(
        result => this.summaryDataObserver.next(result),
        fallback
      ),
      () => console.error('All api sub-services responded with errors')
    );
    callFunction();
  }

  private callFunction() {
    
  }
}
