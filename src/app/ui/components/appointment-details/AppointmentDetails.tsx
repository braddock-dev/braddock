import React, { useState } from "react";
import AvatarUser from "@/app/ui/images/avatarFallback.png";
import Image from "next/image";
import SectionInfo from "@/app/ui/components/appointment-details/SectionInfo";
import ServiceItem from "@/app/ui/components/appointment-details/ServiceItem";
import Button, { ButtonColors } from "@/app/ui/components/button/Button";

export default function AppointmentDetails() {
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
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </button>
      </div>
      <div className="p-4 flex flex-col gap-6">
        <SectionInfo title={"Quando?"}>
          <div className={"text-neutral-500"}>
            <p>Sexta feira, 10 de Setembro</p>
            <p>
              Das <span className={"font-bold text-brown"}>14:00 às 15:00</span>
              , com duração de 1 hora
            </p>
          </div>
        </SectionInfo>

        <hr className={"border-neutral-200"} />

        <SectionInfo title={"Que Serviços?"}>
          <div className={"flex flex-col gap-2"}>
            <div className={"flex flex-row gap-2 flex-wrap"}>
              <ServiceItem title={"Corte de Cabelo"} />
              <ServiceItem title={"Corte e Barbaterapia"} />
              <ServiceItem title={"Sombracelhas e Barba"} />
              <ServiceItem title={"Barboterapia"} />
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
              <p className={"text-neutral-700 text-sm"}>Herquilóide Hele</p>
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
    </div>
  );
}
