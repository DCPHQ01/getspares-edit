"use client";

import { useEffect, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserRole } from "./hooks/useUserRole";
import { paths } from "../path/paths";
import useGetToken from "./hooks/useGetToken";

export default function withAuth(Component: any) {
  return function AuthComponent(props: any) {
    const router = useRouter();
    const token = useGetToken()

    useEffect(() => {
      if (Object.keys(token).length === 0) {
        router.push("/login")
      }
    }, []);
    return <Component {...props} />;
  };
}
