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

  constructor(@Inject('NewsService') private newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService.getNewsObserver().subscribe(news => { this.news = news; });
  }

}
