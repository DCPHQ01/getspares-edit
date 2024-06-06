import React from "react";
import Header from "../../../components/ui/header";
import Searchbox from "../../../components/ui/searchbox";
import Order from "../../../components/table/agentAdmin/order";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

function AgentOrder() {
  return (
    <div className={`flex flex-col`}>
      <Header
        subtitle={`Keep track of orders, items ordered and their transaction values.`}
        title={`Orders`}
        amount={`430,607`}
      />
      <div className="mt-5">
        <Searchbox />
      </div>
      <Order />

      <div className=" flex justify-between mt-10 mb-10 font-bold text-lg">
        <button className="flex gap-x-2 border border-[#EAECF0]  rounded-md h-[36px] w-[36px] pl-1">
          <MdChevronLeft className="mt-1 text-2xl" />
        </button>
        <button className="flex gap-x-2 border border-[#EAECF0] rounded-md h-[36px] w-[36px] pl-1">
          <MdChevronRight className="mt-1 text-2xl" />
        </button>
      </div>
    </div>
  );
}

export default AgentOrder;
