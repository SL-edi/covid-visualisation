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
  countries = ['global', 'GB'];  

  constructor(@Inject('NewsService') private newsService: NewsService) {}

  ngOnInit(): void {
    this.getNews(this.countries[0]);
  }

  onCountryChange(country: string) {
    this.getNews(country);
  }

  getNews(region: string): void {
    this.newsService.getNews(region).subscribe(
      news => {
        this.news = news;
      });
  }

}
