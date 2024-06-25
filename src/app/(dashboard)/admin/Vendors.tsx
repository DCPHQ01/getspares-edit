import React,{ useState, useEffect} from "react";
import Header from "../../dashboard/components/ui/header";
import AddButton from "../../dashboard/components/ui/addbutton";
import SearchBox from "../../dashboard/components/ui/searchbox";
// import SortButton from "../../dashboard/components/ui/sortbutton";
import VendorTable from "../../dashboard/components/table/mecaadmin/vendorTable";


import {
  MdArrowBack,
  MdArrowForward,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";

import { useGetMecaAdminDashboardVendorQuery } from "../../../redux/features/dashboard/mecaAdminQuery";



interface Vendor {
  email: string;
  dateJoined: string;
  imageUrl?: string ; 
  companyName?: string; 
  transactionValue:number;
  totalItemSold: number;
  ratings:number;
}

function Vendors() {
  const [page, setPage] = useState(0);
  const size = 10;
  const { data, isLoading, isError } = useGetMecaAdminDashboardVendorQuery({ page: page, size: size });
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [vendorList, setVendorList] = useState<Vendor[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [isPaginationLoading, setIsPaginationLoading] = useState(false);
   
  useEffect(()=> {
      if(data) {
        const resultList = data.data.content
        const vendorData =  data.data
        setVendorList(resultList)
        setVendors(vendorData)
        setTotalPages(vendorData.totalPages);
      setHasNext(vendorData.hasNext);
      setHasPrevious(vendorData.hasPrevious);
      setIsPaginationLoading(false)
      }
    }, [data])
    console.log("The vendorList: ", vendorList)
    console.log("The vendors: ", vendors)

    const handleNextPage = () => {
      if (hasNext) {
        setIsPaginationLoading(true)
        setPage(prevPage => prevPage + 1);
      }
    };
  
    const handlePreviousPage = () => {
      if (hasPrevious) {
        setIsPaginationLoading(true)
        setPage(prevPage => prevPage - 1);
      }
    };

  return (
    <>
      <div className={`flex justify-between items-center`}>
        <Header
          subtitle={`Keep track of vendor sales and their service ratings.`}
          title={`Vendors`}
          amount={`430,607`}
        />
        {/* <AddButton title={`Add vendor`}/> */}
      </div>
      <div className={`flex justify-end gap-2 mt-[1.25rem]`}>
        <SearchBox placeholder={`Search for vendor`} />
      </div>
        <VendorTable vendorList={vendorList} isLoading={isPaginationLoading || isLoading}/>
      

      <div className="flex justify-between md:gap-[85%]  mt-10 text-mecaBluePrimaryColor font-bold text-lg">
        <button 
        className={`flex gap-x-2 ${!hasPrevious ? 'text-gray-400 cursor-not-allowed' : ''}`}
        onClick={handlePreviousPage}
        disabled={!hasPrevious}
        >
            <MdChevronLeft className="mt-1 text-2xl" /> <span>Previous</span>
          </button>
        <button 
        className={`flex gap-x-2 ${!hasNext ? 'text-gray-400 cursor-not-allowed' : ''}`}
        onClick={handleNextPage}
        disabled={!hasNext}
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

export default Vendors;
