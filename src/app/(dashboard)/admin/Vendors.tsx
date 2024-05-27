import React from 'react';
import Header from "../../dashboard/components/ui/header";
import AddButton from "../../dashboard/components/ui/addbutton";
import SearchBox from "../../dashboard/components/ui/searchbox";
import SortButton from "../../dashboard/components/ui/sortbutton";
import VendorTable from '../../dashboard/components/table/mecaadmin/vendorTable';

function Vendors() {
    return (
        <>
            <div className={`flex justify-between items-center`}>
                <Header subtitle={`Keep track of vendor sales and their service ratings.`} title={`Vendors`} amount={`430,607`} />
                <AddButton title={`Add vendor`}/>
            </div>
            <div className={`flex gap-2 mt-[1.25rem]`}>
                <SearchBox placeholder={`Search for vendor`}/>
                <SortButton/>
            </div>
            
            <VendorTable/>
        </>
    );
}

export default Vendors;