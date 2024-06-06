import React from "react";
import Header from "../../dashboard/components/ui/header";
import SearchBox from "../../dashboard/components/ui/searchbox";
import Stock from "../../dashboard/components/ui/tabs";
import InventoryTable from "../../dashboard/components/table/mecaadmin/inventoryTable";
import { MdArrowBack, MdArrowForward, MdChevronLeft, MdChevronRight } from "react-icons/md";



function Inventory() {
    const tabs = [
        { label: 'In stock', count: '22' },
        { label: 'Out of stock', count: '122' },
    ];

    return (
      <>
        <Header
          subtitle={`Keep track of how each item is performing.`}
          title={`Inventory`}
          amount={`433,112`}
        />
        <div className={`flex justify-between my-[1.25rem]`}>
          {/* <Stock tabs={tabs}/> */}
          <SearchBox placeholder={`Search for buyers`} />
        </div>

        <InventoryTable />

        <div className=" flex justify-between mt-10 mb-10 font-bold text-lg">
          <button className="flex gap-x-2 border border-[#EAECF0]  rounded-md h-[36px] w-[36px] pl-1">
            <MdChevronLeft className="mt-1 text-2xl" />
          </button>
          <button className="flex gap-x-2 border border-[#EAECF0] rounded-md h-[36px] w-[36px] pl-1">
            <MdChevronRight className="mt-1 text-2xl" />
          </button>
        </div>
      </>
    );
}

export default Inventory;
