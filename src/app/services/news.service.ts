import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { News } from '../models/News';

export interface NewsService {
  getNews(): Observable<News[]>;
  getRegionSwitcher(): Subject<string>;
  changeRegion(region: string): void;
}

@Injectable({
  providedIn: 'root'
})
export class DummyNewsService implements NewsService {
  getRegionSwitcher(): Subject<string> {
    return new Subject<string>();
  }
  changeRegion(region: string): void {}
  getNews(): Observable<News[]>  {
    return from([[
      {
        url: 'http://www.google.com',
        title: 'COVID kills',
        description: 'Dumb ppl still not wearing masks.'
      },
      {
        url: 'http://www.bridgebase.com/v3',
        title: 'Moron dies after injecting himself with bleach',
        description: 'Trump claims injecting bleach as a COVID treatment is "very, very bad"'
      }
    ]]);
  }
}

@Injectable({
  providedIn: 'root'
})
export class ActualNewsService implements NewsService {
  url = 'https://api.smartable.ai/coronavirus/news/';
  subscriptionKey = '955eacf9525e45dd8d46a07b7daa649e';
  region = 'global';
  regionSwitcher: Subject<string>;

  constructor(private httpClient: HttpClient) {
    this.regionSwitcher = new Subject<string>();
    this.regionSwitcher.next(this.region);
  }

  getNews(): Observable<News[]> {
    return this.httpClient
      .get(
        this.url + this.region,
        {
          headers: { 'Subscription-Key': this.subscriptionKey }
        })
      .pipe(map((response: {news: any}) =>
        response.news.map(
          ({ title, excerpt, webUrl }: { title: string, excerpt: string, webUrl: string }) => ({
          title,
          url: webUrl,
          description: excerpt
        }))
      ));
  }

  changeRegion(region: string): void {
    this.region = region;
    this.regionSwitcher.next(region);
  }

  getRegionSwitcher(): Subject<string> {
    return this.regionSwitcher;
  }
}
