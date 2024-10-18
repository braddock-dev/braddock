import React from "react";
import { IAppointment } from "@/app/backend/business/treatments/data/AppointmentData";
import AppointmentInfo from "@/app/ui/components/appointment-details/AppointmentInfo";
import AppointmentInfoForm from "@/app/ui/components/appointment-details/AppointmentInfoForm";

interface IAppointmentDetailsProps {
  appointment?: IAppointment;
  onClose: () => void;
}
export default function AppointmentDetails({
  appointment,
  ...props
}: IAppointmentDetailsProps) {
  const [editMode, setEditMode] = React.useState(false);

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

      {!!appointment && (
        <>
          {editMode ? (
            <AppointmentInfoForm
              appointment={appointment}
              onCancel={() => setEditMode(false)}
              onSave={() => setEditMode(false)}
            />
          ) : (
            <AppointmentInfo
              appointment={appointment}
              onEdit={() => setEditMode(true)}
            />
          )}
        </>
      )}
    </div>
  );
}
