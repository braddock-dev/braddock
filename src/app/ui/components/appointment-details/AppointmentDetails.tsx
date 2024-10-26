import React, { useEffect } from "react";
import { IAppointment } from "@/app/backend/business/treatments/data/AppointmentData";
import AppointmentInfo from "@/app/ui/components/appointment-details/AppointmentInfo";
import AppointmentInfoForm from "@/app/ui/components/appointment-details/AppointmentInfoForm";

interface IAppointmentDetailsProps {
  appointment?: IAppointment;
  onClose?: () => void;
}
export default function AppointmentDetails({
  appointment,
  ...props
}: IAppointmentDetailsProps) {
  const [editMode, setEditMode] = React.useState(false);

  useEffect(() => {
    setEditMode(false);
  }, [appointment]);

  if (!appointment) {
    return null;
  }

  return editMode ? (
    <AppointmentInfoForm
      appointment={appointment}
      onCancel={() => {
        setEditMode(false);
      }}
      onSave={() => setEditMode(false)}
    />
  ) : (
    <AppointmentInfo
      appointment={appointment}
      onEdit={() => setEditMode(true)}
    />
  );
}
