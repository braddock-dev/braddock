export interface INewAppointmentRequest {
  treatmentsId: string[];
  timeSlotId: number;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
}
