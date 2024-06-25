import React from "react";
import styles from "../styles.module.css";
import dayjs from "dayjs";
import { AccountCircle } from "@mui/icons-material";

interface Overview {
  id: string;
  name: string;
  categoryName: string;
  dateCreated: string;
  companyId: string;
  quantity: number;
  companyName: string;
  brand: string;
  condition: string;
  image: string;
  price: number;
  model: string;
}

interface OverviewTableProps {
  overviewList: Overview[];
}

const formatDateTime = (dateTime: string) => {
  const date = dayjs(dateTime).format("YYYY-MM-DD");
  const time = dayjs(dateTime).format("HH:mm");
  return { date, time };
};

const OverviewTable: React.FC<OverviewTableProps> = ({ overviewList }) => {
  return (
    <div id="tableContainer">
      <div
        id="mecaAdminTable"
        className={`my-[1.25rem] w-full max-h-[34rem] overflow-y-auto scrollbar-none ${styles.table}`}
      >
        <table id="adminTable" className={`w-full`}>
          <thead>
            <tr className="truncate">
              {/* <th id="companyNameHeader">Items</th> */}
              <th id="totalItemsSoldHeader" style={{ paddingLeft: "5rem" }}>
                Order ID
              </th>
              {/* <th id="transactionValueHeader" style={{ paddingLeft: "2rem" }}>
                Transaction value
              </th> */}
              <th id="dateTimeJoinedHeader" style={{ paddingLeft: "3rem" }}>
                Amount
              </th>
              <th id="dateTimeJoinedHeader">Order Date & time</th>
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
                    <div className={`flex gap-3 text-[0.88rem] py-[1rem] px-[1.25rem]`}
                    >
                      {/* {d.image ? (
                        <img
                        src={d.image}
                        className="object-contain"
                        alt="Avatar"
                        id={`avatar_${index}`}
                      />
                      ) : (
                        <AccountCircle style={{ fontSize: 50 }} className="text-grey-400" />
                      )} */}
                      <div id={`companyDetails_${index}`}>
                        <div className="mt-2">{d.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className={`text-[0.88rem] py-[1rem] px-[3.13rem]`} id={`itemsSold_${index}`}>
                    {d.price}
                  </td>
                  {/* <td className={`text-[0.88rem] py-[1rem] px-[3.13rem]`} id={`transactionValue_${index}`}>
                    {d.price}
                  </td> */}
                  {/* <td id={`companyData_${index}`}>
                    <div className={`flex gap-3 text-[0.88rem] py-[1rem] px-[1.25rem]`}>
                    {d.image ? (
                        <img
                        // src={d.image}
                        className="object-contain"
                        alt="Avatar"
                        id={`avatar_${index}`}
                      />
                      ) : (
                        <AccountCircle style={{ fontSize: 50 }} className="text-grey-400" />
                      )}
                      <div id={`companyDetails_${index}`}>
                        <div>{d.name}</div>
                        <div className={`text-[#4B5565]`} id={`email_${index}`}>
                          {d.companyName}
                        </div>
                      </div>
                    </div>
                  </td> */}
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
    </div>
  );
};

export default OverviewTable;
