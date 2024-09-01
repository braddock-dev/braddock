export interface IService {
  id: number | string;
  name: string;
  duration: number;
  price: number;
}

export interface ITimeSlot {
  id: number | string;
  time: Date;
}

export interface IDateSlot {
  id: number | string;
  date: Date;
  timeSlots: ITimeSlot[];
}

export interface IAppointmentInfo {
  services: IService[];
  dateSlots: IDateSlot[];
}
