import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RegionSelectService } from '../../services/region-select.service';
import { Region } from 'src/app/models/Region';

@Component({
  selector: 'app-region-select',
  templateUrl: './region-select.component.html',
  styleUrls: ['./region-select.component.scss']
})
export class RegionSelectComponent implements OnInit {
  regions: Region[];
  selectedRegion: Region;
  regionControl = new FormControl();

  constructor(private regionService: RegionSelectService) {
    this.regions = regionService.regions;
    this.selectedRegion = regionService.selectedRegion;
  }

  onChange(value: Region): void {
    this.regionService.setRegion(value);
  }

  ngOnInit(): void {
  }

}
