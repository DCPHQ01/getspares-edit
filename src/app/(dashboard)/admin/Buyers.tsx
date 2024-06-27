import React, { useEffect, useState } from "react";
import Header from "../../dashboard/components/ui/header";
import SearchBox from "../../dashboard/components/ui/searchbox";
import BuyerTable from "../../dashboard/components/table/mecaadmin/buyerTable";
import { MdArrowBack, MdArrowForward, MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useGetMecaAdminBuyerQuery } from "../../../redux/features/dashboard/mecaAdminQuery";


function Buyers() {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const {data, isLoading, isError, error} = useGetMecaAdminBuyerQuery({page, size});
  console.log("data for buyers", data);
  const [totalElement, setTotalElement] = useState(0);


  const [buyerList, setBuyerList] = useState([]);
  useEffect(() => {
    if (data) {
      console.log("Received data structure:", data);
      setTotalElement(data.data?.totalElements);
      const resultList = data.data?.content;
      if (resultList) {
        setBuyerList(resultList);
      } else {
        console.error("Expected data.content to be an array, but got:", resultList);
      }
    }
  }, [data]);

  console.log("The BuyerList:", buyerList);

  const [currentPage, setCurrentPage] = useState(1); // State for current page
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
      <Header
        subtitle={`Keep track of buyers, items bought and their transaction values.`}
        title={`Buyers`}
        amount={totalElement}
      />
      <div className={`my-[1.25rem] flex justify-end`}>
        <SearchBox placeholder={`Search`} />
      </div>
      <BuyerTable data={buyerList} isLoading={isLoading} isError={isError}/>

      <div className="flex mt-10 text-mecaBluePrimaryColor font-bold text-lg">
      {currentPage > 1 && (
          <button className={`flex gap-x-2`} onClick={handlePreviousPage}>
            <MdChevronLeft className="mt-1 text-2xl" /> <span>Previous</span>
          </button>
        )}

        <button className="flex gap-x-2 justify-end ml-auto"
          onClick={handleNextPage} 
          disabled={currentPage * size >= totalElement}
        >
          Next
          <span>
            <MdChevronRight className="mt-[2px] text-2xl" />{" "}
          </span>
        </button>
      </div>
    </>
  );
}

export default Buyers;
