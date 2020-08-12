import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegionSelectService {
  private region = 'global';
  private subscription: Subject<string>;

  constructor() {
    this.subscription = new Subject<string>();
  }

  setRegion(region: string): void {
    this.region = region;
    this.subscription.next(region);
  }

  getRegionObserver(): Subject<string> {
    return this.subscription;
  }

  getRegion(): string {
    return this.region;
  }

}
