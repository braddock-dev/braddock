export interface IWorkingHours {
  openingHour: number;
  closingHour: number;
  yearDaysOff: number[];
  weekDaysOff: number[];
  dayHoursOff: number[];
  email: string;
  timezone: string;
}

export interface ITimeOff {
  id: number;
  startTimeInMillis: number;
  endTimeInMillis: number;
}
