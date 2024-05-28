import React from 'react';
import Header from "../../components/ui/header";
import Searchbox from "../../components/ui/searchbox";

function Orders() {
    return (
        <div className={`flex flex-col gap-6`}>
            <Header subtitle={`Keep track of orders, items ordered and their transaction values.`} title={`Orders`} amount={`430,607`}/>
            <Searchbox/>
        </div>
    );
}

export default Orders;