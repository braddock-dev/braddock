import Logger from "@/app/utils/Logger";
import { ITreatment } from "@/app/backend/business/treatments/data/TreatmentsData";
import TreatmentsService from "@/app/backend/services/TreatmentsService";
import TreatmentsDataAdapter from "@/app/backend/business/treatments/TreatmentsDataAdapter";

class TreatmentManager {
  private LOG_TAG = "TreatmentManager";

  constructor() {
    Logger.log(this.LOG_TAG, "Service initialized");
  }

  public async getTreatments(): Promise<ITreatment[]> {
    Logger.debug(this.LOG_TAG, "Start getting treatments");

    try {
      const treatmentsResponse = await TreatmentsService.getTreatments();

      Logger.debug(this.LOG_TAG, "Get treatments response", [
        treatmentsResponse,
      ]);

      const flatternedTreatments = treatmentsResponse
        .map((categories) => categories.treatments)
        .flat();

      const treatments =
        TreatmentsDataAdapter.convertDataToTreatments(flatternedTreatments);

      Logger.debug(this.LOG_TAG, "Get treatments response", [treatments]);

      return treatments;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error getting treatments", error);
      throw error;
    }
  }

  public async getTreatmentTimeslots(treatmentsId: string[]): Promise<any[]> {
    Logger.debug(this.LOG_TAG, "Start getting treatment timeslots", [
      treatmentsId,
    ]);

    try {
      if (!treatmentsId.length) {
        return [];
      }

      const timeslotsResponse =
        await TreatmentsService.getTreatmentTimeslots(treatmentsId);

      Logger.debug(this.LOG_TAG, "Get treatment timeslots response", [
        timeslotsResponse,
      ]);

      const timeslots =
        TreatmentsDataAdapter.convertDataToDaySlots(timeslotsResponse);

      Logger.debug(this.LOG_TAG, "Get treatment timeslots response", [
        timeslots,
      ]);

      return timeslots;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error getting treatment timeslots", error);
      throw error;
    }
  }
}

export default new TreatmentManager();
