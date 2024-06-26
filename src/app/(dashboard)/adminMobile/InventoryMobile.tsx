import React,{useState, useEffect} from "react";
import Header from "../../dashboard/components/ui/header";
import SearchBox from "../../dashboard/components/ui/searchbox";
import Stock from "../../dashboard/components/ui/tabs";
import InventoryTable from "../../dashboard/components/table/mecaadmin/inventoryTable";
import {
  MdArrowBack,
  MdArrowForward,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";

import { useGetMecaAdminInventoryMutation } from "../../../redux/features/dashboard/mecaAdminQuery";

interface InventoryData {
  productImage?: string;
  productName?: number;
  vendorName:string;
  vendorEmail: string;
  transactionValue:number;
  noOfItemsSold: number;
  vendorImage: string;
  
};

function Inventory() {
  const [getInventory,{isLoading,isError}] = useGetMecaAdminInventoryMutation();
  const [inventory, setInventory] = useState<InventoryData[]>([]);
  const [activeTab, setActiveTab] = useState('IN_STOCK');
  const [page, setPage] = useState(0);
  const size = 10; 

  const fetchInventoryData = async (status: string) => {
    try {
      const requestBody = {
        page: page,
        size: size,
        availabilityStatus: status,
      };
      const resultList = await getInventory(requestBody).unwrap();
      const list = resultList.data.content
      console.log('Success:',list);

      setInventory(list)

    } 
   catch (error) {
      console.error('Failed to add vendor:', error);
     
    }

  };

  useEffect(() => {
    fetchInventoryData(activeTab);
  }, [activeTab, page]);

  console.log("InventoryMobile: ", inventory);

  const inStockCount = inventory.filter(item => {
    return activeTab === 'IN_STOCK'; 
  }).length;

  const outOfStockCount = inventory.filter(item => {
    return activeTab === 'OUT_OF_STOCK' ; 
  }).length;

  const tabs = [
    { label: 'In stock', count: inStockCount,status: 'IN_STOCK'  },
    { label: 'Out of stock', count: outOfStockCount, status: 'OUT_OF_STOCK' },
];

const handleNextPage = () => {
  setPage(prevPage => prevPage + 1);
};

const handlePreviousPage = () => {
  if (page > 0) {
    setPage(prevPage => prevPage - 1);
  }
};


  return (
    <>
      <Header
        subtitle={`Keep track of how each item is performing.`}
        title={`Inventory`}
        amount={`433,112`}
      />
      <div className={`flex justify-between my-[1.25rem]`}>
        <Stock 
          tabs={tabs} 
          activeTab={activeTab}
          onTabChange={(status) => setActiveTab(status)}
          />
        <SearchBox placeholder={`Search for buyers`} />
      </div>

      <InventoryTable inventoryData={inventory} isLoading={isLoading}/>

      <div className=" flex justify-end mt-10 mb-10 font-bold text-lg">
        {/* <button className="flex gap-x-2 border border-[#EAECF0]  rounded-md h-[36px] w-[36px] pl-1">
            <MdChevronLeft className="mt-1 text-2xl" />
          </button> */}
        <button className="flex gap-x-2 border border-[#EAECF0] rounded-md h-[36px] w-[36px] pl-1">
          <MdChevronRight className="mt-1 text-2xl" />
        </button>
      </div>
    </>
  );
}

export default Inventory;
