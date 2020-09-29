import { TestBed } from '@angular/core/testing';

import { SummaryCovid19ApiService, SummaryResponse } from './summary-covid-19-api.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Country } from '../../models/Country';
import { byCountryCode } from 'country-finder';



describe('Covid19ApiService', () => {
  let apiService: SummaryCovid19ApiService;
  let httpTestingController: HttpTestingController;

  const sampleSummaryResponse: SummaryResponse = {
    Global: {
      NewConfirmed: 100282,
      TotalConfirmed: 1162857,
      NewDeaths: 5658,
      TotalDeaths: 63263,
      NewRecovered: 15405,
      TotalRecovered: 230845,
    },
    Countries: [
      {
        Country: 'Malta',
        CountryCode: 'MT',
        Slug: 'malta',
        NewConfirmed: 11,
        TotalConfirmed: 213,
        NewDeaths: 0,
        TotalDeaths: 0,
        NewRecovered: 0,
        TotalRecovered: 2,
        Date: '2020-04-05T06:37:00Z',
      },
      {
        Country: 'United Kingdom',
        CountryCode: 'GB',
        Slug: 'united-kingdom',
        NewConfirmed: 3788,
        TotalConfirmed: 42477,
        NewDeaths: 709,
        TotalDeaths: 4320,
        NewRecovered: 7,
        TotalRecovered: 215,
        Date: '2020-04-05T06:37:00Z',
      },
      {
        Country: 'United States of America',
        CountryCode: 'US',
        Slug: 'united-states',
        NewConfirmed: 32129,
        TotalConfirmed: 275582,
        NewDeaths: 1161,
        TotalDeaths: 7087,
        NewRecovered: 0,
        TotalRecovered: 0,
        Date: '2020-04-05T06:37:00Z',
      },
    ],
    Date: '2020-04-05T06:37:00Z',
  };

  const unknownCountry: Country = {
    id: 0,
    name: "Atlantis",
    iso2: "Unmatchable",
    iso3: "Unmatchable",
    continent: "Unmatchable",
    lat: "181",
    long: "181"
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    apiService = TestBed.inject(SummaryCovid19ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(apiService).toBeTruthy();
  });

  describe('getLatestGlobalData()', () => {
    it('GET global data in the CovidDataPoint format', () => {
      apiService.getLatestGlobalData().subscribe((data) => {
        const expectedDate = new Date(sampleSummaryResponse.Date).toUTCString();
        expect(data.date).toBe(
          expectedDate,
          `Dates did not match. Expected ${expectedDate}, returned ${data.date}`
        );
        expect(data.location).toBe(
          'Global',
          `location should be "Global", returned ${data.location}`
        );
        expect(data.confirmed).toBe(
          sampleSummaryResponse.Global.TotalConfirmed,
          `Confirmed cases should be ${sampleSummaryResponse.Global.TotalConfirmed}, returned ${data.confirmed}`
        );
        expect(data.dead).toBe(
          sampleSummaryResponse.Global.TotalDeaths,
          `Deaths should be ${sampleSummaryResponse.Global.TotalDeaths}, returned ${data.dead}`
        );
        expect(data.recovered).toBe(
          sampleSummaryResponse.Global.TotalRecovered,
          `Recoveries should be ${sampleSummaryResponse.Global.TotalRecovered}, returned ${data.recovered}`
        );
      });

      // Expect only one request
      const req = httpTestingController.expectOne(
        `${apiService.baseUrl}summary`
      );

      // Expect the request to be a GET
      expect(req.request.method).toEqual('GET');

      // Reply with the data
      req.flush(sampleSummaryResponse);

      // Ensure there are no outstanding requests
      httpTestingController.verify();
    });

    // TODO: test for handling http errors
  });

  describe('getLatestCountryData(...)', () => {
    it('GET country data in the CovidDataPoint format', () => {
      const responseCountryIndex = 1;
      const countryData = sampleSummaryResponse.Countries[responseCountryIndex];
      const country = byCountryCode(countryData.CountryCode);

      apiService.getLatestCountryData(country).subscribe((data) => {
        const expectedDate = new Date(sampleSummaryResponse.Date).toUTCString();
        expect(data.date).toBe(
          expectedDate,
          `Dates did not match. Expected ${expectedDate}, returned ${data.date}`
        );
        expect(data.location).toBe(
          countryData.CountryCode,
          `location should be ${countryData.CountryCode}, returned ${data.location}`
        );
        expect(data.confirmed).toBe(
          countryData.TotalConfirmed,
          `Confirmed cases should be ${countryData.TotalConfirmed}, returned ${data.confirmed}`
        );
        expect(data.dead).toBe(
          countryData.TotalDeaths,
          `Deaths should be ${countryData.TotalDeaths}, returned ${data.dead}`
        );
        expect(data.recovered).toBe(
          countryData.TotalRecovered,
          `Recoveries should be ${countryData.TotalRecovered}, returned ${data.recovered}`
        );
      });

      // Expect only one request
      const req = httpTestingController.expectOne(
        `${apiService.baseUrl}summary`
      );

      // Expect the request to be a GET
      expect(req.request.method).toEqual('GET');

      // Reply with the data
      req.flush(sampleSummaryResponse);

      // Ensure there are no outstanding requests
      httpTestingController.verify();
    });

    // TODO: test for handling http errors
  });
});
