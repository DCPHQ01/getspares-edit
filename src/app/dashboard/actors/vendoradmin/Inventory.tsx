import Header from "../../components/ui/header";
import Searchbox from "../../components/ui/searchbox";
import Addbutton from "../../components/ui/addbutton";
import Categories from "../../components/ui/categories";

function Inventory() {
    return (
        <>
            <div className={`flex justify-between items-center`}>
                <Header subtitle={`Keep track of how each item is performing.`} title={`Inventory`} amount={`430,607`}/>
                <Addbutton title={`Add product`}/>
            </div>
            <div className={`flex items-center gap-3 mt-[1.5rem]`}>
                <Searchbox/>
                <Categories/>
            </div>
        </>

    );
}

export default Inventory;