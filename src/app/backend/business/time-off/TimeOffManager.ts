import Logger from "@/app/utils/Logger";
import { NewTimeOffRequest } from "@/app/backend/services/data/TimeOffDaos";
import TimeOffService from "@/app/backend/services/TimeOffService";
import { ITimeOff, IWorkingHours } from "@/app/backend/business/time-off/TimeOffDtos";
import TimeOffDataAdapter from "@/app/backend/business/time-off/TimeOffDataAdapter";
import dayJsWrapper from "@/app/utils/dayjs";

class TimeOffManager {
  private readonly LOG_TAG = "TimeOffManager";
  private readonly TIME_OFF_START_HOUR = 7;
  private readonly TIME_OFF_END_HOUR = 20;

  public constructor() {
    Logger.log(this.LOG_TAG, "Service initialized");
  }

  public async registerTimeOff(data: NewTimeOffRequest) {
    Logger.debug(this.LOG_TAG, "Start setting time off", [data]);

    try {
      const timeOffs = this.separateTimeOffsByDay(data);
      Logger.debug(this.LOG_TAG, "Separated time offs", [timeOffs]);

      await Promise.all(timeOffs.map((timeOff) => TimeOffService.registerTimeOff(timeOff)));

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
      const workingHours = TimeOffDataAdapter.convertDataToWorkingHours(responseData);

      Logger.debug(this.LOG_TAG, "Get working hours response", [workingHours]);

      return workingHours;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error getting working hours", error);
      throw error;
    }
  }

  public async getTimeOffs(operatorId?: string): Promise<ITimeOff[]> {
    Logger.debug(this.LOG_TAG, "Start getting time offs");

    try {
      const responseData = await TimeOffService.getTimeOffs(operatorId);
      const timeOffs = TimeOffDataAdapter.convertDataToTimeOffsList(responseData);

      Logger.debug(this.LOG_TAG, "Time off converted...", [timeOffs]);

      if (operatorId) {
        return timeOffs.filter((timeOff) => timeOff.operatorId === operatorId);
      }

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

  private separateTimeOffsByDay(timeOffs: NewTimeOffRequest) {
    const isSameDay = dayJsWrapper(timeOffs.startTimeInMillis).isSame(timeOffs.endTimeInMillis, "day");

    if (isSameDay) {
      return [timeOffs];
    }

    const intervals: NewTimeOffRequest[] = [];

    const numberOfDays = dayJsWrapper(timeOffs.endTimeInMillis).diff(timeOffs.startTimeInMillis, "day");

    Logger.debug(this.LOG_TAG, "Number of days", [numberOfDays]);

    for (let day = 0; day <= numberOfDays; day++) {
      if (day === 0) {
        intervals.push({
          startTimeInMillis: timeOffs.startTimeInMillis,
          endTimeInMillis: dayJsWrapper(timeOffs.startTimeInMillis).set("hours", this.TIME_OFF_END_HOUR).valueOf(),
          operatorId: timeOffs.operatorId,
        });
        continue;
      }

      if (day === numberOfDays) {
        intervals.push({
          startTimeInMillis: dayJsWrapper(timeOffs.endTimeInMillis).set("hours", this.TIME_OFF_START_HOUR).valueOf(),
          endTimeInMillis: timeOffs.endTimeInMillis,
          operatorId: timeOffs.operatorId,
        });
        break;
      }

      if (day !== 0 && day !== numberOfDays) {
        const startTime = dayJsWrapper(timeOffs.startTimeInMillis).add(day, "day").set("hour", this.TIME_OFF_START_HOUR);

        const endTime = dayJsWrapper(startTime).set("hour", this.TIME_OFF_END_HOUR);

        intervals.push({
          startTimeInMillis: startTime.valueOf(),
          endTimeInMillis: endTime.valueOf(),
          operatorId: timeOffs.operatorId,
        });
      }
    }

    return intervals;
  }
}

export default new TimeOffManager();
