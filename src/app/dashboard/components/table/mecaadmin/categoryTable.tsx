"use client";
import React from "react";
import styles from "../styles.module.css";
import image1 from "../../../../../assets/dashboardAssets/Avatar.png";
import image2 from "../../../../../assets/dashboardAssets/Avatar1.png";
import Image from "next/image";

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

const CategoryTable = () => {
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
            {data.map((d, index) => (
              <tr key={index} id={`row_${index}`} className="cursor-pointer">
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
                      <div className="truncate mt-2">{d.name}</div>
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
                      {/* <Image
                          src={d.avatar}
                          className="object-contain"
                          alt="Avatar"
                          id={`avatar_${index}`}
                        /> */}
                    </div>
                    <div className="">
                      <div className="truncate"> {d.created}</div>
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
                    <div id={`date_${index}`}>{d.date}</div>
                    <div
                      className={`text-[#4B5565] truncate`}
                      id={`time_${index}`}
                    >
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
  );
};

export default CategoryTable;
