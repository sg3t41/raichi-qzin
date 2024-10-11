"use client";

import { destroyCookie, parseCookies, setCookie } from "nookies";

interface CookieSetOptions {
  path?: string;
  maxAge?: number;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  expires?: Date;
  sameSite?: "lax" | "strict" | "none";
}

const useCookie = () => {
  const cookies = parseCookies();

  function get(key: string): string[] | string {
    const v = cookies[key];
    if (!v) return "";
    return v.includes(",") ? v.split(",") : v;
  }

  function set(
    key: string,
    value: string | string[],
    options?: CookieSetOptions
  ) {
    const strVal = Array.isArray(value) ? value.join(",") : value;
    setCookie(null, key, strVal, {
      ...options,
    });
  }

  function destroy(key: string, options?: CookieSetOptions) {
    destroyCookie(null, key, { ...options });
  }

  return { get, set, destroy };
};

export default useCookie;
