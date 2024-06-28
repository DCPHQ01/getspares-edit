import React, { useEffect, useState } from "react";
import Header from "../../../components/ui/header";
import Searchbox from "../../../components/ui/searchbox";
import OrderTable from "../../../components/table/buyerAdmin/orderTable";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useGetViewAllOrdersQuery } from "../../../../../redux/features/dashboard/buyerQuery";

function BuyerOrderMobile() {
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const {data, isLoading} = useGetViewAllOrdersQuery({pageNo, pageSize});

  const [buyerOrderList, setBuyerOrderList] = useState([]);
  useEffect(() => {
    if (data) {
      const resultList = data?.data?.content;
      if (resultList) {
        setBuyerOrderList(resultList);
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
        amount={`430,607`}
      />
      <Searchbox />
      <OrderTable data={buyerOrderList} isLoading={isLoading}/>

      <div className=" flex justify-end mt-10 mb-10 font-bold text-lg">
        {/* <button className="flex gap-x-2 border border-[#EAECF0]  rounded-md h-[36px] w-[36px] pl-1">
          <MdChevronLeft className="mt-1 text-2xl" />
        </button> */}
        <button className="flex gap-x-2 border border-[#EAECF0] rounded-md h-[36px] w-[36px] pl-1">
          <MdChevronRight className="mt-1 text-2xl" />
        </button>
      </div>
    </div>
  );
}

export default BuyerOrderMobile;
