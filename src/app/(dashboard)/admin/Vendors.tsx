import React from 'react';
import Header from "../../dashboard/components/ui/header";
import AddButton from "../../dashboard/components/ui/addbutton";
import SearchBox from "../../dashboard/components/ui/searchbox";
import SortButton from "../../dashboard/components/ui/sortbutton";
import VendorTable from '../../dashboard/components/table/mecaadmin/vendorTable';
import { MdArrowBack, MdArrowForward, MdChevronLeft, MdChevronRight } from 'react-icons/md';

function Vendors() {
    return (
      <>
        <div className={`flex justify-between items-center`}>
          <Header
            subtitle={`Keep track of vendor sales and their service ratings.`}
            title={`Vendors`}
            amount={`430,607`}
          />
          {/* <AddButton title={`Add vendor`}/> */}
        </div>
        <div className={`flex gap-2 mt-[1.25rem]`}>
          <SearchBox placeholder={`Search for vendor`} />
          <SortButton />
        </div>

        <VendorTable />

        <div className="flex justify-between mt-10 text-mecaBluePrimaryColor font-bold text-lg">
          <button className="flex gap-x-2">
            <MdChevronLeft className="mt-1 text-2xl" /> <span>Previous</span>
          </button>
          <button className="flex gap-x-2">
            <MdChevronRight className="mt-1 text-2xl" /> <span>Next</span>
          </button>
        </div>
      </>
    );
}

export default Vendors;