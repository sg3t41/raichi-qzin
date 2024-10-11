"use client";

import useCookie from "@/features/cookie/hooks/useCookie";
import { useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const useAffiliator = (key: string) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get(key);

  const { get, set } = useCookie();
  const [affiliatorId, setAffiliatorId] = useState<string>("");

  useEffect(() => {
    if (current) {
      set(key, current, {
        path: pathname,
        maxAge: 2147483647,
        secure: true,
        httpOnly: false,
        sameSite: "strict",
      });
    }
    const id = get(key);
    setAffiliatorId(id as string);
  }, [key, pathname, current, get, set]); // key を依存配列に追加

  return { id: affiliatorId };
};

export default useAffiliator;
