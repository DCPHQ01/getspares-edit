import React, { useState } from "react";
import Header from "../../../components/ui/header";
import Addbutton from "../../../components/ui/addbutton";
import PeriodRadios from "../../../components/ui/periodradios";
import Searchbox from "../../../components/ui/searchbox";
import VendorTable from "../../../components/table/agentAdmin/vendorTable";

function AgentVendors() {
  const [activityPeriod, setActivityPeriod] = useState("month");

  return (
    <>
      <div className={`items-center justify-between mb-[1.5rem]`}>
        <Header
          subtitle={`Keep track of associated vendors and their sales performance`}
          title={`Vendors`}
          amount={`0`}
        />
      </div>
      <div className={`flex flex-col-reverse`}>
        <div className="mb-5">
          <Searchbox />
        </div>
      </div>

      <VendorTable />
    </>
  );
}

export default AgentVendors;
