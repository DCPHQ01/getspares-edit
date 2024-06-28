import React, { useState, useEffect } from "react";
import styles from "../styles.module.css";
import image1 from "../../../../../assets/dashboardAssets/Avatar.png";
import image2 from "../../../../../assets/dashboardAssets/Avatar1.png";
import Image from "next/image";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ColorRing } from "react-loader-spinner";
import { useGetTopPerformingVendorsQuery } from "../../../../../redux/features/dashboard/mecaAdminQuery";
import dayjs from "dayjs";
import { formatAmount } from "../../../../../components/utils";
import { MdYard } from "react-icons/md";

interface TopVendors {
  avatar?: string;
  companyName: string;
  email?: string;
  totalItemSold: number;
  transactionValue: string;
  dateJoined: string;
  // time?: string;
}

interface OverviewTableProps {
  data: TopVendors[];
  isLoading?: boolean;
  isError?: boolean;
}

function Overview({ data, isLoading }: OverviewTableProps) {
  const formatDateTime = (dateTime: string) => {
    const date = dayjs(dateTime).format("DD-MM-YYYY");
    const time = dayjs(dateTime).format("HH:mm");
    return { date, time };
  };

  return (
    <div
      id="mecaAdminTable"
      className={`my-[1.25rem] w-full max-h-[25.19rem] overflow-y-auto scrollbar-none h-[32rem] ${styles.table}`}
    >
      <table id="adminTable" className={`w-full`}>
        <thead>
          <tr className="truncate">
            <th id="companyNameHeader">Company name</th>
            <th id="totalItemsSoldHeader">Total items sold</th>
            <th id="transactionValueHeader" style={{ paddingLeft: "2.5rem" }}>
              Transaction value
            </th>
            <th id="dateTimeJoinedHeader">Date & time joined</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={4} className="text-center py-5">
                <div className="mt-28 relative lg:left-[700px] md:right-[600px]">
                  <ColorRing
                    visible={true}
                    height="40"
                    width="40"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={[
                      "#000000",
                      "#000000",
                      "#000000",
                      "#000000",
                      "#000000",
                    ]}
                  />
                   <p>Loading Overview Table...</p>
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <div className="relative right-[100%] left-[100%] flex flex-col justify-center items-center pt-32 leading-10">
               <div className=" h-28">
            <div className="w-[5.6rem] h-[5.6rem] bg-blue-100 flex justify-center items-center rounded-full">
            <MdYard style={{fontSize:"2rem", color:"#0852C0"}}/>
            </div>
            </div>
            <h1 className="text-xl">No item here yet</h1>
            <h1 className="text-gray-500">All your item will appear here</h1>
              </div>)  : (
            data.map((d, index) => {

            

              const { date, time } = formatDateTime(d.dateJoined); 
              const formattedTransactionValue = formatAmount(d.transactionValue);


              return (
                <tr key={index} id={`row_${index}`} className="cursor-pointer">
                  <td id={`companyData_${index}`}>
                    <div
                      className={`flex items-center gap-3 text-[0.88rem] py-[1rem] px-[1.25rem]`}
                    >
                      {d.avatar ? (
                        <Image
                          src={d.avatar}
                          alt="Avatar"
                          id={`avatar_${index}`}
                          className="object-cover"
                        />
                      ) : (
                        <AccountCircleIcon
                          id={`avatar_${index}`}
                          className="object-cover"
                          style={{ fontSize: 40, color: "gray" }}
                        />
                      )}
                      <div id={`companyDetails_${index}`}>
                        <div className="truncate">{d.companyName}</div>
                        <div
                          className={`text-[#4B5565] truncate} id={email_${index}`}
                        >
                          {d.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td
                    className={`text-[0.88rem] py-[1rem] px-[3.13rem] truncate} id={itemsSold_${index}`}
                  >
                    {d.totalItemSold}
                  </td>
                  <td
                    className={`text-[0.88rem] py-[1rem] px-[3.13rem] truncate} id={transactionValue_${index}`}
                  >
                    {formatAmount(d.transactionValue)}
                  </td>
                  <td id={`dateJoined_${index}`}>
                    <div
                      className={`text-[0.88rem] py-[1rem] px-[2.75rem] truncate`}
                    >
                      <div id={`date_${index}`}>{date}</div>
                      <div className={"text-[#4B5565]"} id={`time_${index}`}>
                        {time}
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Overview;
