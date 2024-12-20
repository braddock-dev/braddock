import dayjs from "@/app/utils/dayjs";
import { Dayjs } from "dayjs";
import { NextURL } from "next/dist/server/web/next-url";
import { NextResponse } from "next/server";

export function getPageScrollPosition() {
  return {
    x: window.pageXOffset || document.documentElement.scrollLeft,
    y: window.pageYOffset || document.documentElement.scrollTop,
  };
}

export function addMinutesToDate(date: number, minutes: number): Dayjs {
  return dayjs(date).add(minutes, "minutes");
}

export function minutesToHour(minutes: number): number {
  return minutes / 60;
}

export function getFormattedHourDuration(hours: number) {
  if (hours === 0.5) {
    return `meia hora`;
  }

  if (hours === 1) {
    return `uma hora`;
  }

  if (isFraction(hours)) {
    const value = Math.floor(hours);
    return `${value} hora${value > 1 ? "s" : ""} e meia`;
  }

  if (hours > 1) {
    return `${hours} horas`;
  }
}

function isFraction(num: number) {
  return num !== Math.trunc(num);
}

export function removePhoneNumberPrefix(
  phoneNumber: string,
  prefix: string,
): string {
  return phoneNumber.replace(prefix, "");
}

export const redirectNoCache = (
  url: string | NextURL | URL,
  init?: number | ResponseInit | any,
): NextResponse => {
  const response = NextResponse.redirect(url, init);
  response.headers.set("x-middleware-cache", "no-cache");
  return response;
};

export const formatPhoneNumber = (value?: string): string => {
  if (value == null) return "-";
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export function isDateInPast(date: number): boolean {
  return dayjs(date).isBefore(dayjs(new Date()));
}

export function isDateInFuture(date: number): boolean {
  return dayjs(date).isAfter(dayjs(new Date()));
}

export function getDifferenceInMinutes(date1: number, date2: number): number {
  return Math.abs(dayjs(date1).diff(dayjs(date2), "minutes"));
}

export function getDifferenceInHours(date1: number, date2: number): number {
  return Math.abs(dayjs(date1).diff(dayjs(date2), "hours"));
}
