import React from "react";
import Header from "../../dashboard/components/ui/header";
import SearchBox from "../../dashboard/components/ui/searchbox";
import Stock from "../../dashboard/components/ui/stock";
import InventoryTable from "../../dashboard/components/table/mecaadmin/inventoryTable";

function Inventory() {
  return (
    <>
      <Header
        subtitle={`Keep track of how each item is performing.`}
        title={`Inventory`}
        amount={`433,112`}
      />
      <div className={`flex justify-between my-[1.25rem]`}>
        <Stock inStock={`22`} outOfStock={`122`} />
        <SearchBox placeholder={`Search for buyers`} />
      </div>

      <InventoryTable />
    </>
  );
}

export default Inventory;
