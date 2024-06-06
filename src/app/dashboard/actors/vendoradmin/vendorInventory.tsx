import Header from "../../components/ui/header";
import Searchbox from "../../components/ui/searchbox";
import Addbutton from "../../components/ui/addbutton";
import Categories from "../../components/ui/categories";
import VendorInventoryTable from "../../components/table/vendoradmin/vendorInventoryTable";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Link from "next/link";

function VendorInventory() {
  return (
    <>
      <div className={`flex justify-between items-center`}>
        <Header
          subtitle={`Keep track of how each item is performing.`}
          title={`Inventory`}
          amount={`430,607`}
        />
        <Link href="/addProductDashboard">
          <Addbutton title={`Add product`} />
        </Link>
      </div>
      <div className={`flex items-center gap-3 mt-[1.5rem]`}>
        <Searchbox />
        <Categories />
      </div>

      <div className="">
        <VendorInventoryTable />

        <div className="flex justify-between mt-10 text-mecaBluePrimaryColor font-bold text-lg">
          <button className="flex gap-x-2">
            <MdChevronLeft className="mt-1 text-2xl" /> <span>Previous</span>
          </button>
          <button className="flex gap-x-2">
            <MdChevronRight className="mt-1 text-2xl" /> <span>Next</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default VendorInventory;
