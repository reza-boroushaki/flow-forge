"use client";

import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import { Drawer, DrawerClose, DrawerContent } from "@/components/ui/drawer";

const Modal = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  return (
    <Drawer open onClose={() => router.push("/")}>
      <DrawerContent>
        <div className="h-[90vh] overflow-y-scroll drawerContainer">
          <div className="mx-auto w-full max-w-lg lg:py-16 py-8 px-4">
            {children}
            <DrawerClose asChild className="mt-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push("/")}
              >
                Cancel
              </Button>
            </DrawerClose>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default Modal;
