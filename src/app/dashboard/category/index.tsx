"use client";
import React from "react";
import Cards from "../../../app/dashboard/overview/cards";
import PeriodRadios from "../../../app/dashboard/overview/periodRadios";
import Table from "../../../app/dashboard/table";
import { roles } from "../../../app/dashboard/utils";
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
    name: "Meca for meca inside meca to meca about meca through me...",
    email: "Samimmanuel@gmail.com",
    sale: 12,
    created: "Adebayo Emmanuel...",
    date: "24 June 2022",
    time: "12:00PM",
  },
  {
    avatar: image2,
    name: "Caterpillar Engine IV2 ",
    email: "Samimmanuel@gmail.com",
    sale: 83,
    created: "Adebayo Emmanuel...",
    date: "30 June 2023",
    time: "06:00PM",
  },
  {
    avatar: image1,
    name: "Meca for meca inside meca to meca about meca through me...",
    email: "Samimmanuel@gmail.com",
    sale: 12,
    created: "Adebayo Emmanuel...",
    date: "24 June 2022",
    time: "12:00PM",
  },
  {
    avatar: image2,
    name: "Caterpillar Engine IV2 ",
    email: "Samimmanuel@gmail.com",
    sale: 83,
    created: "Adebayo Emmanuel...",
    date: "30 June 2023",
    time: "06:00PM",
  },
  {
    avatar: image1,
    name: "Meca for meca inside meca to meca about meca through me...",
    email: "Samimmanuel@gmail.com",
    sale: 12,
    created: "Adebayo Emmanuel...",
    date: "24 June 2022",
    time: "12:00PM",
  },
  {
    avatar: image2,
    name: "Caterpillar Engine IV2 ",
    email: "Samimmanuel@gmail.com",
    sale: 83,
    created: "Adebayo Emmanuel...",
    date: "30 June 2023",
    time: "06:00PM",
  },

  {
    avatar: image1,
    name: "Meca for meca inside meca to meca about meca through me...",
    email: "Samimmanuel@gmail.com",
    sale: 12,
    created: "Adebayo Emmanuel...",
    date: "24 June 2022",
    time: "12:00PM",
  },

  {
    avatar: image2,
    name: "Caterpillar Engine IV2 ",
    email: "Samimmanuel@gmail.com",
    sale: 83,
    created: "Adebayo Emmanuel...",
    date: "30 June 2023",
    time: "06:00PM",
  },

  {
    avatar: image1,
    name: "Meca for meca inside meca to meca about meca through me...",
    email: "Samimmanuel@gmail.com",
    sale: 12,
    created: "Adebayo Emmanuel...",
    date: "24 June 2022",
    time: "12:00PM",
  },

  {
    avatar: image2,
    name: "Caterpillar Engine IV2 ",
    email: "Samimmanuel@gmail.com",
    sale: 83,
    created: "Adebayo Emmanuel...",
    date: "30 June 2023",
    time: "06:00PM",
  },

  {
    avatar: image1,
    name: "Meca for meca inside meca to meca about meca through me...",
    email: "Samimmanuel@gmail.com",
    sale: 12,
    created: "Adebayo Emmanuel...",
    date: "24 June 2022",
    time: "12:00PM",
  },
];

interface IProps {
  categoryRoles: string;
}

function Index({ categoryRoles }: IProps) {
  const role: any = categoryRoles;
  return (
    <div className="">
      <div id="welcomeSection" className={`flex justify-between items-center`}>
        <div>
          <div className="flex gap-x-2 ">
            <h1
              id="welcomeTitle"
              className={`font-semibold text-[1.9rem] text-[#101828]`}
            >
              Category
            </h1>
            <div className="w-16 h-6 rounded-full border-2 mt-3">
              <p className="text-xs text-center mt-1 ">430,607</p>
            </div>
          </div>
          <p id="welcomeText" className={`text-[#364152]`}>
            Keep track of categories and their products.
          </p>
        </div>

        <div>
          <Link href="">
            {/* {role === roles.VENDOR_ADMIN && ( */}
            <button
              id="addCompanyButton"
              className={`bg-[#095AD3] text-white rounded-full py-[0.38rem] px-[1.5rem]`}
            >
              + Create category
            </button>
            {/* )} */}
          </Link>
        </div>
      </div>

      <div className="flex justify-between">
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
            placeholder="Search for category"
            className="border-2 w-[253px]  h-[44px] rounded-full px-9 outline-none"
          />
        </div>
        <div className="mt-6">
          <PeriodRadios />
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
                <th id="companyNameHeader">Category name</th>
                <th id="totalItemsSoldHeader">No of products</th>
                <th id="transactionValueHeader">Created by</th>
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
                    <div className="flex gap-3">
                      <div className="">
                        <Image
                          src={d.avatar}
                          className="object-contain"
                          alt="Avatar"
                          id={`avatar_${index}`}
                        />
                      </div>
                      <div className="">
                        <div className=""> {d.created}</div>
                        <div className={`text-[#4B5565]`} id={`email_${index}`}>
                          {d.email}
                        </div>
                      </div>
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
    </div>
  );
}

export default Index;
