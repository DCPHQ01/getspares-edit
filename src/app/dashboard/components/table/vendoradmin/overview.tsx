import React, { useEffect, useState } from "react";
import styles from "../styles.module.css";
import image1 from "../../../../../assets/dashboardAssets/Avatar2.png";
import image2 from "../../../../../assets/dashboardAssets/Avatar3.png";
import Image from "next/image";
import { AccountCircle } from "@mui/icons-material";
import { format, formatAmount } from "../../../../../components/utils";
import { MdInventory2 } from "react-icons/md";
import dayjs from "dayjs";

interface VendorOverview {
  dateAndTimeAdded?: string;
  imageUrl?: string;
  orderValue?: number | string | undefined;
  totalSold?: number;
  productName?: string;
}

interface VendorTableProps {
  topPerformingProduct: VendorOverview[];
  isLoading: boolean;
}

const formatDateTime = (dateTime: string) => {
  const date = dayjs(dateTime).format("DD-MM-YYYY");
  const time = dayjs(dateTime).format("hh:mm A");
  return { date, time };
};

const Overview: React.FC<VendorTableProps> = ({
  topPerformingProduct,
  isLoading,
}) => {
  return (
    <div
      id="vendorAdminTable"
      className={`my-[0.5rem] w-full max-h-[35rem] overflow-y-auto scrollbar-none ${styles.table}`}
    >
      <table id="vendorTable" className={`w-full`}>
        <thead className={``}>
          <tr className="truncate">
            <th className={`lg:sticky`} id="itemNameHeader">
              Item name
            </th>
            <th className={`lg:sticky`} id="totalSoldHeader">
              Total sold
            </th>
            <th
              id="transactionValueHeader"
              style={{ paddingLeft: "2.3rem" }}
              className={`lg:sticky`}
            >
              Transaction value
            </th>
            <th className={`lg:sticky`} id="dateTimeJoinedHeader">
              Date & time joined
            </th>
          </tr>
        </thead>
        <tbody className=" -z-50 h-full">
          {topPerformingProduct.length == 0 ? (
            <div className="relative right-[100%] left-[100%] flex flex-col justify-center items-center pt-32 leading-10">
              <div className=" -z-50 h-28">
                <div className="w-[5.6rem] h-[5.6rem] bg-blue-100 flex justify-center items-center rounded-full">
                  <MdInventory2
                    style={{ fontSize: "2rem", color: "#0852C0" }}
                  />
                </div>
              </div>
              <div className="text-center -z-50">
                <h1 className="text-xl">No item here yet</h1>
                <h1 className="text-gray-500">
                  All your items will appear here
                </h1>
              </div>
            </div>
          ) : (
            topPerformingProduct?.map((d, index) => {
              const { date, time } = formatDateTime(d?.dateAndTimeAdded  ?? "");
              return (
                <tr key={index} id={`row_${index}`} className="truncate">
                  <td>
                    <div
                      className={`flex gap-3 items-center text-[0.88rem] py-[1rem] px-[1.5rem]`}
                    >
                      {/* {d.imageUrl ? (
                        <Image
                          src={d.imageUrl}
                          className="object-contain"
                          alt="Avatar"
                          id={`avatar_${index}`}
                        />
                      ) : (
                        <AccountCircle
                          style={{ fontSize: 50 }}
                          className=" text-gray-400"
                        />
                      )} */}
                      <p id={`itemName_${index}`}>{d.productName}</p>
                    </div>
                  </td>
                  <td
                    className={`text-[0.88rem] py-[1rem] px-[3.125rem]`}
                    id={`totalSold_${index}`}
                  >
                    {d.totalSold}
                  </td>
                  <td
                    className={`text-[0.88rem] py-[1rem] px-[3.125rem]`}
                    id={`transactionValue_${index}`}
                  >
                    {format(d?.orderValue ?? "")}
                  </td>
                  <td id={`dateAndTimeAdded_${index}`}>
                    <div className={`text-[0.88rem] py-[1rem] px-[2.75rem]`}>
                      <div id={`date_${index}`}>{date}</div>
                      <div className={`text-[#4B5565]`} id={`time_${index}`}>
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
};

export default Overview;
