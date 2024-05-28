import React from "react";
import Header from "../../components/ui/header";
import Searchbox from "../../components/ui/searchbox";
import OrderTable from "../../components/table/buyerAdmin/orderTable";

function Orders() {
  return (
    <div className={`flex flex-col gap-6`}>
      <Header
        subtitle={`Keep track of orders, items ordered and their transaction values.`}
        title={`Orders`}
        amount={`430,607`}
      />
      <Searchbox />

      <OrderTable />
    </div>
  );
}

export default Orders;
