import { Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { News } from '../models/News';
import { RegionSelectService } from './region-select.service';
import { Region } from '../models/Region';

export interface NewsService {
  getNewsObservable(): Subject<News[]>;
}

export const NEWS_SERVICE = new InjectionToken<NewsService>('NewsService');

interface SmartableAiResponse { title: string; excerpt: string; webUrl: string; }

@Injectable({
  providedIn: 'root'
})
export class SmartableAiNewsService implements NewsService {
  private url = 'https://coronavirus-smartable.p.rapidapi.com/news/v1/';
  // Removed until we decide what to do with smartable api subscription
  private headers = {};
  private newsObserver: Subject<News[]>;

  constructor(private httpClient: HttpClient, private regionService: RegionSelectService) {
    this.newsObserver = new Subject<News[]>();
    
    // TODO - uncomment out these line once we decide what to do with smartable api sub
    // this.getSubscription(regionService.getRegion());
    // regionService.getRegionObservable().subscribe(
    //   region => {
    //     this.getSubscription(region);
    //   }
    // );
  }

  getNewsObservable(): Subject<News[]> {
    return this.newsObserver;
  }

  private getSubscription(region: Region): void {
    this.httpClient
      .get(
        this.url + region.code + '/',
        {
          headers: this.headers
        })
      .pipe(map((response: { news: SmartableAiResponse[] }) =>
        response.news.map(
          ({ title, excerpt, webUrl }: SmartableAiResponse) => ({
            title,
            url: webUrl,
            description: excerpt
          }))
      ))
      .subscribe(
        news => { this.newsObserver.next(news); },
        error => {
          this.newsObserver.next([]); // No news displayed if request fails
          console.error(error);
        }
      );
  }
}
