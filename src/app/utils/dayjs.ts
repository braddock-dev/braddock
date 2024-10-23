import dayjs from "dayjs";
import "dayjs/locale/pt";

dayjs.locale("pt");
export default function dayJsWrapper(date: any) {
  return dayjs(date);
}
