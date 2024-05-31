import React from 'react';
import Header from "../../dashboard/components/ui/header";
import AddButton from "../../dashboard/components/ui/addbutton";
import SearchBox from "../../dashboard/components/ui/searchbox";
import SortButton from "../../dashboard/components/ui/sortbutton";
import VendorTable from '../../dashboard/components/table/mecaadmin/vendorTable';

function Vendors() {
    return (
      <>
        <div className={`lg:flex  flex-col justify-between items-center`}>
          <div className="">
            <Header
              subtitle={`Keep track of vendor sales and their service ratings.`}
              title={`Vendors`}
              amount={`430,607`}
            />
          </div>
          <div className="mt-4">
            <AddButton title={`Add vendor`} />
          </div>
        </div>
        <div className={`flex gap-2 mt-[1.25rem]`}>
          <SearchBox placeholder={`Search for vendor`} />
          <SortButton />
        </div>

        <VendorTable />
      </>
    );
}

export default Vendors;