import React, { useEffect, useState } from "react";
import Header from "../../dashboard/components/ui/header";
import SearchBox from "../../dashboard/components/ui/searchbox";
import BuyerTable from "../../dashboard/components/table/mecaadmin/buyerTable";
import { MdArrowBack, MdArrowForward, MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useGetMecaAdminBuyerQuery } from "../../../redux/features/dashboard/mecaAdminQuery";


function Buyers() {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const {data, isLoading, isError, error} = useGetMecaAdminBuyerQuery({page, size});
  console.log("data for buyers", data);

  

  const [buyerList, setBuyerList] = useState([]);
  useEffect(() => {
    if (data) {
      // Logging the structure of the received data
      console.log("Received data structure:", data);

      // Assuming the data follows this structure:
      // { data: { content: [...] } }
      const resultList = data.data?.content;
      if (resultList) {
        setBuyerList(resultList);
      } else {
        console.error("Expected data.content to be an array, but got:", resultList);
      }
    }
  }, [data]);

  console.log("The BuyerList:", buyerList);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // if (isError) {
  //   return <div>Error fetching data: {error?.message}</div>;
  // }

  return (
    <>
      <Header
        subtitle={`Keep track of buyers, items bought and their transaction values.`}
        title={`Buyers`}
        amount={`433,112`}
      />
      <div className={`my-[1.25rem] flex justify-end`}>
        <SearchBox placeholder={`Search for agent`} />
      </div>
      <BuyerTable data={buyerList} isLoading={isLoading} isError={isError}/>

      <div className="flex justify-end mt-10 text-mecaBluePrimaryColor font-bold text-lg">
        {/* <button className="flex gap-x-2">
            <MdChevronLeft className="mt-1 text-2xl" /> <span>Previous</span>
          </button> */}
        <button className="flex gap-x-2">
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
