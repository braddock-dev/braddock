import Logger from "@/app/utils/Logger";
import { HttpMethods, HttpStatus, IHttpRequestConfig } from "@/app/backend/protocol/rest/IHttpInterface";
import { Constants } from "@/app/utils/Constants";
import { IAppointmentsResponse, INewAppointmentRequest, IQueryAppointmentRequest } from "@/app/backend/services/data/AppointmentDaos";
import ApiInterface from "@/app/backend/protocol/rest/ApiInterface";
import { AuthRoles } from "@/app/backend/business/auth/data/AuthDtos";

class AppointmentsService {
  private readonly LOG_TAG = "AppointmentsService";

  public async getAppointments(data: IQueryAppointmentRequest): Promise<IAppointmentsResponse[]> {
    Logger.debug(this.LOG_TAG, "Getting appointments...", [data]);

    try {
      const request: IHttpRequestConfig = {
        url: Constants.API_ROUTES.GET_APPOINTMENTS(),
        httpMethod: HttpMethods.GET,
        params: {
          fromTimeInMillis: data.startDate,
          toTimeInMillis: data.endDate,
          operatorId: data.operatorId,
        },
      };

      const response = await ApiInterface.send(request);

      Logger.log(this.LOG_TAG, "Get appointments response success", [response]);

      if (!response || response.status !== HttpStatus.OK || !response?.data) {
        throw new Error("Failed to get appointments");
      }

      Logger.log(this.LOG_TAG, "Get appointments response success", [response?.data]);

      return response.data;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Failed to fetch appointments.", error);
      throw error;
    }
  }

  public async scheduleAppointment(appointmentData: INewAppointmentRequest, daysForward?: number): Promise<any> {
    Logger.log(this.LOG_TAG, "Start scheduling appointment", [appointmentData]);

    try {
      let request: IHttpRequestConfig;

      if (appointmentData.requestedBy === AuthRoles.CUSTOMER) {
        request = {
          url: Constants.API_ROUTES.SCHEDULE_APPOINTMENT_CUSTOMER(
            Constants.EXTERNAL_CONFIGS.BUSINESS_REFERENCE,
            appointmentData.timeSlotId.toString()
          ),
          httpMethod: HttpMethods.POST,
          data: {
            treatmentsIds: appointmentData.treatmentsId,
            daysForward: daysForward,
            operatorId: appointmentData.employeeId,
          },
        };
      } else if (appointmentData.requestedBy === AuthRoles.BUSINESS) {
        request = {
          url: Constants.API_ROUTES.SCHEDULE_APPOINTMENT_BUSINESS(appointmentData.timeSlotId.toString()),
          httpMethod: HttpMethods.POST,
          data: {
            treatmentsIds: appointmentData.treatmentsId,
            customerName: appointmentData.customerName,
            customerMsisdn: `${appointmentData.customerPhone}`,
            daysForward: daysForward,
            operatorId: appointmentData.employeeId,
          },
        };
      } else {
        throw new Error("Invalid requestedBy");
      }

      const response = await ApiInterface.send(request);

      Logger.log(this.LOG_TAG, "Schedule appointment response success", [response]);

      if (!response || response.status !== HttpStatus.CREATED) {
        throw new Error("Failed to schedule appointment");
      }

      return response.data;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error scheduling appointment", error);
      throw error;
    }
  }

  public deleteAppointment(appointmentId: string): Promise<void> {
    Logger.debug(this.LOG_TAG, "Deleting appointment...", [appointmentId]);

    try {
      const request: IHttpRequestConfig = {
        url: Constants.API_ROUTES.DELETE_APPOINTMENT(appointmentId),
        httpMethod: HttpMethods.DELETE,
      };

      return ApiInterface.send(request).then((response) => {
        Logger.debug(this.LOG_TAG, "Delete appointment response success", [response]);

        if (!response || response.status !== HttpStatus.OK) {
          throw new Error("Failed to delete appointment");
        }

        return response.data;
      });
    } catch (error) {
      Logger.error(this.LOG_TAG, "Failed to delete appointment.", error);
      throw error;
    }
  }
}

export default new AppointmentsService();
