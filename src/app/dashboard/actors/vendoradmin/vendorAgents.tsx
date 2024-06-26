import React from "react";
import Header from "../../components/ui/header";
import Tabs from "../../components/ui/tabs";
import SortButton from "../../components/ui/sortbutton";
import SearchBox from "../../components/ui/searchbox";
import PeriodRadios from "../../components/ui/periodradios";
import VendorAgentTable from "../../components/table/vendoradmin/vendorAgentTable";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

function VendorAgents() {
  const tabs = [
    { label: "With sales ", count: 0,status: "with_sales" },
    { label: "Without sales ", count: 0, status: "without_sales" },
  ];
  return (
    <>
      <Header
        subtitle={`Keep track your agents and their transactions`}
        title={`Agents`}
        amount={`0`}
      />
      <div className={`flex justify-between items-center my-[1.5rem]`}>
        <Tabs
         tabs={tabs} 
         activeTab="with_sales"
         onTabChange={(status) => console.log(status)}
         />
        {/* <div className={`flex gap-3`}>
          <SearchBox />
        </div> */}
      </div>

      {/* <VendorAgentTable /> */}

      <div className="flex justify-end mt-10 text-mecaBluePrimaryColor font-bold text-lg">
        {/* <button className="flex gap-x-2">
            <MdChevronLeft className="mt-1 text-2xl" /> <span>Previous</span>
          </button> */}
        {/* <button className="flex gap-x-2">
          Next
          <span>
            <MdChevronRight className="mt-[4px] text-2xl" />{" "}
          </span>
        </button> */}
      </div>
    </>
  );
}

export default VendorAgents;
