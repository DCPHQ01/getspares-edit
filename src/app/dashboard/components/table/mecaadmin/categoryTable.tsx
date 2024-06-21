"use client";
import React from "react";
import styles from "../styles.module.css";
import Image from "next/image";
import { AccountCircle } from '@mui/icons-material';

interface Category {
  id: string;
  name: string;
  imageUrl?: string;
  productsInCategory: number;
  createdBy: string;
  dateCreated: string;
  email: string;
}

interface CategoryTableProps {
  categoryList: Category[];
}

const splitDateTime = (dateTime: string) => {
  const [date, timeWithMilliseconds] = dateTime.split('T');
  const time = timeWithMilliseconds.split('.')[0]; 
  return { date, time };
};

const CategoryTable: React.FC<CategoryTableProps> = ({ categoryList }) => {
  
  return (
    <div id="tableContainer">
      <div
        id="mecaAdminTable"
        className={`my-[1.25rem] w-full max-h-[32rem] overflow-y-auto scrollbar-none ${styles.table}`}
      >
        <table id="adminTable" className={`w-full`}>
          <thead>
            <tr className="truncate">
              <th id="companyNameHeader">Category name</th>
              <th id="totalItemsSoldHeader">No of products</th>
              <th id="transactionValueHeader" style={{ paddingLeft: "5rem" }}>
                Created by
              </th>
              <th id="dateTimeJoinedHeader">Date & time joined</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(categoryList) && categoryList?.map((d, index) => {
              const { date, time } = splitDateTime(d.dateCreated);
              return (
                <tr key={index} 
                  id={`row_${index}`} 
                  className="cursor-pointer">
                  <td 
                    id={`companyData_${index}`}>
                    <div
                      className={`flex gap-3 text-[0.88rem] py-[1rem] px-[1.25rem]`}
                    >
                      {d.imageUrl ? (
                        <Image
                          src={d.imageUrl}
                          className="object-contain"
                          alt="Avatar"
                          width={50}
                          height={50}
                          id={`avatar_${index}`}
                        />
                      ) : (
                        <AccountCircle style={{ fontSize: 50 }} className="text-gray-400" />
                      )}
                      <div id={`companyDetails_${index}`}>
                        <div className="truncate mt-2">{d.name}</div>
                      </div>
                    </div>
                  </td>
                  <td
                    className={`text-[0.88rem] py-[1rem] px-[3.13rem]`}
                    id={`itemsSold_${index}`}
                  >
                    {d.productsInCategory}
                  </td>
                  <td
                    className={`text-[0.88rem] py-[1rem] px-[3.13rem]`}
                    id={`transactionValue_${index}`}
                  >
                    <div className="flex gap-3">
                      <div className="">
                       
                      </div>
                      <div className="">
                        <div className="truncate">
                          {d.createdBy}
                        </div>
                        <div
                          className={`text-[#4B5565] truncate`}
                          id={`email_${index}`}
                        >
                          {d.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td id={`dateJoined_${index}`}>
                    <div className={`text-[0.88rem] py-[1rem] px-[2.75rem]`}>
                      <div id={`date_${index}`}>
                        {date}
                      </div>
                      <div
                        className={`text-[#4B5565] truncate`}
                        id={`time_${index}`}
                      >
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
export default CategoryTable;