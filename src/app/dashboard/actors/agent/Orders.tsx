import React from "react";
import Header from "../../components/ui/header";
import Searchbox from "../../components/ui/searchbox";
import Order from "../../components/table/agentAdmin/order";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

function Orders() {
  return (
    <div className={`flex flex-col`}>
      <Header
        subtitle={`Keep track of orders, items ordered and their transaction values.`}
        title={`Orders`}
        amount={`430,607`}
      />
      <div className="mt-5 flex justify-end">
        <Searchbox />
      </div>
      <Order />

      <div className="flex justify-end mt-10 text-mecaBluePrimaryColor font-bold text-lg">
        {/* <button className="flex gap-x-2">
          <MdChevronLeft className="mt-1 text-2xl" /> <span>Previous</span>
        </button> */}
        <button className="flex  gap-x-2">
          <span>Next</span>
          <MdChevronRight className="mt-[2px] text-2xl" />
        </button>
      </div>
    </div>
  );
}

export default Orders;
