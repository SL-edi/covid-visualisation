import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { WorldMapComponent } from './components/world-map/world-map.component';

import { OpenStreetMapProvider } from './services/map-provider.service';

@NgModule({
  declarations: [
    AppComponent,
    WorldMapComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [{provide: 'MapProvider', useClass: OpenStreetMapProvider}],
  bootstrap: [AppComponent]
})
export class AppModule { }
