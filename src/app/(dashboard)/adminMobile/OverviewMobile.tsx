"use client";
import React from "react";
import Header from "../../dashboard/components/ui/header";
import Cards from "../../dashboard/components/ui/cards/index";
import PeriodRadios from "../../dashboard/components/ui/periodradios";
import OverviewTable from "../../dashboard/components/table/mecaadmin/overview";
import {
  MdArrowBack,
  MdArrowForward,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";

function Overview() {
  return (
    <>
      <div>
        <Header
          subtitle={`Take a quick glance on what is happening with meca`}
          name={`Welcome Sam`}
        />
        <div className="lg:flex flex-col mt-10">
          <Cards />
        </div>
        <div
          className={`lg:flex flex-col justify-between items-center mt-[3.25rem] mb-[1.25rem]`}
        >
          <Header
            subtitle={`A quick glance on vendors with highest sales on meca`}
            title={`Top performing vendors`}
          />
          <div className="mt-5">
            <PeriodRadios />
          </div>
        </div>
        {/* <OverviewTable /> */}

        {/* <div className=" flex justify-between mt-10 mb-10 font-bold text-lg">
          <button className="flex gap-x-2 border border-[#EAECF0]  rounded-md h-[36px] w-[36px] pl-1">
            <MdChevronLeft className="mt-1 text-2xl" />
          </button>
          <button className="flex gap-x-2 border border-[#EAECF0] rounded-md h-[36px] w-[36px] pl-1">
            <MdChevronRight className="mt-1 text-2xl" />
          </button>
        </div> */}
      </div>
    </>
  );
}

export default Overview;
