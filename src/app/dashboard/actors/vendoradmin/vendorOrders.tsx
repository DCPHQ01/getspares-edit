import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import VendorOrderTable from "../../components/table/vendoradmin/vendorOrderTable";
import Header from "../../components/ui/header";
import Searchbox from "../../components/ui/searchbox";
import { useGetMecaVendorOrdersQuery } from "../../../../redux/features/dashboard/mecaVendorQuery";
import { useEffect, useState } from "react";
import { MdBusinessCenter } from "react-icons/md";
function VendorOrders() {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const { data, isLoading, isError } = useGetMecaVendorOrdersQuery({
    page,
    size,
  });

  const [vendorOrderList, setVendorOrderList] = useState([]);
  const [hasOrders, setHasOrders] = useState(false);
  const [totalElement, setTotalElement] = useState(0);

  useEffect(() => {
    if (data) {
      setTotalElement(data.data?.totalElements);
      const resultList = data.data?.content;
      if (resultList && resultList.length > 0) {
        setVendorOrderList(resultList);
        setHasOrders(true);
      } else {
        setHasOrders(false);
      }
    }
  }, [data]);


  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    if (currentPage * size < totalElement) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
  return (
     <>
       <div className={`flex flex-col gap-6 `}>
         <div className={'flex justify-between '}>
           <div>
             <Header
                subtitle={`Keep track of buyers, items bought and their transaction values.`}
                title={`Orders`}
                amount={'0'}
             />
           </div>
           <div>
             <Searchbox />
           </div>
         </div>
         <div className={'h-[40rem] mt-5'}>
           <VendorOrderTable data={vendorOrderList} isLoading={isLoading} />
           <div className="">
             {!hasOrders && !isLoading && (
                // <div className="relative right-[100%] left-[100%] flex flex-col justify-center items-center pt-32 leading-10">
                <div className="h-28 mt-[15rem]">
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
           </div>
         </div>


         <div className="flex mt-10 text-mecaBluePrimaryColor font-bold text-lg">
        {currentPage > 1 && (
          <button className={`flex gap-x-2`} onClick={handlePreviousPage}>
            <MdChevronLeft className="mt-1 text-2xl" /> <span>Previous</span>
          </button>
        )}
         { vendorOrderList && vendorOrderList.length > 0 && <button
          className="flex gap-x-2 justify-end ml-auto"
          onClick={handleNextPage}
          disabled={currentPage * size >= totalElement}
        >
          Next
          <span>
            <MdChevronRight className="mt-[2px] text-2xl" />{" "}
          </span>
        </button>}
      </div>

     </div>

     </>
  );
}

export default VendorOrders;
