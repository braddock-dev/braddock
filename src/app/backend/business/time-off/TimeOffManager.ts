import Logger from "@/app/utils/Logger";
import { NewTimeOffRequest } from "@/app/backend/services/data/TimeOffDaos";
import TimeOffService from "@/app/backend/services/TimeOffService";
import {
  ITimeOff,
  IWorkingHours,
} from "@/app/backend/business/time-off/TimeOffDtos";
import TimeOffDataAdapter from "@/app/backend/business/time-off/TimeOffDataAdapter";

class TimeOffManager {
  private readonly LOG_TAG = "TimeOffManager";

  public constructor() {
    Logger.log(this.LOG_TAG, "Service initialized");
  }

  public async registerTimeOff(data: NewTimeOffRequest) {
    Logger.debug(this.LOG_TAG, "Start setting time off", [data]);

    try {
      await TimeOffService.registerTimeOff(data);
      Logger.debug(this.LOG_TAG, "Setting time off response", [data]);
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error setting time off", error);
      throw error;
    }
  }

  public async getWorkingHours(): Promise<IWorkingHours> {
    Logger.debug(this.LOG_TAG, "Start getting working hours");

    try {
      const responseData = await TimeOffService.getWorkingHours();
      const workingHours =
        TimeOffDataAdapter.convertDataToWorkingHours(responseData);

      Logger.debug(this.LOG_TAG, "Get working hours response", [workingHours]);

      return workingHours;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error getting working hours", error);
      throw error;
    }
  }

  public async getTimeOffs(): Promise<ITimeOff[]> {
    Logger.debug(this.LOG_TAG, "Start getting time offs");

    try {
      const responseData = await TimeOffService.getTimeOffs();
      const timeOffs =
        TimeOffDataAdapter.convertDataToTimeOffsList(responseData);

      Logger.debug(this.LOG_TAG, "Time off converted...", [timeOffs]);

      return timeOffs;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error getting time offs", error);
      throw error;
    }
  }

  public async deleteTimeOff(timeOffId: number) {
    Logger.debug(this.LOG_TAG, "Start deleting time off", [timeOffId]);

    try {
      await TimeOffService.deleteTimeOff(timeOffId);
      Logger.debug(this.LOG_TAG, "Time off deleted...", [timeOffId]);

      return;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error deleting time off", error);
      throw error;
    }
  }
}

export default new TimeOffManager();
