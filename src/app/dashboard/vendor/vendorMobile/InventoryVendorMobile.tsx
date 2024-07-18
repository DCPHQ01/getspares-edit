import Header from "../../components/ui/header";
import Searchbox from "../../components/ui/searchbox";
import Addbutton from "../../components/ui/addbutton";
import Categories from "../../components/ui/categories";
import VendorInventoryTable from "../../components/table/vendoradmin/vendorInventoryTable";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useState, useEffect } from "react";
import { useGetVendorInventoryMutation } from "../../../../redux/features/dashboard/mecaVendorQuery";

interface InventoryData {
  categoryName?: string;
  dateCreated: string;
  itemName: string;
  quantitySold: number;
  price?: number;
  id: string;
}

function InventoryVendorMobile() {
  const [getInventory, { isLoading, isError }] =
    useGetVendorInventoryMutation();
  const [inventory, setInventory] = useState<InventoryData[]>([]);
  const [datas, setdatas] = useState();
  const [totalPages, setTotalPages] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [isPaginationLoading, setIsPaginationLoading] = useState(false);
  const [page, setPage] = useState(0);
  const size = 10;
  const fetchVendorData = async () => {
    try {
      const requestBody = {
        pageNumber: page,
        pageSize: size,
      };

      const resultList = await getInventory(requestBody).unwrap();
      const list = resultList.data.content;
      setInventory(list);
      const lists = resultList.data;
      setdatas(lists);
      setTotalPages(lists.totalPages);
      setHasNext(lists.hasNext);
      setHasPrevious(lists.hasPrevious);
      setIsPaginationLoading(false);
    } catch (error) {
      console.error("Failed to add vendor:", error);
    }
  };

  useEffect(() => {
    fetchVendorData();
  }, []);

  const handleNextPage = () => {
    if (hasNext) {
      setIsPaginationLoading(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (hasPrevious) {
      setIsPaginationLoading(true);
      setPage((prevPage) => prevPage - 1);
    }
  };

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
      {/* <div className={` items-center gap-3 mt-[1.5rem] flex flex-row-reverse`}>
        <Searchbox />
        <Categories />
      </div>  */}

      <div className="">
        <VendorInventoryTable inventoryData={inventory} isLoading={isLoading} />
        <div className=" flex justify-end mt-10 mb-10 font-bold text-lg">
          <button
            type="button"
            title="Previous Page"
            className={`flex gap-x-2 border border-[#EAECF0]  rounded-md h-[36px] w-[36px] pl-1  ${
              !hasPrevious ? "text-gray-400 cursor-not-allowed" : ""
            }`}
            onClick={handlePreviousPage}
            disabled={!hasPrevious}
          >
            <MdChevronLeft className="mt-1 text-2xl" />
          </button>
          <button
            title="handleNextPage"
            className={`flex gap-x-2 border border-[#EAECF0] rounded-md h-[36px] w-[36px] pl-1 ${
              !hasNext ? "text-gray-400 cursor-not-allowed" : ""
            }`}
            onClick={handleNextPage}
            disabled={!hasNext}
          >
            <MdChevronRight className="mt-1 text-2xl" />
          </button>
        </div>
      </div>
    </>
  );
}

export default InventoryVendorMobile;
