"use client";
import React from "react";
import Cards from "../../../app/dashboard/overview/cards";
import PeriodRadios from "../../../app/dashboard/overview/periodRadios";
import Table from "../../../app/dashboard/table";
import { roles, userRole } from "../../../app/dashboard/utils";
import Link from "next/link";

interface IProps {
  header: string;
  subheader: string;
}

function Index({ header, subheader }: IProps) {
  const role: any = userRole;
  const cardProps = [
    {
      total: "number of parts ordered",
      amount: 2250,
      percentage: 32,
      onClick: () => {
        console.log("View total number of parts ordered");
      },
    },
    {
      total: "number of agents",
      amount: 1475,
      percentage: 10,
      onClick: () => {
        console.log("View total number of agents");
      },
    },
    {
      total: "transaction value",
      amount: 1250,
      percentage: 59,
      onClick: () => {
        console.log("View total transaction value");
      },
    },
    {
      total: "number of vendors",
      amount: 1280,
      percentage: 43,
      onClick: () => {
        console.log("View total number of vendors");
      },
    },
  ];
  return (
    <>
      <div id="welcomeSection" className={`flex justify-between items-center`}>
        <div>
          <h1
            id="welcomeTitle"
            className={`font-semibold text-[1.9rem] text-[#101828]`}
          >
            Welcome Back, Sam
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
      <div id="cardContainer" className={`mt-[1rem] flex gap-5 w-full`}>
        {cardProps.map((card, index) => (
          <div id={`card_${index}`} key={index}>
            <Cards
              amount={card.amount}
              percentage={card.percentage}
              total={card.total}
              onClick={card.onClick}
            />
          </div>
        ))}
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
