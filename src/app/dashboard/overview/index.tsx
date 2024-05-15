"use client"
import React from 'react';
import Cards from "@/app/dashboard/overview/cards";
import PeriodRadios from "@/app/dashboard/overview/periodRadios";

function Index() {
    const cardProps = [
        {
            total: "number of parts ordered",
            amount: 2250,
            percentage: 32,
            onClick: () => {
                console.log("Owo repete")
            }
        },
        {
            total: "number of agents",
            amount: 1475,
            percentage: 10,
            onClick: () => {
                console.log("Owo repete")
            }
        },
        {
            total: "transaction value",
            amount: 1250,
            percentage: 59,
            onClick: () => {
                console.log("Owo repete")
            }
        },
        {
            total: "number of vendors",
            amount: 1280,
            percentage: 59,
            onClick: () => {
                console.log("Owo repete")
            }
        },
    ]
    return (
        <>
            <div>
                <h1 className={`font-[700] text-[30px] text-[#101828]`}>Welcome Back, Sam</h1>
                <p className={`text-[#364152]`}>Take a quick glance on what is happening with meca</p>
            </div>
            <div className={`mt-[16px] flex gap-5`}>
                {cardProps.map((card, index) => (
                    <div key={index}>
                        <Cards amount={card.amount} percentage={card.percentage} total={card.total} onClick={card.onClick}/>
                    </div>
                ))
                }
            </div>
            <div className={`mt-[52px] flex justify-between`}>
                <div>
                    <p className={`font-[700] text-[20px]`}>Top performing vendors</p>
                    <p className={`text-[#364152]`}>A quick glance on vendors with highest sales on meca</p>
                </div>
                <div>
                    <PeriodRadios/>
                </div>
            </div>
        </>
    );
}

export default Index;