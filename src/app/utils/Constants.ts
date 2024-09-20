export const EXTERNAL_CONFIGS = {
  GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
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
      href: "#home",
    },
    SERVICES: {
      text: "SERVIÇOS",
      href: "#services",
    },
    ABOUT_US: {
      text: "SOBRE NÓS",
      href: "#about-us",
    },
    GALLERY: {
      text: "GALERIA",
      href: "#gallery",
    },
  },
  DATE_FORMAT: {
    DAY: "DD",
    WEEKDAY: "ddd",
    TIME: "HH:mm",
    CUSTOM_FULL_DATE_TIME: "DD [de] MMMM [às] HH:mm",
  },
  API_ROUTES: {
    GET_TREATMENTS: (businessId: string) =>
      `${EXTERNAL_CONFIGS.BASE_URL}/businesses/${businessId}/treatments`,
    GET_TIMESLOTS: (businessId: string, treatmentId: string) =>
      `${EXTERNAL_CONFIGS.BASE_URL}/businesses/${businessId}/treatments/${treatmentId}/timeslots`,
    SCHEDULE_APPOINTMENT: (
      businessId: string,
      treatmentsId: string,
      timeSlotId: string,
    ) =>
      `${EXTERNAL_CONFIGS.BASE_URL}/businesses/${businessId}/treatments/${treatmentsId}/timeslots/${timeSlotId}/schedule`,
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
    },
  },
  REGEX_PATTERS: {
    PHONE_NUMBER: /^(9[1236]\d{7}|2\d{8})$/,
  },
};
