"use client";
import React from "react";
import Cards from "../../../app/dashboard/overview/cards";
import PeriodRadios from "../../../app/dashboard/overview/periodRadios";
import Table from "../../../app/dashboard/table";
import { roles, userRole } from "../../../app/dashboard/utils";
import Link from "next/link";
import styles from "../overview/styles.module.css";
import image1 from "../../../assets/dashboardAssets/Avatar.png";
import image2 from "../../../assets/dashboardAssets/Avatar1.png";
import Image from "next/image";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { MdSearch } from "react-icons/md";
import { IoFilterSharp } from "react-icons/io5";

const data = [
  {
    avatar: image1,
    name: "Ebuka & sons international an arm of the peoples...",
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

interface IProps {
  header: string;
  subheader: string;
}

function Index({ header, subheader }: IProps) {
  const role: any = userRole;
  const cardProps = [
    {
      total: "number of parts ordered",
      amount: 2250,
      percentage: 32,
      onClick: () => {
        console.log("View total number of parts ordered");
      },
    },
    {
      total: "number of agents",
      amount: 1475,
      percentage: 10,
      onClick: () => {
        console.log("View total number of agents");
      },
    },
    {
      total: "transaction value",
      amount: 1250,
      percentage: 59,
      onClick: () => {
        console.log("View total transaction value");
      },
    },
    {
      total: "number of vendors",
      amount: 1280,
      percentage: 43,
      onClick: () => {
        console.log("View total number of vendors");
      },
    },
  ];
  return (
    <>
      <div id="welcomeSection" className={`flex justify-between items-center`}>
        <div>
          <div className="flex gap-x-2 ">
            <h1
              id="welcomeTitle"
              className={`font-semibold text-[1.9rem] text-[#101828]`}
            >
              Vendors
            </h1>
            <div className="w-16 h-6 rounded-full border-2 mt-3">
              <p className="text-xs text-center mt-1 ">430,607</p>
            </div>
          </div>
          <p id="welcomeText" className={`text-[#364152]`}>
            Keep track of vendor sales and their service ratings.
          </p>
        </div>

        <div>
          <Link href="">
            {/* {role === roles.VENDOR_ADMIN && ( */}
            <button
              id="addCompanyButton"
              className={`bg-[#095AD3] text-white rounded-full py-[0.38rem] px-[1.5rem]`}
            >
              + Add Vendor
            </button>
            {/* )} */}
          </Link>
        </div>
      </div>
      <div className="flex gap-x-6">
        <div
          className="flex mt-5 items-center gap-x-2 relative"
          id="searchDesktop"
        >
          <MdSearch
            size={24}
            className="absolute left-1 text-mecaGoBackArrow"
          />
          <input
            id="inputSearchDesktop"
            placeholder="Search for vendor"
            className="border-2 w-[253px]  h-[44px] rounded-full px-9 outline-none"
          />
        </div>

        <div className="flex gap-x-1 text-mecaBluePrimaryColor">
          <IoFilterSharp className="mt-9" />
          <span className="mt-8">Filter by</span>
        </div>
      </div>

      <div id="tableContainer">
        <div
          id="mecaAdminTable"
          className={`my-[1.25rem] w-full max-h-[25.19rem] overflow-y-auto scrollbar-none ${styles.table}`}
        >
          <table id="adminTable" className={`w-full`}>
            <thead>
              <tr>
                <th id="companyNameHeader">Company name</th>
                <th id="totalItemsSoldHeader">Total items sold</th>
                <th id="transactionValueHeader">Transaction value</th>
                <th id="transactionRatings">Ratings</th>
                <th id="dateTimeJoinedHeader">Date & time joined</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d, index) => (
                <tr key={index} id={`row_${index}`}>
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
                  <td
                    className={`text-[0.88rem] py-[1rem] px-[3.13rem]`}
                    id={`transactionRatings_${index}`}
                  >
                    <div>
                      <Stack spacing={1}>
                        <Rating
                          name="half-rating"
                          defaultValue={2.5}
                          precision={0.5}
                        />
                      </Stack>
                      <p>2k</p>
                    </div>
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
          </table>
        </div>
      </div>
    </>
  );
}

export default Index;
