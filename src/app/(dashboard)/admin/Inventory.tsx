import React from 'react';
import Header from "../../dashboard/components/ui/header";
import SearchBox from "../../dashboard/components/ui/searchbox";
import Stock from "../../dashboard/components/ui/tabs";

function Inventory() {
    const tabs = [
        { label: 'In stock', count: '22' },
        { label: 'Out of stock', count: '122' },
    ];

    return (
        <>
            <Header subtitle={`Keep track of how each item is performing.`} title={`Inventory`} amount={`433,112`}/>
            <div className={`flex justify-between my-[1.25rem]`}>
                <Stock tabs={tabs}/>
                <SearchBox placeholder={`Search for buyers`}/>
            </div>

        </>
    );
}

export default Inventory;