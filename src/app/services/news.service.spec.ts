import { TestBed } from '@angular/core/testing';

import { NewsService, SmartableAiNewsService } from './news.service';

describe('NewsService', () => {
  let service: NewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmartableAiNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
