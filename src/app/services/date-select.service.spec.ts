import { TestBed } from '@angular/core/testing';

import { DateSelectService } from './date-select.service';

describe('DateSelectServiceService', () => {
  let service: DateSelectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateSelectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
