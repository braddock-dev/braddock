export interface ITreatment {
  id: string;
  businessId: string;
  name: string;
  durationInMinutes: number;
  type: string;
  createdAt: number;
}

export interface ITimeSlot {
  timeInMillis: number;
  time: string;
}

export interface IDaySlot {
  dayInMillis: number;
  day: string;
  timeslots: ITimeSlot[];
}

export interface ITreatmentFormData {
  name: string;
  duration: number;
  price?: number;
}

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}
