import { Injectable, Inject } from '@angular/core';
import { Covid19ApiService } from './externalApis/covid-19-api.service';
import { CovidDataPoint } from '../models/CovidDataPoint';

import { Observable } from 'rxjs';

export interface Country {
  // TODO: Move this somewhere where it makes more sense (maybe the country picker component)
  id: number,
  name: string,
  iso2: string,
  iso3: string,
  continent: string,
  lat: string,
  long: string
}

export interface CovidDataApiSubService {
  getLatestGlobalData(): Observable<CovidDataPoint>;
  getLatestCountryData(country: Country): Observable<CovidDataPoint>;
}

@Injectable({
  providedIn: 'root',
})
export class CovidDataApiService {
  constructor(
    // TODO - Come up with a more scalable solution for subservice injection:
    // Ideally here, instead of injecting each api subservice,
    // we could inject a list of subservices as CovidDataApiSubService[]
    // then use those to figure out the best one. However its not as simple
    // as it sounds to inject a list of services that implement an interface.
    // This (https://stackoverflow.com/a/35916788) SO answer highlights one
    // way of doing it, however we'd need to register providers for each
    // subservice in the @NgModule decorator. IMO that is not very elegant.
    //
    // tldr: figure out a way to automatically inject all services that
    // implement the CovidDataApiSubService interface. Or do something similar
    @Inject(Covid19ApiService) private apiService: CovidDataApiSubService
  ) {}

  getLatestGlobalData(): Observable<CovidDataPoint> {
    return this.apiService.getLatestGlobalData();
  }

  getLatestCountryData(country: Country): Observable<CovidDataPoint> {
    return this.apiService.getLatestCountryData(country);
  }
}
