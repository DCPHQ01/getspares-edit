"use client";
import React, { useState } from "react";
// import Cards from "../../../../../app/dashboard/overview/cards";
import Cards from "../../../components/cards";
import PeriodRadios from "../../../app/dashboard/components/ui/periodradios";
import Table from "../../../app/dashboard/components/table";

import { roles } from "../components/utils/utils";
import Link from "next/link";
import * as JWT from "jwt-decode";
import { JwtPayload as BaseJwtPayload } from "jsonwebtoken";
import { useAppSelector } from "../../../redux/hooks";
import { paths } from "../../../path/paths";

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
  "dashboard ", user;

  const userDetails = JSON.parse(sessionStorage.getItem("userDetails") || "");
  const name = userDetails?.firstName;

  const role: any = overviewRoles;

  const [activityPeriod, setActivityPeriod] = useState("month");
  const handlePeriodChange = () => {
    setActivityPeriod((prevValue) =>
      prevValue === "month" ? "year" : "month"
    );
  };

  // const cardProps = [
  //   {
  //     total: "number of parts ordered",
  //     amount: 2250,
  //     percentage: 32,
  //     onClick: () => {
  //       ("View total number of parts ordered");
  //     },
  //   },
  //   {
  //     total: "number of agents",
  //     amount: 1475,
  //     percentage: 10,
  //     onClick: () => {
  //       ("View total number of agents");
  //     },
  //   },
  //   {
  //     total: "transaction value",
  //     amount: 1250,
  //     percentage: 59,
  //     onClick: () => {
  //       ("View total transaction value");
  //     },
  //   },
  //   {
  //     total: "number of vendors",
  //     amount: 1280,
  //     percentage: 43,
  //     onClick: () => {
  //       ("View total number of vendors");
  //     },
  //   },
  // ];
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
          <Link href={paths.toModalPage()}>
            {role === roles.VENDOR_ADMIN && (
              <button
                id="addCompanyButton"
                className={`bg-[#095AD3] text-white rounded-full py-[0.38rem] px-[1.5rem]`}
              >
                Update Company
              </button>
            )}
          </Link>
        </div>
      </div>
      <div id="cardContainer" className={`mt-[1rem] flex gap-5 w-full`}>
        {/* <Cards /> */}
      </div>
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
          <PeriodRadios
            activityPeriod={activityPeriod}
            onPeriodChange={handlePeriodChange}
          />
        </div>
      </div>
      <div id="tableContainer">
        <Table />
      </div>
    </>
  );
}

export default Index;
