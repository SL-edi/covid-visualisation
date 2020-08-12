import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { News } from '../models/News';
import { RegionSelectService } from './region-select.service';

export interface NewsService {
  getNewsObserver(): Subject<News[]>;
}

@Injectable({
  providedIn: 'root'
})
export class SmartableAiNewsService implements NewsService {
  private url = 'https://api.smartable.ai/coronavirus/news/';
  private subscriptionKey = '955eacf9525e45dd8d46a07b7daa649e';
  private newsObserver: Subject<News[]>;
  private httpGetSubscription: Subscription;

  constructor(private httpClient: HttpClient, private regionService: RegionSelectService) {
    this.newsObserver = new Subject<News[]>();
    this.httpGetSubscription = this.getSubscription(regionService.getRegion());
    regionService.getRegionObserver().subscribe(
      region => {
        this.httpGetSubscription?.unsubscribe();
        this.httpGetSubscription = this.getSubscription(region);
      }
    );
  }

  getNewsObserver(): Subject<News[]> {
    return this.newsObserver;
  }

  private getSubscription(region: string): Subscription {
    return this.httpClient
      .get(
        this.url + region,
        {
          headers: { 'Subscription-Key': this.subscriptionKey }
        })
      .pipe(map((response: { news: any }) =>
        response.news.map(
          ({ title, excerpt, webUrl }: { title: string, excerpt: string, webUrl: string }) => ({
            title,
            url: webUrl,
            description: excerpt
          }))
      ))
      .subscribe(
        news => { this.newsObserver.next(news); }
      );
  }
}
