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
import {useGetAllVendorProductsQuery} from "../../../../redux/features/product/productsQuery";

interface InventoryData {
  categoryName?: string;
  dateCreated: string;
  itemName: string;
  quantitySold: number;
  price?: number;
  id: string;
}
function VendorInventory() {
  const [getInventory, { isLoading, isError }] = useGetVendorAdminInventoryMutation();
  const [inventory, setInventory] = useState<InventoryData[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [isPaginationLoading, setIsPaginationLoading] = useState(false);
  const [page, setPage] = useState(0);
  const size = 10;


  const requestBody = {
    pageNumber: page,
    pageSize: size,
  };
  const { data, isFetching } = useGetAllVendorProductsQuery({requestBody});



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
      setTotalPages(lists.totalPages);
      setHasNext(lists.hasNext);
      setHasPrevious(lists.hasPrevious);
      setTotalPages(lists.totalElements);
      setIsPaginationLoading(false)
    }  catch (error) {
      console.error('Failed to add vendor:', error);

    }
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => prevPage - 1);

  };

  return (
    <>
      <div className={`flex justify-between items-center`}>
        <div>
          <Header
             subtitle={`Keep track of how each item is performing.`}
             title={`Inventory`}
             amount={totalPages}
          />
        </div>
        <Link className="font-semibold" href={paths.toAddProductDashboard()}>
          <Addbutton title={`Add product`} />
        </Link>
      </div>
      <div className={`flex justify-between items-center mt-[1.5rem]`}>
        <Categories />
        <Searchbox />
      </div>

      <div>
          <VendorInventoryTable inventoryData={data?.data?.content} isLoading={isFetching} />
      </div>
      <div className="flex justify-between mt-10 text-mecaBluePrimaryColor font-bold text-lg">
        {hasPrevious ? (
           <button
              className={`flex gap-x-2`}
              onClick={handlePreviousPage}
           >
             <MdChevronLeft className="mt-1 text-2xl" /> <span>Previous</span>
           </button>
        ) : (
           <div>{""}</div>
        )}

        {data?.data?.totalElements > 10 ? (
           <button
              className={`flex gap-x-2`}
              onClick={handleNextPage}
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

    </>
  );
}

export default VendorInventory;
