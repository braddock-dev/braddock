import React from "react";
import ReactSlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";

interface ISidePanelProps {
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  isOpen: boolean;
}
export default function SidePanelWrapper(props: ISidePanelProps) {
  return (
    <div className={"z-[1000]"}>
      <ReactSlidingPane
        isOpen={props.isOpen}
        from={"left"}
        width={"400px"}
        hideHeader
        onRequestClose={props.onClose}
        shouldCloseOnEsc
        overlayClassName={"z-[1000]"}
      >
        <div className={"flex flex-col"}>
          <div className="flex justify-between items-center py-3 px-4 border-b">
            <h3 className="font-bold text-gray-800">{props.title}</h3>
          </div>

          {props.children}
        </div>
      </ReactSlidingPane>
    </div>
  );
}
