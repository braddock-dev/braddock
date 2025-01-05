import { http, HttpResponse } from "msw";
import { TIME_SLOTS, TREATMENTS_LIST } from "@/mocks/data/treatmentsMockData";
import { Constants } from "@/app/utils/Constants";
import { HttpStatus } from "@/app/backend/protocol/rest/IHttpInterface";
import {
  GET_USER_INFO_RESPONSE,
  SEND_OTP_RESPONSE,
  VERIFY_OTP_RESPONSE,
} from "@/mocks/data/authMockData";
import { APPOINTMENTS } from "@/mocks/data/appointments";

export const handlers = [
  http.get(Constants.API_ROUTES.GET_TREATMENTS(":businessId"), () => {
    return HttpResponse.json(TREATMENTS_LIST, { status: HttpStatus.OK });
  }),
  http.post(Constants.API_ROUTES.GET_TIMESLOTS(":businessId"), () => {
    return HttpResponse.json(TIME_SLOTS, { status: HttpStatus.OK });
  }),

  http.post(
    Constants.API_ROUTES.SCHEDULE_APPOINTMENT_CUSTOMER(
      ":businessId",
      ":timeSlotId",
    ),
    (info) => {
      return HttpResponse.json({}, { status: HttpStatus.CREATED });
    },
  ),

  http.post(Constants.API_ROUTES.SEND_OTP(), () => {
    return HttpResponse.json(SEND_OTP_RESPONSE, { status: HttpStatus.CREATED });
  }),

  http.post(Constants.API_ROUTES.VERIFY_OTP(), () => {
    return HttpResponse.json(VERIFY_OTP_RESPONSE, { status: HttpStatus.OK });
  }),

  http.put(Constants.API_ROUTES.UPDATE_CUSTOMER(), () => {
    return HttpResponse.json({}, { status: HttpStatus.OK });
  }),

  http.get(Constants.API_ROUTES.GET_APPOINTMENTS(), () => {
    return HttpResponse.json(APPOINTMENTS, { status: HttpStatus.OK });
  }),

  http.delete(Constants.API_ROUTES.DELETE_APPOINTMENT(":appointmentId"), () => {
    return HttpResponse.json({}, { status: HttpStatus.OK });
  }),

  http.post(Constants.API_ROUTES.REGISTER_TIME_OFF(), () => {
    return HttpResponse.json({}, { status: HttpStatus.CREATED });
  }),

  http.get(Constants.API_ROUTES.GET_USER_INFO(), (info) => {
    const authToken = info.request.headers.get("Token");

    if (authToken) {
      return HttpResponse.json(GET_USER_INFO_RESPONSE, {
        status: HttpStatus.OK,
      });
    }

    return HttpResponse.json({}, { status: HttpStatus.NOT_FOUND });
  }),
];
