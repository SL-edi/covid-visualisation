import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';

import { CountriesTableComponent } from './components/countries-table/countries-table.component';
import { WorldMapComponent } from './components/world-map/world-map.component';

import { OpenStreetMapProvider } from './services/map-provider.service';

import { COVID_DATA_API_SUB_SERVICE } from './services/covid-data-api.service';
import { Covid19ApiService } from './services/externalApis/covid-19-api.service';

@NgModule({
  declarations: [AppComponent, CountriesTableComponent, WorldMapComponent],
  imports: [BrowserModule,
    AgGridModule.withComponents([]),
    HttpClientModule],
  providers: [
    { provide: 'MapProvider', useClass: OpenStreetMapProvider },
    {
      provide: COVID_DATA_API_SUB_SERVICE,
      useClass: Covid19ApiService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
