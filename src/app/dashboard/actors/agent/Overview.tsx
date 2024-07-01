"use client";
import React, {useState} from "react";
import Header from "../../components/ui/header";
import Cards from "../../../../components/cards";
import PeriodRadios from "../../components/ui/periodradios";
import OverviewTable from "../../components/table/agentAdmin/overviewTable";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

function Overview() {
  const [activityPeriod, setActivityPeriod] = useState("month");
  const handlePeriodChange = () => {
    setActivityPeriod((prevValue: string) => (prevValue === 'month' ? 'year' : 'month'));
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
        {/* <Cards cardProps={}/> */}
        <div
          className={`flex justify-between items-center mt-[3.25rem] mb-[1.25rem]`}
        >
          <div>
            <Header
                subtitle={`A quick glance on parts with highest sales on meca`}
                title={`Recently sold parts`}
            />
          </div>

          <PeriodRadios activityPeriod={activityPeriod} onPeriodChange={handlePeriodChange} />
        </div>

        <OverviewTable />

        {/* <div className="flex justify-between mt-10 text-mecaBluePrimaryColor font-bold text-lg">
          <button className="flex gap-x-2">
            <MdChevronLeft className="mt-1 text-2xl" /> <span>Previous</span>
          </button>
          <button className="flex gap-x-2">
            <MdChevronRight className="mt-1 text-2xl" /> <span>Next</span>
          </button>
        </div> */}
      </div>
    </>
  );
}

export default Overview;
