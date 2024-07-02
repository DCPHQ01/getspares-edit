"use client";
import React from "react";
import styles from "../styles.module.css";
import image1 from "../../../../../assets/dashboardAssets/Avatar.png";
import image2 from "../../../../../assets/dashboardAssets/Avatar1.png";
import Image from "next/image";
// import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

const VendorAgentTable = () => {
  return (
    <div id="tableContainer">
      <div
        id="mecaAdminTable"
        className={`my-[1.25rem] w-full max-h-[34rem] overflow-y-auto scrollbar-none ${styles.table}`}
      >
        {/* <table id="adminTable" className={`w-full`}>
          <thead>
            <tr className="truncate">
              <th id="companyNameHeader">Full name</th>
              <th id="totalItemsSoldHeader">Quantity sold</th>
              <th id="transactionValueHeader" style={{ paddingLeft: "2rem" }}>
                Transaction value
              </th>
              <th id="dateTimeJoinedHeader">Date & time added</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, index) => (
              <tr
                key={index}
                id={`row_${index}`}
                className="cursor-pointer truncate"
              >
                <td id={`companyData_${index}`}>
                  <div
                    className={`flex gap-3 text-[0.88rem] py-[1rem] px-[1.25rem]`}
                  >
                    <Image
                      src={d.avatar}
                      className="object-contain"
                      alt="Avatar"
                      id={`avatar_${index}`}
                    />
                    <div id={`companyDetails_${index}`}>
                      <div>{d.name}</div>
                      <div className={`text-[#4B5565]`} id={`email_${index}`}>
                        {d.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td
                  className={`text-[0.88rem] py-[1rem] px-[3.13rem]`}
                  id={`itemsSold_${index}`}
                >
                  {d.sale}
                </td>
                <td
                  className={`text-[0.88rem] py-[1rem] px-[3.13rem]`}
                  id={`transactionValue_${index}`}
                >
                  {d.vale}
                </td>

                <td id={`dateJoined_${index}`}>
                  <div className={`text-[0.88rem] py-[1rem] px-[2.75rem]`}>
                    <div id={`date_${index}`}>{d.date}</div>
                    <div className={`text-[#4B5565]`} id={`time_${index}`}>
                      {d.time}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
      </div>
    </div>
  );
};

export default VendorAgentTable;
