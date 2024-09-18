import styles from "./Spinner.module.scss";
import SpinnerIcon from "@/app/ui/vectors/spinner-icon.svg";

export enum SpinnerColor {
  WHITE = "white",
  BLACK = "black",
}
interface SpinnerProps {
  marginAuto?: boolean;
  className?: string;
  color?: SpinnerColor;
}
function Spinner({ color = SpinnerColor.BLACK, ...props }: SpinnerProps) {
  return (
    <SpinnerIcon
      className={`${styles.spinner} ${props.marginAuto ? styles.marginAuto : ""} ${props.className ?? ""}`}
      data-color={color}
    />
  );
}

export default Spinner;
