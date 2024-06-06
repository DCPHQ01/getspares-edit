import React from "react";
import Header from "../../components/ui/header";
import Addbutton from "../../components/ui/addbutton";
import PeriodRadios from "../../components/ui/periodradios";
import Searchbox from "../../components/ui/searchbox";
import VendorTable from "../../components/table/agentAdmin/vendorTable";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

function Vendors() {
  return (
    <>
      <div className={`flex items-center justify-between mb-[1.5rem]`}>
        <Header
          subtitle={`Keep track of associated vendors and their sales performance`}
          title={`Vendors`}
          amount={`567,098`}
        />
        <Addbutton title={`Add vendor`} />
      </div>
      <div className={`flex justify-between items-center`}>
        <PeriodRadios />
        <Searchbox />
      </div>

      <VendorTable />

      <div className="flex justify-between mt-10 text-mecaBluePrimaryColor font-bold text-lg">
        <button className="flex gap-x-2">
          <MdChevronLeft className="mt-1 text-2xl" /> <span>Previous</span>
        </button>
        <button className="flex gap-x-2">
          <MdChevronRight className="mt-1 text-2xl" /> <span>Next</span>
        </button>
      </div>
    </>
  );
}

export default Vendors;
