import React from "react";
import Header from "../../dashboard/components/ui/header";
import SearchBox from "../../dashboard/components/ui/searchbox";
import BuyerTable from "../../dashboard/components/table/mecaadmin/buyerTable";
import {
  MdArrowBack,
  MdArrowForward,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";

function Buyers() {
  return (
    <>
      <Header
        subtitle={`Keep track of buyers, items bought and their transaction values.`}
        title={`Buyers`}
        amount={`433,112`}
      />
      <div className={`my-[1.25rem]`}>
        <SearchBox placeholder={`Search for buyers`} />
      </div>

      {/* <BuyerTable /> */}

      <div className=" flex justify-end mt-10 mb-10 font-bold text-lg">
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

export default Buyers;
