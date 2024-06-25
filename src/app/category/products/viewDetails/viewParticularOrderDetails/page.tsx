
import { MdChevronRight } from "react-icons/md";
import ViewParticularOrderTable from "../../../../dashboard/components/table/buyerAdmin/viewParticularOrderTable";
import Order from "../../../../dashboard/components/table/agentAdmin/order";
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
  orderId: string;
  orderDate: string;
  deliveryAddress: any;
  orderItems: OrderItem[];
};

const ViewParticularOrderDetailsPage = ({ orderId }: { orderId: string }) => {
  const {data, isLoading} = useGetOrderDetailsQuery({ orderId });
  console.log("data for order details", data);

  const [orderDetails, setOrderDetails] = useState<OrderInfo>({
    orderId: "",
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
          <ViewParticularOrderTable data={orderDetails} isLoading={isLoading}/>
        </div>
      </div>
    </div>
  );
};

export default ViewParticularOrderDetailsPage;
