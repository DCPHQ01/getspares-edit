"use client";
import React,{useEffect,useState} from "react";
import Header from "../../components/ui/header";
import Cards from "../../../../components/cards";
import PeriodRadios from "../../components/ui/periodradios";
import OverviewTable from "../../components/table/vendoradmin/overview";
import Addbutton from "../../components/ui/addbutton";
import Link from "next/link";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useGetMecaVendorOverviewQuery } from "../../../../redux/features/dashboard/mecaVendorQuery";
import { paths } from "../../../../path/paths";


interface VendorOverview {
  dateJoined: string;
  imageUrl?: string ; 
  transactionValue:number;
  totalItemSold: number;
  itemName: string;
}

function VendorOverview() {
  const { data, isLoading, isError} = useGetMecaVendorOverviewQuery({});
  const [overView, setOverView] = useState(data?.data ??{
    totalNumberOfAgents: 0,
    totalNumberOfProductsSold: 0,
    totalOrderValue: 0,
  });
  console.log("data for VendorOverviews: ",overView)
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

  console.log("The overView: ", overView)

  console.log("The topPerformingProducts: ", topPerformingProducts)

  const userName = JSON.parse(sessionStorage.getItem("userDetails") || "");
  const usersFirstName = userName?.firstName;
  return (
    <>
      <div>
        <div className={`flex justify-between items-center`}>
          <Header
            subtitle={`Take a quick glance on what is happening with meca`}
            name={usersFirstName}
          />
          <Link href={paths.toModalPage()} className="font-semibold">
            <Addbutton title={`Update Company`} />
          </Link>
        </div>
        <Cards cardField={overView}/>

        <OverviewTable topPerformingProduct={topPerformingProducts}/>
      </div>
    </>
  );
}

export default VendorOverview;
