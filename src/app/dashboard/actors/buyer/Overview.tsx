import React, {useEffect, useState} from "react";
import BuyerCard from "../../components/ui/buyercard";
import Header from "../../components/ui/header";
import OverviewTable from "../../components/table/buyerAdmin/overviewTable";
import { useGetOverviewOrderTableQuery } from "../../../../redux/features/dashboard/buyerQuery";


interface Overview {
  id:  string;
  name: string;
  categoryName: string;
  dateCreated: string;
  companyId: string;
  quantity: number;
  companyName: string;
  brand: string;
  condition: string;
  image: string;
  price: number;
  model:string;
}
function Overview() {
  const {data, isError} = useGetOverviewOrderTableQuery({});
  const [overViewList, setOverviewList] = useState<Overview[]>([]);
  console.log("The buyerOverview: ",data)

  useEffect(()=>{
    if(data && Array.isArray(data.data)){
      const list = data.data;
      console.log("The list: ",list)
      setOverviewList(list);
    }
  }, [data]);
  return (
    <>
      <div className={`flex items-center justify-between relative bottom-5`}>
        <p className={`font-semibold text-[1.9rem]`}>Recently added parts</p>
        <i className={`underline text-[#095AD3]`}>View more</i>
      </div>
      <div className={` mb-[4rem]`}>
        <BuyerCard />
      </div>
      <Header
        subtitle={`Keep track of your orders on meca`}
        title={`Orders`}
        amount={`470,765`}
      />

      <OverviewTable overviewList={overViewList} />
    </>
  );
}

export default Overview;
