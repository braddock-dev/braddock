import AppLogo from "@/app/ui/vectors/logo-horizontal.svg";
import Link from "next/link";
import { Constants } from "@/app/utils/Constants";

export default function SideMenu() {
  return (
    <div>
      <div
        id="hs-application-sidebar"
        className="hs-overlay  [--auto-close:lg]
  hs-overlay-open:translate-x-0
  -translate-x-full transition-all duration-300 transform
  w-[260px] h-full
  hidden
  fixed inset-y-0 start-0 z-[60]
  border-e border-gray-200 bg-brown
  lg:block lg:translate-x-0 lg:end-auto lg:bottom-0"
        role="dialog"
        tabIndex={-1}
        aria-label="Sidebar"
      >
        <div className="relative flex flex-col h-full max-h-full">
          <div className="px-6 pt-4 flex justify-center">
            <Link
              className="flex-none rounded-xl text-xl inline-block font-semibold focus:outline-none focus:opacity-80"
              href={Constants.APP_ROUTES.HOME}
              aria-label="Preline"
            >
              <AppLogo className={"h-8"} />
            </Link>
          </div>

          <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
            <nav
              className="hs-accordion-group p-3 w-full flex flex-col flex-wrap"
              data-hs-accordion-always-open
            >
              <ul className="flex flex-col space-y-1">
                <li>
                  <a
                    className="flex items-center gap-x-3.5 py-4 px-2.5 bg-gray-100 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                    href="#"
                  >
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
                      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                    Agendamentos
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
