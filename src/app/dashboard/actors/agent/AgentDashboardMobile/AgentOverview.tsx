"use client";
import React, { useEffect, useState } from "react";
import Header from "../../../components/ui/header";
import Cards from "../../../components/ui/cards";
import PeriodRadios from "../../../components/ui/periodradios";
import OverviewTable from "../../../components/table/agentAdmin/overviewTable";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

function AgentOverview() {
  const [activityPeriod, setActivityPeriod] = useState("month");
  const handlePeriodChange = () => {
    setActivityPeriod((prevValue) =>
      prevValue === "month" ? "year" : "month"
    );
  };

  const [name, setName] = useState("");

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

        <div
          className={`justify-between items-center mt-[3.25rem] mb-[1.25rem]`}
        >
          <Header
            subtitle={`A quick glance on parts with highest sales on meca`}
            title={`Recently sold parts`}
          />
        </div>

        <OverviewTable />
      </div>
    </>
  );
}

export default AgentOverview;
