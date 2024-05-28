"use client";
import React from "react";
import Header from "../../components/ui/header";
import Cards from "../../components/ui/cards";
import PeriodRadios from "../../components/ui/periodradios";
import OverviewTable from "../../components/table/vendoradmin/overview";
import Addbutton from "../../components/ui/addbutton";
import Link from "next/link";

function Overview() {
  return (
    <>
      <div>
        <div className={`flex justify-between items-center`}>
          <Header
            subtitle={`Take a quick glance on what is happening with meca`}
            name={`Ayodeji`}
          />
          <Link href="/modalPage">
            <Addbutton title={`Add company`} />
          </Link>
        </div>
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
      </div>
    </>
  );
}

export default Overview;
