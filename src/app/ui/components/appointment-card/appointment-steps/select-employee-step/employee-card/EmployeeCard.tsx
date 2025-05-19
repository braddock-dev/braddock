import styles from "./EmployeeCard.module.scss";
import SafeImage from "@/app/ui/components/safe-image/SafeImage";

export interface IEmployee {
  id: string;
  name: string;
  photo: string;
  position: string;
  IsInVocation?: boolean;
}

interface IEmployeeCardProps {
  employee: IEmployee;
  isSelected: boolean;
  onSelect: (employee: IEmployee) => void;
}

export default function EmployeeCard(props: IEmployeeCardProps) {
  return (
    <div
      data-in-vocation={props.employee.IsInVocation}
      className={styles.container}
      data-selected={props.isSelected}
      onClick={() => {
        if (props.employee.IsInVocation) {
          return;
        }
        props.onSelect(props.employee);
      }}
    >
      <SafeImage className={styles.image} src={props.employee.photo} alt={props.employee.name} width={200} height={200} />

      <div className={styles.content}>
        <h1 className={styles.name}>{props.employee.name}</h1>
        {props.employee.IsInVocation ? (
          <h2 className={styles.vocation}>Em férias</h2>
        ) : (
          <h2 className={styles.position}>{props.employee.position}</h2>
        )}
      </div>
    </div>
  );
}
