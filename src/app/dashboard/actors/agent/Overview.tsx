"use client";
import React, { useEffect, useState } from "react";
import Header from "../../components/ui/header";
import Cards from "../../../../components/cards";
import PeriodRadios from "../../components/ui/periodradios";
import OverviewTable from "../../components/table/agentAdmin/overviewTable";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

function Overview() {
  const [activityPeriod, setActivityPeriod] = useState("monthly");

  const [name, setName] = useState("");

  const handlePeriodChange = () => {
    setActivityPeriod((prevValue) =>
      prevValue === "month" ? "year" : "month"
    );
  };

  useEffect(() => {
    const role =
      typeof window !== "undefined" && window.sessionStorage
        ? JSON.parse(sessionStorage.getItem("userDetails") || "{}")
        : [];
    setName(role.firstName);
  }, []);
  return (
    <>
      <div>
        <Header
          subtitle={`Take a quick glance on what is happening with meca`}
          name={name}
        />
        {/* <Cards cardProps={}/> */}
        <div
          className={`flex justify-between items-center mt-[3.25rem] mb-[1.25rem]`}
        >
          <Header title={`Recently sold parts`} />
          {/* <PeriodRadios
            activityPeriod={activityPeriod}
            onPeriodChange={handlePeriodChange}
          /> */}
        </div>

        <OverviewTable />
      </div>
    </>
  );
}

export default Overview;
