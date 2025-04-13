import styles from "./SelectEmployeeStep.module.scss";
import EmployeeCard, {
  IEmployee,
} from "@/app/ui/components/appointment-card/appointment-steps/select-employee-step/employee-card/EmployeeCard";
import SecondEmployee from "@/app/ui/images/employees/second.jpg";
import FirstEmployee from "@/app/ui/images/employees/first.jpg";
import {
  newAppointmentActions,
  newAppointmentSelectors,
  useNewAppointmentStore,
} from "@/app/store/newAppointmentStore";

interface ISelectEmployeeStepProps {
  isValidChange: (isValid: boolean) => void;
}
export default function SelectEmployeeStep(props: ISelectEmployeeStepProps) {
  const selectedEmployee = useNewAppointmentStore(
    newAppointmentSelectors.employeeId,
  );
  const setEmployeeId = useNewAppointmentStore(
    newAppointmentActions.setEmployeeId,
  );

  const employees: IEmployee[] = [
    {
      id: "1",
      name: "Jonne Baptista",
      photo: FirstEmployee.src,
      position: "Barbeiro",
    },
    {
      id: "2",
      name: "Luyz Ferrnando",
      photo: SecondEmployee.src,
      position: "Barbeiro",
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Selecione o profissional</h1>
      <div className={styles.employeeList}>
        {employees.map((employee) => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
            isSelected={selectedEmployee === employee.id}
            onSelect={(selectedEmployee) => {
              setEmployeeId(selectedEmployee.id);
              props.isValidChange(true);
            }}
          />
        ))}
      </div>
    </div>
  );
}
