"use client";

import { Button } from "@/components/ui/button";
import { getProviders, signIn } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Image from "next/image";

type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParams?: Record<string, string> | undefined;
};

type Providers = Record<string, Provider>;

const AuthProviders = () => {
  const [providers, setProviders] = useState<Providers | null>(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();

      setProviders(res);
    })();
  }, []);
  if (providers) {
    return (
      <div className="flex items-center gap-1">
        {Object.values(providers).map((provider: Provider, i) => (
          <Button
            key={i}
            onClick={() => signIn(provider?.id)}
            variant="outline"
            className="h-10 w-10 rounded-full p-0"
          >
            <Image
              src={`/${provider?.id}.svg`}
              width={20}
              height={20}
              alt={provider?.name}
            />
          </Button>
        ))}
      </div>
    );
  }
};

export default AuthProviders;
