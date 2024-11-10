import Logger from "@/app/utils/Logger";
import { NewTimeOffRequest } from "@/app/backend/services/data/TimeOffDaos";
import TimeOffService from "@/app/backend/services/TimeOffService";

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
}

export default new TimeOffManager();
