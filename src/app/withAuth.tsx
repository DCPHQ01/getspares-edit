"use client";

import { useLayoutEffect } from "react";
import { useAppSelector } from "../redux/hooks";
import { redirect } from "next/navigation";

export default function withAuth(Component: any) {
  return function AuthComponent(props: any) {
    const { user } = useAppSelector((state) => state.user);

    const token = user?.access_token;
    useLayoutEffect(() => {
      if (!token) {
        redirect("/login");
      }
    }, [token]);
    if (!token) {
      return null;
    }
    return <Component {...props} />;
  };
}
