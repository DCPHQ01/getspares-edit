"use client";
import React, { useEffect, useState } from "react";
import BuyerCard from "../../components/ui/buyercard";
import Header from "../../components/ui/header";
import OverviewTable from "../../components/table/buyerAdmin/overviewTable";
import { useGetOverviewOrderTableQuery } from "../../../../redux/features/dashboard/buyerQuery";
import { paths } from "../../../../path/paths";
import { useRouter } from "next/navigation";
import BuyerOverviewMobile from "../buyerMobileDashboard/BuyerOverviewMobile";

interface Overview {
  orderId: string;
  trackingOrderId: string;
  amount: number;
  dateCreated: string;
}

function Overview() {
  const { data, isError, isLoading } = useGetOverviewOrderTableQuery({});
  const [overViewList, setOverviewList] = useState<Overview[]>([]);

  useEffect(() => {
    if (data && Array.isArray(data.data)) {
      const list = data.data;
      setOverviewList(list);
    }
  }, [data]);

  const router = useRouter();
  const handleMore = () => {
    router.push(paths.toHome());
  };

  const [opened, setOpened] = useState(false);
  const isOpened = () => {
    setOpened(!opened);
  };

  return (
    <>
      <div className="hidden lg:flex flex-col">
        <div className={`flex items-center justify-between bottom-5`}>
          <p className={`font-semibold text-[1.9rem]`}>Recently added parts</p>
          <div></div>
        </div>
        <div className={` mb-[4rem]`}>
          <BuyerCard />
        </div>
        {!opened && (
          <>
            <Header
              subtitle={`Keep track of your orders on meca`}
              title={`Orders`}
              amount={overViewList.length}
            />
            <OverviewTable overviewList={overViewList} isLoading={isLoading} />
          </>
        )}
      </div>
      <div className="flex flex-col lg:hidden">
        <BuyerOverviewMobile />
      </div>
      {!opened && (
        <>
          <Header
            subtitle={`Keep track of your orders on meca`}
            title={`Orders`}
            amount={overViewList.length}
          />
          <OverviewTable overviewList={overViewList} isLoading={isLoading} />
        </>
      )}
    </>
  );
}

export default Overview;
