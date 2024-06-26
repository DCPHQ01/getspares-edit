import React, {useEffect, useState} from "react";
import BuyerCard from "../../components/ui/buyercard";
import Header from "../../components/ui/header";
import OverviewTable from "../../components/table/buyerAdmin/overviewTable";
import { useGetOverviewOrderTableQuery } from "../../../../redux/features/dashboard/buyerQuery";
import { paths } from "../../../../path/paths";
import { useRouter } from 'next/navigation';

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
  const {data, isError, isLoading} = useGetOverviewOrderTableQuery({});
  const [overViewList, setOverviewList] = useState<Overview[]>([]);

  useEffect(()=>{
    if(data && Array.isArray(data.data)){
      const list = data.data;
      setOverviewList(list);
    }
  }, [data]);

  const router = useRouter();
  const handleMore =()=>{
   router.push(paths.toHome());
  }

  return (
    <>
      <div className={`flex items-center justify-between relative bottom-5`}>
        <p className={`font-semibold text-[1.9rem]`}>Recently added parts</p>
        <div>
          <button className={`underline text-[#095AD3] cursor-pointer`} 
            onClick={handleMore}>
            View more</button>
        </div>
      </div>
      <div className={` mb-[4rem]`}>
        <BuyerCard/>
      </div>
      <Header
        subtitle={`Keep track of your orders on meca`}
        title={`Orders`}
        amount={`470,765`}
      />
      <OverviewTable overviewList={overViewList} isLoading={isLoading}/>
    </>
  );
}

export default Overview;
