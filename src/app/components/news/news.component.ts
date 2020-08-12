import { Component, OnInit, Inject } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { News } from '../../models/News';
import { RegionSelectService } from 'src/app/services/region-select.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  news: News[];
  region: string;
  subscription: any;

  constructor(@Inject('NewsService') private newsService: NewsService, private regionService: RegionSelectService) {}

  ngOnInit(): void {
    this.subscription = this.newsService.getNews(this.regionService.getRegion()).subscribe(
      news => {
        this.news = news;
      });
    this.regionService.getSubscription().subscribe(region =>
    {
      this.subscription.unsubscribe();
      this.subscription = this.newsService.getNews(region).subscribe(
      news => {
        this.news = news;
      });
    });
  }

}
