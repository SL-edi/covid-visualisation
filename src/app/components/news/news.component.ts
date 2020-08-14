import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { News } from '../../models/News';
import { NEWS_SERVICE } from 'src/app/injection-tokens';

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
