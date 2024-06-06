import React from "react";
import styles from "../styles.module.css";
import image1 from "../../../../../assets/dashboardAssets/Avatar2.png";
import image2 from "../../../../../assets/dashboardAssets/Avatar3.png";
import Image from "next/image";

const data = [
  {
    avatar: image1,
    name: "Caterpillar Engine IV2 ",
    email: "ebuka&sons@gmail.com",
    sale: 23,
    value: "₦ 2,000,000.00",
    date: "24 June 2022",
    time: "10:00AM",
  },
  {
    avatar: image2,
    name: "Caterpillar Engine IV2 ",
    email: "ebuka&sons@gmail.com",
    sale: 60,
    value: "₦ 6,000,000.00",
    date: "24 June 2023",
    time: "01:00PM",
  },
  {
    avatar: image1,
    name: "Caterpillar Engine IV2 ",
    email: "ebuka&sons@gmail.com",
    sale: 52,
    value: "₦ 5,100,000.00",
    date: "30th Oct 2023",
    time: "12:00PM",
  },
  {
    avatar: image2,
    name: "Ebuka & Sons International",
    email: "ebuka&sons@gmail.com",
    sale: 80,
    value: "₦ 82,000,000.00",
    date: "05 July 2022",
    time: "02:00PM",
  },
  {
    avatar: image1,
    name: "Caterpillar Engine IV2 ",
    email: "ebuka&sons@gmail.com",
    sale: 12,
    value: "₦ 1,200,000.00",
    date: "01 Nov 2022",
    time: "11:35AM",
  },
  {
    avatar: image1,
    name: "Caterpillar Engine IV2 ",
    email: "ebuka&sons@gmail.com",
    sale: 5,
    value: "₦ 500,000.00",
    date: "24 June 2022",
    time: "03:45PM",
  },
  {
    avatar: image2,
    name: "Caterpillar Engine IV2 ",
    email: "ebuka&sons@gmail.com",
    sale: 66,
    value: "₦ 6,600,000.00",
    date: "24 Feb 2024",
    time: "12:30PM",
  },
  {
    avatar: image1,
    name: "Caterpillar Engine IV2 ",
    email: "ebuka&sons@gmail.com",
    sale: 30,
    value: "₦ 3,000,000.00",
    date: "12 Jan 2024",
    time: "05:00AM",
  },
  {
    avatar: image2,
    name: "Ebuka & Sons International",
    email: "ebuka&sons@gmail.com",
    sale: 80,
    value: "₦ 82,000,000.00",
    date: "05 July 2022",
    time: "02:00PM",
  },
  {
    avatar: image1,
    name: "Caterpillar Engine IV2 ",
    email: "ebuka&sons@gmail.com",
    sale: 12,
    value: "₦ 1,200,000.00",
    date: "01 Nov 2022",
    time: "11:35AM",
  },
  {
    avatar: image1,
    name: "Caterpillar Engine IV2 ",
    email: "ebuka&sons@gmail.com",
    sale: 30,
    value: "₦ 3,000,000.00",
    date: "12 Jan 2024",
    time: "05:00AM",
  },
  {
    avatar: image2,
    name: "Caterpillar Engine IV2 ",
    email: "ebuka&sons@gmail.com",
    sale: 66,
    value: "₦ 6,600,000.00",
    date: "24 Feb 2024",
    time: "12:30PM",
  },
  {
    avatar: image1,
    name: "Caterpillar Engine IV2 ",
    email: "ebuka&sons@gmail.com",
    sale: 23,
    value: "₦ 2,000,000.00",
    date: "24 June 2022",
    time: "10:00AM",
  },
  {
    avatar: image2,
    name: "Ebuka & Sons International",
    email: "ebuka&sons@gmail.com",
    sale: 52,
    value: "₦ 5,100,000.00",
    date: "30th Oct 2023",
    time: "12:00PM",
  },
  {
    avatar: image1,
    name: "Caterpillar Engine IV2 ",
    email: "ebuka&sons@gmail.com",
    sale: 5,
    value: "₦ 500,000.00",
    date: "24 June 2022",
    time: "03:45PM",
  },
];

function Overview() {
  return (
    <div
      id="vendorAdminTable"
      className={`my-[1.25rem] w-full max-h-[25.19rem] overflow-y-auto scrollbar-none ${styles.table}`}
    >
      <table id="vendorTable" className={`w-full`}>
        <thead className={``}>
          <tr className="truncate">
            <th id="itemNameHeader">Item name</th>
            <th id="totalSoldHeader">Total sold</th>
            <th id="transactionValueHeader">Transaction value</th>
            <th id="dateTimeJoinedHeader">Date & time joined</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, index) => (
            <tr key={index} id={`row_${index}`} className="truncate">
              <td>
                <div
                  className={`flex gap-3 items-center text-[0.88rem] py-[1rem] px-[1.5rem]`}
                >
                  <Image src={d.avatar} alt="Avatar" id={`avatar_${index}`} />
                  <p id={`itemName_${index}`}>{d.name}</p>
                </div>
              </td>
              <td
                className={`text-[0.88rem] py-[1rem] px-[3.125rem]`}
                id={`totalSold_${index}`}
              >
                {d.sale}
              </td>
              <td
                className={`text-[0.88rem] py-[1rem] px-[3.125rem]`}
                id={`transactionValue_${index}`}
              >
                {d.value}
              </td>
              <td>
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
  );
}

export default Overview;
