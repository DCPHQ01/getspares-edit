import React, { useState, useEffect } from "react";
import BuyerCard from "../../../components/ui/buyercard";
import Header from "../../../components/ui/header";
import OverviewTable from "../../../components/table/buyerAdmin/overviewTable";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Card } from "@mui/material";
import { useGetOverviewOrderTableQuery } from "../../../../../redux/features/dashboard/buyerQuery";
import { paths } from "../../../../../path/paths";
import { useRouter } from "next/navigation";

interface Overview {
  orderId: string;
  trackingOrderId: string;
  amount: number;
  dateCreated: string;
}

function BuyerOverviewMobile() {
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

  return (
    <>
      <div
        className={`flex items-center justify-between relative bottom-5 -z-50`}
      >
        <p className={`font-semibold text-[1.9rem]`}>Recently added parts</p>
        {/* <p className={`underline text-[#095AD3]`} onClick={handleMore}>View more</p> */}
      </div>
      <div className={` mb-[4rem]  w-[100%] truncate`}>
        <BuyerCard />
      </div>
      <Header
        subtitle={`Keep track of your orders on meca`}
        title={`Orders`}
        amount={overViewList.length}
      />

      {/* <OverviewTable /> */}
      <OverviewTable overviewList={overViewList} isLoading={isLoading} />
    </>
  );
}

export default BuyerOverviewMobile;
