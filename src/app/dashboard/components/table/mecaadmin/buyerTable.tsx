import React from "react";
import styles from "../styles.module.css";
import image1 from "../../../../../assets/dashboardAssets/Avatar.png";
import image2 from "../../../../../assets/dashboardAssets/Avatar1.png";
import Image from "next/image";
import { formatAmount } from "../../../../../components/utils";
import { ColorRing } from "react-loader-spinner";
import { MdBusinessCenter } from "react-icons/md";

type BuyerData = {
  // avatar: string;
  name: string;
  email: string;
  totalItemBought: number;
  transactionValue: string;
  lastSeen: string;
};

interface BuyerTableProps {
  data: BuyerData[];
  isLoading?: boolean;
  isError?: boolean;
}

const BuyerTable = ({
  data,
  isLoading = false,
  isError = false,
}: BuyerTableProps) => {
  return (
    <div
      id="mecaAdminTable"
      className={`my-[1.25rem] w-full max-h-[34rem] overflow-y-auto scrollbar-none h-[32rem] ${styles.table}`}
    >
      <table id="adminTable" className={`w-full`}>
        <thead>
          <tr className="truncate">
            <th id="companyNameHeader" className={`lg:sticky`}>
              Buyers name
            </th>
            <th id="totalItemsSoldHeader" className={`lg:sticky`}>
              Total items bought
            </th>
            <th
              id="transactionValueHeader"
              style={{ paddingLeft: "2.3rem" }}
              className={`lg:sticky`}
            >
              Transaction value
            </th>
            {/* <th id="dateTimeJoinedHeader" style={{ paddingLeft: "3rem" }}>
              Last seen
            </th> */}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={4} className="text-center py-5">
                <div className="mt-28 relative lg:left-[700px] md:right-[600px]">
                  <ColorRing
                    visible={true}
                    height="80"
                    width="80"
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
                </div>
              </td>
            </tr>
          ) : data?.length === 0 ? (
            <div className="relative -z-50 right-[100%] left-[100%] flex flex-col justify-center items-center pt-32 leading-10">
              <div className=" h-28">
                <div className="w-[5.6rem] h-[5.6rem] bg-blue-100 flex justify-center items-center rounded-full">
                  <MdBusinessCenter
                    style={{ fontSize: "2rem", color: "#0852C0" }}
                  />
                </div>
              </div>
              <div className="text-center">
                <h1 className="text-xl">No buyers here yet</h1>
                <h1 className="text-gray-500">
                  All your buyers will appear here
                </h1>
              </div>
            </div>
          ) : (
            data?.map((d, index) => {
              const formattedTransactionValue = formatAmount(
                d.transactionValue
              );

              return (
                <tr key={index} id={`row_${index}`} className="cursor-pointer">
                  <td id={`companyData_${index}`}>
                    <div
                      className={`flex gap-3 text-[0.88rem] py-[1rem] px-[1.25rem]`}
                    >
                      {/* <Image src={d.avatar} alt="Avatar" id={`avatar_${index}`} /> */}
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
                    className={`text-[0.88rem] py-[1rem] px-[3.13rem]`}
                    id={`itemsSold_${index}`}
                  >
                    {d.totalItemBought}
                  </td>
                  <td
                    className={`text-[0.88rem] py-[1rem] px-[3.13rem]`}
                    id={`transactionValue_${index}`}
                  >
                    {formattedTransactionValue}
                  </td>
                  {/* Uncomment or modify as needed */}
                  {/* <td id={`dateJoined_${index}`}>
              <div className={`text-[0.88rem] py-[1rem] px-[2.75rem]`}>
                <div id={`date_${index}`}>{d.lastSeen}</div>
                <div className={`text-[#4B5565] truncate`} id={`time_${index}`}>
                  {d.time}
                </div>
              </div>
            </td> */}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};
export default BuyerTable;
