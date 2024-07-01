"use client";
import Card from "../../../../../components/Homepage/Card";
import TopBar from "../../../../reusables/TopBar/page";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import HomeImage1 from "../../../../../assets/images/homeImage1.png";
import tractor from "../../../../../assets/images/tractors.png";
import HomeImage2 from "../../../../../assets/images/homeImage2.png";
import ratingStar from "../../../../../assets/images/Star.png";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  MdCheckCircle,
  MdChevronLeft,
  MdChevronRight,
  MdExpandMore,
  MdOutlineStorefront,
} from "react-icons/md";
import Footer from "../../../../../components/footer/Footer";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import * as React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Snackbar,
  SnackbarOrigin,
  Typography,
} from "@mui/material";
import BuyerModal from "../../../../dashboard/components/table/vendoradmin/vendorModal";
import { IoCloseCircleOutline } from "react-icons/io5";
import TopBarWhileInside from "../../../../reusables/TopBarWhileInside/page";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import {addToCart, setCart} from "../../../../../redux/features/product/productSlice";
import {
  useGetAProductQuery,
  useGetRelatedProductQuery,
} from "../../../../../redux/features/users/authQuery";
import { CartProduct } from "../../../../../types/cart/product";
import { paths } from "../../../../../path/paths";
import { ColorRing } from "react-loader-spinner";
import {useAddSingleProductToCartMutation} from "../../../../../redux/features/cart/cartQuery";

interface State extends SnackbarOrigin {
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

const images = [
  tractor,
  tractor,
  tractor,
  tractor,
  tractor,
  tractor,
  tractor,
  tractor,
];

export default function ProductDescription() {

  const [opens, setOpens] = React.useState<boolean>(false);
  const handleOpen = () => setOpens(true);
  const handleClose = () => setOpens(false);

  const searchParams = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);



  const [state, setState] = React.useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const productId = usePathname()!.split("/")[4];


  const [visible, setVisible] = useState(false);

  const { data, isFetching } = useGetAProductQuery(productId, {
    skip: !productId,
  });

  const { vertical, horizontal, open } = state;

  const dispatch = useAppDispatch();

  const firstImages = images.slice(0, 5);
  const remainingImages = images.slice(5);
  const carouselRef = useRef<Carousel>(null);

  const { data: relatedProductData } = useGetRelatedProductQuery(productId, {
    skip: !productId,
  });

  const [addToCart, { isLoading: cartLoading }] =
     useAddSingleProductToCartMutation();

  const handleNext = () => {
    if (carouselRef.current) carouselRef.current.next(0);
  };

  const router = useRouter();

  const handlePrevious = () => {
    if (carouselRef.current) carouselRef.current.previous(0);
  };

  const { cart } = useAppSelector((state) => state.product);



  const handleClick = (newState: SnackbarOrigin, val: any) => () => {
    let newArr = [];
    let finalArr = [];
    let payload = { ...val, quantity: "1" };
    const savedCartItems = JSON.parse(
      localStorage.getItem("savedCartItems") as string
    ) as CartProduct[];

    if (savedCartItems) {
      const i = savedCartItems.findIndex((e) => e.id === payload.id);
      if (i > -1) {
        // We know that at least 1 object that matches has been found at the index i
        return;
      } else {
        newArr.push(payload);
        finalArr = newArr.concat(savedCartItems);
        localStorage.setItem("savedCartItems", JSON.stringify(finalArr));
        dispatch(setCart(finalArr));

      }
    } else {
      newArr.push(payload);
      localStorage.setItem("savedCartItems", JSON.stringify(newArr));
      dispatch(setCart(newArr));
    }
    setState({ ...newState, open: true });
    setTimeout(() => {
      setState({ ...newState, open: false });
    }, 3000);


  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);


  const buyNow = async (newState: SnackbarOrigin) => {
    if (!isAuthenticated) {
      router.push(paths.toLogin());
    } else {
      const data = cart.map((item) => {
        return {
          productId: item.id,
          quantity: Number(item.quantity),
        };
      });
      try {
        const res = await addToCart(data).unwrap();
        setState({ ...newState, open: true });

        setTimeout(() => {
          setState({ ...newState, open: false });
        }, 3000);
        router.push(paths.toCheckout());
      } catch (error: any) {
        console.log(error.data);
      }
    }
  }

  useEffect(() => {
    if (cart.length !== 0) {
      let hasItem = cart.some((vendor) => vendor.id === String(productId));
      setVisible(hasItem);
    }
  }, [cart]);



  const formatPrice = (price: string, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency && "NGN",
    }).format(Number(price));
  };

  return (
    <div className="relative">
      <TopBarWhileInside />
      <div id="mainContainer" className="container mx-auto px-2">
        <div
          className="flex flex-col space-y-8 mt-40 w-full"
          id="productDescriptionContentContainer"
        >
          <div
            id="productDescriptionBreadcrumbs"
            className="flex items-center gap-x-2"
          >
            <p className="text-[12px] font-nunito font-normal text-mecaDarkBlueBackgroundOverlay">
              Home
            </p>
            <MdChevronRight size={20} />
            <p
              className="text-[12px] font-nunito font-normal text-mecaDarkBlueBackgroundOverlay"
              onClick={() =>
                router.push(paths.toCategoryProducts(data?.data.category))
              }
            >
              {" "}
              {data?.data.category}
            </p>
            <MdChevronRight size={20} />
            <p className="text-[12px] font-nunito font-normal text-mecaGoBackArrow">
              {data?.data.name}
            </p>
          </div>
          <div
            id="productDescriptionDetails"
            className="w-full flex flex-col lg:flex-row justify-between"
          >
            {isFetching ? (
              <div className="w-full h-[615px] flex justify-center items-center">
                <ColorRing
                  visible={true}
                  height="100"
                  width="100"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={[
                    "#000000",
                    "#000000",
                    "#000000",
                    "#000000",
                    "#000000",
                  ]}
                />
              </div>
            ) : (
              <React.Fragment>
                <div
                  id="productImage"
                  className="w-full lg:w-[56%] h-[615px] flex flex-col gap-y-4"
                >
                  <div
                    id="imageDiv"
                    className="w-full h-[76%] cursor-pointer bg-mecaSearchColor flex justify-center items-center"
                  >
                    <Image src={tractor} alt="tractor parts" />
                  </div>

                  <div>
                    <BuyerModal open={opens} handleClose={handleClose} />
                  </div>
                  <div
                    id="otherImagesDiv"
                    className="w-full flex item-center gap-x-4"
                  >
                    {firstImages.map((image, i) => (
                      <div
                        className="w-[30%] h-[88px] rounded-lg flex justify-center items-center bg-mecaSearchColor relative"
                        key={i}
                      >
                        <Image
                          src={image}
                          alt="tractor parts"
                          className="h-full w-full"
                        />
                        {i === firstImages.length - 1 &&
                          remainingImages.length > 0 && (
                            <div
                              onClick={handleOpen}
                              id="moreImages"
                              className="absolute cursor-pointer rounded-lg inset-0 flex justify-center items-center bg-mecaDarkBlueBackgroundOverlay bg-opacity-50"
                            >
                              <p className="text-white text-3xl font-nunito font-semibold">
                                +{remainingImages.length}
                              </p>
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  id="productDetails"
                  className="w-full h-full lg:w-[42%] flex flex-col lg:h-full"
                >
                  <div
                    id="titleCompanyDiv"
                    className="w-full flex flex-col gap-y-4"
                  >
                    <h2 className="text-2xl text-mecaDarkBlueBackgroundOverlay font-normal font-nunito">
                      {data?.data.name}
                    </h2>
                    <div
                      id="companyDiv"
                      className="w-full h-[76px] border rounded-lg p-2 border-mecaBottomBorder flex items-center justify-between"
                    >
                      <div
                        id="frameOne"
                        className="w-[68%] rounded-lg h-[74px] flex justify-between items-center"
                      >
                        <div className="w-[24%]" id="iconTextDiv">
                          <div
                            id="iconDiv"
                            className="flex h-[40px] w-[40px] rounded-full justify-center items-center bg-mecaLightBackgroundColor"
                          >
                            <MdOutlineStorefront
                              size={20}
                              className="text-mecaActiveIconsNavColor"
                            />
                          </div>
                        </div>
                        <div
                          className="flex flex-col justify-center gap-y-2 w-full h-full"
                          id="companyNameDiv"
                        >
                          <p className="text-sm font-normal font-nunito text-black">
                            {data?.data.companyName || data?.data.company}
                          </p>
                          <div
                            id="ratings"
                            className="w-[56%] h-[32px] lg:h-[20px] rounded-full px-1 flex items-center gap-x-1 bg-mecaRatingsDiv border-mecaRatingsBorder"
                          >
                            <Image
                              src={ratingStar}
                              alt="ratings"
                              className="w-3 h-3"
                            />
                            <p className="text-[12px] text-mecaDarkBlueBackgroundOverlay font-normal font-nunito">
                              4,894 reviews
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* <div
                    id="viewSellerButtonDiv"
                    className="w-[40%] flex justify-end items-center"
                  >
                    <button
                      type="button"
                      id="viewSellerButton"
                      className="w-[93px] h-[32px] text-sm text-mecaBluePrimaryColor bg-white rounded-lg"
                    >
                      View Seller
                    </button>
                  </div> */}
                    </div>
                    <div id="aboutProduct" className="w-full mt-8">
                      <p className="text-sm font-nunito font-normal text-mecaGrayBodyText">
                        {data?.data.description}
                      </p>
                    </div>
                    <div id="priceButtonDiv" className="flex flex-col mt-6">
                      <div id="priceDiv" className="flex gap-x-6 items-center">
                        <p className="text-mecaDarkBlueBackgroundOverlay text-3xl font-extrabold">
                          {formatPrice(data?.data.amount, data?.data.currency)}
                        </p>
                        <div
                          id="inStockBtn"
                          className={`w-[68px] h-[22px] ${
                            data?.data.availabilityStatus === "IN_STOCK"
                              ? "bg-mecaSuccess"
                              : "bg-red-200"
                          } rounded-full flex justify-center items-center`}
                        >
                          <p
                            className={`${
                              data?.data.availabilityStatus === "IN_STOCK"
                                ? "text-mecaIconSuccessColor"
                                : "text-mecaErrorInputColor"
                            } text-sm font-normal`}
                          >
                            {data?.data.availabilityStatus === "IN_STOCK"
                              ? "In stock"
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                      <div
                        id="buttonDiv"
                        className="w-full h-full mt-4 flex flex-col gap-y-4"
                      >
                        {!visible ? (
                          <button
                            onClick={handleClick(
                              {
                                vertical: "top",
                                horizontal: "center",
                              },
                              data?.data
                            )}
                            type="button"
                            className="w-full h-[44px] text-white text-lg font-nunito font-semibold flex items-center justify-center bg-mecaBluePrimaryColor rounded-full"
                          >
                            Add to cart
                          </button>
                        ) : (
                          <button
                            onClick={handleClick(
                              {
                                vertical: "top",
                                horizontal: "center",
                              },
                              data?.data
                            )}
                            type="button"
                            disabled
                            className="w-full h-[44px] text-mecaBluePrimaryColor text-lg font-nunito font-semibold flex items-center justify-center rounded-full border border-mecaBluePrimaryColor"
                          >
                            Added to cart
                          </button>
                        )}

                        <button
                          onClick={()=>buyNow({
                            vertical: "top",
                            horizontal: "center",
                          })}
                          type="button"
                          className="w-full h-[44px] text-mecaBluePrimaryColor text-lg font-nunito font-semibold flex items-center justify-center border bg-white border-mecaBluePrimaryColor rounded-full"
                        >
                          Buy now
                        </button>

                        <Snackbar
                          anchorOrigin={{ vertical, horizontal }}
                          open={open}
                          autoHideDuration={6000}
                        >
                          <div
                            id="snackbar"
                            className="absolute top-20 flex gap-2 items-center bg-mecaSuccessBackgroundColor border border-mecaBorderSuccess text-mecaIconSuccessColor w-[449px] h-[44px] rounded-md px-4"
                          >
                            <MdCheckCircle
                              size={20}
                              className="text-mecaBorderSuccess"
                            />
                            <p className="text-sm font-normal font-nunito">
                              Added to cart successfully
                            </p>
                          </div>
                        </Snackbar>
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
        <div
          className="text-mecaDarkBlueBackgroundOverlay py-8"
          id="productDescriptionCarouselOne"
        >
          <div
            className="flex justify-between items-center my-8"
            id="carouselContainerOne"
          >
            <p className="text-3xl font-semibold" id="carouselTitleOne">
              More Products Like This
            </p>
            {/*<span className="flex gap-8" id="carouselButtonSpanOne">*/}
            {/*  <div*/}
            {/*    id="previousBtnOne"*/}
            {/*    className="text-mecaVerificationCodeColor bg-mecaGrayBackgroundColor rounded-full flex justify-center items-center w-[60px] h-[60px] hover:text-mecaDarkBlueBackgroundOverlay cursor-pointer"*/}
            {/*    onClick={handlePrevious}*/}
            {/*  >*/}
            {/*    <MdChevronLeft size={40} />*/}
            {/*  </div>*/}
            {/*  <div*/}
            {/*    id="nextBtnOne"*/}
            {/*    className="text-mecaVerificationCodeColor bg-mecaGrayBackgroundColor rounded-full flex justify-center items-center w-[60px] h-[60px] hover:text-mecaDarkBlueBackgroundOverlay cursor-pointer"*/}
            {/*    onClick={handleNext}*/}
            {/*  >*/}
            {/*    <MdChevronRight size={40} />*/}
            {/*  </div>*/}
            {/*</span>*/}
          </div>
          <div id="carouselProductDescription">
            <React.Fragment>
              {relatedProductData &&
              relatedProductData?.data?.content &&
              relatedProductData?.data?.content.length > 0 ? (
                <Carousel
                  partialVisible={true}
                  draggable={false}
                  responsive={responsive}
                  ssr={true}
                  infinite
                  autoPlay={true}
                  itemClass="lg:pr-8 pr-4"
                >
                  {relatedProductData?.data?.content.map(
                    (product: ProductType) => (
                      <Card
                        key={product.id}
                        id={product.id}
                        image={HomeImage1}
                        productName={product.name}
                        price={product.price}
                      />
                    )
                  )}
                </Carousel>
              ) : (
                <p>No related products found.</p>
              )}
            </React.Fragment>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
