import React from "react";
import styles from "../styles.module.css";
import dayjs from "dayjs";
import { AccountCircle } from "@mui/icons-material";
import { ColorRing } from "react-loader-spinner";
import { formatAmount } from "../../../../../components/utils";

interface Overview {
  orderId: string;
  trackingOrderId: string;
  amount: number;
  dateCreated: string;
}

interface OverviewTableProps {
  overviewList: Overview[];
  isLoading?: boolean;
  isError?: boolean;
}

const formatDateTime = (dateTime: string) => {
  const date = dayjs(dateTime).format("DD-MM-YYYY");
<<<<<<< HEAD
  const time = dayjs(dateTime).format("hh:mm A");
=======
  const time = dayjs(dateTime).format("HH:mm");
>>>>>>> 40245a68be0518195005c0a7aa08e73b7af0a0ac
  return { date, time };
};

const OverviewTable: React.FC<OverviewTableProps> = ({ isLoading, overviewList }) => {
  return (
    <div id="tableContainer" className="relative">
      {isLoading ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <ColorRing
            visible={true}
            height="40"
            width="40"
            ariaLabel="color-ring-loading"
            wrapperClass="color-ring-wrapper"
            colors={["#000000", "#000000", "#000000", "#000000", "#000000"]}
          />
          <p>Loading Overview...</p>
        </div>
      ) : (
        <div
          id="mecaAdminTable"
          className={`my-[1.25rem] w-full max-h-[34rem] overflow-y-auto scrollbar-none ${styles.table}`}
        >
          <table id="adminTable" className={`w-full`}>
            <thead>
              <tr className="truncate">
                <th id="totalItemsSoldHeader" style={{ paddingLeft: "5rem" }}>
                  Tracking Order ID
                </th>
                <th id="dateTimeJoinedHeader" style={{ paddingLeft: "3rem" }}>
                  Amount
                </th>
                <th id="dateTimeJoinedHeader">Order Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {overviewList?.map((d, index) => {
                const { date, time } = formatDateTime(d.dateCreated);
                return (
                  <tr
                    key={index}
                    id={`row_${index}`}
                    className="cursor-pointer truncate"
                  >
                    <td id={`companyData_${index}`}>
                      <div className={`flex gap-3 text-[0.88rem] py-[1rem] px-[1.25rem]`}>
                        <div id={`companyDetails_${index}`}>
                          <div className="mt-2">{d.trackingOrderId}</div>
                        </div>
                      </div>
                    </td>
                    <td className={`text-[0.88rem] py-[1rem] px-[3.13rem]`} id={`itemsSold_${index}`}>
                      {/* {d.price} */}
                      {formatAmount(d.amount)}
                    </td>
                    <td id={`dateJoined_${index}`}>
                      <div className={`text-[0.88rem] py-[1rem] px-[2.75rem]`}>
                        <div id={`date_${index}`}>{date}</div>
                        <div className={`text-[#4B5565]`} id={`time_${index}`}>
                          {time}
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OverviewTable;
