import React,{useEffect,useState} from "react";
import styles from "../styles.module.css";
import image1 from "../../../../../assets/dashboardAssets/Avatar2.png";
import image2 from "../../../../../assets/dashboardAssets/Avatar3.png";
import Image from "next/image";
import { AccountCircle } from "@mui/icons-material";
import { format } from "../../../../../components/utils";
import { MdInventory2 } from 'react-icons/md';


// const data = [
//   {
//     avatar: image1,
//     name: "Caterpillar Engine IV2 ",
//     email: "ebuka&sons@gmail.com",
//     sale: 23,
//     value: "₦ 2,000,000.00",
//     date: "24 June 2022",
//     time: "10:00AM",
//   },

//   {
//     avatar: image1,
//     name: "Caterpillar Engine IV2 ",
//     email: "ebuka&sons@gmail.com",
//     sale: 52,
//     value: "₦ 5,100,000.00",
//     date: "30th Oct 2023",
//     time: "12:00PM",
//   },
//   {
//     avatar: image2,
//     name: "Ebuka & Sons International",
//     email: "ebuka&sons@gmail.com",
//     sale: 80,
//     value: "₦ 82,000,000.00",
//     date: "05 July 2022",
//     time: "02:00PM",
//   },
//   {
//     avatar: image1,
//     name: "Caterpillar Engine IV2 ",
//     email: "ebuka&sons@gmail.com",
//     sale: 12,
//     value: "₦ 1,200,000.00",
//     date: "01 Nov 2022",
//     time: "11:35AM",
//   },
//   {
//     avatar: image1,
//     name: "Caterpillar Engine IV2 ",
//     email: "ebuka&sons@gmail.com",
//     sale: 5,
//     value: "₦ 500,000.00",
//     date: "24 June 2022",
//     time: "03:45PM",
//   },
//   {
//     avatar: image2,
//     name: "Caterpillar Engine IV2 ",
//     email: "ebuka&sons@gmail.com",
//     sale: 66,
//     value: "₦ 6,600,000.00",
//     date: "24 Feb 2024",
//     time: "12:30PM",
//   },
//   {
//     avatar: image1,
//     name: "Caterpillar Engine IV2 ",
//     email: "ebuka&sons@gmail.com",
//     sale: 30,
//     value: "₦ 3,000,000.00",
//     date: "12 Jan 2024",
//     time: "05:00AM",
//   },
//   {
//     avatar: image2,
//     name: "Ebuka & Sons International",
//     email: "ebuka&sons@gmail.com",
//     sale: 80,
//     value: "₦ 82,000,000.00",
//     date: "05 July 2022",
//     time: "02:00PM",
//   },
//   {
//     avatar: image1,
//     name: "Caterpillar Engine IV2 ",
//     email: "ebuka&sons@gmail.com",
//     sale: 12,
//     value: "₦ 1,200,000.00",
//     date: "01 Nov 2022",
//     time: "11:35AM",
//   },
//   {
//     avatar: image1,
//     name: "Caterpillar Engine IV2 ",
//     email: "ebuka&sons@gmail.com",
//     sale: 30,
//     value: "₦ 3,000,000.00",
//     date: "12 Jan 2024",
//     time: "05:00AM",
//   },
//   {
//     avatar: image2,
//     name: "Caterpillar Engine IV2 ",
//     email: "ebuka&sons@gmail.com",
//     sale: 66,
//     value: "₦ 6,600,000.00",
//     date: "24 Feb 2024",
//     time: "12:30PM",
//   },
//   {
//     avatar: image1,
//     name: "Caterpillar Engine IV2 ",
//     email: "ebuka&sons@gmail.com",
//     sale: 23,
//     value: "₦ 2,000,000.00",
//     date: "24 June 2022",
//     time: "10:00AM",
//   },
//   {
//     avatar: image2,
//     name: "Ebuka & Sons International",
//     email: "ebuka&sons@gmail.com",
//     sale: 52,
//     value: "₦ 5,100,000.00",
//     date: "30th Oct 2023",
//     time: "12:00PM",
//   },
//   {
//     avatar: image1,
//     name: "Caterpillar Engine IV2 ",
//     email: "ebuka&sons@gmail.com",
//     sale: 5,
//     value: "₦ 500,000.00",
//     date: "24 June 2022",
//     time: "03:45PM",
//   },
// ];

interface VendorOverview {
  dateJoined: string;
  imageUrl?: string ;
  transactionValue: string | number;
  totalItemSold: number;
  itemName: string;

}

interface VendorTableProps {
  topPerformingProduct: VendorOverview[];
  isLoading: boolean;
}

const Overview: React.FC<VendorTableProps> = ({topPerformingProduct,isLoading}) => {
  return (
    <div
      id="vendorAdminTable"
      className={`my-[0.5rem] w-full max-h-[35rem] overflow-y-auto scrollbar-none ${styles.table}`}
    >
      <table id="vendorTable" className={`w-full`}>
        <thead className={``}>
          <tr className="truncate">
            <th style={{position:'sticky'}} id="itemNameHeader">Item name</th>
            <th style={{position:'sticky'}} id="totalSoldHeader">Total sold</th>
            <th  id="transactionValueHeader" style={{ paddingLeft: "2.3rem", position:'sticky' }}>
              Transaction value
            </th>
            <th style={{position:'sticky'}} id="dateTimeJoinedHeader">Date & time joined</th>
          </tr>
        </thead>
        <tbody className=" h-full" >
            { topPerformingProduct.length == 0 ? (<div className="relative right-[100%] left-[100%] flex flex-col justify-center items-center pt-32 leading-10">
              <div className=" h-28">
              <div className="w-[5.6rem] h-[5.6rem] bg-blue-100 flex justify-center items-center rounded-full">
              <MdInventory2 style={{fontSize:"2rem", color:"#0852C0"}}/>
              </div>
              </div>
              <h1 className="text-xl">No item here yet</h1>
              <h1 className="text-gray-500">All your items will appear here</h1>
              </div>) : (  topPerformingProduct?.map((d, index) => {

          return ( <tr key={index} id={`row_${index}`} className="truncate">
              <td>
                <div
                  className={`flex gap-3 items-center text-[0.88rem] py-[1rem] px-[1.5rem]`}
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
                  <p id={`itemName_${index}`}>{d.itemName}</p>
                </div>
              </td>
              <td
                className={`text-[0.88rem] py-[1rem] px-[3.125rem]`}
                id={`totalSold_${index}`}
              >
                {d.totalItemSold}
              </td>
              <td
                className={`text-[0.88rem] py-[1rem] px-[3.125rem]`}
                id={`transactionValue_${index}`}
              >
                {format(d.transactionValue)}
              </td>
              <td>
                <div className={`text-[0.88rem] py-[1rem] px-[2.75rem]`}>
                  <div id={`date_${index}`}>{d.dateJoined}</div>
                  <div className={`text-[#4B5565]`} id={`time_${index}`}>
                    {/* {d.time} */}
                  </div>
                </div>
              </td>
            </tr>)}
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Overview;
