import { Component, OnInit } from '@angular/core';
import { CountriesTableService } from './service/countries-table.service';
import { Country } from './service/model';

@Component({
  selector: 'app-countries-table',
  templateUrl: './countries-table.component.html',
  styleUrls: ['./countries-table.component.scss']
})
export class CountriesTableComponent implements OnInit {
  rowData: Country[];

  constructor(private countriesService: CountriesTableService) { }

  ngOnInit(): void {
    this.countriesService.getCountryData().subscribe((data) => {
      this.rowData = data;
      console.log(this.rowData);
    });
  }
  defaultColDef = {
    sortable: true,
    sortingOrder: ['desc', 'asc']
  }

  columnDefs = [
    {headerName: 'Name', field: 'name', sortingOrder: ['asc', 'desc']},
    {headerName: 'New Cases', field: 'newConfirmed', sort: 'desc'},
    {headerName: 'New Deaths', field: 'newDeaths'},
    {headerName: 'New Recovered', field: 'newRecovered'},
    {headerName: 'Total Cases', field: 'totalConfirmed'},
    {headerName: 'Total Deaths', field: 'totalDeaths'},
    {headerName: 'Total Recovered', field: 'totalRecovered'},
  ];

// rowData = [
//     { make: 'Toyota', model: 'Celica', price: 35000 },
//     { make: 'Ford', model: 'Mondeo', price: 32000 },
//     { make: 'Porsche', model: 'Boxter', price: 72000 }
// ];

}
