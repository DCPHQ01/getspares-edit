"use client";
import React, { useEffect, useState } from "react";
import Header from "../../dashboard/components/ui/header";
import Cards from "../../dashboard/components/ui/cards/index";
import PeriodRadios from "../../dashboard/components/ui/periodradios";
import OverviewTable from "../../dashboard/components/table/mecaadmin/overview";
import {
  MdArrowBack,
  MdArrowForward,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";
import { useGetMecaAdminOverviewQuery, useGetTopPerformingVendorsQuery } from "../../../redux/features/dashboard/mecaAdminQuery";

interface CardData {
  total: string;
  amount: number;
  percentage: number;
  onClick: () => void;
};
interface VendorData {
  // avatar?: string;
  name: string;
  email: string;
  sale: number;
  value: string;
  date: string;
  time: string;
};

function Overview() {
  const [activityPeriod, setActivityPeriod] = useState("monthly"); 
  const handlePeriodChange = (newPeriod: string) => {
    setActivityPeriod(newPeriod);
  };

  const { data: mecaAdminOverviewData,  isLoading} = useGetMecaAdminOverviewQuery({});
  console.log("data for meca admin", mecaAdminOverviewData);
  const [adminOverview, setAdminOverview] = useState(mecaAdminOverviewData?.data ?? { 
    totalNumberOfPartOrdered: 0,
    totalNumberOfAgent: 0,
    totalTransactionValue: 0,
    totalNumberOfVendor: 0,
  });
  console.log("data for meca admin", adminOverview);

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
    
  return (
    <>
      <div>
        <Header
          subtitle={`Take a quick glance on what is happening with meca`}
          name={`Welcome Sam`}
        />
        <div className="lg:flex flex-col mt-10">
          <Cards cardField={adminOverview}/>
        </div>
        <div
          className={`lg:flex flex-col justify-between items-center mt-[3.25rem] mb-[1.25rem]`}
        >
          <Header
            subtitle={`A quick glance on vendors with highest sales on meca`}
            title={`Top performing vendors`}
          />
          <div className="mt-5">
            <PeriodRadios activityPeriod={activityPeriod} onPeriodChange={handlePeriodChange}/>
          </div>
        </div>
        <OverviewTable data={topVendors} isLoading={isLoading}/>

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

export default Overview;
