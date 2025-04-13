import styles from "./SelectEmployeeStep.module.scss";
import EmployeeCard from "@/app/ui/components/appointment-card/appointment-steps/select-employee-step/employee-card/EmployeeCard";
import {
  newAppointmentActions,
  newAppointmentSelectors,
  useNewAppointmentStore,
} from "@/app/store/newAppointmentStore";
import { useQuery } from "@tanstack/react-query";
import { getOperators } from "@/app/backend/actions/operatorActions";
import AppointmentCardLoadingState from "@/app/ui/components/appointment-card/appointment-card-loading-state/AppointmentCardLoadingState";

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

  const { data: operators, isLoading } = useQuery({
    queryKey: ["operators"],
    queryFn: ()=> getOperators(),
  });

  if (isLoading) {
    return <AppointmentCardLoadingState itemsCount={3} />;
  }

  if (!operators?.length) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Nenhum profissional disponível</h1>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Selecione o profissional</h1>
      <div className={styles.employeeList}>
        {operators.map((operator) => (
          <EmployeeCard
            key={operator.id}
            employee={{
              id: operator.id,
              name: operator.name,
              photo: operator.iconUrl,
              position: operator.description,
            }}
            isSelected={selectedEmployee === operator.id}
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
