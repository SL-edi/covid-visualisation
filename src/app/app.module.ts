import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { MatSelectModule } from '@angular/material/select';

import { CountriesTableComponent } from './components/countries-table/countries-table.component';
import { NewsComponent } from './components/news/news.component';
import { RegionSelectComponent } from './components/region-select/region-select.component';
import { WorldMapComponent } from './components/world-map/world-map.component';

import { MAP_PROVIDER, OpenStreetMapProvider } from './services/map-provider.service';

import { COVID_DATA_API_SUB_SERVICE_SUMMARY, COVID_DATA_API_SUB_SERVICE_HISTORICAL } from './services/covid-data-api.service';
import { SummaryCovid19ApiService } from './services/externalApis/summary-covid-19-api.service';
import { HistoricalCovid19ApiService } from './services/externalApis/historical-covid-19-api.service';
import { NEWS_SERVICE, SmartableAiNewsService } from './services/news.service';
import { DateRangeSelectComponent } from './components/date-range-select/date-range-select.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, CountriesTableComponent, NewsComponent, RegionSelectComponent, WorldMapComponent, DateRangeSelectComponent],
  imports: [
    BrowserModule,
    AgGridModule.withComponents([]),
    MatSelectModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: MAP_PROVIDER, useClass: OpenStreetMapProvider },
    {
      provide: COVID_DATA_API_SUB_SERVICE_SUMMARY,
      useClass: SummaryCovid19ApiService,
      multi: true,
    },
    {
      provide: COVID_DATA_API_SUB_SERVICE_HISTORICAL,
      useClass: HistoricalCovid19ApiService,
      multi: true,
    },
    { provide: NEWS_SERVICE, useClass: SmartableAiNewsService }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
