import { Component, OnInit, Inject } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-country-select',
  templateUrl: './country-select.component.html',
  styleUrls: ['./country-select.component.scss']
})
export class CountrySelectComponent implements OnInit {
  countries = ['global', 'GB'];
  selectedCountry: string = this.countries[0];

  constructor(@Inject('NewsService') private newsService: NewsService) { }

  onChange(value: string): void {
    this.newsService.changeRegion(value);
  }

  ngOnInit(): void {
  }

}
