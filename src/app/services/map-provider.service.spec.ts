import { TestBed } from '@angular/core/testing';

import { OpenStreetMapProvider } from './map-provider.service';

describe('MapProviderService', () => {
  let service: OpenStreetMapProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenStreetMapProvider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
