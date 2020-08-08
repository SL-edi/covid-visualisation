import { Component, OnInit, Inject, Input } from '@angular/core';
import { NewsService, ActualNewsService } from '../../services/news.service';
import { News } from '../../models/News';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  // Here we choose which news service is used
  providers: [{ provide: 'NewsService', useClass: ActualNewsService }]
})
export class NewsComponent implements OnInit {
  news: News[];

  constructor(@Inject('NewsService') newsService: NewsService) {
    newsService.getNews().subscribe(
      news => {
        this.news = news;
      });
  }

  ngOnInit(): void {
  }

}
