import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { NEWS_SERVICE, NewsService } from '../../services/news.service';
import { News } from '../../models/News';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit, OnDestroy {
  news: News[];

  constructor(@Inject(NEWS_SERVICE) private newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService.getNewsObservable().subscribe(news => { this.news = news; });
  }

  ngOnDestroy(): void {
    this.newsService.getNewsObservable().unsubscribe();
  }

}
