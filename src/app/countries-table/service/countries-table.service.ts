import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { ICountry, IGlobalData, Country} from './model';
import { Observable } from 'rxjs';

const URL: string = 'https://api.covid19api.com/summary';

@Injectable({
  providedIn: 'root'
})
export class CountriesTableService {
  constructor(private httpClient: HttpClient) { }

  public getCountryData() : Observable<Country[]> {
    return this.httpClient.get(URL).pipe(
      // tap(data => console.log(data)),
      map((data: IGlobalData): Country[] => {
        return data.Countries.map(
          (iCountry: ICountry) =>
            new Country(
              iCountry.Country,
              iCountry.NewConfirmed,
              iCountry.NewDeaths,
              iCountry.NewRecovered,
              iCountry.TotalConfirmed,
              iCountry.TotalDeaths,
              iCountry.TotalRecovered
            )
        );
      })
      );
  }
}