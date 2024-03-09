"use client";

import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import { Drawer, DrawerClose, DrawerContent } from "@/components/ui/drawer";

type Props = {
  children: ReactNode;
  maxWidth?: string;
};

const Modal = ({ children, maxWidth = "lg" }: Props) => {
  const router = useRouter();
  return (
    <Drawer open onClose={() => router.push("/")}>
      <DrawerContent>
        <div className="h-[90vh] overflow-y-scroll drawerContainer">
          <div
            className={`mx-auto w-full max-w-${maxWidth} lg:py-16 py-8 px-4`}
          >
            {children}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default Modal;
