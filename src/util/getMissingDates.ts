export const getMissingDate = (start: Date, end: Date): string[] => {
  const dates = [];
  let currentDate = start;
  const addDays = function (days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };
  while (currentDate <= end) {
    dates.push(currentDate);
    currentDate = addDays.call(currentDate, 1);
  }
  return dates.map((d) => d.toISOString());
};
