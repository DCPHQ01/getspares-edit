"use client";
import React from "react";
import Link from "next/link";
import styles from "../styles.module.css";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import dayjs from "dayjs";

interface Agent{
  firstName: string;
  email: string;
  quantitySold: number;
  transactionValue: number;
  dateAdded: string;
}

interface AgentTableProps {
  agentList: Agent[];
}



const formatDateTime = (dateTime: string) => {
  const date = dayjs(dateTime).format("YYYY-MM-DD");
  const time = dayjs(dateTime).format("HH:mm:ss");
  return { date, time };
};



const AgentTable: React.FC<AgentTableProps> = ({ agentList }) => {

  return (
    <div>
      <div id="tableContainer">
        <div
          id="mecaAdminTable"
          className={`my-[1.25rem] w-full max-h-[34rem] overflow-y-auto scrollbar-none ${styles.table}`}
        >
          <table id="adminTable" className={`w-full`}>
            <thead>
              <tr className="truncate">
                <th id="companyNameHeader">Full name</th>
                <th id="totalItemsSoldHeader">Quantity sold</th>
                <th
                  id="transactionValueHeader"
                  style={{ paddingLeft: "2.3rem" }}
                >
                  Transaction value
                </th>
                <th id="dateTimeJoinedHeader">Date & time added</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(agentList) && agentList?.map((d, index)=>{
                const {date, time} = formatDateTime(d.dateAdded);
                return(
                  <tr
                  key={index}
                  id={`row_${index}`}
                  className="cursor-pointer hover:bg-gray-50"
                >
                  <td id={`companyData_${index}`}>
                    <div
                      className={`flex gap-3 text-[0.88rem] py-[1rem] px-[1.25rem]`}
                    >
                      {/* <img
                        src={d.avatar}
                        className="object-contain"
                        alt="Avatar"
                        id={`avatar_${index}`}
                      /> */}
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
                    <div className={`text-[0.88rem] py-[1rem] px-[2.75rem]`}>
                      <div id={`date_${index}`}>{date}</div>
                      <div
                        className={`text-[#4B5565] truncate`}
                        id={`time_${index}`}
                      >
                        {time}
                      </div>
                    </div>
                  </td>
                </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AgentTable;
