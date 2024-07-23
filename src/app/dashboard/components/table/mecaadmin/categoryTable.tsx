"use client";
import React from "react";
// @ts-ignore
import styles from "../styles.module.css";
import { AccountCircle } from "@mui/icons-material";
import dayjs from "dayjs";
import { ColorRing } from "react-loader-spinner";
import { CldImage } from "next-cloudinary";
import { MdInventory2 } from "react-icons/md";
import EmptyState from "../../../../../components/utils/emptyState";
import TruncateText from "../../../../../components/utils/utils";

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
  isLoading?: boolean;
  isError?: boolean;
}

const formatDateTime = (dateTime: string) => {
  const date = dayjs(dateTime).format("DD-MM-YYYY");
  const time = dayjs(dateTime).format("hh:mm A");
  return { date, time };
};
// const formatDateTime = (dateTime: string) => {
//   const date = dayjs(dateTime).format("DD-MM-YYYY");
//   const time = dayjs(dateTime).format("hh:mm A"); // Updated to 12-hour format with AM/PM
//   return { date, time };
// };
const CategoryTable: React.FC<CategoryTableProps> = ({
  categoryList,
  isLoading,
}) => {
  return (
    <div id="tableContainer">
      <div
        id="mecaAdminTable"
        className={`my-[1.25rem] w-full max-h-[32rem] overflow-y-auto scrollbar-none h-[32rem] ${styles.table}`}
      >
        <table id="adminTable" className={`w-full`}>
          <thead>
            <tr className="truncate">
              <th id="companyNameHeader" className={`lg:sticky`}>
                Category name
              </th>
              <th id="totalItemsSoldHeader" className={`lg:sticky`}>
                No of products
              </th>
              <th
                id="transactionValueHeader"
                className={`lg:sticky`}
                style={{ paddingLeft: "5rem" }}
              >
                Created by
              </th>
              <th id="dateTimeJoinedHeader" className={`lg:sticky`}>
                Date & time joined
              </th>
            </tr>
          </thead>
          <tbody className="-z-50">
            {isLoading ? (
              <div className="text-center mt-28 relative lg:left-[210%] lg:right[210%] md:left-[213%] md:right[213%] sm:left-[21]">
                <ColorRing
                  visible={true}
                  height="40"
                  width="40"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{
                    position: "absolute",
                    bottom: "75%",
                    left: "44%",
                  }}
                  wrapperClass="color-ring-wrapper"
                  colors={[
                    "#095AD3",
                    "#095AD3",
                    "#095AD3",
                    "#095AD3",
                    "#095AD3",
                  ]}
                />
              </div>
            ) : categoryList.length === 0 ? (
              <div className="relative right-[80%] left-[80%]">
                <EmptyState datad={categoryList} />
              </div>
            ) : (
              categoryList?.map((d, index) => {
                const { date, time } = formatDateTime(d?.dateCreated);
                return (
                  <tr
                    key={index}
                    id={`row_${index}`}
                  >
                    <td id={`companyData_${index}`}>
                      <div className={`w-full flex items-center gap-x-4`}>
                        {d?.imageUrl ? (
                          <CldImage
                            src={d?.imageUrl} // Use this sample image or upload your own via the Media Explorer
                            width="40" // Transform the image: auto-crop to square aspect_ratio
                            height="40"
                            alt="image"
                            crop={{
                              type: "auto",
                              source: true,
                            }}
                            className="rounded-full"
                          />
                        ) : (
                          <AccountCircle
                            style={{ fontSize: 50 }}
                            className="text-gray-400"
                          />
                        )}
                        <div id={`companyDetails_${index}`}>
                          <div className="truncate mt-2">
                            {<TruncateText text={d?.name} maxLength={40} />}
                          </div>
                          <div
                            className={`text-[#4B5565] truncate`}
                            id={`email_${index}`}
                          >
                            {d?.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td
                      className={`text-[0.88rem] py-[1rem] px-[3.13rem]`}
                      id={`itemsSold_${index}`}
                    >
                      {d?.productsInCategory}
                    </td>
                    <td
                      className={`text-[0.88rem] py-[1rem] px-[3.13rem]`}
                      id={`transactionValue_${index}`}
                    >
                      <div className="flex gap-3">
                        <div className="">
                          {/* <img
                          src={d.imageUrl}
                          className="object-contain"
                          alt="Avatar"
                          id={`avatar_${index}`}
                        /> */}
                        </div>
                        <div className="">
                          <div className="truncate">{d?.createdBy}</div>
                          <div
                            className={`text-[#4B5565] truncate`}
                            id={`email_${index}`}
                          >
                            {d?.email}
                          </div>
                        </div>
                      </div>
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
                );
              })
            )}
          </tbody>
        </table>
        {/* {categoryList.length === 0 ? <EmptyState datad={categoryList} /> :  ""} */}
      </div>
    </div>
  );
};

export default CategoryTable;
