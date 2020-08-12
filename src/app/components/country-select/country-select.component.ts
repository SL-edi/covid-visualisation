import { Component, OnInit } from '@angular/core';
import { RegionSelectService } from 'src/app/services/region-select.service';

@Component({
  selector: 'app-country-select',
  templateUrl: './country-select.component.html',
  styleUrls: ['./country-select.component.scss']
})
export class CountrySelectComponent implements OnInit {
  countries = ['global', 'GB'];
  selectedCountry: string = this.countries[0];

  constructor(private regionService: RegionSelectService) { }

  onChange(value: string): void {
    this.regionService.setRegion(value);
  }

  ngOnInit(): void {
  }

}
