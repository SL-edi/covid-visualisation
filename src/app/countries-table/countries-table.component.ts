import { Component, OnInit } from '@angular/core';
// import {CountriesDataService} from '../countries-data.service';

@Component({
  selector: 'app-countries-table',
  templateUrl: './countries-table.component.html',
  styleUrls: ['./countries-table.component.scss']
})
export class CountriesTableComponent implements OnInit {

  // constructor(private countriesService: CountriesDataService) { }
  constructor() { }

  ngOnInit(): void {
    // this.countriesService.getData().subscribe((data) => {
    //   console.log(data)
    // });
  }

  columnDefs = [
    {headerName: 'Make', field: 'make' },
    {headerName: 'Model', field: 'model' },
    {headerName: 'Cost', field: 'price'}
];

rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 }
];

}
