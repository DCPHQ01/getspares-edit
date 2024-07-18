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
        amount={`0`}
      />
      {/* <div className="mt-5">
        <Searchbox />
      </div> */}
      <Order />
    </div>
  );
}

export default AgentOrder;
