import { TestBed } from '@angular/core/testing';

import { CountriesTableService } from './countries-table.service';

describe('CountriesTableService', () => {
  let service: CountriesTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountriesTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
