"use client";

import AppLogo from "@/app/ui/vectors/logo-horizontal.svg";
import { useAuthStore } from "@/app/store/authStore";
import AvatarOptions from "@/app/ui/components/avatar-options/AvatarOptions";
import NotificationsIcon from "@/app/ui/vectors/notifications-icon.svg";

export default function Header() {
  const userInfo = useAuthStore((state) => state.userInfo);

  return (
    <header className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-[48] w-full bg-brown border-b text-sm py-2.5 lg:ps-[260px]">
      <nav className="px-4 sm:px-6 flex basis-full items-center w-full mx-auto">
        <div className="me-5 lg:me-0 lg:hidden flex items-center gap-4">
          <button
            type="button"
            className="size-8 flex justify-center items-center gap-x-2 border border-white text-white rounded-lg focus:outline-none focus:text-white disabled:opacity-50 disabled:pointer-events-none"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="hs-application-sidebar"
            aria-label="Toggle navigation"
            data-hs-overlay="#hs-application-sidebar"
          >
            <span className="sr-only">Abrir menu</span>
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
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M15 3v18" />
              <path d="m8 9 3 3-3 3" />
            </svg>
          </button>
          <a
            className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-none focus:opacity-80"
            href="#"
            aria-label="Preline"
          >
            <AppLogo className={"h-6"} />
          </a>
        </div>

        <div className="w-full flex items-center justify-end ms-auto md:justify-between gap-x-1 md:gap-x-3">
          <div></div>

          <div className="flex flex-row items-center justify-end gap-1">
            <button
              type="button"
              className="group size-[38px] relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            >
              <NotificationsIcon className="shrink-0 size-4 stroke-amber-50 group-hover:stroke-brown" />
              <span className="sr-only">Notifications</span>
            </button>

            {userInfo && <AvatarOptions userInfo={userInfo} />}
          </div>
        </div>
      </nav>
    </header>
  );
}
