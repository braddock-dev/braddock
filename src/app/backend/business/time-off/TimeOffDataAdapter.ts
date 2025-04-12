import Logger from "@/app/utils/Logger";
import {
  ITimeOffResponse,
  IWorkingHoursResponse,
} from "@/app/backend/services/data/TimeOffDaos";
import {
  ITimeOff,
  IWorkingHours,
} from "@/app/backend/business/time-off/TimeOffDtos";

class TimeOffDataAdapter {
  private readonly LOG_TAG = "TimeOffDataAdapter";

  public constructor() {
    Logger.log(this.LOG_TAG, "Service initialized");
  }

  public convertDataToWorkingHours(data: IWorkingHoursResponse): IWorkingHours {
    return {
      timezone: data.timezone,
      closingHour: data.closingHour,
      openingHour: data.openingHour,
      dayHoursOff: data.dayHoursOff.split(",").map((hour) => parseInt(hour)),
      weekDaysOff: data.weekDaysOff.split(",").map((day) => parseInt(day)),
      yearDaysOff: data.yearDaysOff.split(",").map((day) => parseInt(day)),
      email: data.email,
    };
  }

  public convertDataToTimeOff(data: ITimeOffResponse): ITimeOff {
    return {
      id: data.id,
      endTimeInMillis: data.endTimeInMillis,
      startTimeInMillis: data.startTimeInMillis,
      operatorId: data.operatorId,
    };
  }

  public convertDataToTimeOffsList(data: ITimeOffResponse[]): ITimeOff[] {
    return data.map((dataL) => this.convertDataToTimeOff(dataL));
  }
}

export default new TimeOffDataAdapter();
