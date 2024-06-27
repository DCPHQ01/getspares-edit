"use client";
import { useState, useEffect } from 'react';
import engine from "../../../../../assets/dashboardAssets/engine.png";
// import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import { formatAmount2 } from '../../../../../components/utils';
import { useGetOverviewRecentProductImageQuery } from "../../../../../redux/features/dashboard/buyerQuery";

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

const Index = () => {
  const { data, isError, isLoading } = useGetOverviewRecentProductImageQuery({});
  const [imageList, setImageList] = useState<RecentProductImages[]>([]);
  
  useEffect(() => {
    if (data && Array.isArray(data.data)) {
      setImageList(data.data);
    }
  }, [data]);

  console.log("Images ata the top data: ", data)

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;
  if (!data || !Array.isArray(data.data) || data.data.length === 0) return <div>No data available</div>;

  const imageLists = imageList.slice(0, 3);

  return (
    <div className="flex gap-x-5 justify-between overflow-y-scroll scrollbar-none">
      {imageLists.map((detail, index) => (
        <div key={index} className="lg:w-[22rem]">
          <div className="px-[1.2rem] py-[1.3rem] bg-[#F8FAFC] flex justify-center rounded-[8px] mb-[1rem]">
            <img src={detail.image} alt="engine" />
          </div>
          <div className="flex justify-between mb-[1rem]">
            {/* <p>{detail.name}</p> */}
            {/* <div className="border rounded-full px-[0.5rem] inline-block">
              <div className="flex gap-1 items-center">
                <FaStar color="#FEC84B" />
                <p>{detail.quantity}</p>
              </div>
            </div> */}
          </div>
          <p className="border rounded-full px-[0.5rem] inline-block">
            {formatAmount2(detail.price)}
            {/* <p>{detail.price}</p> */}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Index;
