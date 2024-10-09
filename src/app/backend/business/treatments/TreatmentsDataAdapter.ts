import {
  IBaseNewAppointmentInfo,
  IDaySlot,
  ITimeSlot,
  ITreatment,
} from "@/app/backend/business/treatments/data/TreatmentsData";
import { INewAppointmentRequest } from "@/app/backend/services/data/AppointmentDaos";

class TreatmentsDataAdapter {
  public convertDataToTreatment(data: any): ITreatment {
    return {
      id: data.id,
      createdAt: data.createdAt,
      businessId: data.businessId,
      durationInMinutes: data.durationInMinutes,
      name: data.name,
      type: data.type,
    };
  }

  public convertDataToTreatments(data: any[]): ITreatment[] {
    return data.map(this.convertDataToTreatment.bind(this));
  }

  public convertDataToTimeSlot(data: any): ITimeSlot {
    return {
      time: data.time,
      timeInMillis: data.timeInMillis,
    };
  }

  public convertDataToTimeSlots(data: any[]): ITimeSlot[] {
    return data.map(this.convertDataToTimeSlot.bind(this));
  }

  public convertDataToDaySlot(data: any): IDaySlot {
    return {
      day: data.day,
      dayInMillis: data.dayInMillis,
      timeslots: this.convertDataToTimeSlots(data.timeslots),
    };
  }

  public convertDataToDaySlots(data: any[]): IDaySlot[] {
    return data.map(this.convertDataToDaySlot.bind(this));
  }

  public convertAppointmentDataToRequestData(
    newAppointment: IBaseNewAppointmentInfo,
  ): INewAppointmentRequest {
    if (!newAppointment.selectedTreatments.length) {
      throw new Error("No treatments selected");
    }

    if (!newAppointment.selectedTimeSlot?.timeInMillis) {
      throw new Error("No time slot selected");
    }

    const treatmentsId = newAppointment.selectedTreatments.map(
      (treatment) => treatment.id,
    );

    return {
      treatmentsId: treatmentsId,
      timeSlotId: newAppointment.selectedTimeSlot.timeInMillis,
      customerName: newAppointment.customerName,
      customerPhone: newAppointment.phoneNumber,
    };
  }
}

export default new TreatmentsDataAdapter();
