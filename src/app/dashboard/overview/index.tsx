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
      <div className={`flex justify-between items-center`}>
        <div>
          <h1 className={`font-semibold text-[30px] text-[#101828]`}>
            Welcome Back, Sam
          </h1>
          <p className={`text-[#364152]`}>
            Take a quick glance on what is happening with meca
          </p>
        </div>
        <Link href="/modalPage">
          {role === roles.VENDOR_ADMIN && (
            <button
              className={`bg-[#095AD3] text-white rounded-full py-[6px] px-[24px]`}
            >
              Add Company
            </button>
          )}
        </Link>
      </div>
      <div className={`mt-[16px] flex gap-5`}>
        {cardProps.map((card, index) => (
          <div key={index}>
            <Cards
              amount={card.amount}
              percentage={card.percentage}
              total={card.total}
              onClick={card.onClick}
            />
          </div>
        ))}
      </div>
      <div className={`mt-[52px] flex justify-between`}>
        <div>
          <p className={`font-semibold text-[20px]`}>{header}</p>
          <p className={`text-[#364152]`}>{subheader}</p>
        </div>
        <div>
          <PeriodRadios />
        </div>
      </div>
      <div>
        <Table />
      </div>
    </>
  );
}

export default Index;
