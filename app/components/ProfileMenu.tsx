"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { SessionInterface } from "@/common.types";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ProfileMenu = ({ session }: { session: SessionInterface }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {session?.user?.image && (
          <Image
            src={session.user.image}
            width={40}
            height={40}
            className="rounded-full"
            alt="user profile image"
          />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[250px]">
        <DropdownMenuLabel>
          <div className="flex flex-col items-center gap-y-4">
            {session?.user?.image && (
              <Image
                src={session?.user?.image}
                className="rounded-full"
                width={80}
                height={80}
                alt="profile Image"
              />
            )}
            <p className="font-semibold">{session?.user?.name}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={`/profile/${session?.user?.id}`} className="text-sm">
            Work Preferences
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={`/profile/${session?.user?.id}`} className="text-sm">
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={`/profile/${session?.user?.id}`} className="text-sm">
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button type="button" className="text-sm" onClick={() => signOut()}>
            Sign out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
