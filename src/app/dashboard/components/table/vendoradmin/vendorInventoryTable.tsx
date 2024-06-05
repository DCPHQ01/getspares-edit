"use client";
import React from "react";
import styles from "../styles.module.css";
import image1 from "../../../../../assets/dashboardAssets/Avatar.png";
import image2 from "../../../../../assets/dashboardAssets/Avatar1.png";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import "react-tabs/style/react-tabs.css";

const data = [
  {
    avatar: image1,
    name: "Ebuka & Sons International",
    email: "Ebukainternional.com",
    sale: 12,
    vale: "₦ 200,000.00",
    rating: (
      <Stack spacing={1}>
        {/* <Rating name="half-rating" defaultValue={2.5} precision={0.5} /> */}
      </Stack>
    ),
    date: "24 June 2022",
    time: "12:00PM",
  },
  {
    avatar: image2,
    name: "Ebuka & Sons International",
    email: "ebuka&sons@gmail.com",
    sale: 83,
    vale: "₦ 1,000,000.00",
    rating: (
      <Stack spacing={1}>
        {/* <Rating name="half-rating" defaultValue={2.5} precision={0.5} /> */}
      </Stack>
    ),
    date: "30 June 2023",
    time: "06:00PM",
  },
  {
    avatar: image1,
    name: "Ebuka & Sons International",
    email: "ebuka&sons@gmail.com",
    sale: 45,
    vale: "₦ 600,000.00",
    // rating: <Rating name="half-rating" defaultValue={2.5} precision={0.5} />,
    date: "12 May 2024",
    time: "08:45PM",
  },
  {
    avatar: image2,
    name: "Ebuka & Sons International",
    email: "ebuka&sons@gmail.com",
    sale: 10,
    vale: "₦ 120,000.00",
    // rating: <Rating name="half-rating" defaultValue={2.5} precision={0.5} />,

    date: "02 Sep 2022",
    time: "11:15AM",
  },
  {
    avatar: image1,
    name: "Ebuka & Sons International",
    email: "ebuka&sons@gmail.com",
    sale: 67,
    vale: "₦ 700,000,00",
    // rating: <Rating name="half-rating" defaultValue={2.5} precision={0.5} />,
    date: "30 Aug 2022",
    time: "04:00PM",
  },
  {
    avatar: image1,
    name: "Ebuka & Sons International",
    email: "ebuka&sons@gmail.com",
    sale: 67,
    vale: "₦ 700,000,00",
    // rating: <Rating name="half-rating" defaultValue={2.5} precision={0.5} />,
    date: "30 Aug 2022",
    time: "04:00PM",
  },

  {
    avatar: image1,
    name: "Ebuka & Sons International",
    email: "ebuka&sons@gmail.com",
    sale: 67,
    vale: "₦ 700,000,00",
    // rating: <Rating name="half-rating" defaultValue={2.5} precision={0.5} />,
    date: "30 Aug 2022",
    time: "04:00PM",
  },

  {
    avatar: image1,
    name: "Ebuka & Sons International",
    email: "ebuka&sons@gmail.com",
    sale: 67,
    vale: "₦ 700,000,00",
    // rating: <Rating name="half-rating" defaultValue={2.5} precision={0.5} />,
    date: "30 Aug 2022",
    time: "04:00PM",
  },

  {
    avatar: image1,
    name: "Ebuka & Sons International",
    email: "ebuka&sons@gmail.com",
    sale: 67,
    vale: "₦ 700,000,00",
    // rating: <Rating name="half-rating" defaultValue={2.5} precision={0.5} />,
    date: "30 Aug 2022",
    time: "04:00PM",
  },

  {
    avatar: image1,
    name: "Ebuka & Sons International",
    email: "ebuka&sons@gmail.com",
    sale: 67,
    vale: "₦ 700,000,00",
    // rating: <Rating name="half-rating" defaultValue={2.5} precision={0.5} />,
    date: "30 Aug 2022",
    time: "04:00PM",
  },

  {
    avatar: image1,
    name: "Ebuka & Sons International",
    email: "ebuka&sons@gmail.com",
    sale: 67,
    vale: "₦ 700,000,00",
    // rating: <Rating name="half-rating" defaultValue={2.5} precision={0.5} />,
    date: "30 Aug 2022",
    time: "04:00PM",
  },
];
const VendorInventoryTable = () => {
  return (
    <div id="tableContainer">
      <div
        id="mecaAdminTable"
        className={`my-[1.25rem] w-full max-h-[34rem] overflow-y-auto scrollbar-none ${styles.table}`}
      >
        <table id="adminTable" className={`w-full`}>
          <thead>
            <tr className="truncate">
              <th id="companyNameHeader">Product name</th>
              <th id="dateTimeJoinedHeader">Vendors</th>
              <th id="totalItemsSoldHeader">Quantity sold</th>
              <th id="transactionValueHeader">Transaction value</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, index) => (
              <tr key={index} id={`row_${index}`} className="cursor-pointer truncate">
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
                    </div>
                  </div>
                </td>

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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VendorInventoryTable;
