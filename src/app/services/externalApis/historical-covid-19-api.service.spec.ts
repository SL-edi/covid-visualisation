import { TestBed } from '@angular/core/testing';

import { HistoricalCovid19ApiService } from './historical-covid-19-api.service';

describe('HistoricalCovid19ApiService', () => {
  let service: HistoricalCovid19ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoricalCovid19ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
