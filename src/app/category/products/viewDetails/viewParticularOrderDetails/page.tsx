
import { MdChevronRight } from "react-icons/md";
import ViewParticularOrderTable from "../../../../dashboard/components/table/buyerAdmin/viewParticularOrderTable";



const ViewParticularOrderDetailsPage = () => {
 
  return (
    <div className="">
      <div>
        <div className="">
          <h1 className="ml-10 mt-5 flex text-base  gap-x-3">
            <div className="">Orders</div>
            <div className="flex text-mecaGrayBodyText font-light ">
              <MdChevronRight className="mt-1" /> <span> order details</span>
            </div>
          </h1>
        </div>
        <div className="">
          <h1 className="ml-10 pt-20 text-xl">Order ID: MCA3435656jh787 </h1>
        </div>
        <div className="mt-5">
          <ViewParticularOrderTable />
        </div>
      </div>
    </div>
  );
};

export default ViewParticularOrderDetailsPage;
