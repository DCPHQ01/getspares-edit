import React from "react";
import styles from "../styles.module.css";
import image1 from "../../../../../assets/dashboardAssets/Avatar.png";
import image2 from "../../../../../assets/dashboardAssets/Avatar1.png";
import Image from "next/image";
import EmptyState from "../../../../../components/utils/emptyState";

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

const Order = () => {
  return (
    <div id="tableContainer">
      <div
        id="mecaAdminTable"
        className={`my-[1.25rem] w-full max-h-[34rem] overflow-y-auto scrollbar-none ${styles.table}`}
      >
        <table id="adminTable" className={`w-full`}>
          <thead>
            <tr className="truncate">
              <th id="totalItemsSoldHeader" style={{ paddingLeft: "4rem" }}>
                Order ID
              </th>
              <th id="transactionValueHeader" style={{ paddingLeft: "4rem" }}>
                Amount
              </th>
              <th id="dateTimeJoinedHeader" style={{ paddingLeft: "2rem" }}>
                Buyers
              </th>
              <th id="dateTimeJoinedHeader">Date & time ordered</th>
            </tr>
          </thead>
        </table>
      </div>
      <EmptyState />
    </div>
  );
};

export default Order;
