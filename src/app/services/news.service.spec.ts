import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { NewsService, SmartableAiNewsService } from './news.service';

describe('NewsService', () => {
  let service: NewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule]});
    service = TestBed.inject(SmartableAiNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
