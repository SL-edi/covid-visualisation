import { Injectable } from '@angular/core';

export interface MapProvider {
  url: string;
  copyright: string;
}

@Injectable({
  providedIn: 'root'
})
export class OpenStreetMapProvider implements MapProvider {
  url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  copyright = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
}
