import { AfterViewInit, Component, Input } from '@angular/core';
import * as L from 'leaflet';
import { TemplateDefinitionBuilder } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.scss'],
})
export class WorldMapComponent implements AfterViewInit {
  private map: L.Map | L.LayerGroup<any>;
  @Input() latitude: number;
  @Input() longitude: number;

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [this.latitude, this.longitude],
      zoom: 3,
    });
    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tiles.addTo(this.map);
  }
}
