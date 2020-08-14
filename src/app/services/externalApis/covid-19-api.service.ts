import { Injectable } from '@angular/core';
import { CovidDataApiSubService } from '../covid-data-api.service';
import { HttpClient } from '@angular/common/http';
import { Country } from 'iso-3166-1/dist/iso-3166';
import { CovidDataPoint } from '../../models/CovidDataPoint';
import { Observable, EMPTY } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { SummaryResponse } from '../../models/externalApis/covid19Api';

export const missingCountryError = (country: Country) => new Error(`No matching country code found in response for code: ${country.alpha2}, country ${country.country}`);

@Injectable({
  providedIn: 'root'
})
export class Covid19ApiService implements CovidDataApiSubService {
  readonly baseUrl = 'https://api.covid19api.com/';

  constructor(private http: HttpClient) { }

  getLatestGlobalData(): Observable<CovidDataPoint> {
    return this.http.get<SummaryResponse>(`${this.baseUrl}summary`)
      .pipe(
        map<SummaryResponse, CovidDataPoint>(summary => {
          return new CovidDataPoint(
            "Global",
            new Date(summary.Date),
            summary.Global.TotalConfirmed,
            summary.Global.TotalDeaths,
            summary.Global.TotalRecovered
          )
        }),
        catchError(err => {
          this.handleError(err);
          return EMPTY;
        })
      )
  }

  getLatestCountryData(country: Country): Observable<CovidDataPoint> {
    return this.http.get<SummaryResponse>(`${this.baseUrl}summary`)
      .pipe(
        map<SummaryResponse, CovidDataPoint>(summary => {
          const countryData = summary.Countries.find(cData => cData.CountryCode === country.alpha2)

          if (countryData === undefined) throw missingCountryError(country);
          
          return new CovidDataPoint(
            country.alpha2,
            new Date(summary.Date),
            countryData.TotalConfirmed,
            countryData.TotalDeaths,
            countryData.TotalRecovered
          )
        }),
        catchError(err => {
          this.handleError(err);
          return EMPTY;
        })
      )
  }

  handleError(err: Error): void {
    // TODO: replace with something better when we have a error handler/logger implemented
    console.log(err);
  }
}
