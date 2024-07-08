"use client";
import { useEffect, useLayoutEffect, useState } from "react";
import { Nunito_Sans } from "next/font/google";
import Carousel from "react-multi-carousel";
import Cards from "../../../../components/Homepage/Card";
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
  MdChevronRight,
  MdMenu,
  MdOutlineShoppingCart,
  MdSearch,
  MdMoreVert,
  MdOutlineExpandMore,
  MdCircle,
  MdKeyboardArrowDown,
  MdDeleteOutline,
  MdCheckCircle,
  MdShoppingCart,
} from "react-icons/md";
import HeaderPage from "../../../reusables/Header/page";
import Parts from "../../../../assets/images/parts.png";
import Image from "next/image";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Alert, Card } from "@mui/material";
import Footer from "../../../../components/footer/Footer";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import Link from "next/link";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
// import MoreVertIcon from "@mui/icons-material/MoreVert";

import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import Header from "../../components/ui/header";
import Searchbox from "../../components/ui/searchbox";
import TruncateText from "../../../../components/utils/utils";
import { paths } from "../../../../path/paths";
import { CheckOutCard } from "../../../../components/cart/CheckOutCard";
import { formatAmount } from "../../../../components/utils";
import { useGetRelatedProductQuery } from "../../../../redux/features/users/authQuery";
import { useAddSingleProductToCartMutation } from "../../../../redux/features/cart/cartQuery";

interface SnackState extends SnackbarOrigin {
  open: boolean;
}

const Cart = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [totalItemPrice, setTotalItemPrice] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [snackState, setSnackState] = useState<SnackState>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = snackState;
  const { data: relatedProductData, isLoading } = useGetRelatedProductQuery({});
  const [addToCart, { isLoading: cartLoading }] =
    useAddSingleProductToCartMutation();

  const { cart } = useAppSelector((state) => state.product);

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
        itemRequests: data,
      };
      try {
        const res = await addToCart(payload).unwrap();
        setSnackState({ ...newState, open: true });
        router.push(paths.toCheckout());
        res.data;
      } catch (error: any) {
        error.data;
      }
    }
  };

  const handleSuccessClose = () => {
    setSnackState({ ...snackState, open: false });
  };

  // const getAllTotalPrice = () => {
  //   if (cart.length !== 0) {
  //     let total = cart
  //       .map((item) => Number(item.amount) * Number(item.quantity))
  //       .reduce((a, b) => a + b);
  //
  //     (total, 'hi');
  //     setTotalItemPrice(String(total));
  //   }
  // };

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
    <div className="">
      {/* desktop */}
      <div id="contentContainerAddToCartDesktop">
        <div className="w-[95%] md:w-[90%]" style={{ margin: "0px auto" }}>
          <div>
            <div className={`flex flex-col gap-6`}>
              <Header
                subtitle={`Keep track of items in your cart.`}
                title={`Cart`}
                // amount={totalElement}
              />
              {/* <div className="flex justify-end">
                <Searchbox />
              </div> */}
            </div>
            <div className="md:flex md:gap-x-6">
              <div className={"w-full"}>
                {cart?.length === 0 ? (
                  <div className="flex flex-col items-center mt-40 ">
                    <div className="w-[5.6rem] h-[5.6rem] bg-blue-100 flex justify-center items-center rounded-full">
                      <MdShoppingCart
                        style={{ fontSize: "2rem", color: "#0852C0" }}
                      />
                    </div>
                    <div className="flex flex-col mt-4">
                      <p className="text-xl text-center">Your Cart is Empty!</p>
                      <p className="text-gray-500">
                        All your orders will appear here
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="">
                    {cart?.map((cardCartItem, index) => (
                      <CheckOutCard
                        key={index}
                        cardCartItem={cardCartItem}
                        getPrice={getAllTotalPrice}
                      />
                    ))}
                  </div>
                )}
              </div>
              {cart.length !== 0 && (
                <div className="mt-6 max-w-full md:w-[45%]">
                  <div className="h-64 bg-mecaSearchColor w-full rounded-lg pt-5">
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
                        <div className="flex max-w-max justify-between mt-5 mb-9 font-semibold text-xl">
                          <p>Subtotal</p>
                          <p className="w-full">
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
                      <hr className="mt-5"></hr>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleSuccessClose}
          key={vertical + horizontal}
        >
          <Alert
            onClose={handleSuccessClose}
            // severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            <div className="flex gap-x-3">
              <span>
                <MdCheckCircle className="w-5 h-5" />
              </span>

              <span>Item has been added successfully</span>
            </div>
          </Alert>
        </Snackbar>
      </div>

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleSuccessClose}
        key={vertical + horizontal}
      >
        <Alert
          onClose={handleSuccessClose}
          // severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          <div className="flex gap-x-3">
            <span>
              <MdCheckCircle className="w-5 h-5" />
            </span>

            <span>Item has been removed successfully</span>
          </div>
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Cart;
