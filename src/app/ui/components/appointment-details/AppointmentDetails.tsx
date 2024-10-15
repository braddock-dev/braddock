import React, { useState } from "react";
import AvatarUser from "@/app/ui/images/avatarFallback.png";
import Image from "next/image";
import SectionInfo from "@/app/ui/components/appointment-details/SectionInfo";
import ServiceItem from "@/app/ui/components/appointment-details/ServiceItem";
import Button, { ButtonColors } from "@/app/ui/components/button/Button";
import { IAppointment } from "@/app/backend/business/treatments/data/AppointmentData";
import dayjs from "@/app/utils/dayjs";
import { Constants } from "@/app/utils/Constants";
import { getFormattedHourDuration } from "@/app/utils/functions";

interface IAppointmentDetailsProps {
  appointment?: IAppointment;
  onClose: () => void;
}
export default function AppointmentDetails({
  appointment,
  ...props
}: IAppointmentDetailsProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div
      id="hs-offcanvas-custom-backdrop-color"
      className="hs-overlay hs-overlay-open:translate-x-0 hs-overlay-backdrop-open:bg-amber-900/85 hidden -translate-x-full fixed top-0 start-0 transition-all duration-300 transform h-full max-w-md w-full z-[80] bg-white border-e"
      role="dialog"
      tabIndex={-1}
      aria-labelledby="hs-offcanvas-custom-backdrop-color-label"
    >
      <div className="flex justify-between items-center py-3 px-4 border-b">
        <h3
          id="hs-offcanvas-custom-backdrop-color-label"
          className="font-bold text-gray-800"
        >
          Detalhes to Agendamento
        </h3>
        <button
          type="button"
          className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
          aria-label="Close"
          data-hs-overlay="#hs-offcanvas-custom-backdrop-color"
          onClick={props.onClose}
        >
          <span className="sr-only">Close</span>
          <svg
            className="shrink-0 size-4"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </button>
      </div>
      {appointment && (
        <div className="p-4 flex flex-col gap-6">
          <SectionInfo title={"Quando?"}>
            <div className={"text-neutral-500"}>
              <p className={"capitalize"}>
                {dayjs(appointment.startTimeInMillis).format(
                  Constants.DATE_FORMAT.CUSTOM_DATE,
                )}
              </p>
              <p className={"flex gap-1 items-center"}>
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
                  +351 915 071 158
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
                  setShowModal(true);
                }}
              >
                ELIMINAR
              </Button>
              <Button color={ButtonColors.BROWN}>EDITAR</Button>
            </div>
          </SectionInfo>
        </div>
      )}
    </div>
  );
}
