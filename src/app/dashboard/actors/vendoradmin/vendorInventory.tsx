import Header from "../../components/ui/header";
import Searchbox from "../../components/ui/searchbox";
import Addbutton from "../../components/ui/addbutton";
import Categories from "../../components/ui/categories/index";
import VendorInventoryTable from "../../components/table/vendoradmin/vendorInventoryTable";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Link from "next/link";
import { paths } from "../../../../path/paths";
import { useGetVendorAdminInventoryQuery } from "../../../../redux/features/dashboard/mecaVendorQuery";
import { useState, useEffect } from "react";
import { useGetAllVendorProductsQuery } from "../../../../redux/features/product/productsQuery";

interface InventoryData {
  categoryName?: string;
  dateCreated: string;
  itemName: string;
  quantitySold: number;
  price?: number;
  id: string;
}
function VendorInventory() {
  const [page, setPage] = useState(0);
  const [totalElement, setTotalElement] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const size = 10;

  const requestBody = {
    pageNo: page,
    pageSize: size,
  };
  const { data, isFetching } = useGetVendorAdminInventoryQuery({
    pageNumber: page,
    pageSize: size,
  });

  useEffect(() => {
    if (data) {
      setTotalElement(data.data?.totalElements);
      setHasNext(data?.data.hasNext);
      setHasPrevious(data?.data.hasPrevious);
      setPage(data?.data.pageNo);
      setTotalPages(data?.data.totalPages);
    }
  }, [data]);



  useEffect(() => {
    sessionStorage.removeItem("basicInfoValues");
    sessionStorage.removeItem("images");
    sessionStorage.removeItem("specInfo");
    sessionStorage.removeItem("detailsInfo");
  }, []);

  const handleNextPage = () => {
    if (page + 1 < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <>
      <div className={`flex justify-between items-center`}>
        <div>
          <Header
            subtitle={`Keep track of how each item is performing.`}
            title={`Inventory`}
            amount={data?.data?.totalElements}
          />
        </div>
        <Link className="font-semibold" href={paths.toAddProductDashboard()}>
          <Addbutton title={`Add product`} />
        </Link>
      </div>
      {/* <div className={`flex justify-between items-center mt-[1.5rem]`}>
        <Categories />
        <Searchbox />
      </div>  */}

      <div>
        <VendorInventoryTable
          inventoryData={data?.data?.content}
          isLoading={isFetching}
        />
      </div>
      <div className="flex justify-between mt-10 text-mecaBluePrimaryColor font-bold text-lg">
        {page > 0 ? (
          <button className={`flex gap-x-2`} onClick={handlePreviousPage}>
            <MdChevronLeft className="mt-1 text-2xl" /> <span>Previous</span>
          </button>
        ) : (
          <div>{""}</div>
        )}

        {hasNext ? (
          <button className={`flex gap-x-2`} onClick={handleNextPage}>
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
