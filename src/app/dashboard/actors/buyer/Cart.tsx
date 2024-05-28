import React from 'react';
import Header from "../../components/ui/header";
import Searchbox from "../../components/ui/searchbox";
import CartItems from "../../components/ui/cartitems";

function Cart() {
    return (
        <>
            <div className={`flex flex-col gap-6 mb-[1.5rem]`}>
                <Header subtitle={`Keep track of items in your cart`} title={`Cart`}/>
                <Searchbox/>
            </div>
            <CartItems/>
        </>
    );
}

export default Cart;