import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';

import { CountriesTableComponent } from './components/countries-table/countries-table.component';
import { NewsComponent } from './components/news/news.component';
import { RegionSelectComponent } from './components/region-select/region-select.component';
import { WorldMapComponent } from './components/world-map/world-map.component';

import { OpenStreetMapProvider } from './services/map-provider.service';

import { COVID_DATA_API_SUB_SERVICE } from './services/covid-data-api.service';
import { Covid19ApiService } from './services/externalApis/covid-19-api.service';
import { NEWS_SERVICE, SmartableAiNewsService } from './services/news.service';

@NgModule({
  declarations: [AppComponent, CountriesTableComponent, NewsComponent, RegionSelectComponent, WorldMapComponent],
  imports: [BrowserModule,
    AgGridModule.withComponents([]),
    FormsModule,
    HttpClientModule],
  providers: [
    { provide: 'MapProvider', useClass: OpenStreetMapProvider },
    {
      provide: COVID_DATA_API_SUB_SERVICE,
      useClass: Covid19ApiService,
      multi: true,
    },
    { provide: NEWS_SERVICE, useClass: SmartableAiNewsService }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
