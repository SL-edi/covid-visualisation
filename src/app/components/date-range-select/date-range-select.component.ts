import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { DateSelectService } from 'src/app/services/date-select.service';

@Component({
  selector: 'app-date-range-select',
  templateUrl: './date-range-select.component.html',
  styleUrls: ['./date-range-select.component.scss']
})
export class DateRangeSelectComponent implements OnInit {
  startDateCtrl = new FormControl(moment());
  endDateCtrl = new FormControl(moment());
  minDate: Moment;
  maxDate: Moment;
  isOpen = false;

  constructor(private _adapter: DateAdapter<Moment>,private dateSelectService: DateSelectService) {
    this._adapter.setLocale(navigator.language)
    const { from, to } = dateSelectService.getDateRange();
    this.minDate = dateSelectService.minDate;
    this.maxDate = dateSelectService.maxDate;
    this.startDateCtrl.setValue(from);
    this.endDateCtrl.setValue(to);

    // Ensures multiple date pickers are synced through the service
    dateSelectService.getDateRangeObservable().subscribe(dateRange => {
      this.startDateCtrl.setValue(dateRange.from);
      this.endDateCtrl.setValue(dateRange.to);
    })
   }

  ngOnInit(): void {
  }

  opened() {
    this.isOpen = true;
  }

  closed() {
    this.isOpen = false;
  }

  startDateChanged() {
    if (!this.isOpen && this.startDateCtrl.value != null) { 
      // need the isOpen tag or this would fire off a second event 
      // when the date picker closes on selecting the end date
      this.setNewRange();
    }
  }

  endDateChanged() {
    if (this.endDateCtrl.value != null) {
      this.setNewRange();
    }
  }

  setNewRange() {
    this.dateSelectService.setDateRange(this.startDateCtrl.value, this.endDateCtrl.value);
  }
}
