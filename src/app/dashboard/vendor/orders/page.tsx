"use client";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import VendorOrderTable from "../../components/table/vendoradmin/vendorOrderTable";
import Header from "../../components/ui/header";
import { useGetMecaVendorOrdersQuery } from "../../../../redux/features/dashboard/mecaVendorQuery";
import { useEffect, useState } from "react";
import { MdBusinessCenter } from "react-icons/md";
function VendorOrders() {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const { data, isLoading, isError } = useGetMecaVendorOrdersQuery({
    page,
    size,
  });
  const [hasLast, setHasLast] = useState(false);
  const [vendorOrderList, setVendorOrderList] = useState([]);
  const [hasOrders, setHasOrders] = useState(false);
  // const [totalElement, setTotalElement] = useState(0);

  useEffect(() => {
    if (data) {
      setPage(data?.data.number);
      setHasLast(data?.data.last);
      const resultList = data.data?.content;
      if (resultList && resultList.length > 0) {
        setVendorOrderList(resultList);
        setHasOrders(true);
      } else {
        setHasOrders(false);
      }
    }
  }, [data]);

  const totalElement = data?.data.totalElements;
  const totalPage = data?.data.totalPages;

  // const [currentPage, setCurrentPage] = useState(1);
  // const [itemsPerPage] = useState(10);

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
    <>
      <div className={`flex flex-col gap-6 `}>
        <div className={"flex justify-between "}>
          <div>
            <Header
              subtitle={`Keep track of buyers, items bought and their transaction values.`}
              title={`Orders`}
              amount={totalElement}
            />
          </div>
          {/* <div>
             <Searchbox />
           </div> */}
        </div>
        <div className={"h-[40rem] mt-5"}>
          <VendorOrderTable data={vendorOrderList} isLoading={isLoading} />
        </div>

        <div className="flex mt-10 justify-between text-mecaBluePrimaryColor font-bold text-lg">
          {page > 0 && (
            <button className={`flex gap-x-2`} onClick={handlePreviousPage}>
              <MdChevronLeft className="mt-1 text-2xl" /> <span>Previous</span>
            </button>
          )}
          {!hasLast ? (
            <button
              className="flex gap-x-2 justify-end ml-auto"
              onClick={handleNextPage}
              // disabled={currentPage * size >= totalElement}
            >
              Next
              <span>
                <MdChevronRight className="mt-[2px] text-2xl" />{" "}
              </span>
            </button>
          ) : (
            <div>{""}</div>
          )}
        </div>
      </div>
    </>
  );
}

export default VendorOrders;
