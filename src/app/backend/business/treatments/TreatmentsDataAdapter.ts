import {
  IDaySlot,
  ITimeSlot,
  ITreatment,
} from "@/app/backend/business/treatments/data/TreatmentsData";

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
}

export default new TreatmentsDataAdapter();
