"use client";
import React, { useEffect, useState } from "react";
import Header from "../../dashboard/components/ui/header";
import Cards from "../../../components/cards";
import PeriodRadios from "../../dashboard/components/ui/periodradios";
import OverviewTable from "../../dashboard/components/table/mecaadmin/overview";
import {
  MdArrowBack,
  MdArrowForward,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";
import { useGetOverviewMecaAdminQuery } from "../../../redux/features/dashboard/mecaAdminQuery";

function Overview() {
  const [roles, setRoles] = useState("");
  const [name, setName] = useState("");
  useEffect(() => {
    const role =
      typeof window !== "undefined" && window.sessionStorage
        ? JSON.parse(sessionStorage.getItem("userDetails") || "{}")
        : [];
    setRoles(role.role);
    setName(role.firstName);
  }, []);

  console.log("roles ", roles);
  const { data } = useGetOverviewMecaAdminQuery({
    roleName: roles,
    pageNumber: 1,
    pageSize: 10,
  });
  console.log("data here ", data);
  return (
    <>
      <div>
        <Header
          subtitle={`Take a quick glance on what is happening with meca`}
          name={`, ${name}`}
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
