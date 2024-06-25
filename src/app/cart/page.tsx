"use client";
import {useEffect, useLayoutEffect, useState, Fragment} from "react";
import Carousel from "react-multi-carousel";
import Cards from "../../components/Homepage/Card";
import "react-multi-carousel/lib/styles.css";
import HomeImage1 from "../../assets/images/homeImage1.png";

import {
  MdChevronRight,

  MdCheckCircle,
} from "react-icons/md";
import { Alert, Card } from "@mui/material";
import Footer from "../../components/footer/Footer";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import TopBarWhileInside from "../reusables/TopBarWhileInside/page";
import { paths } from "../../path/paths";
import {formatAmount} from "../../components/utils";
import {CheckOutCard} from "../../components/cart/CheckOutCard";
import { useGetRelatedProductQuery } from "../../redux/features/users/authQuery";
import {useAddSingleProductToCartMutation} from "../../redux/features/cart/cartQuery";

interface SnackState extends SnackbarOrigin {
  open: boolean;
}

interface ProductType {
  id: string;
  name: string;
  image: string;
  price: string;
  categoryName?: string;
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





const RemoveToCartPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [totalItemPrice, setTotalItemPrice] = useState<string | number>("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  const [snackState, setSnackState] = useState<SnackState>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = snackState;
  const { data: relatedProductData, isLoading } = useGetRelatedProductQuery({});
  const [addToCart, { isLoading:cartLoading }] = useAddSingleProductToCartMutation();



  const { cart } = useAppSelector((state) => state.product);



  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);

    }
  }, [router]);





  const handleCheckout = (newState: SnackbarOrigin) => async () => {

    if(!isAuthenticated){
      router.push(paths.toLogin());
    }else{
      const data = cart.map((item) => {
        return {
          productId: item.id,
          quantity: Number(item.quantity)
        }
      })
      try {
        const res = await addToCart(data).unwrap()
        setSnackState({...newState, open: true});
        router.push(paths.toCheckout());
        console.log(res.data)
      }catch(error){
        console.log(error.data)
      }

    }
  };

  const handleSuccessClose = () => {
    setSnackState({ ...snackState, open: false });
  };

  const getAllTotalPrice = () => {
    if(cart.length !== 0){
      let total = cart.map( item => (Number(item.amount) * Number(item.quantity))).reduce( (a,b) => a+b);

      // let total = cart.reduce((accum,item) => accum + getPrice(item.price), 0)
      setTotalItemPrice(Number(total))
    }
  }

  useLayoutEffect(()=>{
    getAllTotalPrice()

  },[cart])



  let userId = "";
  if (typeof window !== "undefined") {
    const userDetails = JSON.parse(
      sessionStorage.getItem("userDetails") || "{}"
    );
    userId = userDetails.userId;
  }

  // const handleOpenToken = () => {
  //   const token = sessionStorage.getItem('token');
  //   if (token) {
  //     setOpen(true);
  //   } else {
  //     router.push(paths.toHome());
  //   }
  // };




  return (
    <div>
      <div className="w-full flex flex-col z-[2000]">
        {/* <HeaderPage /> */}
        <TopBarWhileInside />
      </div>

      <div className="">
        {/* desktop */}
        <div id="contentContainerAddToCartDesktop">
          <div className="w-[95%] md:w-[90%]" style={{ margin: "0px auto" }}>
            <div
               className="flex mt-[200px] lg:mt-[150px] items-center"
               id="breadCrumbsDivDesktop"
            >
              <Link href={paths.toHome()}>
                <p className="font-nunito text-sm font-medium text-mecaDarkBlueBackgroundOverlay hover:text-black hover:font-bold">
                  Home
                </p>
              </Link>
              <MdChevronRight size={20} />
              <p className="font-nunito text-sm font-medium text-mecaGoBackArrow">
                Shopping Cart
              </p>
            </div>
            <div>
              <div className="">
                <h1 className="text-lg font-semibold font-nunito text-mecaDarkBlueBackgroundOverlay mt-6">
                  Shopping Cart
                </h1>
              </div>
              <div className="md:flex md:gap-x-6">
                <div className={'w-full'}>
                  {cart?.length === 0 ? (
                    <p className="text-lg font-bold text-center mt-20">
                      Your Cart is Empty!
                    </p>
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
                <div className="mt-6 w-full md:w-[45%]">
                  <div className="h-64 bg-mecaSearchColor  rounded-lg pt-5">
                    <div className="w-[90%] m-auto">
                        <div>
                          <div className="flex justify-between">
                            <div className="flex font-normal text-sm">
                              <p> Item{cart?.length > 1 && 's'}</p>
                              <p> ({cart?.length})</p>
                            </div>

                            <div className=" font-normal text-sm">
                              <p>{formatAmount(totalItemPrice)}</p>
                            </div>
                          </div>
                          <div className="flex justify-between mt-5 font-normal text-sm">
                            <p>Shipping</p>
                            <p>{"₦0"}</p>
                          </div>
                          <hr className="mt-5"></hr>
                          <div className="flex justify-between mt-5 mb-9 font-semibold text-xl">
                            <p>Subtotal</p>
                            <p>{formatAmount(totalItemPrice)}</p>
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

                <span>
                  Item has been removed successfully
                </span>
              </div>
            </Alert>
          </Snackbar>
        </div>
      </div>

      <div className="lg:ml-28 ml-10" id="contentContainerAddToCartCarousel">
        <div className="">
          <div className="mt-24 mb-9">
            <p className="font-semibold lg:text-3xl text-lg ">
              More Products Like This
            </p>
          </div>
          <Fragment>
            {relatedProductData &&
            relatedProductData?.data &&
            relatedProductData?.data.length > 0 ? (
              <Carousel
                partialVisible={true}
                draggable={false}
                responsive={responsive}
                ssr={true}
                infinite
                autoPlay={true}
                itemClass="lg:pr-8 pr-4"
              >
                {relatedProductData.data.map((product: ProductType) => (
                  <Cards
                    key={product.id}
                    id={product.id}
                    image={HomeImage1}
                    productName={product.name}
                    price={product.price}
                  />
                ))}
              </Carousel>
            ) : (
              <p>No related products found.</p>
            )}
          </Fragment>
        </div>
      </div>
      <div className="mt-14" id="contentContainerAddToCartFooter">
        <Footer />
      </div>
    </div>
  );
};

export default RemoveToCartPage;
