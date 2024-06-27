import React from "react";
import { MdSearch } from "react-icons/md";

function Index({ placeholder = "Search"}: { placeholder?: string }) {
  return (
    <>
      <div
        className={`lg:w-[254px] w-[100%] flex items-center border text-[#667085] py-2.5 px-3.5 rounded-full border-[#D0D5DD]`}
      >
        <div className="">
          <MdSearch className="" />
        </div>
        <div className="">
          <input placeholder={placeholder} className={`focus:outline-none ml-3`} />
        </div>
      </div>
    </>
  );
}

export default Index;
