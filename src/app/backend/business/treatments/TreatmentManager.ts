import Logger from "@/app/utils/Logger";
import {
  ITreatment,
  ITreatmentFormData,
  SortOrder,
} from "@/app/backend/business/treatments/data/TreatmentsData";
import TreatmentsService from "@/app/backend/services/TreatmentsService";
import TreatmentsDataAdapter from "@/app/backend/business/treatments/TreatmentsDataAdapter";

class TreatmentManager {
  private LOG_TAG = "TreatmentManager";

  constructor() {
    Logger.log(this.LOG_TAG, "Service initialized");
  }

  public async getTreatments(dir: SortOrder): Promise<ITreatment[]> {
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

      if (dir === SortOrder.DESC) {
        return treatments.reverse();
      }

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

  public async createTreatment(treatment: ITreatmentFormData): Promise<void> {
    Logger.debug(this.LOG_TAG, "Start creating treatment", [treatment]);

    try {
      const treatmentRequestData =
        TreatmentsDataAdapter.convertTreatmentToRequest(treatment);

      const createdTreatment =
        await TreatmentsService.createTreatment(treatmentRequestData);

      Logger.debug(this.LOG_TAG, "Create treatment response", [
        createdTreatment,
      ]);

      return;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error creating treatment", error);
      throw error;
    }
  }
}

export default new TreatmentManager();
