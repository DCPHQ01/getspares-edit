import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import VendorOrderTable from "../../../components/table/vendoradmin/vendorOrderTable";
import Header from "../../../components/ui/header";
import Searchbox from "../../../components/ui/searchbox";

function OrderVendorMobile() {
  return (
    <div className={`flex flex-col gap-6`}>
      <Header
        subtitle={`Keep track of buyers, items bought and their transaction values.`}
        title={`Orders`}
        amount={`430,607`}
      />
      <Searchbox />

      <VendorOrderTable />

      <div className=" flex justify-between mt-10 mb-10 font-bold text-lg">
        <button className="flex gap-x-2 border border-[#EAECF0]  rounded-md h-[36px] w-[36px] pl-1">
          <MdChevronLeft className="mt-1 text-2xl" />
        </button>
        <button className="flex gap-x-2 border border-[#EAECF0] rounded-md h-[36px] w-[36px] pl-1">
          <MdChevronRight className="mt-1 text-2xl" />
        </button>
      </div>
    </div>
  );
}

export default OrderVendorMobile;
