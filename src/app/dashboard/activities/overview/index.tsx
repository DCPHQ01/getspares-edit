"use client";
import React from "react";
import * as JWT from "jwt-decode";
import { JwtPayload as BaseJwtPayload } from "jsonwebtoken";
import { useAppSelector } from "../../../../redux/hooks";
import {roles} from "../utils/utils";
import Link from "next/link";
import PeriodRadios from "./periodRadios";
import Table from "../table";
import Cards from "../cards";

interface IProps {
  header: string;
  subheader: string;
  overviewRoles: string;
}

interface JwtPayload extends BaseJwtPayload {
  role?: string;
}

function Index({ header, subheader, overviewRoles }: IProps) {
  const { user } = useAppSelector((state) => state.user);
  console.log("dashboard ", user);

  let decoded: JwtPayload | null = null;
  try {
    if (
      user?.access_token &&
      typeof user.access_token === "string" &&
      user.access_token.split(".").length === 3
    ) {
      decoded = JWT.jwtDecode(user.access_token);
    }
  } catch (error) {
    console.error("Failed to decode token:", error);
  }

  const userRole = decoded?.resource_access?.meca?.roles[0];
  const name = decoded?.given_name;

  const role: any = overviewRoles;

  return (
    <>
      <div id="welcomeSection" className={`flex justify-between items-center`}>
        <div>
          <h1
            id="welcomeTitle"
            className={`font-semibold text-[1.9rem] text-[#101828]`}
          >
            Welcome Back, {name}
          </h1>
          <p id="welcomeText" className={`text-[#364152]`}>
            Take a quick glance on what is happening with meca
          </p>
        </div>

        <div>
          <Link href="/modalPage">
            {role === roles.VENDOR_ADMIN && (
              <button
                id="addCompanyButton"
                className={`bg-[#095AD3] text-white rounded-full py-[0.38rem] px-[1.5rem]`}
              >
                Add Company
              </button>
            )}
          </Link>
        </div>
      </div>
      <Cards/>
      <div id="sectionHeader" className={`mt-[3.25rem] flex justify-between`}>
        <div>
          <p id="headerTitle" className={`font-semibold text-[1.25rem]`}>
            {header}
          </p>
          <p id="subheaderText" className={`text-[#364152]`}>
            {subheader}
          </p>
        </div>
        <div>
          <PeriodRadios />
        </div>
      </div>
      <div id="tableContainer">
        <Table />
      </div>
    </>
  );
}

export default Index;
