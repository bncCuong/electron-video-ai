/** @format */

import React, { useState } from "react";
import { cn, onCloseApp } from "@/lib/utils";
import { UserButton } from "@clerk/clerk-react";
import { X } from "lucide-react";
import logo from "../../public/ai-logo.svg";
type Props = {
  children: React.ReactNode;
  className?: string;
};

const ControlLayout = ({ children, className }: Props) => {
  const [invisible, setInvisible] = useState<boolean>(false);

  // Use contextBridge
  window.ipcRenderer.on("hide-plugin", (_event, payload) => {
    console.log(_event);
    setInvisible(payload.state);
  });

  return (
    <div
      className={cn(
        className,
        invisible && "invisible",
        "bg-[#191818] flex px-1 flex-col overflow-hidden text-white"
      )}>
      <div className="flex justify-between items-center p-5 draggable">
        <span className="non-draggable">
          <UserButton />
        </span>
        <X
          size={20}
          onClick={onCloseApp}
          className="text-gray-400 non-draggable hover:text-white cursor-pointer"
        />
      </div>
      <div className="flex-1 h-0 overflow-auto">{children}</div>
      <div className="p-5 flex w-full">
        <div className="flex items-center gap-x-2">
          <img src={logo} alt="logo" />
          <p className="text-white font-bold">Video AI</p>
        </div>
      </div>
    </div>
  );
};

export default ControlLayout;
