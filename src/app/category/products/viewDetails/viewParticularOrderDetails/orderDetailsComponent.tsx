import React, { useEffect, useState } from "react";
import { MdChevronRight } from "react-icons/md";
import ViewParticularOrderTable from "../../../../dashboard/components/table/buyerAdmin/viewParticularOrderTable";
import { useGetOrderDetailsQuery } from "../../../../../redux/features/dashboard/buyerQuery";
import { useRouter } from "next/navigation";

const OrderDetailsComponent = () => {
  const [id, setId] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    const storedId = sessionStorage.getItem("selectedOrderId");
    if (storedId) {
      setId(storedId);
    }
  }, []);

  const { data, isLoading } = useGetOrderDetailsQuery(
    { id: id || "" },
    { skip: !id }
  );

  const [orderDetails, setOrderDetails] = useState({
    orderDate: "",
    deliveryAddress: {},
    orderItems: [],
  });

  const router = useRouter();

  useEffect(() => {
    if (data) {
      const resultList = data?.data;
      if (resultList) {
        setOrderDetails(resultList);
        setOrderId(resultList.orderId);
      } else {
        console.error("Failed to show order details", resultList);
      }
    }
  }, [data]);

  const handleRouteToOrder = () => {
    router.push("/dashboard/buyer/orders");
  };

  return (
    <div className="">
      <div>
        <div className="">
          <h1 className="ml-10 mt-5 flex text-base gap-x-3">
            <div className="cursor-pointer" onClick={handleRouteToOrder}>
              Orders
            </div>
            <div className="flex text-mecaGrayBodyText font-light ">
              <MdChevronRight className="mt-1" /> <span> order details</span>
            </div>
          </h1>
        </div>
        <div className="">
          <h1 className="ml-10 pt-20 text-xl">Order ID: {orderId} </h1>
        </div>
        <div className="mt-5">
          <ViewParticularOrderTable data={orderDetails} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsComponent;
