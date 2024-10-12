import React from "react";

interface ISectionInfoProps {
  title: string;
  children: React.ReactNode;
}
export default function SectionInfo(props: ISectionInfoProps) {
  return (
    <div className={"flex flex-col gap-2"}>
      <h2 className={"font-bold text-brown text"}>{props.title}</h2>
      {props.children}
    </div>
  );
}
