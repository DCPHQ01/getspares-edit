import React, { useState, useEffect } from "react";
import Header from "../../dashboard/components/ui/header";
import AddButton from "../../dashboard/components/ui/addbutton";
import SearchBox from "../../dashboard/components/ui/searchbox";
import SortButton from "../../dashboard/components/ui/sortbutton";
import VendorTable from "../../dashboard/components/table/mecaadmin/vendorTable";
import { MdChevronRight } from "react-icons/md";
import { useGetMecaAdminDashboardVendorQuery } from "../../../redux/features/dashboard/mecaAdminQuery";

interface Vendor {
  // email: string;
  // dateJoined: string;
  // imageUrl?: string;
  // companyName?: string;
  // transactionValue: number;
  // totalItemSold: number;
  // ratings: number;
  vendorId: string;
  email: string;
  dateJoined: string;
  imageUrl?: string;
  companyName?: string;
  transactionValue: number;
  totalItemSold: number;
  ratings: number;
}

interface VendorTableProps {
  vendorList: Vendor[];
}

function Vendors() {
  const { data, isLoading, isError } = useGetMecaAdminDashboardVendorQuery({
    page: 1,
    size: 10,
  });
  const [vendorList, setVendorList] = useState<Vendor[]>([]);

  useEffect(() => {
    if (data) {
      const resultList = data.data.content;
      setVendorList(resultList);
    }
  }, [data]);

  return (
    <>
      <div className={`lg:flex  flex-col justify-between items-center`}>
        <div className="">
          <Header
            subtitle={`Keep track of vendor sales and their service ratings.`}
            title={`Vendors`}
            amount={`430,607`}
          />
        </div>
        <div className="mt-4">{/* <AddButton title={`Add vendor`} /> */}</div>
      </div>
      {/* <div className={`flex gap-2 mt-[1.25rem]`}>
        <SearchBox placeholder={`Search for vendor`} />
        <SortButton />
      </div> */}

      <VendorTable vendorList={vendorList} />

      <div className=" flex justify-end mt-10 mb-10  font-bold text-lg">
        {/* <button className="flex gap-x-2 border border-[#EAECF0]  rounded-md h-[36px] w-[36px] pl-1">
          <MdChevronLeft className="mt-1 text-2xl" />
        </button> */}
        <button
          title="chevron right"
          className="flex gap-x-2 border border-[#EAECF0] rounded-md h-[36px] w-[36px] pl-1"
        >
          <MdChevronRight className="mt-1 text-2xl" />
        </button>
      </div>
    </>
  );
}

export default Vendors;
