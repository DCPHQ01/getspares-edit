import React from "react";
import BuyerCard from "../../../components/ui/buyercard";
import Header from "../../../components/ui/header";
import OverviewTable from "../../../components/table/buyerAdmin/overviewTable";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Card } from "@mui/material";

function BuyerOverviewMobile() {
  return (
    <>
      <div
        className={`flex items-center justify-between relative bottom-5 -z-50`}
      >
        <p className={`font-semibold text-[1.9rem]`}>Recently added parts</p>
        <i className={`underline text-[#095AD3]`}>View more</i>
      </div>
      <div className={` mb-[4rem]  w-[100%] truncate`}>
        <BuyerCard />
      </div>
      <Header
        subtitle={`Keep track of your orders on meca`}
        title={`Orders`}
        amount={`470,765`}
      />

      <OverviewTable />

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

export default BuyerOverviewMobile;
