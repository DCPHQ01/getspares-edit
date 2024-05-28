import React from "react";
import Header from "../../components/ui/header";
import Addbutton from "../../components/ui/addbutton";
import PeriodRadios from "../../components/ui/periodradios";
import Searchbox from "../../components/ui/searchbox";
import VendorTable from "../../components/table/agentAdmin/vendorTable";

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
    </>
  );
}

export default Vendors;
