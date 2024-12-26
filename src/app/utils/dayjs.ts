import dayjs from "dayjs";
import "dayjs/locale/pt";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Constants } from "@/app/utils/Constants";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale(Constants.LOCALE.DEFAULT_LANGUAGE);
dayjs.tz.setDefault(Constants.TIME.DEFAULT_TIME_ZONE);

export default function dayJsWrapper(date: any) {
  return dayjs(date).tz(Constants.TIME.DEFAULT_TIME_ZONE);
}
