import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import VendorOrderTable from "../../../components/table/vendoradmin/vendorOrderTable";
import Header from "../../../components/ui/header";
import Searchbox from "../../../components/ui/searchbox";
import { useEffect, useState } from "react";
import { useGetMecaVendorOrdersQuery } from "../../../../../redux/features/dashboard/mecaVendorQuery";

function OrderVendorMobile() {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const {data, isLoading, isError} = useGetMecaVendorOrdersQuery({page, size});
  console.log("data for vendor orders", data);

  const [vendorOrderList, setVendorOrderList] = useState([]);
  useEffect(() => {
    if (data) {
      console.log()
      const resultList = data.data?.content;
      if (resultList) {
        setVendorOrderList(resultList);
      } else {
        console.error("Expected data.content to be an array, but got:", resultList);
      }
    }
  }, [data]);
    console.log("The vendorOrderList:", vendorOrderList);
  return (
    <div className={`flex flex-col gap-6`}>
      <Header
        subtitle={`Keep track of buyers, items bought and their transaction values.`}
        title={`Orders`}
        amount={`430,607`}
      />
      <Searchbox />

      <VendorOrderTable data={vendorOrderList} isLoading={isLoading}/>

      <div className=" flex justify-end mt-5 mb-5 font-bold text-lg">
        {/* <button className="flex gap-x-2 border border-[#EAECF0]  rounded-md h-[36px] w-[36px] pl-1">
          <MdChevronLeft className="mt-1 text-2xl" />
        </button> */}
        <button className="flex gap-x-2 border border-[#EAECF0] rounded-md h-[36px] w-[36px] pl-1">
          <MdChevronRight className="mt-1 text-2xl" />
        </button>
      </div>
    </div>
  );
}

export default OrderVendorMobile;
