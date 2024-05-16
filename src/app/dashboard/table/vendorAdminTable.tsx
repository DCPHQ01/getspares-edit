import React from 'react';
import styles from "../overview/styles.module.css";
import image1 from "../../../assets/dashboardAssets/Avatar2.png";
import image2 from "../../../assets/dashboardAssets/Avatar3.png";
import Image from "next/image";

const data = [
    {
        "avatar": image1,
        name: "Caterpillar Engine IV2 ",
        email: "ebuka&sons@gmail.com",
        sale: 123,
        vale: "₦ 123",
        date: "24 June 2022",
        time: "12PM"
    },
    {
        avatar: image2,
        name: "Caterpillar Engine IV2 ",
        email: "ebuka&sons@gmail.com",
        sale: 123,
        vale: "₦ 123",
        date: "24 June 2022",
        time: "12PM"
    },
    {
        avatar: image1,
        name: "Caterpillar Engine IV2 ",
        email: "ebuka&sons@gmail.com",
        sale: 123,
        vale: "₦ 123",
        date: "24 June 2022",
        time: "12PM"
    },
    {
        avatar: image2,
        name: "Ebuka & Sons International",
        email: "ebuka&sons@gmail.com",
        sale: 123,
        vale: "₦ 123",
        date: "24 June 2022",
        time: "12PM"
    },
    {
        avatar: image1,
        name: "Caterpillar Engine IV2 ",
        email: "ebuka&sons@gmail.com",
        sale: 123,
        vale: "₦ 123",
        date: "24 June 2022",
        time: "12PM"
    },
    {
        "avatar": image1,
        name: "Caterpillar Engine IV2 ",
        email: "ebuka&sons@gmail.com",
        sale: 123,
        vale: "₦ 123",
        date: "24 June 2022",
        time: "12PM"
    },
    {
        avatar: image2,
        name: "Caterpillar Engine IV2 ",
        email: "ebuka&sons@gmail.com",
        sale: 123,
        vale: "₦ 123",
        date: "24 June 2022",
        time: "12PM"
    },
    {
        avatar: image1,
        name: "Caterpillar Engine IV2 ",
        email: "ebuka&sons@gmail.com",
        sale: 123,
        vale: "₦ 123",
        date: "24 June 2022",
        time: "12PM"
    },
    {
        avatar: image2,
        name: "Ebuka & Sons International",
        email: "ebuka&sons@gmail.com",
        sale: 123,
        vale: "₦ 123",
        date: "24 June 2022",
        time: "12PM"
    },
    {
        avatar: image1,
        name: "Caterpillar Engine IV2 ",
        email: "ebuka&sons@gmail.com",
        sale: 123,
        vale: "₦ 123",
        date: "24 June 2022",
        time: "12PM"
    },
    {
        "avatar": image1,
        name: "Caterpillar Engine IV2 ",
        email: "ebuka&sons@gmail.com",
        sale: 123,
        vale: "₦ 123",
        date: "24 June 2022",
        time: "12PM"
    },
    {
        avatar: image2,
        name: "Caterpillar Engine IV2 ",
        email: "ebuka&sons@gmail.com",
        sale: 123,
        vale: "₦ 123",
        date: "24 June 2022",
        time: "12PM"
    },
    {
        avatar: image1,
        name: "Caterpillar Engine IV2 ",
        email: "ebuka&sons@gmail.com",
        sale: 123,
        vale: "₦ 123",
        date: "24 June 2022",
        time: "12PM"
    },
    {
        avatar: image2,
        name: "Ebuka & Sons International",
        email: "ebuka&sons@gmail.com",
        sale: 123,
        vale: "₦ 123",
        date: "24 June 2022",
        time: "12PM"
    },
    {
        avatar: image1,
        name: "Caterpillar Engine IV2 ",
        email: "ebuka&sons@gmail.com",
        sale: 123,
        vale: "₦ 123",
        date: "24 June 2022",
        time: "12PM"
    },

]

function VendorAdminTable() {
    return (
        <div id="vendorAdminTable" className={`my-[1.25rem] w-full max-h-[25.19rem] overflow-y-auto scrollbar-none ${styles.table}`}>
            <table id="vendorTable" className={`w-full`}>
                <thead className={``}>
                <tr>
                    <th id="itemNameHeader">Item name</th>
                    <th id="totalSoldHeader">Total sold</th>
                    <th id="transactionValueHeader">Transaction value</th>
                    <th id="dateTimeJoinedHeader">Date & time joined</th>
                </tr>
                </thead>
                <tbody>
                {data.map((d, index) => (
                    <tr key={index} id={`row_${index}`}>
                        <td>
                            <div className={`flex gap-3 items-center text-[0.88rem] py-[1rem] px-[1.5rem]`}>
                                <Image src={d.avatar} alt="Avatar" id={`avatar_${index}`} />
                                <p id={`itemName_${index}`}>{d.name}</p>
                            </div>
                        </td>
                        <td className={`text-[0.88rem] py-[1rem] px-[3.125rem]`} id={`totalSold_${index}`}>{d.sale}</td>
                        <td className={`text-[0.88rem] py-[1rem] px-[3.125rem]`} id={`transactionValue_${index}`}>{d.vale}</td>
                        <td>
                            <div className={`text-[0.88rem] py-[1rem] px-[2.75rem]`}>
                                <div id={`date_${index}`}>{d.date}</div>
                                <div className={`text-[#4B5565]`} id={`time_${index}`}>{d.time}</div>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}


export default VendorAdminTable;