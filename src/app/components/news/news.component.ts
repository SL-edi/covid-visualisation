import { Component, OnInit, Inject } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { News } from '../../models/News';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  news: News[];
  region: string;
  subscription: any;

  constructor(@Inject('NewsService') private newsService: NewsService) {}

  ngOnInit(): void {
    this.subscription = this.newsService.getNews().subscribe(
      news => {
        this.news = news;
      });
    this.newsService.getRegionSwitcher().subscribe(region =>
    {
      this.subscription.unsubscribe();
      this.subscription = this.newsService.getNews().subscribe(
      news => {
        this.news = news;
      });
    });
  }

}
