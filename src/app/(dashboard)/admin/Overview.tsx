"use client"
import React from 'react';
import Header from "../../dashboard/components/ui/header";
import Cards from "../../dashboard/components/ui/cards";
import PeriodRadios from "../../dashboard/components/ui/periodradios"
import OverviewTable from "../../dashboard/components/table/mecaadmin/overview";

function Overview() {
    return (
        <>
            <div>
                <Header subtitle={`Take a quick glance on what is happening with meca`} name={`Welcome Sam`}/>
                <Cards/>
                <div className={`flex justify-between items-center mt-[3.25rem] mb-[1.25rem]`}>
                    <Header subtitle={`A quick glance on vendors with highest sales on meca`} title={`Top performing vendors`}/>
                    <PeriodRadios/>
                </div>
                    <OverviewTable/>
            </div>
        </>
    );
}

export default Overview;