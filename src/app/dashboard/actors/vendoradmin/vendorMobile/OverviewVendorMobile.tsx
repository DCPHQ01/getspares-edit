"use client";
import React,{useEffect,useState} from "react";
import Header from "../../../components/ui/header";
import Cards from "../../../components/ui/cards";
import PeriodRadios from "../../../components/ui/periodradios";
import OverviewTable from "../../../components/table/vendoradmin/overview";
import Addbutton from "../../../components/ui/addbutton";
import Link from "next/link";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useGetMecaVendorOverviewQuery } from "../../../../../redux/features/dashboard/mecaVendorQuery";


interface VendorOverview {
  dateJoined: string;
  imageUrl?: string ; 
  transactionValue:number;
  totalItemSold: number;
  itemName: string;
}
import { paths } from "../../../../../path/paths";

function OverviewVendorMobile() {
  const { data, isLoading, isError} = useGetMecaVendorOverviewQuery({});
  const [overView, setOverView] = useState({
    totalNumberOfAgents: 0,
    totalNumberOfProductsSold: 0,
    totalOrderValue: 0,
  });
  const [topPerformingProducts, setTopPerformingProducts] = useState<VendorOverview[]>([]);
  console.log("data for VendorOverview: ",data)

  useEffect(()=> {
    if(data) {
      const resultList = data.data
      setOverView(resultList)
      const topPerforming = data.data.topPerformingProducts
      setTopPerformingProducts(topPerforming)
    }
  }, [data])

  return (
    <>
      <div>
        <div className={`justify-between items-center`}>
          <Header
            subtitle={`Take a quick glance on what is happening with meca`}
            name={`Ayodeji`}
          />
          <div className="mt-5 mb-5">
            <Link href={paths.toModalPage()}>
              <Addbutton title={` Update Company`} />
            </Link>
          </div>
        </div>
        <Cards />
        {/* <div
          className={` justify-between items-center mt-[3.25rem] mb-[1.25rem]`}
        >
          <Header
            subtitle={`A quick glance on vendors with highest sales on meca`}
            title={`Top performing vendors`}
          />
          <div className="mt-5 mb-5">
            <PeriodRadios />
          </div>
        </div> */}
        <OverviewTable topPerformingProduct={topPerformingProducts}/>

        {/* <div className=" flex justify-between mt-10 mb-10 font-bold text-lg">
          <button className="flex gap-x-2 border border-[#EAECF0]  rounded-md h-[36px] w-[36px] pl-1">
            <MdChevronLeft className="mt-1 text-2xl" />
          </button>
          <button className="flex gap-x-2 border border-[#EAECF0] rounded-md h-[36px] w-[36px] pl-1">
            <MdChevronRight className="mt-1 text-2xl" />
          </button>
        </div> */}
      </div>
    </>
  );
}

export default OverviewVendorMobile;
