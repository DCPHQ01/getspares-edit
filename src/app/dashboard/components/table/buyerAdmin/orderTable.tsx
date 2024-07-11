"use client";
import React, { useEffect, useState } from "react";
import styles from "../styles.module.css";
import { useRouter } from "next/navigation";
import ViewParticularOrderDetailsPage from "../../../../category/products/viewDetails/viewParticularOrderDetails/page";
import { ColorRing } from "react-loader-spinner";
import { formatAmount,formatAmount5 } from "../../../../../components/utils";
import dayjs from "dayjs";
import { MdBusinessCenter } from "react-icons/md";
import { formatAllDateTwo, formatAllTime } from "../../utils/utils";
// import EmptyState from "../../../../../components/utils/emptyState";

type BuyerOrderData = {
  id: string,
  orderId: string;
  totalAmount: string;
  dateCreated: string;
};

interface BuyerOrderTableProps {
  data: BuyerOrderData[];
  isLoading?: boolean;
  isError?: boolean;
}

const EmptyState =({datad}:any) => {
  const data = [];
  return(
          <>
            {
              data.length === 0 ?(
                <div className="-z-50 flex flex-col justify-center items-center pt-32 leading-10">
                  <div className=" h-28">
                    <div className="w-[5.6rem] h-[5.6rem] bg-blue-100 flex justify-center items-center rounded-full">
                      <MdBusinessCenter
                        style={{ fontSize: "2rem", color: "#0852C0" }}
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <h1 className="text-xl">No order created yet</h1>
                    <h1 className="text-gray-500">
                      All your orders will appear here
                    </h1>
                  </div>
                </div>
              ) : <></>
            }
          </>
        )

}

const formatDateTime = (dateTime: string) => {
  const date = dayjs(dateTime).format("DD-MM-YYYY");
  const time = dayjs(dateTime).format("HH:mm");
  return { date, time };
};

const OrderTable = ({ data, isLoading }: BuyerOrderTableProps) => {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const handleDetails = (orderId: string) => {
    sessionStorage.setItem("selectedOrderId", orderId);
    setSelectedOrderId(orderId);
  };

  return (
    <div>
      <div id="tableContainer">
        <div
          id="mecaAdminTable"
          className={`w-full max-h-[34rem] overflow-y-auto scrollbar-none ${styles.table}`}
        >
          <table id="adminTable" className={`w-full`}>
            <thead>
              <tr className="truncate">
                <th id="totalItemsSoldHeader" style={{ paddingLeft: "4.5rem" }}>
                  Order ID
                </th>
                <th id="transactionValueHeader" style={{ paddingLeft: "2rem" }}>
                  Transaction value
                </th>
                <th id="dateTimeJoinedHeader">Date & time ordered</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td className="text-center py-4">
                    <ColorRing
                      visible
                      height="40"
                      width="40"
                      ariaLabel="color-ring-loading"
                      wrapperStyle={{}}
                      wrapperClass="color-ring-wrapper"
                      colors={["#ffff", "#ffff", "#ffff", "#ffff", "#ffff"]}
                    />
                  </td>
                </tr>
              ) : (
                data?.map((d, index) => {
                  const { date, time } = formatDateTime(d.dateCreated);
                  const formattedTransactionValue = formatAmount5(d.totalAmount.toString());

                  return (
                    <tr
                      key={index}
                      id={`row_${index}`}
                      className="cursor-pointer truncate"
                      onClick={() => handleDetails(d.id)}
                    >
                      <td
                        className={`text-[0.88rem] py-[1rem] px-[3.13rem]`}
                        id={`itemsSold_${index}`}
                      >
                        {d.orderId}
                      </td>

                      <td
                        className={`text-[0.88rem] py-[1rem] px-[3.13rem]`}
                        id={`transactionValue_${index}`}
                      >
                        {formattedTransactionValue}
                      </td>

                      <td id={`dateJoined_${index}`}>
                        <div
                          className={`text-[0.88rem] py-[1rem] px-[2.75rem] `}
                        >
                          <div id={`date_${index}`}>{formatAllDateTwo(d.dateCreated)}</div>
                          <div
                            className={`text-[#4B5565]`}
                            id={`time_${index}`}
                          >
                            {/* {time} */}
                            {formatAllTime(d.dateCreated)}
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          { data.length === 0 ? <EmptyState datad={data.length === 0} /> : ""}
        </div>
      </div>
      {selectedOrderId && (
        <div className="absolute bottom-0 mt-8 ml-10 lg:left-60 right-0 lg:top-0 h-[100vh] lg:w-[84%] w-[100%] lg:h-[100vh]">
          <div className="bg-white h-[100vh] w-full">

            <ViewParticularOrderDetailsPage />

          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTable;

// orderId={selectedOrderId} 

