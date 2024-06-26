"use client";
import { useState, useEffect } from 'react'
import engine from "../../../../../assets/dashboardAssets/engine.png";
// import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import { useGetOverviewRecentProductImageQuery } from "../../../../../redux/features/dashboard/buyerQuery";


interface RecentProductImages {
  id: string;
  name: string;
  categoryName: string;
  dateCreated: string;
  companyId: number;
  quantity: number;
  companyName: number;
  brand: string;
  condition: string;
  image: string;
  price: number;
  model: string;
}

// const details = [
//   {
//     image: engine,
//     name: "E46 Engine 1996 Model",
//     rating: 2,
//     price: "67,800.00",
//   },
//   {
//     image: engine,
//     name: "X25 Engine 2000 Model",
//     rating: 4,
//     price: "70,000.00",
//   },
//   {
//     image: engine,
//     name: "E49 Engine 1998 Model",
//     rating: 5,
//     price: "86,800.00",
//   },
// ];


const Index =()=> {
  const {data, isError} = useGetOverviewRecentProductImageQuery({});
const [imageList, setImageList] = useState<RecentProductImages[]>([]);
console.log("The buyerOverview: ",data)

interface ImagesProps {
  imagesList: RecentProductImages[];
}

useEffect(()=>{
  if(data && Array.isArray(data.data)){
    const list = data.data;
    console.log("The list are: ",list)
    setImageList(list);
  }
}, [data]);
 
const imageLists = imageList.slice(0, 3)


  return (
    <div className={`flex gap-x-5 justify-between overflow-y-scroll scrollbar-none  `}>
      {imageLists.map((detail, index) => (
        <div key={index} className={`lg:w-[22rem] `}>
          <div
            className={`px-[1.2rem] py-[1.3rem] bg-[#F8FAFC] flex justify-center rounded-[8px] mb-[1rem]`}
          >
            <img src={detail.image} alt={`engine`} />
          </div>
          <div className={`flex justify-between mb-[1rem]`}>
            <p>{detail.name}</p>
            <div className={`border rounded-full px-[0.5rem] inline-block`}>
              <div className={`flex gap-1 items-center`}>
                <FaStar color={`#FEC84B`} />
                {/* <p>{detail.quantity}</p> */}
              </div>
            </div>
          </div>
          <p className={`border rounded-full px-[0.5rem] inline-block`}>
            ₦{detail.price}
          </p>
        </div>
      ))}
    </div>
  );
}
export default Index;