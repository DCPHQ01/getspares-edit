import React, { useState } from "react";
import Header from "../../components/ui/header";
import Addbutton from "../../components/ui/addbutton";
import PeriodRadios from "../../components/ui/periodradios";
import Searchbox from "../../components/ui/searchbox";
import VendorTable from "../../components/table/agentAdmin/vendorTable";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

function Vendors() {
  const [activityPeriod, setActivityPeriod] = useState("month");
  const handlePeriodChange = () => {
    setActivityPeriod((prevValue) =>
      prevValue === "month" ? "year" : "month"
    );
  };

  return (
    <>
      <div className={`items-center mb-[1.5rem]`}>
        <Header
          subtitle={`Keep track of associated vendors and their sales performance`}
          title={`Vendors`}
          amount={`0`}
        />
        {/* <Addbutton title={`Add vendor`} /> */}
      </div>
      <div className={`flex justify-end items-center`}>
        <Searchbox />
      </div>

      <VendorTable />
    </>
  );
}

export default Vendors;
