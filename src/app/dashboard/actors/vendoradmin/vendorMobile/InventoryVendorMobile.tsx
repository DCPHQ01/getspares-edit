import Header from "../../../components/ui/header";
import Searchbox from "../../../components/ui/searchbox";
import Addbutton from "../../../components/ui/addbutton";
import Categories from "../../../components/ui/categories";
import VendorInventoryTable from "../../../components/table/vendoradmin/vendorInventoryTable";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

function InventoryVendorMobile() {
  return (
    <>
      <div className={` justify-between items-center`}>
        <Header
          subtitle={`Keep track of how each item is performing.`}
          title={`Inventory`}
          amount={`430,607`}
        />
        <div className="mt-5">
          <Addbutton title={`Add product`} />
        </div>
      </div>
      <div className={` items-center gap-3 mt-[1.5rem] flex flex-row-reverse`}>
        <Searchbox />
        <Categories />
      </div>

      <div className="">
        <VendorInventoryTable />
        <div className=" flex justify-end mt-10 mb-10 font-bold text-lg">
          {/* <button className="flex gap-x-2 border border-[#EAECF0]  rounded-md h-[36px] w-[36px] pl-1">
            <MdChevronLeft className="mt-1 text-2xl" />
          </button> */}
          <button className="flex gap-x-2 border border-[#EAECF0] rounded-md h-[36px] w-[36px] pl-1">
            <MdChevronRight className="mt-1 text-2xl" />
          </button>
        </div>
      </div>
    </>
  );
}

export default InventoryVendorMobile;
