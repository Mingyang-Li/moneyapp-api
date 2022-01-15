import { Injectable } from '@nestjs/common';

@Injectable()
export class SharedService {
  public getMissingDate = (start: Date, end: Date): string[] => {
    const dates = [];
    let currentDate = start;
    const addDays = function (days) {
      const date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };
    while (currentDate <= end) {
      let s = currentDate.toISOString();
      s = s.slice(0, 10) + 'T00:00:00.000Z';
      dates.push(s);
      currentDate = addDays.call(currentDate, 1);
    }
    // need dates to be absolutely unique &
    // remove first date (not supposed to be there as it's a day before start date)
    const arr = [...new Set(dates)];
    return arr.slice(1, arr.length);
  };

  public getNumberOfDaysBetween = (start: Date, end: Date): number => {
    const diff = end.getTime() - start.getTime();
    // return the absolute difference in dates plus 1 to include days on both ends
    const days = Math.abs(Math.ceil(diff / (1000 * 3600 * 24))) + 1;
    return days;
  };
}
