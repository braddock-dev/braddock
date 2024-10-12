import SelectButton, {
  ButtonType,
} from "@/app/ui/components/select-button/SelectButton";
import React from "react";

interface IServiceItemProps {
  title: string;
}
export default function ServiceItem(props: IServiceItemProps) {
  return (
    <SelectButton
      selectButton={{
        text: (
          <span className={"text-[12px] text-brown font-bold"}>
            {props.title}
          </span>
        ),
        type: ButtonType.horizontal,
        value: props.title,
        data: props.title,
      }}
      className={"!py-1 !px-2 !bg-brown/20 !border-brown !border !border-solid"}
      isSelected
    />
  );
}
