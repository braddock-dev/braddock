import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/pt";

dayjs.locale("pt");
dayjs.extend(utc);
export default function dayJsWrapper(date: any) {
  return dayjs(date).utc();
}
