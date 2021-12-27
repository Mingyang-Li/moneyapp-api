export const getMissingDate = (start: Date, end: Date): string[] => {
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
  return [...new Set(dates)]; // need dates to be absolutely unique
};
