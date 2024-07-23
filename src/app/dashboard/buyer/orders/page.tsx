"use client";
import React, { useEffect, useState } from "react";
import Header from "../../components/ui/header";
import Searchbox from "../../components/ui/searchbox";
import OrderTable from "../../components/table/buyerAdmin/orderTable";
import { useGetViewAllOrdersQuery } from "../../../../redux/features/dashboard/buyerQuery";
import { MdBusinessCenter } from "react-icons/md";

function Orders() {
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const { data, isLoading } = useGetViewAllOrdersQuery({ pageNo, pageSize });
  const [totalElement, setTotalElement] = useState(0);

  const [buyerOrderList, setBuyerOrderList] = useState([]);
  useEffect(() => {
    if (data) {
      const resultList = data?.data?.content;
      setTotalElement(data.data?.totalElements);
      if (resultList) {
        setBuyerOrderList(resultList);
        setTotalElements(resultList.totalElements);
      } else {
        console.error("Failed to show buyer order", resultList);
      }
    }
  }, [data]);
  return (
    <div className={`flex flex-col gap-6`}>
      <Header
        subtitle={`Keep track of orders, items ordered and their transaction values.`}
        title={`Orders`}
        amount={totalElement}
      />
      <OrderTable data={buyerOrderList} isLoading={isLoading} />
    </div>
  );
}

export default Orders;
