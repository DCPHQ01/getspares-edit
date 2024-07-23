"use client";
import React, { useEffect, useState } from "react";
import Header from "../../../components/ui/header";
import Cards from "../../../components/ui/cards/vendorMobileCard";
import PeriodRadios from "../../../components/ui/periodradios";
import OverviewTable from "../../../components/table/vendoradmin/overview";
import Addbutton from "../../../components/ui/addbutton";
import Link from "next/link";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useGetMecaVendorOverviewQuery } from "../../../../../redux/features/dashboard/mecaVendorQuery";

interface VendorOverview {
  dateJoined: string;
  imageUrl?: string;
  transactionValue: number | string;
  totalItemSold: number;
  itemName: string;
}
import { paths } from "../../../../../path/paths";

function OverviewVendorMobile() {
  const { data, isLoading, isError } = useGetMecaVendorOverviewQuery({});
  const [overView, setOverView] = useState(
    data?.data ?? {
      totalNumberOfAgents: 0,
      totalNumberOfProductsSold: 0,
      totalOrderValue: 0,
    }
  );
  const [topPerformingProducts, setTopPerformingProducts] = useState<
    VendorOverview[]
  >([]);

  useEffect(() => {
    if (data) {
      const resultList = data.data;
      setOverView(resultList);
      const topPerforming = data.data.topPerformingProducts;
      setTopPerformingProducts(topPerforming);
    }
  }, [data]);

  let usersName: any;

  const savedItems =
    typeof window !== "undefined" && window.sessionStorage
      ? sessionStorage.getItem("categoryId") || ""
      : "";

  useEffect(() => {
    const userName = sessionStorage.getItem("userDetails");
    if (userName) {
      usersName = JSON.parse(userName);
    }
  }, []);
  const usersFirstName = usersName?.firstName;

  let userFirstName = "";
  try {
    const userName =
      typeof window !== "undefined" && window.sessionStorage
        ? JSON.parse(sessionStorage.getItem("userDetails") || "")
        : "";
    // const userName = JSON.parse(sessionStorage.getItem("userDetails") || "");
    userFirstName = userName?.firstName;
  } catch (error) {
    console.error("Error parsing user details:", error);
  }

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
        <Cards cardField={overView} />
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
        <OverviewTable
          topPerformingProduct={topPerformingProducts}
          isLoading={isLoading}
        />
      </div>
    </>
  );
}

export default OverviewVendorMobile;
