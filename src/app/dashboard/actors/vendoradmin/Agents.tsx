import React from 'react';
import Header from "../../components/ui/header";
import Tabs from "../../components/ui/tabs";
import SortButton from "../../components/ui/sortbutton";
import SearchBox from "../../components/ui/searchbox";
import PeriodRadios from "../../components/ui/periodradios";

function Agents() {
    const tabs = [
        {label: 'All', count: '22'},
        {label: 'Made sales', count: '122'},
        {label: 'Not made sales', count: '122'},
    ];
    return (
        <>
            <Header subtitle={`Keep track your agents and their transactions`} title={`Agents`} amount={`430,607`}/>
            <div className={`flex justify-between items-center my-[1.5rem]`}>
                <Tabs tabs={tabs}/>
                <div className={`flex gap-3`}>
                    <SortButton/>
                    <SearchBox/>
                </div>
            </div>
            <div className={`flex justify-between items-center gap-3`}>
                <Header subtitle={`A quick glance on agents performance`} title={`Top performing agents`}/>
                <PeriodRadios/>
            </div>
        </>
    );
}

export default Agents;