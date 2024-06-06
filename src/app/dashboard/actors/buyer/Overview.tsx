import React from "react";
import BuyerCard from "../../components/ui/buyercard";
import Header from "../../components/ui/header";
import OverviewTable from "../../components/table/buyerAdmin/overviewTable";

function Overview() {
  return (
    <>
      <div className={`flex items-center justify-between relative bottom-5`}>
        <p className={`font-semibold text-[1.9rem]`}>Recently added parts</p>
        <i className={`underline text-[#095AD3]`}>View more</i>
      </div>
      <div className={` mb-[4rem]`}>
        <BuyerCard />
      </div>
      <Header
        subtitle={`Keep track of your orders on meca`}
        title={`Orders`}
        amount={`470,765`}
      />

      <OverviewTable />
    </>
  );
}

export default Overview;
