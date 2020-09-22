import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { WorldMapComponent } from './components/world-map/world-map.component';

import { OpenStreetMapProvider } from './services/map-provider.service';

import { COVID_DATA_API_SUB_SERVICE } from './services/covid-data-api.service';
import { Covid19ApiService } from './services/externalApis/covid-19-api.service';

@NgModule({
  declarations: [AppComponent, WorldMapComponent],
  imports: [BrowserModule, HttpClientModule],
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
