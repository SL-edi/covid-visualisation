import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { regions, Region } from '../models/Region';

@Injectable({
  providedIn: 'root'
})
export class RegionSelectService {
  regions = regions;
  selectedRegion: Region = this.regions[0];
  private subscription: Subject<Region>;

  constructor() {
    this.subscription = new Subject<Region>();
  }

  setRegion(region: Region): void {
    this.selectedRegion = region;
    this.subscription.next(region);
  }

  getRegionObservable(): Subject<Region> {
    return this.subscription;
  }

  getRegion(): Region {
    return this.selectedRegion;
  }

}
