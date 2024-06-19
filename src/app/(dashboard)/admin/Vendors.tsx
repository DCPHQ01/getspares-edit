import React,{ useState, useEffect} from "react";
import Header from "../../dashboard/components/ui/header";
import AddButton from "../../dashboard/components/ui/addbutton";
import SearchBox from "../../dashboard/components/ui/searchbox";
import SortButton from "../../dashboard/components/ui/sortbutton";
// import VendorTable from "../../dashboard/components/table//vendorTable";
import VendorTable from "../../dashboard/components/table/mecaadmin/vendorTable";

import {
  MdArrowBack,
  MdArrowForward,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";
// import { useGetDashboardVendorQuery } from "../../../redux/features/dashboard/Query";
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
  const { data, isLoading, isError } = useGetMecaAdminDashboardVendorQuery({ page: 1, size: 10 });
  const [vendorList, setVendorList] = useState<Vendor[]>([]);
   
  useEffect(()=> {
      if(data) {
        const resultList = data.data.content
        setVendorList(resultList)
      }
    }, [data])
    console.log("The vendorList: ", vendorList)
    
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

      <VendorTable vendorList={vendorList}/>

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

export default Vendors;
