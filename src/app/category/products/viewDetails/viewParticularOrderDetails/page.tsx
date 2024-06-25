"use client";
import { MdChevronRight } from "react-icons/md";
import ViewParticularOrderTable from "../../../../dashboard/components/table/buyerAdmin/viewParticularOrderTable";
import { useGetOrderDetailsQuery } from "../../../../../redux/features/dashboard/buyerQuery";
import { useEffect, useState } from "react";


interface OrderItem {
  price: number;
  productId: string;
  productImage: string;
  productName: string;
  quantity: number;
  avatar?: any;
}

interface OrderInfo {
  orderDate: string;
  deliveryAddress: any;
  orderItems: OrderItem[];
}

interface ViewParticularOrderDetailsPageProps {
  orderId: string;
}

const ViewParticularOrderDetailsPage: React.FC<ViewParticularOrderDetailsPageProps> = ({ orderId }) => {
  // const [orderId, setOrderId] = useState<string | null>(null);

  // useEffect(() => {
    // const storedOrderId = sessionStorage.getItem("selectedOrderId");
    // console.log("Stored Order ID:", storedOrderId);
    // if (storedOrderId) {
  //     setOrderId(storedOrderId);
  //   }
  // }, []);
  
  const { data, isLoading } = useGetOrderDetailsQuery({ orderId });
  console.log("data for order details", data);

  const [orderDetails, setOrderDetails] = useState<OrderInfo>({
    orderDate: "",
    deliveryAddress: {},
    orderItems: [],
  });

  useEffect(() => {
    if (data) {
      console.log("Received data for order details:", data);
      const resultList = data?.data;
      if (resultList) {
        setOrderDetails(resultList);
      } else {
        console.error("Failed to show order details", resultList);
      }
    }
  }, [data]);

  console.log("The orderDetails:", orderDetails);

  return (
    <div className="">
      <div>
        <div className="">
          <h1 className="ml-10 mt-5 flex text-base  gap-x-3">
            <div className="">Orders</div>
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

export default ViewParticularOrderDetailsPage;
