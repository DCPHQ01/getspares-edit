"use client";
import {useEffect, useState} from "react";
import { Nunito_Sans } from "next/font/google";
import Carousel from "react-multi-carousel";
import Cards from "../../../../../components/Homepage/Card";
import "react-multi-carousel/lib/styles.css";
import HomeImage1 from "../../../../assets/images/homeImage1.png";
import HomeImage2 from "../../../../assets/images/HomeImage2.png";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito_sans",
  adjustFontFallback: false,
  display: "swap",
});
import {

  MdCheckCircle,
} from "react-icons/md";

import { Alert, Card } from "@mui/material";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";

import { useRouter } from "next/navigation";
import { useAppSelector } from "../../../../../redux/hooks";
import Header from "../../../components/ui/header";
import Searchbox from "../../../components/ui/searchbox";
import {CheckOutCard} from "../../../../../components/cart/CheckOutCard";
import {paths} from "../../../../../path/paths";
import {useAddSingleProductToCartMutation} from "../../../../../redux/features/cart/cartQuery";
import {formatAmount} from "../../../../../components/utils";

interface State extends SnackbarOrigin {
  open: boolean;
}

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
    partialVisibilityGutter: 0,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    partialVisibilityGutter: 0,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  module: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};


const BuyerCartMobile = () => {
  const router = useRouter();

  const [totalItemPrice, setTotalItemPrice] = useState<string>("0");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [state, setState] = useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const { cart } = useAppSelector((state) => state.product);


  const [addToCart, { isLoading: cartLoading }] =
     useAddSingleProductToCartMutation();

  const handleSucessClick = (newState: SnackbarOrigin) => () => {
    setState({ ...newState, open: true });
  };

  const handleSucessClose = () => {
    setState({ ...state, open: false });
  };



  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleCheckout = (newState: SnackbarOrigin) => async () => {
    if (!isAuthenticated) {
      router.push(paths.toLogin());
    } else {
      const data = cart.map((item) => {
        return {
          productId: item.id,
          quantity: Number(item.quantity),
        };
      });
      const payload = {
        itemRequests:data
      }
      try {
        const res = await addToCart(payload).unwrap();
        setState({ ...newState, open: true });
        router.push(paths.toCheckout());
        console.log(res.data);
      } catch (error: any) {
        console.log(error.data);
      }
    }
  };


  const getAllTotalPrice = () => {
    let newTotal = "0";

    if (cart.length !== 0) {
      const total = cart
         .map((item) => Number(item.amount) * Number(item.quantity))
         .reduce((a, b) => a + b, 0);

      newTotal = String(total);
    }
    if (totalItemPrice !== newTotal) {
      setTotalItemPrice(newTotal);
    }
  };

  useEffect(() => {
    getAllTotalPrice();
  }, [cart]);

  return (
    <div>
      {/* mobile */}
      <div className="lg:hidden w-full" id="contentContainerAddToCartMobile">
        <div className="w-[90%]" style={{ margin: "0px auto" }}>
          <div style={{ width: "100%" }} className={nunito.className}>
            <div className={`flex flex-col gap-6`}>
              <Header
                subtitle={`Keep track of items in your cart.`}
                title={`Cart`}
                amount={``}
              />
              <Searchbox />
            </div>

            <div className="flex  flex-col w-full">
              <div className="" style={{ width: "100%" }}>
                {cart.length === 0 ? (
                  <p className="text-lg font-bold text-center mt-20 mb-20">
                    Your Cart is Empty!
                  </p>
                ) : (
                  <div className="">
                    {cart.map((cardCartItem,index) => (
                       <CheckOutCard
                          key={index}
                          cardCartItem={cardCartItem}
                          getPrice={getAllTotalPrice}
                       />                    ))}
                  </div>
                )}
              </div>

              {/* Subtotal items */}
              <div className="mb-10" style={{ width: "100%" }}>
                <div className="h-64 bg-mecaSearchColor  rounded-lg pt-5">
                  <div className="w-[90%] m-auto">
                    <div>
                      <div className="flex justify-between">
                        <div className="flex font-normal text-sm">
                          <p> Item{cart?.length > 1 && "s"}</p>
                          <p> ({cart?.length})</p>
                        </div>

                        <div className=" font-normal text-sm">
                          <p>
                            {totalItemPrice
                               ? formatAmount(totalItemPrice)
                               : "0"}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between mt-5 font-normal text-sm">
                        <p>Shipping</p>
                        <p>{"₦0"}</p>
                      </div>
                      <hr className="mt-5"></hr>
                      <div className="flex justify-between mt-5 mb-9 font-semibold text-xl">
                        <p>Subtotal</p>
                        <p>
                          {totalItemPrice
                             ? formatAmount(totalItemPrice)
                             : "0"}
                        </p>
                      </div>
                    </div>
                    <div className="">
                      <button
                         onClick={handleCheckout({
                           vertical: "top",
                           horizontal: "center",
                         })}
                         className="w-full h-11 bg-mecaBluePrimaryColor rounded-full text-white cursor-pointer"
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleSucessClose}
          key={vertical + horizontal}
          // sx={{ position: "relative", top: "71rem" }}
        >
          <Alert
            onClose={handleSucessClose}
            // severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            <div className="flex gap-x-3">
              <span>
                <MdCheckCircle className="w-5 h-5" />
              </span>

              <span className={nunito.className}>
                Item has been removed successfully
              </span>
            </div>
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default BuyerCartMobile;
