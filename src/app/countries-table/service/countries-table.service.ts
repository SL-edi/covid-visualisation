import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, map, tap } from 'rxjs/operators';
import {ICountry, IGlobalData} from './model';
import { Observable } from 'rxjs';

const URL: string = 'https://api.covid19api.com/summary';

@Injectable({
  providedIn: 'root'
})
export class CountriesTableService {
  constructor(private httpClient: HttpClient) { }

  public getCountryData() : Observable<ICountry[]> {
    return this.httpClient.get(URL).pipe(
      // tap(data => console.log(data)),
      map((data: IGlobalData): ICountry[] => {
        return data.Countries;
      })
      );
  }
}