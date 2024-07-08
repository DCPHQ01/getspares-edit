"use client";
import {MdOutlineMoreVert} from "react-icons/md";
import engine from "../../../../../assets/dashboardAssets/engine.png";
import Image from "next/image";
import React from "react";
import Numbers from "../../utils/CustomDropdown"

export default function Index() {

    const items=[
        {
            image: engine,
            name: "E46 Engine 1996 Model",
            sub: "Tractor part",
            price: "₦900,000.00",
        },
        {
            image: engine,
            name: "E46 Engine 1996 Model",
            sub: "Tractor part",
            price: "₦900,000.00",
        },
        {
            image: engine,
            name: "E46 Engine 1996 Model",
            sub: "Tractor part",
            price: "₦900,000.00",
        },
        {
            image: engine,
            name: "E46 Engine 1996 Model",
            sub: "Tractor part",
            price: "₦900,000.00",
        },
        {
            image: engine,
            name: "E46 Engine 1996 Model",
            sub: "Tractor part",
            price: "₦900,000.00",
        },
        {
            image: engine,
            name: "E46 Engine 1996 Model",
            sub: "Tractor part",
            price: "₦900,000.00",
        },
    ]

    return (
        <>
            {items.map((item, index)=>(
                <div key={index} className={`border rounded-[0.5rem] shadow-[0_1px_2px_0_rgba(42,59,81,0.12)] p-[1.3rem] flex gap-5 mb-[1.25rem]`}>
                    <div
                        className={`bg-[#EFF4FF] w-[11.3rem] h-[9.3rem] rounded-[0.5rem] flex justify-center items-center`}>
                        <Image src={item.image} alt={`engine`} width={108} height={86}/>
                    </div>
                    <div className={`w-full flex flex-col justify-between`}>
                        <div className={`flex justify-between`}>
                            <div>
                                <p className={`font-semibold`}>{item.name}</p>
                                <p className={`text-[0.875rem] text-[#475467]`}>{item.sub} &bull; New</p>
                            </div>
                            <div className={`flex justify-center items-center cursor-pointer rounded-full h-[30px] w-[30px] hover:bg-gray-200`}>
                                <MdOutlineMoreVert color={`#9AA4B2`} size={22}/>
                            </div>

                        </div>
                        <div className={`flex justify-between`}>
                            <div className={`flex gap-3 items-center`}>
                                <p>Quantity</p>
                                <Numbers/>
                             
                            </div>
                            <p className={`font-bold`}>{item.price}</p>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

