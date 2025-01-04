"use client";

import Spinner, { SpinnerColor } from "@/app/ui/components/spinner/Spinner";

export default function loading() {
  return (
    <div className={"w-full h-[100vh] flex justify-center items-center "}>
      <Spinner className={"w-4 h-4"} color={SpinnerColor.BLACK} />
    </div>
  );
}
