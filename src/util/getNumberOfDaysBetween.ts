export const getNumberOfDaysBetween = (start: Date, end: Date): number => {
  const diff = end.getTime() - start.getTime();
  // return the absolute difference in dates plus 1 to include days on both ends
  const days = Math.abs(Math.ceil(diff / (1000 * 3600 * 24))) + 1;
  return days;
};
