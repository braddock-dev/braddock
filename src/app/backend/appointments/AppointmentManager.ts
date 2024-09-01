import Logger from "@/app/utils/Logger";
import {
  IAppointmentInfo,
  IDateSlot,
  IService,
  ITimeSlot,
} from "@/app/backend/appointments/AppointmentsData";
import dayjs from "dayjs";
import { ServicesMockData } from "@/app/mocks/MockData";

class AppointmentManager {
  private readonly LOG_TAG = "AppointmentManager";

  constructor() {
    console.log(this.LOG_TAG, "initialized...");
  }

  public async getAppointmentInfo(): Promise<any> {
    Logger.debug(this.LOG_TAG, "start get services");

    try {
      const services: IService[] = ServicesMockData;
      const dateSlots: IDateSlot[] = this.generateDateSlots();
      const appointmentInfo: IAppointmentInfo = {
        services: services,
        dateSlots: dateSlots,
      };

      Logger.debug(this.LOG_TAG, "Appointment info requested successfully", [
        appointmentInfo,
      ]);

      return appointmentInfo;
    } catch (error) {
      Logger.error(this.LOG_TAG, "error on get services", error);
      return Promise.reject(error);
    }
  }

  private generateDateSlots(): IDateSlot[] {
    const dateSlots: IDateSlot[] = [];
    const currentDate = dayjs();

    for (let i = 0; i < 10; i++) {
      const date = currentDate.add(i, "day");
      const timeSlots = this.generateTimeSlots();
      dateSlots.push({ id: i, date: date.toDate(), timeSlots });
    }

    return dateSlots;
  }

  // STarting from 10:30 to 18:00 with 30 minutes interval
  private generateTimeSlots(): ITimeSlot[] {
    const timeSlots: ITimeSlot[] = [];
    const currentDate = dayjs().hour(10).minute(30);

    for (let i = 0; i < 16; i++) {
      const time = currentDate.add(i * 30, "minute");
      timeSlots.push({ id: i, time: time.toDate() });
    }

    return timeSlots;
  }
}

export default new AppointmentManager();
