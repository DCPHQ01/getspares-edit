"use client";
import React from "react";
import Header from "../../components/ui/header";
import Cards from "../../../../components/cards";
import PeriodRadios from "../../components/ui/periodradios";
import OverviewTable from "../../components/table/vendoradmin/overview";
import Addbutton from "../../components/ui/addbutton";
import Link from "next/link";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { paths } from "../../../../path/paths";

function VendorOverview() {
  const userName = JSON.parse(sessionStorage.getItem("userDetails") || "");
  const usersFirstName = userName?.firstName;
  return (
    <>
      <div>
        <div className={`flex justify-between items-center`}>
          <Header
            subtitle={`Take a quick glance on what is happening with meca`}
            name={usersFirstName}
          />
          <Link href={paths.toModalPage()} className="font-semibold">
            <Addbutton title={`Update Company`} />
          </Link>
        </div>
        {/* <Cards /> */}

        <OverviewTable />
      </div>
    </>
  );
}

export default VendorOverview;
