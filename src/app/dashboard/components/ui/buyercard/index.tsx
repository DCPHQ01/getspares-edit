"use client";
import { useState, useEffect } from "react";
import engine from "../../../../../assets/dashboardAssets/engine.png";
// import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import { useGetOverviewRecentProductImageQuery } from "../../../../../redux/features/dashboard/buyerQuery";
import Details from "../../../../category/products/viewDetails/[details]/page";
import { formatAmount2, formatAmount3 } from "../../../../../components/utils";
import TruncateText from "../../../../../components/utils/utils";

interface RecentProductImages {
  id: string;
  name: string;
  categoryName: string;
  dateCreated: string;
  companyId: number;
  quantity: number;
  companyName: string;
  brand: string;
  condition: string;
  image: string;
  price: string;
  model: string;
}

interface OrderInfo {
  orderId?: string;
  orderDate: string;
  deliveryAddress: any;
  orderItems: RecentProductImages[];
}

const Index = () => {
  const { data, isError, isLoading } = useGetOverviewRecentProductImageQuery(
    {}
  );
  const [imageList, setImageList] = useState<RecentProductImages[]>([]);
  const [details, setDetails] = useState(false);

  useEffect(() => {
    if (data && Array.isArray(data.data)) {
      setImageList(data.data);
    }
  }, [data]);

  console.log("Images at the top data: ", data);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;
  if (!data || !Array.isArray(data.data) || data.data.length === 0)
    return <div>No data available</div>;

  const imageLists = imageList.slice(0, 3);

  const handleParticularDetails = () => {
    setDetails(!details);
  };

  return (
    <div className=" flex gap-x-5 justify-between scrollbar-none">
      {imageLists.map((detail, index) => (
        <div
          key={index}
          className="lg:w-[22rem]"
          // onClick={handleParticularDetails}
        >
          <div className="px-[1.2rem] py-[1.3rem] w-[353px] h-[287px] bg-[#F8FAFC] flex justify-center rounded-[8px] mb-[1rem]">
            <img
              src={detail.image}
              alt="engine"
              className="w-[315px] h-[247]"
            />
          </div>
          <div className="flex justify-between mb-[1rem]">
            <p>{<TruncateText text={detail.name} maxLength={15} />}</p>
            <div className="border rounded-full px-[0.5rem] inline-block">
              <div className="flex gap-1 items-center">
                <FaStar color="#FEC84B" />
                <p>{detail.quantity}</p>
              </div>
            </div>
          </div>
          <p className="border rounded-full px-[0.5rem] inline-block">
            {formatAmount3(detail.price)}
            {/* <p>{detail.price}</p> */}
          </p>
        </div>
      ))}
      {/* {details && (
        <div className=" pl-[16%] absolute inset-0 w-full h-full bg-white z-index">
          <Details />
        </div>
      )} */}
    </div>
  );
};

export default Index;
