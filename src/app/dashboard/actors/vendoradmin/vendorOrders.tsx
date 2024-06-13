import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import VendorOrderTable from "../../components/table/vendoradmin/vendorOrderTable";
import Header from "../../components/ui/header";
import Searchbox from "../../components/ui/searchbox";

function VendorOrders() {
    return (
      <div className={`flex flex-col gap-6`}>
        <Header
          subtitle={`Keep track of buyers, items bought and their transaction values.`}
          title={`Orders`}
          amount={`430,607`}
        />
        <Searchbox />

        <VendorOrderTable />

        <div className="flex justify-end mt-10 text-mecaBluePrimaryColor font-bold text-lg">
          {/* <button className="flex gap-x-2">
            <MdChevronLeft className="mt-1 text-2xl" /> <span>Previous</span>
          </button> */}
          <button className="flex gap-x-2">
            <MdChevronRight className="mt-1 text-2xl" /> <span>Next</span>
          </button>
        </div>
      </div>
    );
}

export default VendorOrders;