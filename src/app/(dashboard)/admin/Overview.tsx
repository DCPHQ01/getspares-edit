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
  console.log("data for meca admin", mecaAdminOverviewData);
  const {data,  isLoading: isVendorsLoading, isError: isVendorsError,} = useGetTopPerformingVendorsQuery({ period: activityPeriod});
  const [adminOverview, setAdminOverview] = useState({});
  const [name, setName] = useState("");
  const [topVendors, setTopVendors] = useState<VendorData[]>([]);



  useEffect(() => {
    if(data) {
      const resultList = data.data;
        setTopVendors(resultList);
      }
    }, [data]);


    const handlePeriodChange = (newPeriod: string) => {
      setActivityPeriod(newPeriod);
    };

    useEffect(() => {
      if(mecaAdminOverviewData?.data){
        setAdminOverview(mecaAdminOverviewData.data)
      }
    },[mecaAdminOverviewData?.data])



  useEffect(() => {
    const role =
      typeof window !== "undefined" && window.sessionStorage
        ? JSON.parse(sessionStorage.getItem("userDetails") || "{}")
        : [];
    setName(role.firstName);
  }, []);
 


  return (
    <>
      <div>
        <Header
          subtitle={`Take a quick glance on what is happening with meca`}
          name={`${name}`}
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


