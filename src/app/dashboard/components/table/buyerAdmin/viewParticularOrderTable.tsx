"use client";

import React, { useEffect, useState } from "react";
import styles from "../styles.module.css";
import image1 from "../../../../../assets/dashboardAssets/Avatar.png";
import image2 from "../../../../../assets/dashboardAssets/Avatar1.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Details from "../../../../category/products/viewDetails/[details]/page";
import BasicTabs from "./FeedBackTab";
import ViewParticularOrderDetailsPage from "../../../../category/products/viewDetails/viewParticularOrderDetails/page";
import { ColorRing } from "react-loader-spinner";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { formatAmount4 } from "../../../../../components/utils";

interface OrderItem {
  price: number;
  productId: string;
  productImage: string;
  productName: string;
  quantity: number;
  avatar?: any;
}

interface OrderInfo {
  orderId?: string;
  orderDate: string;
  deliveryAddress: any;
  orderItems: OrderItem[];
}

const ViewParticularOrderTable = ({
  data,
  isLoading,
}: {
  data: OrderInfo;
  isLoading: boolean;
}) => {
  const router = useRouter();
  const [renderDetails, setRenderDetails] = useState(false);

  // useEffect(() => {
  //   const storedOrderId = sessionStorage.getItem("selectedOrderId");
  //   if (storedOrderId) {
  //     setOrderId(storedOrderId);
  //   }
  // }, []);

  const handleDetails = () => {
    setRenderDetails(!renderDetails);
  };

  const [details, setDetails] = useState(false);
  const handleParticularDetails = (productId: string) => {
    sessionStorage.setItem("myProductId", productId);
    setDetails(!details);
  };

  const id = sessionStorage.getItem("myProductId");
  console.log("The id: ", id);
  return (
    <div className="">
      <div className="w-[95%] lg:flex gap-x-10">
        <div id="tableContainer" className="lg:w-[60%]">
          <div
            id="mecaAdminTable"
            className={` w-full pl-10 max-h-[34rem] overflow-y-auto scrollbar-none ${styles.table}`}
          >
            <table id="adminTable" className={`w-full`}>
              <thead>
                <tr className="truncate">
                  <th id="companyNameHeader">Products name</th>

                  <th
                    id="dateTimeJoinedHeader"
                    style={{ paddingLeft: "4.5rem" }}
                  >
                    Quantity
                  </th>

                  <th
                    id="transactionValueHeader"
                    style={{ paddingLeft: "2rem" }}
                  >
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={3}>
                      <div className="mt-28 relative lg:left-[100px] md:right-[400px]">
                        <ColorRing
                          visible={true}
                          height="80"
                          width="80"
                          ariaLabel="color-ring-loading"
                          wrapperStyle={{
                            position: "absolute",
                            bottom: "75%",
                            left: "40%",
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
                    </td>
                  </tr>
                ) : (
                  data?.orderItems?.map((d, index) => (
                    <tr
                      key={index}
                      id={`row_${index}`}
                      className="cursor-pointer truncate"
                      onClick={() => handleParticularDetails(d.productId)}
                    >
                      <td id={`companyData_${index}`}>
                        <div
                          className={`flex gap-3 text-[0.88rem] py-[1rem] px-[1.25rem]`}
                        >
                          {d.avatar ? (
                            <Image
                              src={d.productImage}
                              className="object-contain"
                              alt="Product Image"
                              width={50}
                              height={50}
                            />
                          ) : (
                            <AccountCircleIcon
                              id={`avatar_${index}`}
                              className="object-cover"
                              style={{ fontSize: 40, color: "gray" }}
                            />
                          )}
                          <div id={`companyDetails_${index}`}>
                            <div className="mt-[8px]">{d.productName}</div>
                          </div>
                        </div>
                      </td>
                      <td
                        className={`text-[0.88rem] py-[1rem] px-[6rem]`}
                        id={`transactionValue_${index}`}
                      >
                        {d.quantity}
                      </td>
                      <td id={`dateJoined_${index}`}>
                        <div className={`text-[0.88rem] py-[1rem]`}>
                          {formatAmount4(String(d.price))}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="">
          <div className=" lg:w-96  h-[132px] pt-[12px] pb-[12px] pl-[20px] pr-[20px]  bg-mecaGrayBackgroundColor">
            <p>Order details</p>

            <div className="flex mt-[24px] mb-[12px] text-mecaGrayBodyText justify-between">
              <p>Order ID: {data.orderId}</p>
            </div>

            <div className="flex text-mecaGrayBodyText justify-between">
              <p>Order date: {data.orderDate}</p>
            </div>
          </div>

          <div className="lg:w-96  mt-5   h-[132px] pt-[12px] pb-[12px] pl-[20px] pr-[20px]  bg-mecaGrayBackgroundColor">
            <p>Delivery Address </p>
            <div className=" mt-[12px] mb-[12px] text-mecaGrayBodyText justify-between">
              {/* No 56b, Moleye by Total filling station, Alago-meji, Sabo,
              Yaba,Lagos, Total Filling Station | Lagos - Yaba-(Sabo) */}
              {data.deliveryAddress?.location}
            </div>
          </div>
        </div>
      </div>

      {details && (
        <div className="absolute top-0 w-[100%] m-auto h-[100vh]">
          <div className=" bg-white">
            <Details />
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewParticularOrderTable;
