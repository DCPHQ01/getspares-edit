import React from 'react';
import styles from "../overview/styles.module.css";
import image1 from "../../../assets/dashboardAssets/Avatar.png";
import image2 from "../../../assets/dashboardAssets/Avatar1.png";
import Image from "next/image";

const data = [
    {
        "avatar": image1,
        name: "Ebuka & Sons International",
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
        name: "Ebuka & Sons International",
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
        name: "Ebuka & Sons International",
        email: "ebuka&sons@gmail.com",
        sale: 123,
        vale: "₦ 123",
        date: "24 June 2022",
        time: "12PM"
    },

]
function MecaAdminTable() {
    return (
        <div className={`my-[20px] w-full`}>
            <table className={`w-full ${styles.table}`}>
                <thead>
                    <tr>
                        <th>Company name</th>
                        <th>Total items sold</th>
                        <th>Transaction value</th>
                        <th>Date & time joined</th>
                    </tr>
                </thead>
                <tbody>
                { data.map((d, index)=>(
                        <tr>
                            <td>
                                <div className={`flex gap-3 text-[14px] py-[16px] px-[24px]`}>
                                    <Image src={d.avatar} alt="Avatar"/>
                                    <div>
                                        <div >{d.name}</div>
                                        <div className={`text-[#4B5565]`}>{d.email}</div>
                                    </div>
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

export default MecaAdminTable;