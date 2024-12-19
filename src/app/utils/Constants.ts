export const EXTERNAL_CONFIGS = {
  BUSINESS_REFERENCE: process.env.BUSINESS_REFERENCE || "",
  BASE_URL: process.env.BASE_URL || "",
  API_REQUEST_TIMEOUT: process.env.NEXT_PUBLIC_API_REQUEST_TIMEOUT || 30000,
  API_ACCESS_TOKEN: process.env.API_ACCESS,
};

export const Constants = {
  EXTERNAL_CONFIGS,
  MENU_ITEMS: {
    HOME: {
      text: "INÍCIO",
      href: "inicio",
    },
    SERVICES: {
      text: "SERVIÇOS",
      href: "servicos",
    },
    BASE_PRICES: {
      text: "PREÇOS BASE",
      href: "precos-base",
    },
    LOCATION: {
      text: "LOCALIZAÇÃO",
      href: "localizacao",
    },
  },
  DATE_FORMAT: {
    DAY: "DD",
    WEEKDAY: "ddd",
    SHORT_MONTH: "MMM",
    FULL_MONTH: "MMMM",
    TIME: "HH:mm",
    CUSTOM_FULL_DATE_TIME: "DD [de] MMMM [às] HH:mm",
    TIME_INTERVAL: "HH:mm [até] HH:mm",
    CUSTOM_DATE: "dddd, DD [de] MMMM",
  },
  API_ROUTES: {
    GET_TREATMENTS: (businessId: string) =>
      `${EXTERNAL_CONFIGS.BASE_URL}/businesses/${businessId}/treatments`,
    GET_TIMESLOTS: (businessId: string) =>
      `${EXTERNAL_CONFIGS.BASE_URL}/businesses/${businessId}/timeslots`,
    SCHEDULE_APPOINTMENT: (businessId: string, timeSlotId: string) =>
      `${EXTERNAL_CONFIGS.BASE_URL}/businesses/${businessId}/timeslots/${timeSlotId}/schedule`,
    GET_APPOINTMENTS: () => `${EXTERNAL_CONFIGS.BASE_URL}/appointments`,
    SEND_OTP: () => `${EXTERNAL_CONFIGS.BASE_URL}/sendVerificationCode`,
    VERIFY_OTP: () => `${EXTERNAL_CONFIGS.BASE_URL}/checkVerificationCode`,
    UPDATE_CUSTOMER: () => `${EXTERNAL_CONFIGS.BASE_URL}/customers`,
    GET_USER_INFO: () => `${EXTERNAL_CONFIGS.BASE_URL}/identity`,
    DELETE_APPOINTMENT: (appointmentId: string) =>
      `${EXTERNAL_CONFIGS.BASE_URL}/appointments/${appointmentId}`,
    REFRESH_CALENDAR_TOKEN: () =>
      `${EXTERNAL_CONFIGS.BASE_URL}/refreshGoogleCalendarCredentials`,
    REGISTER_TIME_OFF: () => `${EXTERNAL_CONFIGS.BASE_URL}/timeOff`,
    GET_TIME_OFF: () => `${EXTERNAL_CONFIGS.BASE_URL}/timeOff`,
    DELETE_TIME_OFF: (id: number) =>
      `${EXTERNAL_CONFIGS.BASE_URL}/timeOff/${id}`,
    GET_WORKING_HOURS: () => `${EXTERNAL_CONFIGS.BASE_URL}/workingHours`,
  },
  APP_ROUTES: {
    HOME: "/",
    ADMIN: "/admin",
    APPOINTMENTS: "/admin/appointments",
    ACCOUNT: "/admin/account",
    LOGIN: "/login",
  },
  UI: {
    PHONE_PREFIX: {
      PT: "+351",
    },
  },
  ERRORS: {
    GENERIC: {
      UNKNOWN: "GN_UNKNOWN",
      NETWORK_CONNECTION: "GN_NETWORK_CONNECTION",
      INVALID_RESPONSE: "GN_INVALID_RESPONSE",
      FORBIDDEN: "GN_FORBIDDEN",
      BAD_REQUEST: "GN_BAD_REQUEST",
      NOT_FOUND: "GN_NOT_FOUND",
      CONFLICT: "GN_CONFLICT",
      INVALID_PARAMS: "GN_INVALID_PARAMS",
      GENERAL: "GENERAL_ERROR",
      INTERNAL_ERROR: "INTERNAL_ERROR",
    },
    LOGIN: {
      SOCIAL_LIB_NOT_LOADED: "LOGIN_SOCIAL_LIB_NOT_LOADED",
      SOCIAL_POPUP_CLOSED: "LOGIN_SOCIAL_POPUP_CLOSED",
      SOCIAL_LOGIN_FAILED: "LOGIN_SOCIAL_LOGIN_FAILED",
      NO_SESSION_DATA: "LOGIN_NO_SESSION_DATA",
      SESSION_EXPIRED: "LOGIN_SESSION_EXPIRED",
      INVALID_OTP: "LOGIN_INVALID_OTP",
    },
  },
  REGEX_PATTERS: {
    PHONE_NUMBER: /^(9[1236]\d{7}|2\d{8})$/,
  },
  NOT_ALLOWED_SERVICES: ["Platinado"],
  TIME: {
    DEFAULT_TIME_ZONE: "Europe/Lisbon",
  },
  LOCALE: {
    DEFAULT_LANGUAGE: "pt",
  },
  APPOINTMENTS: {
    FILTER: {
      DEFAULT_PAST_DAYS: 7,
      DEFAULT_FUTURE_DAYS: 30,
    },
  },
};
