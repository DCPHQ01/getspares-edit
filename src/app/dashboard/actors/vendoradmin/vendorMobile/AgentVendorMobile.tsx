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
    { label: "With sales ", count: 122, status: "with_sales" },
    { label: "Without sales ", count: 122, status: "without_sales" },
  ];
  return (
    <>
      <Header
        subtitle={`Keep track your agents and their transactions`}
        title={`Agents`}
        amount={`0`}
      />
      <div className={` justify-between items-center my-[1.5rem]`}>
        <Tabs
          tabs={tabs}
          activeTab="with_sales"
          onTabChange={(status) => status}
        />
        {/* <div className={` flex mt-5`}> */}
        {/* <div className=""><SortButton /></div> */}

        {/* <SearchBox />
        </div> */}
      </div>

      <VendorAgentTable />

      <div className=" flex justify-end mt-10 mb-10 font-bold text-lg">
        {/* <button className="flex gap-x-2 border border-[#EAECF0]  rounded-md h-[36px] w-[36px] pl-1">
          <MdChevronLeft className="mt-1 text-2xl" />
        </button> */}
        <button
          title="right"
          className="flex gap-x-2 border border-[#EAECF0] rounded-md h-[36px] w-[36px] pl-1"
        >
          <MdChevronRight className="mt-1 text-2xl" />
        </button>
      </div>
    </>
  );
}

export default AgentVendorMobile;
