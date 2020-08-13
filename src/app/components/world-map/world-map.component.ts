import { AfterViewInit, Component, Inject } from '@angular/core';
import { map, Map, tileLayer } from 'leaflet';
import { MapProvider } from 'src/app/services/map-provider.service';

import { MapLocation } from '../../models/MapLocation';

@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.scss'],
})
export class WorldMapComponent implements AfterViewInit {
  private map: Map;
  private location: MapLocation = {
    latitude: 0.0,
    longitude: 0.0,
    zoom: 1
  };
  maxZoom = 19;
  private mapSelector = 'map';

  constructor(
    @Inject('MapProvider') private mapProvider: MapProvider
  ) {}

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = map(this.mapSelector, {
      center: [this.location.latitude, this.location.longitude],
      zoom: this.location.zoom,
    });
    const tiles = tileLayer(
      this.mapProvider.url,
      {
        maxZoom: this.maxZoom,
        attribution: this.mapProvider.copyright
      }
    );

    tiles.addTo(this.map);
  }
}
