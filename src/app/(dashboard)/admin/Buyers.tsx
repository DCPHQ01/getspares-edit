import React from 'react';
import Header from "../../dashboard/components/ui/header";
import SearchBox from "../../dashboard/components/ui/searchbox";

function Buyers() {
    return (
        <>
            <Header subtitle={`Keep track of buyers, items bought and their transaction values.`} title={`Buyers`} amount={`433,112`}/>
            <div className={`my-[1.25rem]`}>
                <SearchBox placeholder={`Search for buyers`}/>
            </div>

        </>
    );
}

export default Buyers;