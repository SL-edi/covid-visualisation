import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-country-select',
  templateUrl: './country-select.component.html',
  styleUrls: ['./country-select.component.scss']
})
export class CountrySelectComponent implements OnInit {
  @Input() countries : string[];
  @Output() selectedCountry = new EventEmitter<string>();

  constructor() { }

  onChange(value: string): void {
    console.log(`Country Select Component: ${value}`);
    this.selectedCountry.emit(value);
  }

  ngOnInit(): void { }

}
