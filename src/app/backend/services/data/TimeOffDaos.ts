export interface NewTimeOffRequest {
  startTimeInMillis: number;
  endTimeInMillis: number;
  reason?: string;
}

export interface IWorkingHoursResponse {
  openingHour: number;
  closingHour: number;
  yearDaysOff: string;
  weekDaysOff: string;
  dayHoursOff: string;
  email: string;
  timezone: string;
}
