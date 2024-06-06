import React from "react";
import Header from "../../../components/ui/header";
import Tabs from "../../../components/ui/tabs";
import SortButton from "../../../components/ui/sortbutton";
import SearchBox from "../../../components/ui/searchbox";
import PeriodRadios from "../../../components/ui/periodradios";
import VendorAgentTable from "../../../components/table/vendoradmin/vendorAgentTable";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

function AgentVendorMobile() {
  const tabs = [
    { label: "All", count: "22" },
    { label: "Made sales", count: "122" },
    { label: "Not made sales", count: "122" },
  ];
  return (
    <>
      <Header
        subtitle={`Keep track your agents and their transactions`}
        title={`Agents`}
        amount={`430,607`}
      />
      <div className={` justify-between items-center my-[1.5rem]`}>
        <Tabs tabs={tabs} />
        <div className={` flex mt-5`}>
          <div className="">
            <SortButton />
          </div>
          
            <SearchBox />
         
        </div>
      </div>
      <div className={`justify-between items-center gap-3`}>
        <Header
          subtitle={`A quick glance on agents performance`}
          title={`Top performing agents`}
        />
        <div className="mt-5">
          <PeriodRadios />
        </div>
      </div>

      <VendorAgentTable />

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

export default AgentVendorMobile;
