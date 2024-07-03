import React,{useEffect,useState} from "react";
import styles from "../styles.module.css";
import image1 from "../../../../../assets/dashboardAssets/Avatar2.png";
import image2 from "../../../../../assets/dashboardAssets/Avatar3.png";
import Image from "next/image";
import { AccountCircle } from "@mui/icons-material";
import { format } from "../../../../../components/utils";
import { MdInventory2 } from 'react-icons/md';

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
            <th className=" lg:sticky" id="itemNameHeader">Item name</th>
            <th className=" lg:sticky"  id="totalSoldHeader">Total sold</th>
            <th  id="transactionValueHeader" className=" lg:sticky" >
              Transaction value
            </th>
            <th className=" lg:sticky"  id="dateTimeJoinedHeader">Date & time joined</th>
          </tr>
        </thead>
        <tbody className=" h-full" >
            { topPerformingProduct.length == 0 ? (<div className="relative right-[100%] left-[100%] flex flex-col justify-center items-center pt-32 leading-10 -z-40">
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
