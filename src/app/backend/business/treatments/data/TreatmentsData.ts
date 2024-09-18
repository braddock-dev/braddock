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

export interface IBaseNewAppointmentInfo {
  treatments: ITreatment[];
  selectedTreatments: ITreatment[];
  selectedDaySlot?: IDaySlot;
  selectedTimeSlot?: ITimeSlot;
  phoneNumber: string;
  customerName: string;
}
