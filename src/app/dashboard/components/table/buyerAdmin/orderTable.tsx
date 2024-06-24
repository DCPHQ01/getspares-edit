"use client";

import React, { useState } from "react";
import styles from "../styles.module.css";
import image1 from "../../../../../assets/dashboardAssets/Avatar.png";
import image2 from "../../../../../assets/dashboardAssets/Avatar1.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Details from "../../../../category/products/viewDetails/[details]/page";
import BasicTabs from "./FeedBackTab";
import ViewParticularOrderDetailsPage from "../../../../category/products/viewDetails/viewParticularOrderDetails/page";
import { ColorRing } from "react-loader-spinner";

type BuyerOrderData = {
  orderId: string;
  totalAmount: number;
  dateCreated: string;
  // timeCreated: string;
  // date: string;
  // time: string;
};


interface BuyerOrderTableProps {
  data: BuyerOrderData[];
  isLoading?: boolean;
  isError?: boolean;
}

const OrderTable = ({ data, isLoading }: BuyerOrderTableProps) => {
  const router = useRouter();

  const [renderDetails, setRenderDetails] = useState(false);

  const handleDetails = () => {
    setRenderDetails(!renderDetails);
  };

  return (
    <div>
      <div id="tableContainer">
        <div
          id="mecaAdminTable"
          className={` w-full max-h-[34rem] overflow-y-auto scrollbar-none ${styles.table}`}
        >
          <table id="adminTable" className={`w-full`}>
            <thead>
              <tr className="truncate">
                {/* <th id="companyNameHeader">Products</th> */}
                <th id="totalItemsSoldHeader" style={{ paddingLeft: "4.5rem" }}>
                  Order ID
                </th>
                <th id="transactionValueHeader" style={{ paddingLeft: "2rem" }}>
                  Transaction value
                </th>
                {/* <th id="dateTimeJoinedHeader" style={{ paddingLeft: "4.5rem" }}>
                  Vendor
                </th> */}
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
                  let date = '';
                  let time = '';

                  if (d.dateCreated) {
                    [date, time] = d.dateCreated.split("T");
                  }

                  return (
                    <tr
                      key={index}
                      id={`row_${index}`}
                      className="cursor-pointer truncate"
                      onClick={handleDetails}
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
                        {d.totalAmount}
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
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
      {renderDetails && (
        <div className="absolute bottom-0 mt-8 ml-10 lg:left-60 right-0 lg:top-0 h-[100vh] lg:w-[84%] w-[100%] lg:h-[100vh]">
          <div className="bg-white h-[100vh] w-full">
            <ViewParticularOrderDetailsPage />
          </div>
        </div>
      )}
    </div>
  );
};
              {/* {isLoading ? (
                <div className="text-center mt-20 relative lg:left-[550px]">
                  <ClipLoader color="123abc" size={50} />
                  <p>Loading orders</p>
                </div>
                    <ClipLoader color="123abc" size={50} />

              ): 
              {data?.map((d, index) => (
                let date = '',
                let time = '',

                if (d.dateCreated) {
                  [date, time] = d.dateCreated.split("");
                }
                
              
                <tr
                  key={index}
                  id={`row_${index}`}
                  className="cursor-pointer truncate"
                  onClick={handleDetails}
                >
              } */}
                  {/* <td id={`companyData_${index}`}>
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
                      </div>
                    </div>
                  </td> */}

                  {/* <td
                    className={`text-[0.88rem] py-[1rem] px-[3.13rem]`}
                    id={`itemsSold_${index}`}
                  >
                    {d.orderId}
                  </td>

                  <td
                    className={`text-[0.88rem] py-[1rem] px-[3.13rem]`}
                    id={`transactionValue_${index}`}
                  >
                    {d.totalAmount}
                  </td> */}

                  {/* <td id={`companyData_${index}`}>
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
                  </td> */}

                  {/* <td id={`dateJoined_${index}`}>
                    <div className={`text-[0.88rem] py-[1rem] px-[2.75rem]`}>
                      <div id={`date_${index}`}>{d.dateCreated}</div>
                      <div className={`text-[#4B5565]`} id={`time_${index}`}>
                        {d.timeCreated}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {renderDetails && (
        <div className="absolute bottom-0 mt-8 ml-10 lg:left-60 right-0 lg:top-0 h-[100vh] lg:w-[84%] w-[100%]  lg:h-[100vh]">
          <div className=" bg-white h-[100vh] w-full ">
            <ViewParticularOrderDetailsPage />
          </div>
        </div>
      )}
    </div>
  );
}; */}

export default OrderTable;
