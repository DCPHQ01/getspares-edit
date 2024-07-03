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
  transactionValue:number | string;
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

  let usersName: any;

  useEffect(()=> {
    const userName = (sessionStorage.getItem("userDetails"));
    if(userName){
      usersName=JSON.parse(userName);
    }
  },[])
  const usersFirstName = usersName?.firstName;


  let userFirstName = "";
  try {
    const userName = JSON.parse(sessionStorage.getItem("userDetails") || "");
    userFirstName = userName?.firstName;
  } catch (error) {
    console.error("Error parsing user details:", error);
   
  }
  console.log("data for VendorOverviewMobile name: ", usersFirstName);
  console.log("data for VendorOverviewMobile names: ", userFirstName);

  return (
    <>
      <div>
        <div className={`justify-between items-center`}>
          <Header
            subtitle={`Take a quick glance on what is happening with meca`}
            name={userFirstName}
          />
          <div className="mt-5 mb-5">
            <Link href={paths.toModalPage()}>
              <Addbutton title={` Update Company`} />
            </Link>
          </div>
        </div>
    
        <OverviewTable topPerformingProduct={topPerformingProducts} isLoading={isLoading}/>

     
      </div>
    </>
  );
}

export default OverviewVendorMobile;
