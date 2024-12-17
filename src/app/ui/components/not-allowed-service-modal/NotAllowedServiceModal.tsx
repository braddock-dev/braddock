import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@uidotdev/usehooks";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import Button, { ButtonColors } from "@/app/ui/components/button/Button";

interface NotAllowedServiceModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  serviceNames: string[];
}
export function NotAllowedServiceModal(props: NotAllowedServiceModalProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={props.open} onOpenChange={props.setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className={"text-brown font-bold"}>
              Contacte a nossa equipa
            </DialogTitle>
          </DialogHeader>
          <NotAllowedService serviceNames={props.serviceNames} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={props.open} onOpenChange={props.setOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className={"text-brown font-bold"}>
            Contacte a nossa equipa
          </DrawerTitle>
        </DrawerHeader>
        <div className={"pb-6"}>
          <NotAllowedService
            className="px-4"
            serviceNames={props.serviceNames}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

interface NotAllowedServiceProps extends React.ComponentProps<"div"> {
  serviceNames: string[];
}

function NotAllowedService({
  className,
  serviceNames,
}: NotAllowedServiceProps) {
  return (
    <div className={cn("grid items-start gap-4", className)}>
      <div className="flex flex-col gap-3 ">
        <p className={"text-sm text-black/60"}>
          O serviço que tentou agendar{" "}
          <span className={"font-bold text-red-500"}>
            ({serviceNames.join(",")})
          </span>{" "}
          requer contacto com a nossa equipa.
        </p>

        <a href={"https://wa.me/+351915917539"} target={"_blank"}>
          <p className={"text-sm text-black/60"}>
            O Nosso Contacto:{" "}
            <span className={"text-brown"}>+351 915 917 539</span>
          </p>
        </a>

        <a
          href={"https://wa.me/+351915917539"}
          className={"w-full grid"}
          target={"_blank"}
        >
          <Button color={ButtonColors.BROWN} className="w-full">
            Contacte-nos
          </Button>
        </a>
      </div>
    </div>
  );
}
