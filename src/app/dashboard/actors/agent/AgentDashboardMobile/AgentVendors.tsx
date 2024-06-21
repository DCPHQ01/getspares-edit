import React, { useState } from "react";
import Header from "../../../components/ui/header";
import Addbutton from "../../../components/ui/addbutton";
import PeriodRadios from "../../../components/ui/periodradios";
import Searchbox from "../../../components/ui/searchbox";
import VendorTable from "../../../components/table/agentAdmin/vendorTable";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

function AgentVendors() {
  const [activityPeriod, setActivityPeriod] = useState("monthly"); 
  const handlePeriodChange = (newPeriod: string) => {
    setActivityPeriod(newPeriod);
  };
  return (
    <>
      <div className={`items-center justify-between mb-[1.5rem]`}>
        <Header
          subtitle={`Keep track of associated vendors and their sales performance`}
          title={`Vendors`}
          amount={`567,098`}
        />
        <div className="mt-5">
          <Addbutton title={`Add vendor`} />
        </div>
      </div>
      <div className={`flex flex-col-reverse`}>
        <PeriodRadios activityPeriod={activityPeriod} onPeriodChange={handlePeriodChange} />
        <div className="mb-5">
          <Searchbox />
        </div>
      </div>

      <VendorTable />
      <div className=" flex justify-between mt-10 mb-10 font-bold text-lg">
        <button className="flex gap-x-2 border border-[#EAECF0]  rounded-md h-[36px] w-[36px] pl-1">
          <MdChevronLeft className="mt-1 text-2xl" />
        </button>
        <button className="flex gap-x-2 border border-[#EAECF0] rounded-md h-[36px] w-[36px] pl-1">
          <MdChevronRight className="mt-1 text-2xl" />
        </button>
      </div>
    </>
  );
}

export default AgentVendors;
