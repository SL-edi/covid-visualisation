import { AfterViewInit, Component, Inject } from '@angular/core';
import { circle, map, Map, tileLayer } from 'leaflet';
import { MapProvider, MAP_PROVIDER } from 'src/app/services/map-provider.service';
import { CovidDataApiService } from 'src/app/services/covid-data-api.service';
import { byCountryCode } from 'country-finder';

import { MapLocation } from '../../models/MapLocation';
import { CovidDataPoint } from 'src/app/models/CovidDataPoint';

const INFECTED_COLOUR = 'red';
const DEAD_COLOUR = 'black';
const RECOVERED_COLOUR = 'green';
const SCALE_FACTOR = 500; // Size of markers in m*(people)^(-1/2)

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
    @Inject(MAP_PROVIDER) private mapProvider: MapProvider,
    private apiService: CovidDataApiService
  ) {}

  ngAfterViewInit(): void {
    this.initMap();
    this.apiService.summaryDataObserver.subscribe((data) => {
      this.map.remove(); // Clear map before applying the update
      this.initMap();
      this.addData(data);
    });
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

  private addData(data: CovidDataPoint[]): void {
    data.forEach(({ location, confirmed, dead, recovered }: CovidDataPoint) => {
      const { lat, long } = byCountryCode(location);

      // Draws 3 circles for each data point - recovered, dead, infected
      // Each AREA is proportional to the number of cases
      const recoveredRadius = SCALE_FACTOR * Math.sqrt(recovered);
      const deadRadius = SCALE_FACTOR * Math.sqrt(dead);
      const infectedRadius = SCALE_FACTOR * Math.sqrt(confirmed - dead - recovered);

      circle([lat, long], { radius: recoveredRadius, color: RECOVERED_COLOUR }).addTo(this.map);
      circle([lat, long], { radius: deadRadius, color: DEAD_COLOUR }).addTo(this.map);
      circle([lat, long], { radius: infectedRadius, color: INFECTED_COLOUR }).addTo(this.map);
    });
  }
}
