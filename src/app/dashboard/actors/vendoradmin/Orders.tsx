import VendorOrderTable from "../../components/table/vendoradmin/vendorOrderTable";
import Header from "../../components/ui/header";
import Searchbox from "../../components/ui/searchbox";

function Orders() {
    return (
        <div className={`flex flex-col gap-6`}>
            <Header subtitle={`Keep track of buyers, items bought and their transaction values.`} title={`Orders`} amount={`430,607`}/>
            <Searchbox/>

            <VendorOrderTable />
            
        </div>
    );
}

export default Orders;