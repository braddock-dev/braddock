import SectionInfo from "@/app/ui/components/appointment-details/SectionInfo";
import dayjs from "@/app/utils/dayjs";
import { Constants } from "@/app/utils/Constants";
import {
  formatPhoneNumber,
  getFormattedHourDuration,
} from "@/app/utils/functions";
import ServiceItem from "@/app/ui/components/appointment-details/ServiceItem";
import Image from "next/image";
import AvatarUser from "@/app/ui/images/avatarFallback.png";
import Button, { ButtonColors } from "@/app/ui/components/button/Button";
import React from "react";
import { IAppointment } from "@/app/backend/business/treatments/data/AppointmentData";
import AlertDialogWrapper from "@/app/ui/components/alert-dialog-wrapper/AlertDialogWrapper";

interface IAppointmentInfoProps {
  appointment: IAppointment;
  onEdit: () => void;
  onDelete: () => void;
  isDeleting?: boolean;
}
function AppointmentInfo({ appointment, ...props }: IAppointmentInfoProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  return (
    <div className="p-4 flex flex-col gap-6">
      <SectionInfo title={"Quando?"}>
        <div className={"text-neutral-500"}>
          <p className={"capitalize text-sm md:text"}>
            {dayjs(appointment.startTimeInMillis).format(
              Constants.DATE_FORMAT.CUSTOM_DATE,
            )}
          </p>
          <p className={"flex gap-1 items-center text-sm md:text"}>
            <span>Das</span>
            <span className={"font-bold text-brown"}>
              {dayjs(appointment.startTimeInMillis).format(
                Constants.DATE_FORMAT.TIME,
              )}
            </span>
            <span>às</span>
            <span>
              {dayjs(appointment.endTimeInMillis).format(
                Constants.DATE_FORMAT.TIME,
              )}
            </span>
            <span>
              , com duração de{" "}
              <span className={"text-brown font-bold"}>
                {getFormattedHourDuration(appointment.durationInHours)}
              </span>
            </span>
          </p>
        </div>
      </SectionInfo>

      <hr className={"border-neutral-200"} />

      <SectionInfo title={"Que Serviços?"}>
        <div className={"flex flex-col gap-2"}>
          <div className={"flex flex-row gap-2 flex-wrap"}>
            {appointment.treatments.map((treatment) => (
              <ServiceItem key={treatment.id} title={treatment.name} />
            ))}
          </div>
        </div>
      </SectionInfo>

      <hr className={"border-neutral-200"} />

      <SectionInfo title={"Com Quem?"}>
        <div className={"flex gap-2 items-center"}>
          <Image
            className="shrink-0 size-[40px] rounded-full"
            src={AvatarUser}
            alt="Avatar"
          />
          <div className={"flex flex-col"}>
            <p className={"text-neutral-700 text-sm"}>
              {appointment.clientName}
            </p>
            <span className={"text-neutral-500 text-sm"}>
              {formatPhoneNumber(appointment.clientPhoneNumber)}
            </span>
          </div>
        </div>
      </SectionInfo>

      <hr className={"border-neutral-200"} />

      <SectionInfo title={"Acções"}>
        <div className={"grid grid-cols-2 gap-3"}>
          <Button
            color={ButtonColors.BLACK}
            onClick={() => {
              setDeleteDialogOpen(true);
            }}
            isLoading={props.isDeleting}
            disabled={props.isDeleting}
          >
            ELIMINAR
          </Button>

          <Button color={ButtonColors.BROWN} onClick={props.onEdit}>
            EDITAR
          </Button>
        </div>
      </SectionInfo>

      <AlertDialogWrapper
        isOpen={deleteDialogOpen}
        title={"Remover Agendamento?"}
        description={"Deseja realmente remover este agendamento?"}
        onOpenChange={setDeleteDialogOpen}
        onCancel={() => setDeleteDialogOpen(false)}
        onConfirm={props.onDelete}
      />
    </div>
  );
}

export default AppointmentInfo;
