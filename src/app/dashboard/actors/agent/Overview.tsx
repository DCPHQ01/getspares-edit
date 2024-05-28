"use client"
import React from 'react';
import Header from "../../components/ui/header";
import Cards from "../../components/ui/cards";
import PeriodRadios from "../../components/ui/periodradios";


function Overview() {
    // @ts-ignore
    return (
        <>
            <div>
                <Header subtitle={`Take a quick glance on what is happening with meca`} name={`Sam`}/>
                <Cards/>
                <div className={`flex justify-between items-center mt-[3.25rem] mb-[1.25rem]`}>
                    <Header subtitle={`A quick glance on parts with highest sales on meca`} title={`Recently sold parts`}/>
                    <PeriodRadios/>
                </div>
                {/*<OverviewTable/>*/}
            </div>
        </>
    );
}

export default Overview;