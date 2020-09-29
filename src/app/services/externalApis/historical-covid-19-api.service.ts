import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CovidDataApiSubService } from '../covid-data-api.service';
import { RegionSelectService } from '../region-select.service';
import { DateSelectService } from '../date-select.service';
import { CountryHistoricalDataPoint, BASE_URL, date2ApiFormat } from './common-covid-19-api';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HistoricalCovid19ApiService implements CovidDataApiSubService {
  readonly baseUrl = BASE_URL;

  constructor(private http: HttpClient, private regionService: RegionSelectService, private dateService: DateSelectService) {}

  call(
    successCallback: (x: any) => void, 
    errorCallback: (x?: any) => void
  ): void {
    const countryCode = this.regionService.getRegion().code;
    const { from, to } = this.dateService.getDateRange();
    const url = `${this.baseUrl}country/${countryCode}?from=${date2ApiFormat(from)}&to=${date2ApiFormat(to)}`

    this.http.get<CountryHistoricalDataPoint[]>(url).pipe(
      // This ensures we use country data, not province/state/city data
      map((response) => response.filter(countryData => countryData.Province === "" && countryData.City === "")),
    ).subscribe(
      successCallback,
      errorCallback
    )
  }
}
