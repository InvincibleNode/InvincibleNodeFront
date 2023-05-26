export const secondsToMonths = (seconds) => {
  const secondsInMonth = 2592000; // average number of seconds in a month
  const months = Math.floor(seconds / secondsInMonth);
  const days = Math.floor((seconds % secondsInMonth) / 86400); // average number of seconds in a day

  return `${months} months and ${days} days`;
};
