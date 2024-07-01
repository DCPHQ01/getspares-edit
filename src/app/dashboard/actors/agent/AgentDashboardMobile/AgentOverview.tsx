"use client";
import React, { useState } from "react";
import Header from "../../../components/ui/header";
import Cards from "../../../components/ui/cards";
import PeriodRadios from "../../../components/ui/periodradios";
import OverviewTable from "../../../components/table/agentAdmin/overviewTable";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

function AgentOverview() {
  // @ts-ignore
  const [activityPeriod, setActivityPeriod] = useState("month");
  const handlePeriodChange = () => {
    setActivityPeriod((prevValue) => (prevValue === 'month' ? 'year' : 'month'));
  };

  const userName = JSON.parse(sessionStorage.getItem("userDetails") || "");
  const usersFirstName = userName?.firstName;

  return (
    <>
      <div>
        <Header
          subtitle={`Take a quick glance on what is happening with meca`}
          name={usersFirstName}
        />
        <div className="mt-5">
          {/* <Cards /> */}
        </div>
        <div
          className={`justify-between items-center mt-[3.25rem] mb-[1.25rem]`}
        >
          <Header
            subtitle={`A quick glance on parts with highest sales on meca`}
            title={`Recently sold parts`}
          />
          <div className="mt-5">
            <PeriodRadios activityPeriod={activityPeriod} onPeriodChange={handlePeriodChange}/>
          </div>
        </div>

        <OverviewTable />
        <div className=" flex justify-between mt-10 mb-10 font-bold text-lg">
          <button className="flex gap-x-2 border border-[#EAECF0]  rounded-md h-[36px] w-[36px] pl-1">
            <MdChevronLeft className="mt-1 text-2xl" />
          </button>
          <button className="flex gap-x-2 border border-[#EAECF0] rounded-md h-[36px] w-[36px] pl-1">
            <MdChevronRight className="mt-1 text-2xl" />
          </button>
        </div>
      </div>
    </>
  );
}

export default AgentOverview;
