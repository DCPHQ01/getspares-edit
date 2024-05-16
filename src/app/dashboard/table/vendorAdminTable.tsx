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

]

function VendorAdminTable() {
    return (
        <div className={`my-[20px] w-full`}>
            <table className={`w-full ${styles.table}`}>
                <thead>
                <tr>
                    <th>Item name</th>
                    <th>Total sold</th>
                    <th>Transaction value</th>
                    <th>Date & time joined</th>
                </tr>
                </thead>
                <tbody>
                {data.map((d, index) => (
                    <tr>
                        <td>
                            <div className={`flex gap-3 items-center text-[14px] py-[16px] px-[24px]`}>
                                <Image src={d.avatar} alt="Avatar"/>
                                <p>{d.name}</p>
                            </div>
                        </td>
                        <td className={`text-[14px] py-[16px] px-[50px]`}>{d.sale}</td>
                        <td className={`text-[14px] py-[16px] px-[50px]`}>{d.vale}</td>
                        <td>
                            <div className={`text-[14px] py-[16px] px-[44px]`}>
                                <div>{d.date}</div>
                                <div className={`text-[#4B5565]`}>{d.time}</div>
                            </div>
                        </td>
                    </tr>
                ))
                }
                </tbody>
            </table>
        </div>
    );
}

export default VendorAdminTable;