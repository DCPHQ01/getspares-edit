"use client";
import React, {useEffect} from "react";
import styles from "../styles.module.css";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import dayjs from "dayjs";
import { AccountCircle } from '@mui/icons-material';
import { ColorRing } from "react-loader-spinner";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {formatDate, formatTime} from "../../../../../components/utils";


interface Agent {
  firstName: string;
  email: string;
  quantitySold: number;
  transactionValue: number;
  dateAdded: string;
}

interface AgentTableProps {
  agentList: Agent[];
  isLoading?: boolean;
  isError?: boolean;
}
dayjs.extend(customParseFormat);



const AgentTable: React.FC<AgentTableProps> = ({ agentList, isLoading }) => {




  return (
     <div id="tableContainer">
       <div
          id="mecaAdminTable"
          className={`my-[1.25rem] w-full max-h-[34rem] overflow-y-auto scrollbar-none ${styles.table}`}
       >
         <table id="adminTable" className={`w-full`}>
           <thead style={{position:'sticky', width:'100%'}} className={`w-full`}>
           <tr className="truncate">
             <th style={{position:'sticky'}} id="companyNameHeader">Full name</th>
             <th style={{position:'sticky'}} id="totalItemsSoldHeader">Quantity sold</th>
             <th
                id="transactionValueHeader"
                style={{ paddingLeft: "2.3rem",position:'sticky'  }}
             >
               Transaction value
             </th>
             <th style={{position:'sticky'}} id="dateTimeJoinedHeader">Date & time added</th>
           </tr>
           </thead>
           <tbody>

           {isLoading ? (
              <div className="text-center mt-28 relative lg:left-[210%] lg:right[210%] md:left-[213%] md:right[213%] sm:left-[21">
                <ColorRing
                   visible={true}
                   height="40"
                   width="40"
                   ariaLabel="color-ring-loading"
                   wrapperStyle={{
                     position: "absolute",
                     bottom: "75%",
                     left: "44%",
                   }}
                   wrapperClass="color-ring-wrapper"
                   colors={[
                     "#000000",
                     "#000000",
                     "#000000",
                     "#000000",
                     "#000000",
                   ]}
                />
                <p>Loading Agent........</p>
              </div>

           ) : (
              agentList?.map((d, index) => {
                return (
                   <tr
                      key={index}
                      id={`row_${index}`}
                      className="cursor-pointer hover:bg-gray-50"
                   >
                     <td id={`companyData_${index}`}>
                       <div className={`flex gap-3 text-[0.88rem] px-[1.25rem]`}>
                         <div id={`companyDetails_${index}`}>
                           <div className="truncate">{d.firstName}</div>
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
                        className={`text-[0.88rem] py-[1rem] px-[3.13rem]`}
                        id={`itemsSold_${index}`}
                     >
                       {d.quantitySold}
                     </td>
                     <td
                        className={`text-[0.88rem] py-[1rem] px-[3.13rem]`}
                        id={`transactionValue_${index}`}
                     >
                       {d.transactionValue}
                     </td>
                     <td id={`dateJoined_${index}`}>
                       <div className={`text-[0.88rem] py-[0.5rem] px-[1.5rem]`}>
                         <div id={`date_${index}`}>{formatDate(d.dateAdded)}</div>
                         <div className={`text-[#4B5565] truncate`} id={`time_${index}`}>{formatTime(d.dateAdded)}</div>
                       </div>
                     </td>
                   </tr>
                )}))}
           </tbody>
         </table>
       </div>
     </div>

  )
}


export default AgentTable;
