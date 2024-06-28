"use client";
import React,{ useEffect, useState } from "react";
import Link from "next/link";
// @ts-ignore
import styles from "../styles.module.css";
import { AccountCircle } from "@mui/icons-material";
// import image1 from "../../../../../assets/dashboardAssets/Avatar.png";
// import image2 from "../../../../../assets/dashboardAssets/Avatar1.png";
import Image from "next/image";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { ColorRing } from "react-loader-spinner";
import { format } from "../../../../../components/utils";
import { MdYard } from "react-icons/md";
import dayjs from "dayjs";
import { MdInventory2 } from 'react-icons/md';
import {formatDateTime} from "../../../../../components/utils/utils";


interface Vendor {
  email: string;
  dateJoined: string;
  imageUrl?: string ; 
  companyName?: string; 
  transactionValue:number;
  totalItemSold: number;
  ratings:number;
}

interface VendorTableProps {
  vendorList: Vendor[];
  isLoading?: boolean;
}

// const formatDateTime = (dateTime: string) => {
//   const date = dayjs(dateTime).format("DD-MM-YYYY");
//   const time = dayjs(dateTime).format("HH:mm");
//   return { date, time };
// };


// const data = [
//   {
//     avatar: image1,
//     name: "Ebuka & sons international an arm of the peoples...",
//     email: "Ebukainternional.com",
//     sale: 12,
//     vale: "₦ 200,000.00",
//     rating: (
//       <Stack spacing={1}>
//         {/* <Rating name="half-rating" defaultValue={2.5} precision={0.5} /> */}
//       </Stack>
//     ),
//     date: "24 June 2022",
//     time: "12:00PM",
//   },
//   {
//     avatar: image2,
//     name: "Ebuka & Sons International",
//     email: "ebuka&sons@gmail.com",
//     sale: 83,
//     vale: "₦ 1,000,000.00",
//     rating: (
//       <Stack spacing={1}>
//         {/* <Rating name="half-rating" defaultValue={2.5} precision={0.5} /> */}
//       </Stack>
//     ),
//     date: "30 June 2023",
//     time: "06:00PM",
//   },
//   {
//     avatar: image1,
//     name: "Ebuka & Sons International",
//     email: "ebuka&sons@gmail.com",
//     sale: 45,
//     vale: "₦ 600,000.00",
//     // rating: <Rating name="half-rating" defaultValue={2.5} precision={0.5} />,
//     date: "12 May 2024",
//     time: "08:45PM",
//   },
//   {
//     avatar: image2,
//     name: "Ebuka & Sons International",
//     email: "ebuka&sons@gmail.com",
//     sale: 10,
//     vale: "₦ 120,000.00",
//     // rating: <Rating name="half-rating" defaultValue={2.5} precision={0.5} />,

//     date: "02 Sep 2022",
//     time: "11:15AM",
//   },
//   {
//     avatar: image1,
//     name: "Ebuka & Sons International",
//     email: "ebuka&sons@gmail.com",
//     sale: 67,
//     vale: "₦ 700,000,00",
//     // rating: <Rating name="half-rating" defaultValue={2.5} precision={0.5} />,
//     date: "30 Aug 2022",
//     time: "04:00PM",
//   },
//   {
//     avatar: image1,
//     name: "Ebuka & Sons International",
//     email: "ebuka&sons@gmail.com",
//     sale: 67,
//     vale: "₦ 700,000,00",
//     // rating: <Rating name="half-rating" defaultValue={2.5} precision={0.5} />,
//     date: "30 Aug 2022",
//     time: "04:00PM",
//   },

//   {
//     avatar: image1,
//     name: "Ebuka & Sons International",
//     email: "ebuka&sons@gmail.com",
//     sale: 67,
//     vale: "₦ 700,000,00",
//     // rating: <Rating name="half-rating" defaultValue={2.5} precision={0.5} />,
//     date: "30 Aug 2022",
//     time: "04:00PM",
//   },

//   {
//     avatar: image1,
//     name: "Ebuka & Sons International",
//     email: "ebuka&sons@gmail.com",
//     sale: 67,
//     vale: "₦ 700,000,00",
//     // rating: <Rating name="half-rating" defaultValue={2.5} precision={0.5} />,
//     date: "30 Aug 2022",
//     time: "04:00PM",
//   },

//   {
//     avatar: image1,
//     name: "Ebuka & Sons International",
//     email: "ebuka&sons@gmail.com",
//     sale: 67,
//     vale: "₦ 700,000,00",
//     // rating: <Rating name="half-rating" defaultValue={2.5} precision={0.5} />,
//     date: "30 Aug 2022",
//     time: "04:00PM",
//   },


// ];

const VendorTable: React.FC<VendorTableProps>  = ({vendorList, isLoading}) => {

  // const fetchVendorData = async () => {
    // try {
    //   const requestBody = {
    //     pageNumber: 1,
    //     pageSize: 0
    //   };

    //   const resultList = await addVendor(requestBody).unwrap();
    //   const list = resultList.data.content
    //   console.log('Success:',list);

    //   setVendorList(list)

    // }  catch (error) {
    //   console.error('Failed to add vendor:', error);
     
    // }

    
  // };

  return (
    <div id="tableContainer">
      <div
        id="mecaAdminTable"
        className={`my-[1.25rem] w-full max-h-[34rem] overflow-y-auto scrollbar-none h-[32rem] ${styles.table}`}
      >
        <table id="adminTable" className={`w-full `}>
          <thead className="">
            <tr className="truncate">
              <th id="companyNameHeader" className={`sticky`}>Company name</th>
              <th id="totalItemsSoldHeader" className={`sticky`}>Total items sold</th>
              <th id="transactionValueHeader" className={`sticky`} style={{ paddingLeft: "2.3rem" }}>
                Transaction value
              </th>
              <th id="transactionRatings" className={`sticky z-10`} style={{ paddingLeft: "5.5rem" }}>
                Ratings
              </th>
              <th id="dateTimeJoinedHeader" className={`sticky`}>Date & time joined</th>
            </tr>
          </thead>
          <tbody >
             { isLoading ? (
        <div 
        className="text-center mt-28 relative left-[180%] right[180%] h-[30rem]"
        >
           <ColorRing  
            visible={true}
            height="40"
            width="40"
            ariaLabel="color-ring-loading"
            wrapperStyle={{position: "absolute", bottom: "75%", left: "44%",}}
            wrapperClass="color-ring-wrapper"
            colors={["#000000", "#000000", "#000000", "#000000", "#000000"]}

           />
          <p>Loading vendors...</p>
        </div>
      ) :  vendorList.length === 0 ? (<div className="relative right-[130%] left-[130%] flex flex-col justify-center items-center pt-32 leading-10">
        <div className=" h-28">
      <div className="w-[5.6rem] h-[5.6rem] bg-blue-100 flex justify-center items-center rounded-full">
      <MdYard style={{fontSize:"2rem", color:"#0852C0"}}/>
      </div>
      </div>
      <h1 className="text-xl">No item here yet</h1>
      <h1 className="text-gray-500">All your item will appear here</h1>
        </div>) :(vendorList?.map((d, index) => {
               const { date, time } = formatDateTime(d?.dateJoined);
              const transactionValue = format(d.transactionValue);
              return (
                <tr key={index} id={`row_${index}`} className="cursor-pointer">
                  <td id={`companyData_${index}`}>
                    <div
                      className={`flex gap-3 text-[0.88rem] py-[1rem] px-[1.25rem] items-center`}
                    >
                      
                      {d.imageUrl ? (
                        <Image
                          src={d.imageUrl}
                          className="object-contain"
                          alt="Avatar"
                          id={`avatar_${index}`}
                        />
                      ) : (
                        <AccountCircle style={{ fontSize: 50 }} className=" text-gray-400" />
                      )}
                      <div id={`companyDetails_${index}`}>
                        <div className="truncate">{d.companyName}</div>
                        <div
                          className={`text-[#4B5565] truncate`}
                          id={`email_${index}`}
                        >
                          {d.email}
                        </div>
                      </div>
                    </div>
                    
                  </td>
                  <td
                    className={`text-[0.88rem] py-[1rem] px-[3.13rem] truncate`}
                    id={`itemsSold_${index}`}
                  >
                    {d.totalItemSold}
                  </td>
                  <td
                    className={`text-[0.88rem] py-[1rem] px-[3.13rem] truncate`}
                    id={`transactionValue_${index}`}
                  >
                    {transactionValue}
                  </td>
                  <td
                    className={`text-[0.88rem] py-[1rem] px-[3.13rem] truncate`}
                    id={`transactionRatings_${index}`}
                  >
                    <div className="flex gap-1">
                      <Stack spacing={1}>
                        <Rating
                          name="half-rating"
                          defaultValue={d.ratings}
                          precision={0.5}
                          disabled={true}
                        />
                      </Stack>
                      <p className="mt-[2px]"></p>
                    </div>
                  </td>

                  <td id={`dateJoined_${index}`}>
                    <div
                      className={`text-[0.88rem] py-[1rem] px-[2.75rem] truncate`}
                    >
                     <div id={`date_${index}`}>{date}</div>
                     <div className={`text-[#4B5565]`} id={`time_${index}`}>
                        {time}
                     </div>
                    </div>
                  </td>
                </tr>
              );
            }))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VendorTable;
