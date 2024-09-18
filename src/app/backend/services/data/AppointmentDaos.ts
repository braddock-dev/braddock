export interface INewAppointmentRequest {
  treatmentId: string;
  timeSlotId: number;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
}
