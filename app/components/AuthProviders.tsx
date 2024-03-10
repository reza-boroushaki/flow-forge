"use client";

import { Button } from "@/components/ui/button";
import { getProviders, signIn } from "next-auth/react";
import React, { useEffect, useState } from "react";

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
      <div>
        {Object.values(providers).map((provider: Provider, i) => (
          <Button key={i} onClick={() => signIn(provider?.id)} variant="ghost">
            Sign in
          </Button>
        ))}
      </div>
    );
  }
};

export default AuthProviders;
