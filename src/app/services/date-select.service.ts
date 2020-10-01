import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateSelectService {

  private dateRangeSelected: DateRange;
  private subscription: Subject<DateRange>;

  constructor() {
    // TODO - Update once date selector component is created
    const yesterdaysDate = new Date(Date.now());
    yesterdaysDate.setUTCDate(yesterdaysDate.getDate() - 1)
    const twoDaysBeforeDate = new Date(yesterdaysDate);
    twoDaysBeforeDate.setUTCDate(yesterdaysDate.getDate() - 3);

    this.dateRangeSelected = {
      to: yesterdaysDate,
      from: twoDaysBeforeDate
    }
    
    this.subscription = new Subject<DateRange>();
  }

  setDateRange(from: Date, to: Date): void {
    if (this.validateDates(from, to)) {
      this.dateRangeSelected = { from, to };
      this.subscription.next(this.dateRangeSelected);
    }
  }

  private validateDates(from: Date, to: Date) {
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
  from: Date;
  to: Date;
}
