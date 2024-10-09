import Logger from "@/app/utils/Logger";
import {
  HttpMethods,
  HttpStatus,
  IHttpRequestConfig,
} from "@/app/backend/protocol/rest/IHttpInterface";
import { Constants } from "@/app/utils/Constants";
import {
  IAppointmentsResponse,
  IQueryAppointmentRequest,
} from "@/app/backend/services/data/AppointmentDaos";
import ApiInterface from "@/app/backend/protocol/rest/ApiInterface";

class AppointmentsService {
  private readonly LOG_TAG = "AppointmentsService";

  public async getAppointments(
    data: IQueryAppointmentRequest,
  ): Promise<IAppointmentsResponse[]> {
    Logger.debug(this.LOG_TAG, "Getting appointments...", [data]);

    try {
      const request: IHttpRequestConfig = {
        url: Constants.API_ROUTES.GET_APPOINTMENTS(),
        httpMethod: HttpMethods.GET,
        headers: {
          BusinessToken: Constants.EXTERNAL_CONFIGS.API_BUSINESS_TOKEN,
          BusinessId: data.businessId,
        },
      };

      const response = await ApiInterface.send(request);

      Logger.log(this.LOG_TAG, "Get appointments response success", [response]);

      if (!response || response.status !== HttpStatus.OK || !response?.data) {
        return Promise.reject("Failed to get treatments");
      }

      Logger.log(this.LOG_TAG, "Get appointments response success", [
        response?.data,
      ]);

      return response.data;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Failed to fetch appointments.", error);
      return Promise.reject(error);
    }
  }
}

export default new AppointmentsService();
