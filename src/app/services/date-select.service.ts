import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateSelectService {

  private dateRangeSelected: DateRange;
  private subscription: Subject<DateRange>;

  constructor() {
    // TODO - Update once date selector component is created
    const yesterdaysDate = moment().subtract(1, 'd');
    const threeDaysBeforeTodayDate = moment().subtract(3, 'd');

    this.dateRangeSelected = {
      to: yesterdaysDate,
      from: threeDaysBeforeTodayDate
    }
    
    this.subscription = new Subject<DateRange>();
  }

  setDateRange(from: moment.Moment, to: moment.Moment): void {
    if (this.validateDates(from, to)) {
      this.dateRangeSelected = { from, to };
      this.subscription.next(this.dateRangeSelected);
    }
  }

  private validateDates(from: moment.Moment, to: moment.Moment) {
    // Checks that dates are not null or undefined,
    // and from < to
    return !!from && from < to;
  }

  getDateRangeObservable(): Subject<DateRange> {
    return this.subscription;
  }

  getDateRange(): DateRange {
    return this.dateRangeSelected;
  }
}

export interface DateRange {
  from: moment.Moment;
  to: moment.Moment;
}
