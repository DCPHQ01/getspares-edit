import React, { useEffect, useState } from "react";
import Header from "../../components/ui/header";
import Searchbox from "../../components/ui/searchbox";
import OrderTable from "../../components/table/buyerAdmin/orderTable";
import { useGetViewAllOrdersQuery } from "../../../../redux/features/dashboard/buyerQuery";
import { MdBusinessCenter } from "react-icons/md";

function Orders() {
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const {data, isLoading} = useGetViewAllOrdersQuery({pageNo, pageSize});
  console.log("data for orders", data);
  const [totalElement, setTotalElement] = useState(0);

  const [buyerOrderList, setBuyerOrderList] = useState([]);
  useEffect(() => {
    if (data) {
      console.log("Received data structure:", data);
      const resultList = data?.data?.content;
      setTotalElement(data.data?.totalElements);
      if (resultList) {
        setBuyerOrderList(resultList);
      } else {
        console.error("Failed to show buyer order", resultList);
      }
    }
  }, [data]);
  console.log("The buyerOrderList:", buyerOrderList);
  return (
    <div className={`flex flex-col gap-6`}>
      <Header
        subtitle={`Keep track of orders, items ordered and their transaction values.`}
        title={`Orders`}
        amount={totalElement}
      />
      <div className="flex justify-end">
        <Searchbox />
      </div>
      {!isLoading && buyerOrderList.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64">
          <MdBusinessCenter size={50} color="blue" style={{ border: '1px solid #D1E0FF'}}/>
          <p className="text-xl font-semibold">No order is here yet</p>
        </div>
      ) : (
        <OrderTable data={buyerOrderList} isLoading={isLoading} />
      )}
    </div>
   
  );
}

export default Orders;
