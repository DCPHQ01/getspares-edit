import React,{useState, useEffect} from "react";
import Header from "../../dashboard/components/ui/header";
import SearchBox from "../../dashboard/components/ui/searchbox";
import Stock from "../../dashboard/components/ui/tabs";
import InventoryTable from "../../dashboard/components/table/mecaadmin/inventoryTable";
import { MdArrowBack, MdArrowForward, MdChevronLeft, MdChevronRight } from "react-icons/md";
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
  const [totalElement, setTotalElement] = useState(0);
  const [inStockCount, setInStockCount] = useState(0);
  const [outOfStockCount, setOutOfStockCount] = useState(0)
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
      const totalElements = resultList.data.totalElements;
      console.log('Success:',list);
      console.log('Total elements:', totalElements);
      setInventory(list)
      setTotalElement(totalElements);

      if (status === 'IN_STOCK') {
        setInStockCount(totalElements);
      } else if (status === 'OUT_OF_STOCK') {
        setOutOfStockCount(totalElements);
      }
    } 
   catch (error) {
      console.error('Failed to add vendor:', error);
     
    }

    
  };

  useEffect(() => {
    fetchInventoryData(activeTab);
  }, [activeTab, page]);

  console.log("Inventory: ", inventory);

  

    const tabs = [
        { label: 'In stock', count: inStockCount, status: 'IN_STOCK'  },
        { label: 'Out of stock', count: outOfStockCount, status: 'OUT_OF_STOCK' },
    ];

    const handleNextPage = () => {
      if (inventory.length === size) {
        setPage(prevPage => prevPage + 1);
      }
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

        <div className="flex gap-[89%] md:gap-[85%] mt-10 text-mecaBluePrimaryColor font-bold text-lg">
          <button className={`flex gap-x-2 ${page > 0 ? 'text-mecaBluePrimaryColor' : 'text-gray-400 cursor-not-allowed'}`} 
          onClick={handlePreviousPage}
          disabled={page === 0}
          >
            <MdChevronLeft className="mt-1 text-2xl" /> <span>Previous</span>
          </button>
          <button className={`flex gap-x-2 ${inventory.length === size ? 'text-mecaBluePrimaryColor' : 'text-gray-400 cursor-not-allowed'}`} 
          onClick={handleNextPage}
          disabled={inventory.length === 0}
          >
            Next
            <span>
              <MdChevronRight className="mt-[2px] text-2xl" />{" "}
            </span>
          </button>
        </div>
      </>
    );
}

export default Inventory;
