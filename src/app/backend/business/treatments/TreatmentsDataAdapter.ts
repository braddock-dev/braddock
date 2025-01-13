import {
  IDaySlot,
  ITimeSlot,
  ITreatment,
  ITreatmentFormData,
} from "@/app/backend/business/treatments/data/TreatmentsData";
import { ITreatmentRequest } from "@/app/backend/services/data/TreatmentsDaos";

class TreatmentsDataAdapter {
  public convertDataToTreatment(data: any): ITreatment {
    return {
      id: data.id,
      createdAt: data.createdAt,
      businessId: data.businessId,
      durationInMinutes: data.durationInMinutes,
      name: data.name,
      type: data.type,
      price: data.cost,
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

  public convertTreatmentToRequest(
    treatment: ITreatmentFormData,
  ): ITreatmentRequest {
    return {
      name: treatment.name,
      durationInMinutes: treatment.duration,
      type: "Treatments",
      cost: treatment.price ? Number(treatment.price) : 0,
    };
  }
}

export default new TreatmentsDataAdapter();
