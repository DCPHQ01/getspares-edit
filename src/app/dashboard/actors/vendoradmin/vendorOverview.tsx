"use client";
import React, { useEffect, useState } from "react";
import Header from "../../components/ui/header";
// import Cards from "../../../../components/cards";
import OverviewTable from "../../components/table/vendoradmin/overview";
import Addbutton from "../../components/ui/addbutton";
import Link from "next/link";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useGetMecaVendorOverviewQuery } from "../../../../redux/features/dashboard/mecaVendorQuery";
import { paths } from "../../../../path/paths";
import PeriodRadios from "../../components/ui/periodradios";
import Card from "../../../../components/cards/indexTwo"

interface VendorOverview {
  dateJoined: string;
  imageUrl?: string;
  transactionValue: number | string;
  totalItemSold: number;
  itemName: string;
}

function VendorOverview() {
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


  const userName = JSON.parse(sessionStorage.getItem("userDetails") || "");
  const usersFirstName = userName?.firstName;
  return (
    <>
      <div>
        <div className={`flex justify-between items-center`}>
          <div>
            <Header
               subtitle={`Take a quick glance on what is happening with meca`}
               name={usersFirstName}
            />
          </div>

          <Link href={paths.toModalPageVendor()} className="font-semibold">
            <Addbutton title={`Update Company`} />
          </Link>
        </div>
        <Card cardField={overView} />

        <OverviewTable topPerformingProduct={topPerformingProducts} isLoading={isLoading}/>
      </div>
    </>
  );
}

export default VendorOverview;
