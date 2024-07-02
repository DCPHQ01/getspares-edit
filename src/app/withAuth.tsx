"use client";

import { useEffect, useLayoutEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUserRole } from "./hooks/useUserRole";
import { paths } from "../path/paths";
import useGetToken from "./hooks/useGetToken";

export default function withAuth(Component: any) {
  return function AuthComponent(props: any) {
    const router = useRouter();
    const token = useGetToken();
    const routeUrl = usePathname();

    useEffect(() => {
      if (Object.keys(token).length === 0) {
        router.push("/login");
      }
    }, []);
    useEffect(() => {
      if (routeUrl === "/dashboard") {
        window.onpopstate = () => {
          history.go(1);
        };
      }
    }, [routeUrl]);

    return <Component {...props} />;
  };
}
