import {
  MdBusinessCenter,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";
import VendorOrderTable from "../../../components/table/vendoradmin/vendorOrderTable";
import Header from "../../../components/ui/header";
import Searchbox from "../../../components/ui/searchbox";
import { useEffect, useState } from "react";
import { useGetMecaVendorOrdersQuery } from "../../../../../redux/features/dashboard/mecaVendorQuery";

function OrderVendorMobile() {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const { data, isLoading, isError } = useGetMecaVendorOrdersQuery({
    page,
    size,
  });

  const [hasLast, setHasLast] = useState(false);
  const [hasOrders, setHasOrders] = useState(false);
  const [vendorOrderList, setVendorOrderList] = useState([]);
  useEffect(() => {
    if (data) {
      setPage(data?.data.number);
      setHasLast(data?.data.last);
      const resultList = data.data?.content;
      if (resultList) {
        setVendorOrderList(resultList);
      } else {
        console.error(resultList);
      }
    }
  }, [data]);

  const totalElement = data?.data.totalElements;
  const totalPage = data?.data.totalPages;

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (page + 1 < totalPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className={`flex flex-col gap-6`}>
      <Header
        subtitle={`Keep track of buyers, items bought and their transaction values.`}
        title={`Orders`}
        amount={totalElement}
      />
      {/* <Searchbox /> */}

      <VendorOrderTable data={vendorOrderList} isLoading={isLoading} />

      {/* <div className="">
        {!hasOrders && !isLoading && (
          // <div className="relative right-[100%] left-[100%] flex flex-col justify-center items-center pt-32 leading-10">
          <div className="h-28 mt-24">
            <div className="flex justify-center">
              <div className="w-[5.6rem] h-[5.6rem] bg-blue-100 flex justify-center items-center rounded-full">
                <MdBusinessCenter size={40} color="#0852C0" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-xl font-semibold">No orders made yet</p>
              <p className="text-base font-normal text-mecaLightGrayText">
                All your orders will appear here
              </p>
            </div>
          </div>
        )}
      </div> */}

      <div className=" flex justify-end mt-5 mb-5 font-bold text-lg">
        {page > 0 && (
          <button
            title="previous"
            className="flex gap-x-2 border border-[#EAECF0]  rounded-md h-[36px] w-[36px] pl-1"
            onClick={handlePreviousPage}
          >
            <MdChevronLeft className="mt-1 text-2xl" />
          </button>
        )}
        {!hasLast ? (
          <button
            title="right"
            className="flex gap-x-2 border border-[#EAECF0] rounded-md h-[36px] w-[36px] pl-1"
            onClick={handleNextPage}
          >
            <MdChevronRight className="mt-1 text-2xl" />
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default OrderVendorMobile;
