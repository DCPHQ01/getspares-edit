import React from 'react';
import Header from "../../dashboard/components/ui/header";
import SearchBox from "../../dashboard/components/ui/searchbox";
import PeriodRadios from "../../dashboard/components/ui/periodradios";
import Addbutton from "../../dashboard/components/ui//addbutton";

function Category() {
    return (
        <>
            <div className={`mb-[1.25rem] flex justify-between items-center`}>
                <Header subtitle={`Keep track of categories and their products`} title={`Category`} amount={`500,607`}/>
                <Addbutton title={`Create category`}/>
            </div>
            <div className={`flex justify-between items-center mb-[1.25rem]`}>
                <SearchBox placeholder={`Search for category`}/>
                <PeriodRadios/>
            </div>

        </>
    );
}

export default Category;