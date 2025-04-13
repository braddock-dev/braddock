export interface NewTimeOffRequest {
  startTimeInMillis: number;
  endTimeInMillis: number;
  reason?: string;
  operatorId: string;
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

export interface ITimeOffResponse {
  id: number;
  startTimeInMillis: number;
  endTimeInMillis: number;
  businessId: string;
  createdAt: number;
  operatorId: string;
}
