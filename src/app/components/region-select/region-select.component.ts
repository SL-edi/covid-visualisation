import { Component, OnInit } from '@angular/core';
import { RegionSelectService } from '../../services/region-select.service';
import { Region } from 'src/app/models/Region';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-region-select',
  templateUrl: './region-select.component.html',
  styleUrls: ['./region-select.component.scss']
})
export class RegionSelectComponent implements OnInit {
  regions: Region[];
  selectedRegion: Region;

  constructor(private regionService: RegionSelectService) {
    this.regions = regionService.regions;
    this.selectedRegion = regionService.getRegion();

    regionService.getRegionObservable().subscribe(region => this.selectedRegion = region);
  }

  selectionChange(event: MatSelectChange): void {
    this.regionService.setRegion(event.value);
  }
  
  ngOnInit(): void {
  }
}
