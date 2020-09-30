import { AfterViewInit, Component, Inject } from '@angular/core';
import { circle, map, Map, tileLayer } from 'leaflet';
import { MapProvider, MAP_PROVIDER } from 'src/app/services/map-provider.service';
import { CovidDataApiService } from 'src/app/services/covid-data-api.service';
import { byCountryCode } from 'country-finder';

import { MapLocation } from '../../models/MapLocation';
import { CovidDataPoint } from 'src/app/models/CovidDataPoint';

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
      const { lat, long, name } = byCountryCode(location);

      const infected = confirmed - dead - recovered;

      // Draws 3 circles for each data point - recovered, dead, infected
      // Each AREA is proportional to the number of cases
      const recoveredRadius = SCALE_FACTOR * Math.sqrt(recovered);
      const deadRadius = SCALE_FACTOR * Math.sqrt(dead);
      const infectedRadius = SCALE_FACTOR * Math.sqrt(infected);

      const tooltipText = `<h3>${name}</h3>
        <p class="tooltip-infected"> infected: ${infected}
        <p class="tooltip-dead"> dead: ${dead}
        <p class="tooltip-recovered"> recovered: ${recovered}`;

      circle([lat, long], { radius: recoveredRadius, className: 'recovered-circle' })
        .bindTooltip(tooltipText)
        .addTo(this.map);
      circle([lat, long], { radius: deadRadius, className: 'dead-circle' }).addTo(this.map)
        .bindTooltip(tooltipText)
        .addTo(this.map);
      circle([lat, long], { radius: infectedRadius, className: 'infected-circle' }).addTo(this.map)
        .bindTooltip(tooltipText)
        .addTo(this.map);
    });
  }
}
