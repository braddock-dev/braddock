import { ITreatment } from "@/app/backend/business/treatments/data/TreatmentsData";

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
}

export default new TreatmentsDataAdapter();
