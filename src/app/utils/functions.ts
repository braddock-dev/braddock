import dayjs from "@/app/utils/dayjs";
import { Dayjs } from "dayjs";

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
