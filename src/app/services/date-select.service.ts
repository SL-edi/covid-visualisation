import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Moment } from 'moment';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateSelectService {

  private dateRangeSelected: DateRange;
  private subscription: Subject<DateRange>;
  readonly minDate = moment().year(2020).dayOfYear(1);
  readonly maxDate = moment();
  private prevRange: DateRange;

  constructor() {
    // TODO - Update once date selector component is created
    const yesterdaysDate = moment().subtract(1, 'd');
    const threeDaysBeforeTodayDate = moment().subtract(3, 'd');

    this.dateRangeSelected = {
      to: yesterdaysDate,
      from: threeDaysBeforeTodayDate
    }
    this.prevRange = this.dateRangeSelected;
    
    this.subscription = new Subject<DateRange>();
  }

  setDateRange(from: Moment, to: Moment): void {
    if (this.validateDates(from, to)) {
      this.dateRangeSelected = { from, to };
    } 
    this.subscription.next(this.dateRangeSelected);
  }

  private validateDates(from: Moment, to: Moment) {
    // Checks that dates are not null or undefined,
    // and from < to
    const output = !!from && from < to;
    const withinMinMax = from.isAfter(this.minDate) && to.isBefore(this.maxDate);
    return output && withinMinMax;
  }

  getDateRangeObservable(): Subject<DateRange> {
    return this.subscription;
  }

  getDateRange(): DateRange {
    return this.dateRangeSelected;
  }
}

export interface DateRange {
  from: Moment;
  to: Moment;
}
