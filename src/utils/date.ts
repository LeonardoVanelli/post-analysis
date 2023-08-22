function isWeekday(date: Date) {
  const dayOfWeek = date.getDay();
  return dayOfWeek >= 1 && dayOfWeek <= 5;
}

function isWorkingHours(date: Date) {
  const hour = date.getHours();

  return hour >= 8 && hour < 18;
}

export { isWeekday, isWorkingHours };
