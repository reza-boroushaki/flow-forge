import React from "react";
import Link from "next/link";
import Image from "next/image";
import { NavLinks } from "../constant";
import AuthProviders from "./AuthProviders";
import { getCurrentUser } from "../lib/session";
import ProfileMenu from "./ProfileMenu";
import { Button } from "@/components/ui/button";

const Navbar = async () => {
  const session = await getCurrentUser();
  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-10">
        <Link href="/">
          <Image src="/logo-black.png" width={130} height={43} alt="logo" />
        </Link>
        <ul className="xl:flex hidden text-small gap-7">
          {NavLinks.map((link) => (
            <Link href={link.href} key={link.text}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>

      <div className="flexCenter gap-4">
        {session?.user ? (
          <>
            <ProfileMenu session={session} />
            <Link href="/create-project">
              <Button>Share work</Button>
            </Link>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
