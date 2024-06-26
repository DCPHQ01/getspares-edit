"use client";
import React, { useEffect, useState } from "react";
import Header from "../../dashboard/components/ui/header";
import Cards from "../../../components/cards";
import PeriodRadios from "../../dashboard/components/ui/periodradios";
import OverviewTable from "../../dashboard/components/table/mecaadmin/overview";



import {
  MdArrowBack,
  MdArrowForward,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";
import { useGetMecaAdminOverviewQuery, useGetTopPerformingVendorsQuery } from "../../../redux/features/dashboard/mecaAdminQuery";
import cardsData from "./Overview";
import { error } from "console";


// interface CardData {
//   total: string;
//   amount: number;
//   percentage: number;
//   onClick: () => void;
// };
interface VendorData {
  // avatar: string;
  companyName: string;
  email: string;
  totalItemSold: number;
  transactionValue: string;
  dateJoined: string;
};

function Overview() { 
  const [activityPeriod, setActivityPeriod] = useState("monthly");  
  const { data: mecaAdminOverviewData,  isLoading} = useGetMecaAdminOverviewQuery({});
  const {data,  isLoading: isVendorsLoading, isError: isVendorsError,} = useGetTopPerformingVendorsQuery({ period: activityPeriod});
  
  const [adminOverview, setAdminOverview] = useState(mecaAdminOverviewData?.data ?? { 
    totalNumberOfPartOrdered: 0,
    totalNumberOfAgent: 0,
    totalTransactionValue: 0,
    totalNumberOfVendor: 0,
  });
  console.log("data for meca admin", adminOverview);

  const [topVendors, setTopVendors] = useState<VendorData[]>([]); 

  useEffect(() => {
    if(data) {
      console.log("Received data structure:", data);
      const resultList = data.data;
        setTopVendors(resultList);
      }else {
        console.error("Expected data.content to be an array, but got:", data)
      }
    }, [data]);
    console.log("Top vendors:", topVendors);
    
    const handlePeriodChange = (newPeriod: string) => {
      setActivityPeriod(newPeriod);
    };  


  const [role, setRoles] = useState('');
  const [name, setName] = useState("");
  useEffect(() => {
    const role =
      typeof window !== "undefined" && window.sessionStorage
        ? JSON.parse(sessionStorage.getItem("userDetails") || "{}")
        : [];
    setRoles(role.role);
    setName(role.firstName);
  }, []);

  
  return (
    <>
      <div>
        <Header
          subtitle={`Take a quick glance on what is happening with meca`}
          name={`, ${name}`}
        />
         <Cards cardField={adminOverview}  /> 
        <div
          className={`flex justify-between items-center mt-[3.25rem] mb-[1.25rem]`}
        >
          <Header
            subtitle={`A quick glance on vendors with highest sales on meca`}
            title={`Top performing vendors`}
          />
          <PeriodRadios activityPeriod={activityPeriod} onPeriodChange={handlePeriodChange}/> 
        </div>
        <OverviewTable data={topVendors} isLoading={isVendorsLoading}/>
        

        {/* <div className="flex justify-between mt-10 text-mecaBluePrimaryColor font-bold text-lg">
          <button className="flex gap-x-2">
            <MdChevronLeft className="mt-1 text-2xl" /> <span>Previous</span>
          </button>
          <button className="flex gap-x-2">
            <MdChevronRight className="mt-1 text-2xl" /> <span>Next</span>
          </button>
        </div> */}
      </div>
    </>
  );
}

export default Overview;


//   const cardsData: CardData[] = [
  //   {
  //     total: "Total Parts Ordered",
  //     amount:  0,
  //     percentage: 0, 
  //     onClick: () => {
  //       console.log("View Total Parts Ordered");
  //     },
  //   },
  //   {
  //     total: "Number of Agents",
  //     amount:  0,
  //     percentage: 0,
  //     onClick: () => {
  //       console.log("View Number of Agents");
  //     },
  //   },
  //   {
  //     total: "Transaction Value",
  //     amount:  0,
  //     percentage: 0,
  //     onClick: () => {
  //       console.log("View Transaction Value");
  //     },
  //   },
  //   {
  //     total: "Number of Vendors",
  //     amount:  0,
  //     percentage: 0, 
  //     onClick: () => {
  //       console.log("View Number of Vendors");
  //     },
  //   },
  // ];
  // console.log("Transformed cardsData:", cardsData); 
  // const { 
  //   totalNumberOfPartOrdered,
  //   totalNumberOfAgent,
  //   totalTransactionValue,
  //   totalNumberOfVendor
  // } = mecaAdminOverviewData?.data ?? {};