import { TestBed } from '@angular/core/testing';

import { RegionSelectService } from './region-select.service';

describe('RegionSelectService', () => {
  let service: RegionSelectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegionSelectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
