import React from "react";
import Header from "../../components/ui/header";
import Tabs from "../../components/ui/tabs";
import SortButton from "../../components/ui/sortbutton";
import SearchBox from "../../components/ui/searchbox";
import PeriodRadios from "../../components/ui/periodradios";
import VendorAgentTable from "../../components/table/vendoradmin/vendorAgentTable";
import {MdChevronLeft, MdChevronRight, MdInventory2} from "react-icons/md";

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
         />
        <div className={`flex gap-3`}>
          <SearchBox />
        </div>
      </div>

       <div className="right-[100%] left-[100%] flex flex-col justify-center items-center pt-32 leading-10">
          <div className=" h-28">
             <div className="w-[5.6rem] h-[5.6rem] bg-blue-100 flex justify-center items-center rounded-full">
                <MdInventory2 style={{fontSize:"2rem", color:"#0852C0"}}/>
             </div>
          </div>
          <h1 className="text-xl text-gray-500">No agents associated yet</h1>
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
