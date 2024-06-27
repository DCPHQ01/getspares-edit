"use client";
import React from "react";
import styles from "../styles.module.css";
import image1 from "../../../../../assets/dashboardAssets/Avatar.png";
import image2 from "../../../../../assets/dashboardAssets/Avatar1.png";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import { AccountCircle } from "@mui/icons-material";
// import "react-tabs/style/react-tabs.css";
import { ColorRing } from "react-loader-spinner";
import { format } from "../../../../../components/utils";
import { MdInventory2 } from 'react-icons/md';



interface InventoryData {
  productName?: number;
  productImage?: string;
  vendorName:string;
  vendorEmail: string;
  transactionValue:number;
  noOfItemsSold: number;
  vendorImage: string;
  
}
 
interface InventoryTableProps {
  inventoryData: InventoryData[];
  isLoading: boolean;
  status: string;
  
}

// const data = [
//   {
//     avatar: image1,
//     name: "Ebuka & Sons International",
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

const InventoryTable: React.FC<InventoryTableProps> = ({inventoryData, isLoading, status}) => {
  return (
    <div id="tableContainer">
      <div
        id="mecaAdminTable"
        className={`my-[1.25rem] w-full max-h-[34rem] overflow-y-auto scrollbar-none ${styles.table}`}
      >
        <table id="adminTable" className={`w-full`}>
          <thead>
            <tr className="truncate">
              <th id="companyNameHeader">Product name</th>
              <th id="dateTimeJoinedHeader">Vendors</th>
              <th id="totalItemsSoldHeader">Quantity sold</th>
              <th id="transactionValueHeader" style={{ paddingLeft: "2.3rem" }}>
                Transaction value
              </th>
            </tr>
          </thead>
          <tbody className=" h-[25rem]">
            {  isLoading ? (
        <div 
        className="text-center mt-28 relative lg:left-[144%] lg:right[144%] h-[30rem]"
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
      ) : inventoryData.length === 0 ? (
      <div className="relative right-[100%] left-[100%] flex flex-col justify-center items-center pt-32 leading-10">
         <div className=" h-28">
      <div className="w-[5.6rem] h-[5.6rem] bg-blue-100 flex justify-center items-center rounded-full">
      <MdInventory2 style={{fontSize:"2rem", color:"#0852C0"}}/>
      </div>
      </div>
      <h1 className="text-xl">No item here yet</h1>
      <h1 className="text-gray-500">All your item will appear here</h1>
        </div>) : (inventoryData?.map((d, index) => (
              <tr key={index} id={`row_${index}`} className="cursor-pointer">
                <td id={`companyData_${index}`}>
                  <div
                    className={`flex gap-3 text-[0.88rem] py-[1rem] px-[1.25rem]`}
                  >
                    
                    {d.productImage ? (
                        <Image
                          src={d.productImage}
                          className="object-contain"
                          alt="Avatar"
                          id={`avatar_${index}`}
                        />
                      ) : (
                        <AccountCircle style={{ fontSize: 50 }} className=" text-gray-400" />
                      )}
                    <div id={`companyDetails_${index}`}>
                      <div className="truncate  mt-2">{d.productName}</div>
                    </div>
                  </div>
                </td>

                <td id={`companyData_${index}`}>
                  <div
                    className={`flex gap-3 text-[0.88rem] py-[1rem] px-[1.25rem]`}
                  >
                   {d.vendorImage && d.vendorImage.length < 1000  ? (
                        <Image
                          src={d.vendorImage}
                          className="object-contain"
                          alt="Avatar"
                          id={`avatar_${index}`}
                        />
                      ) : (
                        <AccountCircle style={{ fontSize: 50 }} className=" text-gray-400" />
                      )}
                    <div id={`companyDetails_${index}`}>
                      <div className="truncate ">{d.vendorName}</div>
                      <div
                        className={`text-[#4B5565] truncate`}
                        id={`email_${index}`}
                      >
                        {d.vendorEmail}
                      </div>
                    </div>
                  </div>
                </td>

                <td
                  className={`text-[0.88rem] py-[1rem] px-[3.13rem]`}
                  id={`itemsSold_${index}`}
                >
                  {d.noOfItemsSold}
                </td>
                <td
                  className={`text-[0.88rem] py-[1rem] px-[3.13rem]`}
                  id={`transactionValue_${index}`}
                >
                  {d.transactionValue}
                </td>
              </tr>)
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryTable;
