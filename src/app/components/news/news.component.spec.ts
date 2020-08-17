import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsComponent } from './news.component';
import { SmartableAiNewsService, NEWS_SERVICE, NewsService } from '../../services/news.service';
import { Subject } from 'rxjs';
import { News } from 'src/app/models/News';

class MockNewsService implements NewsService {
  getNewsObservable(): Subject<News[]> {
    return new Subject<News[]>();
  }
}

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;
  let newsService: NewsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewsComponent],
      providers: [{ provide: NEWS_SERVICE, useClass: MockNewsService }]
    })
    .compileComponents();
    fixture = TestBed.createComponent(NewsComponent);
    newsService = fixture.debugElement.injector.get(NEWS_SERVICE);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
