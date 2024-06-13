import React from "react";
import Header from "../../dashboard/components/ui/header";
import AddButton from "../../dashboard/components/ui/addbutton";
import SearchBox from "../../dashboard/components/ui/searchbox";
import SortButton from "../../dashboard/components/ui/sortbutton";
import VendorTable from "../../dashboard/components/table/mecaadmin/vendorTable";
import {
  MdArrowBack,
  MdArrowForward,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";

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
        <div className="mt-4">{/* <AddButton title={`Add vendor`} /> */}</div>
      </div>
      <div className={`flex gap-2 mt-[1.25rem]`}>
        <SearchBox placeholder={`Search for vendor`} />
        <SortButton />
      </div>

      <VendorTable />

      <div className=" flex justify-end mt-10 mb-10  font-bold text-lg">
        {/* <button className="flex gap-x-2 border border-[#EAECF0]  rounded-md h-[36px] w-[36px] pl-1">
          <MdChevronLeft className="mt-1 text-2xl" />
        </button> */}
        <button className="flex gap-x-2 border border-[#EAECF0] rounded-md h-[36px] w-[36px] pl-1">
          <MdChevronRight className="mt-1 text-2xl" />
        </button>
      </div>
    </>
  );
}

export default Vendors;
