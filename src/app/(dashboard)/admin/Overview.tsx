"use client";
import React from "react";
import Header from "../../dashboard/components/ui/header";
import Cards from "../../dashboard/components/ui/cards";
import PeriodRadios from "../../dashboard/components/ui/periodradios";
import OverviewTable from "../../dashboard/components/table/mecaadmin/overview";
import { MdArrowBack, MdArrowForward, MdChevronLeft, MdChevronRight } from "react-icons/md";

function Overview() {
  return (
    <>
      <div>
        <Header
          subtitle={`Take a quick glance on what is happening with meca`}
          name={`Welcome Sam`}
        />
        <Cards />
        <div
          className={`flex justify-between items-center mt-[3.25rem] mb-[1.25rem]`}
        >
          <Header
            subtitle={`A quick glance on vendors with highest sales on meca`}
            title={`Top performing vendors`}
          />
          <PeriodRadios />
        </div>
        <OverviewTable />

        <div className="flex justify-between mt-10 text-mecaBluePrimaryColor font-bold text-lg">
          <button className="flex gap-x-2">
            <MdChevronLeft className="mt-1 text-2xl" /> <span>Previous</span>
          </button>
          <button className="flex gap-x-2">
            <MdChevronRight className="mt-1 text-2xl" /> <span>Next</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Overview;
