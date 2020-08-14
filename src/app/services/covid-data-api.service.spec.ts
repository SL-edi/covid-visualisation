import { TestBed } from '@angular/core/testing';

import { CovidDataApiService, Country } from './covid-data-api.service';
import { Covid19ApiService } from './externalApis/covid-19-api.service';
import { of } from 'rxjs';

import { CovidDataPoint } from '../models/CovidDataPoint';

describe('CovidDataApiService', () => {
  let service: CovidDataApiService;
  let dependancyServiceSpy: jasmine.SpyObj<Covid19ApiService>;

  const latestGlobalDataResponse = 'getLatestGlobalData';
  const latestCountryDataResponse = 'getLatestCountryData';
  const stubCountry: Country = {
    id: 0,
    name: "Stub",
    iso2: "ST",
    iso3: "STB",
    continent: "Stub",
    lat: "000",
    long: "000"
  }

  beforeEach(() => {
    // create a spy for the inner service functions
    const spy = jasmine.createSpyObj('Covid19ApiService', [
      'getLatestGlobalData',
      'getLatestCountryData',
    ]);

    // provide and inject spy/mock instead of dependency 
    TestBed.configureTestingModule({
      providers: [
        Covid19ApiService,
        { provide: Covid19ApiService, useValue: spy },
      ],
    });

    service = TestBed.inject(CovidDataApiService);
    dependancyServiceSpy = TestBed.inject(Covid19ApiService) as jasmine.SpyObj<
      Covid19ApiService
    >;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getLatestGlobalData and return stubbed data', () => {
    // set up return value
    dependancyServiceSpy.getLatestGlobalData.and.returnValue(
      of((latestGlobalDataResponse as unknown) as CovidDataPoint)
    );

    service.getLatestGlobalData().subscribe((data) => {
      expect((data as unknown) as string).toBe(
        latestGlobalDataResponse,
        `Returned the stub response. Expected ${latestGlobalDataResponse}, returned ${data}`
      );
    });

    expect(dependancyServiceSpy.getLatestGlobalData.calls.count()).toBe(
      1,
      'Dependency method was only called once'
    );
  });

  it('should call getLatestCountryData and return stubbed data', () => {
    // set up return value. This also specifies the argument that can be used
    dependancyServiceSpy.getLatestCountryData
      .withArgs(stubCountry)
      .and.returnValue(
        of((latestCountryDataResponse as unknown) as CovidDataPoint)
      );

    service.getLatestCountryData(stubCountry).subscribe((data) => {
      expect((data as unknown) as string).toBe(
        latestCountryDataResponse,
        `Returned the stub response. Expected ${latestCountryDataResponse}, returned ${data}`
      );
    });

    expect(dependancyServiceSpy.getLatestCountryData.calls.count()).toBe(
      1,
      'Dependency method was only called once'
    );
  });
});
