import Header from "../../../components/ui/header";
import Searchbox from "../../../components/ui/searchbox";
import Addbutton from "../../../components/ui/addbutton";
import Categories from "../../../components/ui/categories";
import VendorInventoryTable from "../../../components/table/vendoradmin/vendorInventoryTable";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import {useState, useEffect} from "react"
import { useGetVendorAdminInventoryMutation } from "../../../../../redux/features/dashboard/mecaVendorQuery";

interface InventoryData {
  categoryName?: string;
  dateCreated:string;
  itemName: string;
  quantitySold: number;
  price?: number;
  
};

function InventoryVendorMobile() {
  const [getInventory,{isLoading,isError}] = useGetVendorAdminInventoryMutation();
  const [inventory, setInventory] = useState<InventoryData[]>([]);

  const fetchVendorData = async () => {
    try {
      const requestBody = {
        pageNumber: 0,
        pageSize: 10
      };

      const resultList = await getInventory(requestBody).unwrap();
      const list = resultList.data.content
      console.log('it is a Mobile Success:',list);

      setInventory(list)

    }  catch (error) {
      console.error('Failed to add vendor:', error);
     
    }
  
  };

  useEffect(() => {
    fetchVendorData();
  }, []);

  console.log("The Vendor Inventory Mobile: ", inventory);
  return (
    <>
      <div className={` justify-between items-center`}>
        <Header
          subtitle={`Keep track of how each item is performing.`}
          title={`Inventory`}
          amount={`430,607`}
        />
        <div className="mt-5">
          <Addbutton title={`Add product`} />
        </div>
      </div>
      <div className={` items-center gap-3 mt-[1.5rem] flex flex-row-reverse`}>
        <Searchbox />
        <Categories />
      </div>

      <div className="">
        <VendorInventoryTable inventoryData={inventory} isLoading={isLoading}/>
        <div className=" flex justify-end mt-10 mb-10 font-bold text-lg">
          {/* <button className="flex gap-x-2 border border-[#EAECF0]  rounded-md h-[36px] w-[36px] pl-1">
            <MdChevronLeft className="mt-1 text-2xl" />
          </button> */}
          <button className="flex gap-x-2 border border-[#EAECF0] rounded-md h-[36px] w-[36px] pl-1">
            <MdChevronRight className="mt-1 text-2xl" />
          </button>
        </div>
      </div>
    </>
  );
}

export default InventoryVendorMobile;
