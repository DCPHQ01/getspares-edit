"use client";

import { useEffect, useLayoutEffect } from "react";
import { useAppSelector } from "../redux/hooks";
import { useRouter } from "next/navigation";

export default function withAuth(Component: any) {
  return function AuthComponent(props: any) {
    const { user } = useAppSelector((state) => state.user);
    const router = useRouter();
    const token = user?.access_token;
    useLayoutEffect(() => {
      if (!token) {
        router.push("/login");
      }
    }, [token, router]);

    useEffect(() => {
      const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        if (!token) {
          event.preventDefault();
        }
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }, [token]);
    if (!token) {
      return null;
    }
    return <Component {...props} />;
  };
}
