"use client";

import React, { useEffect, useState } from "react";
import styles from "../styles.module.css";
// import image1 from "../../../../../assets/dashboardAssets/Avatar.png";
// import image2 from "../../../../../assets/dashboardAssets/Avatar1.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
// import Details from "../../../../category/products/viewDetails/[details]/page";
// import BasicTabs from "./FeedBackTab";
import ViewParticularOrderDetailsPage from "../../../../category/products/viewDetails/viewParticularOrderDetails/page";
import { ColorRing } from "react-loader-spinner";
// import AmountComponentsPage from "../../../../reusables/AmountComponents/page";

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



const OrderTable: React.FC<BuyerOrderTableProps> = ({ data, isLoading }) => {
  const router = useRouter();

  const [renderDetails, setRenderDetails] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  // const handleDetails = () => {
  //   setRenderDetails(!renderDetails);
  // };
  useEffect(() => {
    const storedOrderId = sessionStorage.getItem("selectedOrderId");
    if (storedOrderId) {
      setSelectedOrderId(storedOrderId);
    }
  }, []);

  // const handleDetails = (orderId: string) => {
    // setSelectedOrderId(orderId);
  // };
  const handleDetails = (orderId: string) => {
    sessionStorage.setItem("selectedOrderId", orderId);
    setSelectedOrderId(orderId);
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
                  // <div className="w-[ h-full flex justify-center items-center">
                  <div className="mt-28 relative lg:left-[400px] md:right-[400px]"> 
                  <ColorRing
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{position: "absolute", bottom: "75%", left: "40%"}}
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
              ) : (
                data?.map((d, index) => {
                  let date = "";
                  let time = "";

                  if (d.dateCreated) {
                    [date, time] = d.dateCreated.split("T");
                  }

                  return (
                    <tr
                      key={index}
                      id={`row_${index}`}
                      className="cursor-pointer truncate"
                      // onClick={handleDetails}
                      onClick={() => handleDetails(d.orderId)}
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
                        <div
                          className={`text-[0.88rem] py-[1rem] px-[2.75rem]`}
                        >
                          <div id={`date_${index}`}>{date}</div>
                          <div
                            className={`text-[#4B5565]`}
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
        </div>
      </div>
      {/* {renderDetails && (
        <div className="absolute bottom-0 mt-8 ml-10 lg:left-60 right-0 lg:top-0 h-[100vh] lg:w-[84%] w-[100%] lg:h-[100vh]">
          <div className="bg-white h-[100vh] w-full">
            <ViewParticularOrderDetailsPage orderId={selectedOrderId} />
          </div>
        </div>
      )} */}
      {selectedOrderId && (
        <div className="absolute bottom-0 mt-8 ml-10 lg:left-60 right-0 lg:top-0 h-[100vh] lg:w-[84%] w-[100%] lg:h-[100vh]">
          <div className="bg-white h-[100vh] w-full">
            <ViewParticularOrderDetailsPage orderId={selectedOrderId} />
          </div>
        </div>
      )}
    </div>
  );
};              

export default OrderTable;


