import React, {useState, useEffect} from "react";
import styles from "../styles.module.css";
import image1 from "../../../../../assets/dashboardAssets/Avatar.png";
import image2 from "../../../../../assets/dashboardAssets/Avatar1.png";
import Image from "next/image";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useGetTopPerformingVendorsQuery } from "../../../../../redux/features/dashboard/mecaAdminQuery";

// const datas = [
//   {
//     avatar: image1,
//     name: "Ebuka & Sons International",
//     email: "ebuka&sons@gmail.com",
//     sale: 12,
//     value: "₦ 200,000.00",
//     date: "24 June 2022",
//     time: "12:00PM",
//   },
//   {
//     avatar: image2,
//     name: "Ebuka & Sons International",
//     email: "ebuka&sons@gmail.com",
//     sale: 83,
//     value: "₦ 1,000,000.00",
//     date: "30 June 2023",
//     time: "06:00PM",
//   },
//   {
//     avatar: image1,
//     name: "Ebuka & Sons International",
//     email: "ebuka&sons@gmail.com",
//     sale: 45,
//     value: "₦ 600,000.00",
//     date: "12 May 2024",
//     time: "08:45PM",
//   },
//   {
//     avatar: image2,
//     name: "Ebuka & Sons International",
//     email: "ebuka&sons@gmail.com",
//     sale: 10,
//     value: "₦ 120,000.00",
//     date: "02 Sep 2022",
//     time: "11:15AM",
//   },
//   {
//     avatar: image1,
//     name: "Ebuka & Sons International",
//     email: "ebuka&sons@gmail.com",
//     sale: 67,
//     value: "₦ 700,000,00",
//     date: "30 Aug 2022",
//     time: "04:00PM",
//   },
// ];
// interface VendorData {
//   avatar?: string;
//   name: string;
//   email: string;
//   sale: number;
//   value: string;
//   date: string;
//   time: string;
// };

// interface OverviewTableProps {
//   data: VendorData[];
//   isLoading?: boolean;
//   isError?: boolean;
// }

function Overview({ data }: { data: any }) {

 
  return (
    <div
      id="mecaAdminTable"
      className={`my-[1.25rem] w-full max-h-[25.19rem] overflow-y-auto scrollbar-none ${styles.table}`}
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
        {data?.map((d: any, index: number) =>  (
            <tr key={index} id={`row_${index}`} className="cursor-pointer">
              <td id={`companyData_${index}`}>
                <div
                  className={`flex gap-3 text-[0.88rem] py-[1rem] px-[1.25rem] `}
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
                    style={{ fontSize: 40, color: 'gray' }}
                  />
                )}
                  <div id={`companyDetails_${index}`}>
                    <div className="truncate">{d.name}</div>
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
                {d.sale}
              </td>
              <td
                className={`text-[0.88rem] py-[1rem] px-[3.13rem] truncate`}
                id={`transactionValue_${index}`}
              >
                {d.value}
              </td>
              <td id={`dateJoined_${index}`}>
                <div
                  className={`text-[0.88rem] py-[1rem] px-[2.75rem] truncate`}
                >
                  <div id={`date_${index}`}>{d.date}</div>
                  <div className={`text-[#4B5565] `} id={`time_${index}`}>
                    {d.time}
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Overview;



