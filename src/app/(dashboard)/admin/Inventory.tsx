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
          <Stock tabs={tabs} />
          <SearchBox placeholder={`Search for buyers`} />
        </div>

        <InventoryTable />

        <div className="flex justify-end mt-10 text-mecaBluePrimaryColor font-bold text-lg">
          {/* <button className="flex gap-x-2">
            <MdChevronLeft className="mt-1 text-2xl" /> <span>Previous</span>
          </button> */}
          <button className="flex gap-x-2">
            <MdChevronRight className="mt-1 text-2xl" /> <span>Next</span>
          </button>
        </div>
      </>
    );
}

export default Inventory;
