import { TestBed } from '@angular/core/testing';

import {
  CovidDataApiService,
  Country,
  COVID_DATA_API_SUB_SERVICE,
  CovidDataApiSubService,
  missingCountryError,
} from './covid-data-api.service';
import { of, EMPTY } from 'rxjs';

import { CovidDataPoint } from '../models/CovidDataPoint';
import { map } from 'rxjs/operators';

describe('CovidDataApiService', () => {
  let service: CovidDataApiService;
  let dependancyServiceSpies: jasmine.SpyObj<CovidDataApiSubService>[];

  const latestGlobalDataResponse = 'getLatestGlobalData';
  const latestCountryDataResponse = 'getLatestCountryData';
  const stubCountry: Country = {
    id: 0,
    name: 'Stub',
    iso2: 'ST',
    iso3: 'STB',
    continent: 'Stub',
    lat: '000',
    long: '000',
  };

  beforeEach(() => {
    const createSubServiceSpy = (
      i = 1
    ): jasmine.SpyObj<CovidDataApiSubService> =>
      jasmine.createSpyObj(`CovidApiSubService${i}`, [
        'getLatestGlobalData',
        'getLatestCountryData',
      ]);

    // create spies for the inner service functions
    const spy1 = createSubServiceSpy(1);
    const spy2 = createSubServiceSpy(2);

    // provide and inject spy/mock instead of dependency
    TestBed.configureTestingModule({
      providers: [
        { provide: COVID_DATA_API_SUB_SERVICE, useValue: spy1, multi: true },
        { provide: COVID_DATA_API_SUB_SERVICE, useValue: spy2, multi: true },
      ],
    });

    service = TestBed.inject(CovidDataApiService);

    // Whenever we inject 'COVID_DATA_API_SUB_SERVICE' tokens,
    // we expect multiple services to be injected
    dependancyServiceSpies = TestBed.inject<CovidDataApiSubService[]>(
      COVID_DATA_API_SUB_SERVICE
    ) as jasmine.SpyObj<CovidDataApiSubService>[];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getLatestGlobalData and return stubbed data', () => {
    // set up return value
    dependancyServiceSpies[0].getLatestGlobalData.and.returnValue(
      of((latestGlobalDataResponse as unknown) as CovidDataPoint)
    );

    service.getLatestGlobalData().subscribe((data) => {
      expect((data as unknown) as string).toBe(
        latestGlobalDataResponse,
        `Returned the stub response. Expected ${latestGlobalDataResponse}, returned ${data}`
      );
    });

    expect(dependancyServiceSpies[0].getLatestGlobalData.calls.count()).toBe(
      1,
      'Dependency method was only called once'
    );
  });

  it('should call getLatestCountryData and return stubbed data', () => {
    // set up return value. This also specifies the argument that can be used
    dependancyServiceSpies[0].getLatestCountryData
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

    expect(dependancyServiceSpies[0].getLatestCountryData.calls.count()).toBe(
      1,
      'Dependency method was only called once'
    );
  });

  it('Calls handleError() with the country error if country is not found in response', () => {
    const handleErrorSpy = spyOn(service, 'handleError').and.callThrough();

    dependancyServiceSpies[0].getLatestCountryData
      .withArgs(stubCountry)
      .and.callFake(
        // Sets the behaviour of what happens when calling getLatestCountryData
        (country) =>
          of(EMPTY).pipe(
            map(() => {
              throw missingCountryError(country);
            })
          )
      );

    service.getLatestCountryData(stubCountry).subscribe();

    expect(service.handleError).toHaveBeenCalledTimes(1);
    expect(handleErrorSpy.calls.mostRecent().args[0].message).toBe(
      missingCountryError(stubCountry).message
    );
  });

  // TODO: add tests for when services fail
});
