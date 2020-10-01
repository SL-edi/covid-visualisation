import { TestBed } from '@angular/core/testing';

import { ResponseCacheService } from './response-cache.service';

describe('ResponseCacheService', () => {
  let service: ResponseCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponseCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
