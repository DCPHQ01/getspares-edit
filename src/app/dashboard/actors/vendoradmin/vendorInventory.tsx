import Header from "../../components/ui/header";
import Searchbox from "../../components/ui/searchbox";
import Addbutton from "../../components/ui/addbutton";
import Categories from "../../components/ui/categories/index";
import VendorInventoryTable from "../../components/table/vendoradmin/vendorInventoryTable";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Link from "next/link";
import { paths } from "../../../../path/paths";
import { useGetVendorAdminInventoryMutation } from "../../../../redux/features/dashboard/mecaVendorQuery";
import { useState, useEffect } from "react";

interface InventoryData {
  categoryName?: string;
  dateCreated: string;
  itemName: string;
  quantitySold: number;
  price?: number;
  id: string;
}
function VendorInventory() {
  const [getInventory, { isLoading, isError }] =
    useGetVendorAdminInventoryMutation();
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
      console.log("it is Success:", list);
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

  console.log("The Vendor Inventory: ", inventory);
  console.log("The data success:", datas);

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
      <div className={`flex justify-between items-center`}>
        <Header
          subtitle={`Keep track of how each item is performing.`}
          title={`Inventory`}
          amount={`430,607`}
        />
        <Link className="font-semibold" href={paths.toAddProductDashboard()}>
          <Addbutton title={`Add product`} />
        </Link>
      </div>
      <div className={`flex justify-between mt-[1.5rem]`}>
        <Categories />
        <Searchbox />
      </div>

      <div className="">
        <VendorInventoryTable inventoryData={inventory} isLoading={isLoading} />

        <div className="flex justify-between mt-10 text-mecaBluePrimaryColor font-bold text-lg">
          <button
            className={`flex gap-x-2 ${
              !hasPrevious ? "text-gray-400 cursor-not-allowed" : ""
            }`}
            onClick={handlePreviousPage}
            disabled={!hasPrevious}
          >
            <MdChevronLeft className="mt-1 text-2xl" /> <span>Previous</span>
          </button>
          <button
            className={`flex gap-x-2 ${
              !hasNext ? "text-gray-400 cursor-not-allowed" : ""
            }`}
            onClick={handleNextPage}
            disabled={!hasNext}
          >
            Next
            <span>
              <MdChevronRight className="mt-[2px] text-2xl" />{" "}
            </span>
          </button>
        </div>
      </div>
    </>
  );
}

export default VendorInventory;
