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

const data = [
  {
    avatar: image1,
    name: "Ebuka Shima Oke",
    email: "ebukashima@gmail.com",
    sale: "MCA3435656jh787",
    vale: "₦ 200,000.00",
    date: "24 June 2022",
    time: "12:00PM",
  },
  {
    avatar: image2,
    name: "Sanni Rabiu",
    email: "sannirabiu@gmail.com",
    sale: "MCA3435656jh787",
    vale: "₦ 1,000,000.00",
    date: "30 June 2023",
    time: "06:00PM",
  },
  {
    avatar: image1,
    name: "Ayodele Olakoya",
    email: "ayodeleola@gmail.com",
    sale: "MCA3435656jh787",
    vale: "₦ 600,000.00",
    date: "12 May 2024",
    time: "08:45PM",
  },
  {
    avatar: image2,
    name: "Ngozi Ike",
    email: "ngoziike.com",
    sale: "MCA3435656jh787",
    vale: "₦ 120,000.00",
    date: "02 Sep 2022",
    time: "11:15AM",
  },
  {
    avatar: image1,
    name: "Ayodele Olakoya",
    email: "ayodeleola@gmail.com",
    sale: "MCA3435656jh787",
    vale: "₦ 700,000,00",
    date: "30 Aug 2022",
    time: "04:00PM",
  },

  {
    avatar: image1,
    name: "Ebuka Shima Oke",
    email: "ebukashima@gmail.com",
    sale: "MCA3435656jh787",
    vale: "₦ 200,000.00",
    date: "24 June 2022",
    time: "12:00PM",
  },
  {
    avatar: image2,
    name: "Sanni Rabiu",
    email: "sannirabiu@gmail.com",
    sale: "MCA3435656jh787",
    vale: "₦ 1,000,000.00",
    date: "30 June 2023",
    time: "06:00PM",
  },
  {
    avatar: image2,
    name: "Ngozi Ike",
    email: "ngoziike.com",
    sale: "MCA3435656jh787",
    vale: "₦ 120,000.00",
    date: "02 Sep 2022",
    time: "11:15AM",
  },
  {
    avatar: image1,
    name: "Ayodele Olakoya",
    email: "ayodeleola@gmail.com",
    sale: "MCA3435656jh787",
    vale: "₦ 700,000,00",
    date: "30 Aug 2022",
    time: "04:00PM",
  },
];

const ViewParticularOrderTable = () => {
  const router = useRouter();

  const [renderDetails, setRenderDetails] = useState(false);

  const handleDetails = () => {
    setRenderDetails(!renderDetails);
  };

  const [details, setDetails] = useState(false);
  const handleParticularDetails = () => {
    setDetails(!details);
  };
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
              <tbody onClick={handleParticularDetails}>
                {data.map((d, index) => (
                  <tr
                    key={index}
                    id={`row_${index}`}
                    className="cursor-pointer truncate"
                    onClick={handleDetails}
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
                          <div className="mt-[8px]">{d.name}</div>
                        </div>
                      </div>
                    </td>

                    <td
                      className={`text-[0.88rem] py-[1rem] px-[3.13rem]`}
                      id={`transactionValue_${index}`}
                    >
                      {d.vale}
                    </td>

                    <td id={`dateJoined_${index}`}>
                      <div className={`text-[0.88rem] py-[1rem] px-[2.75rem]`}>
                        <div id={`date_${index}`}>{d.vale}</div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="">
          <div className=" lg:w-96  h-[132px] pt-[12px] pb-[12px] pl-[20px] pr-[20px]  bg-mecaGrayBackgroundColor">
            <p>Order details</p>

            <div className="flex mt-[24px] mb-[12px] text-mecaGrayBodyText justify-between">
              <p>Order ID:</p>
              <p>MCA3435656jh787</p>
            </div>

            <div className="flex text-mecaGrayBodyText justify-between">
              <p>Order date:</p>
              <p>30 June, 2023</p>
            </div>
          </div>

          <div className="lg:w-96  mt-5   h-[132px] pt-[12px] pb-[12px] pl-[20px] pr-[20px]  bg-mecaGrayBackgroundColor">
            <p>Deliver Address </p>
            <div className=" mt-[12px] mb-[12px] text-mecaGrayBodyText justify-between">
              No 56b, Moleye by Total filling station, Alago-meji, Sabo,
              Yaba,Lagos, Total Filling Station | Lagos - Yaba-(Sabo)
            </div>
          </div>
        </div>
      </div>

      {details && (
        <div className="absolute top-0 w-[100vw] h-[100vh]">
          <div className=" bg-white">
            <Details />
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewParticularOrderTable;
