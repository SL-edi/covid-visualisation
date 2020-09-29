import { Injectable, Inject, InjectionToken } from '@angular/core';
import { CovidDataPoint } from '../models/CovidDataPoint';

import { Subject } from 'rxjs';
import { CountryHistoricalDataPoint } from './externalApis/common-covid-19-api';
import { RegionSelectService } from './region-select.service';

export interface CovidDataApiSubService {
  call(
    successCallback: (x: any) => void,
    errorCallback: (x?: any) => void
  ): void;
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
  summaryDataObserver: Subject<CovidDataPoint[]> = new Subject<
    CovidDataPoint[]
  >();
  historicalDataObserver: Subject<CountryHistoricalDataPoint[]> = new Subject<
    CountryHistoricalDataPoint[]
  >();

  constructor(
    // Inspired by (https://stackoverflow.com/a/35916788)
    // Each api service must have its own provider registered in app.module for the InjectionToken
    @Inject(COVID_DATA_API_SUB_SERVICE_SUMMARY)
    private summaryApiServices: CovidDataApiSubService[],
    @Inject(COVID_DATA_API_SUB_SERVICE_HISTORICAL)
    private historicalApiServices: CovidDataApiSubService[],
    private regionService: RegionSelectService
  ) {
    this.getCovidSummaryData();
    regionService.getRegionObservable().subscribe(() => this.getCovidHistoricalData())
  }

  /**
   * Calls all api services and returns the first non-error response
   * If all lead to errors, prints an error message to the console
   */
  private getCovidSummaryData(): void {
    this.callApis(this.summaryApiServices, this.summaryDataObserver);
  }

  private getCovidHistoricalData(): void {
    this.callApis(this.historicalApiServices, this.historicalDataObserver);
  }

  private callApis = (
    apiServices: CovidDataApiSubService[],
    subject: Subject<any>
  ) => {
    const callFunction = apiServices.reduceRight<(e?: any) => void>(
      (fallback: () => void, api: CovidDataApiSubService) => 
          () => api.call(
            (result) => subject.next(result), 
            fallback
          ),
          () => console.error('All api sub-services responded with errors')
    );
    callFunction();
  };
}
