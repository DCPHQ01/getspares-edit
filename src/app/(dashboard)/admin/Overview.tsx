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

interface CardData {
  total: string;
  amount: number;
  percentage: number;
  onClick: () => void;
};
interface VendorData {
  avatar?: string;
  name: string;
  email: string;
  sale: number;
  value: string;
  date: string;
  time: string;
};

function Overview() { 
  const [activityPeriod, setActivityPeriod] = useState("monthly");
  
  const { data: mecaAdminOverviewData,  isLoading: isOverviewLoading,
    isError: isOverviewError,} = useGetMecaAdminOverviewQuery({});
  console.log("data for meca admin", mecaAdminOverviewData);

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

  const {data,  isLoading: isVendorsLoading,
    isError: isVendorsError,} = useGetTopPerformingVendorsQuery({ period: activityPeriod});
  console.log("data for meca admin", data);
  const [topVendors, setTopVendors] = useState<VendorData[]>([]); 

  useEffect(() => {
    if(data) {
      console.log("Received data structure:", data);
      const resultList = data.data.content;
      if(resultList) {
        setTopVendors(resultList);
      } else {
        console.error("Expected data.content to be an array, but got:", resultList);
      }
    }}, [data]);

    console.log("Top vendors:", topVendors);
    
    const handlePeriodChange = (newPeriod: string) => {
      setActivityPeriod(newPeriod);
    };

    const cardsData: CardData[] = [
    {
      total: "Total Parts Ordered",
      amount: mecaAdminOverviewData?.data?.totalNumberOfPartOrdered ?? 0,
      percentage: 0, 
      onClick: () => {
        console.log("View Total Parts Ordered");
      },
    },
    {
      total: "Number of Agents",
      amount: mecaAdminOverviewData?.data?.totalNumberOfAgent ?? 0,
      percentage: 0,
      onClick: () => {
        console.log("View Number of Agents");
      },
    },
    {
      total: "Transaction Value",
      amount: mecaAdminOverviewData?.data?.totalTransactionValue ?? 0,
      percentage: 0,
      onClick: () => {
        console.log("View Transaction Value");
      },
    },
    {
      total: "Number of Vendors",
      amount: mecaAdminOverviewData?.data?.totalNumberOfVendor ?? 0,
      percentage: 0, 
      onClick: () => {
        console.log("View Number of Vendors");
      },
    },
  ];
  console.log("Transformed cardsData:", cardsData); 

  
  return (
    <>
      <div>
        <Header
          subtitle={`Take a quick glance on what is happening with meca`}
          name={`, ${name}`}
        />
        <Cards cardProps={cardsData}/>
        <div
          className={`flex justify-between items-center mt-[3.25rem] mb-[1.25rem]`}
        >
          <Header
            subtitle={`A quick glance on vendors with highest sales on meca`}
            title={`Top performing vendors`}
          />
          <PeriodRadios /> 
        </div>
        <OverviewTable data={topVendors}  />
        

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
