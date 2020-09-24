import { Component, OnInit } from '@angular/core';
import { CovidDataPoint } from 'src/app/models/CovidDataPoint';
import { CovidDataApiService } from 'src/app/services/covid-data-api.service';
import { byCountryCode } from 'country-finder';

@Component({
  selector: 'app-countries-table',
  templateUrl: './countries-table.component.html',
  styleUrls: ['./countries-table.component.scss']
})
export class CountriesTableComponent implements OnInit {
  rowData: TableColumns[];

  constructor(private apiService: CovidDataApiService) { }

  defaultColDef = {
    sortable: true,
  };

  columnDefs = [
    {headerName: 'Name', field: 'country'},
    {headerName: 'Total Cases', field: 'confirmed', sort: 'desc'},
    {headerName: 'Total Deaths', field: 'dead'},
    {headerName: 'Total Recovered', field: 'recovered'},
  ];

  ngOnInit(): void {
    this.apiService.summaryDataObserver.subscribe((data) => {
      this.rowData = data.map(covidDataToTableData);
    });
  }
}

interface TableColumns {
  country: string;
  confirmed: number;
  recovered: number;
  dead: number;
}

const covidDataToTableData = ({location, confirmed, dead, recovered}: CovidDataPoint) => ({
  country: byCountryCode(location).name,
  confirmed,
  dead,
  recovered
});
