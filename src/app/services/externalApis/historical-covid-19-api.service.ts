import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CovidDataApiSubService } from '../covid-data-api.service';
import { RegionSelectService } from '../region-select.service';
import { DateSelectService } from '../date-select.service';
import { CountryHistoricalDataPoint, BASE_URL, toSlug } from './common-covid-19-api';
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
    const country = this.regionService.getRegion().name;
    const { from, to } = this.dateService.getDateRange();
    const url = `${this.baseUrl}country/${toSlug(country)}?from=${this.date2ApiFormat(from)}&to=${this.date2ApiFormat(to)}`

    this.http.get<CountryHistoricalDataPoint[]>(url)
      .subscribe(
        successCallback,
        errorCallback
    )
  }

  private date2ApiFormat(date: Date) {
    return `${date.toISOString().slice(0, -2)}Z`;
  }
}
