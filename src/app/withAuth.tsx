"use client";

import { useEffect, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserRole } from "./hooks/useUserRole";

export default function withAuth(Component: any) {
  return function AuthComponent(props: any) {
    const router = useRouter();
    const role = useUserRole();
    // const tokens = JSON.parse(sessionStorage.getItem("token") || "{}");
    const getToken = () => {
      if (typeof window !== "undefined") {
        return JSON.parse(sessionStorage.getItem("token") || "{}");
      }
      return {};
    };

    let tokens = getToken();
    useLayoutEffect(() => {
      if (!tokens) {
        router.push("/");
      }
    }, [tokens, router]);

    useEffect(() => {
      const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        if (!tokens) {
          event.preventDefault();
        }
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }, [tokens]);
    if (!tokens) {
      return null;
    }
    return <Component {...props} />;
  };
}
