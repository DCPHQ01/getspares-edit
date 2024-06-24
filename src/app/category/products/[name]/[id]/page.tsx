"use client";

import Card from "../../../../../components/Homepage/Card";
import TopBar from "../../../../reusables/TopBar/page";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import HomeImage1 from "../../../../../assets/images/homeImage1.png";
import tractor from "../../../../../assets/images/tractors.png";
import HomeImage2 from "../../../../../assets/images/homeImage2.png";
import ratingStar from "../../../../../assets/images/Star.png";
import { useRef, useState } from "react";
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

import { IoCloseCircleOutline } from "react-icons/io5";
import TopBarWhileInside from "../../../../reusables/TopBarWhileInside/page";
import { useAppDispatch } from "../../../../../redux/hooks";
import { addToCart } from "../../../../../redux/features/product/productSlice";
import { useGetAProductQuery } from "../../../../../redux/features/users/authQuery";

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
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const productId = usePathname()!.split("/")[4];

  const { data, isLoading } = useGetAProductQuery(productId, {
    skip: !productId,
  });

  console.log("product id ", data?.data);
  const { vertical, horizontal, open } = state;

  const dispatch = useAppDispatch();

  const firstImages = images.slice(0, 5);
  const remainingImages = images.slice(5);
  const carouselRef = useRef<Carousel>(null);

  const handleNext = () => {
    if (carouselRef.current) carouselRef.current.next(0);
  };

  const router = useRouter()

  const handlePrevious = () => {
    if (carouselRef.current) carouselRef.current.previous(0);
  };

  const searchParams = usePathname()!;

  const search = searchParams;
  const segments = searchParams.split("/");

  const searches = segments[3];
  const id = segments[4];


  const handleClick = (newState: SnackbarOrigin) => () => {
    dispatch(
      addToCart({
        id,
      })
    );
    setState({ ...newState, open: true });

    setTimeout(() => {
      setState({ ...newState, open: false });
    }, 3000);
  };

  const formatPrice = (price: string) => {
    const numericPrice = parseFloat(price?.replace(/[^0-9.-]+/g, ""));
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NGN",
    }).format(numericPrice);
  };

  const searchWords = segments[3].replace(/([A-Z])/g, " $1").trim();

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
            <p className="text-[12px] font-nunito font-normal text-mecaDarkBlueBackgroundOverlay">
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
            className="w-full flex justify-between"
          >
            <div
              id="productImage"
              className="w-[56%] h-[615px] flex flex-col gap-y-4"
            >
              <div
                id="imageDiv"
                className="w-full h-[76%] bg-mecaSearchColor flex justify-center items-center"
              >
                <Image src={tractor} alt="tractor parts" />
              </div>
              <div
                id="otherImagesDiv"
                className="w-full flex item-center gap-x-4"
              >
                {firstImages.map((image, i) => (
                  <div
                    className="w-[30%] h-[88px] cursor-pointer rounded-lg flex justify-center items-center bg-mecaSearchColor relative"
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
                          id="moreImages"
                          className="absolute rounded-lg inset-0 flex justify-center items-center bg-mecaDarkBlueBackgroundOverlay bg-opacity-50"
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
              className="w-[42%] flex flex-col h-[615px]"
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
                        className="w-[56%] h-[20px] rounded-full px-1 flex items-center gap-x-1 bg-mecaRatingsDiv border-mecaRatingsBorder"
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
                  <div
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
                  </div>
                </div>
                <div id="aboutProduct" className="w-full mt-8">
                  <p className="text-sm font-nunito font-normal text-mecaGrayBodyText">
                    {data?.data.description}
                  </p>
                </div>
                <div id="priceButtonDiv" className="flex flex-col mt-6">
                  <div id="priceDiv" className="flex gap-x-6 items-center">
                    <p className="text-mecaDarkBlueBackgroundOverlay text-3xl font-extrabold">
                      {formatPrice(data?.data.price)}
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
                    <button
                      onClick={handleClick({
                        vertical: "top",
                        horizontal: "center",
                      })}
                      type="button"
                      className="w-full h-[44px] text-white text-lg font-nunito font-semibold flex items-center justify-center bg-mecaBluePrimaryColor rounded-full"
                    >
                      Add to cart
                    </button>
                    <button
                    onClick={()=> router.push("/cart/checkout")}
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
            <span className="flex gap-8" id="carouselButtonSpanOne">
              <div
                id="previousBtnOne"
                className="text-mecaVerificationCodeColor bg-mecaGrayBackgroundColor rounded-full flex justify-center items-center w-[60px] h-[60px] hover:text-mecaDarkBlueBackgroundOverlay"
                onClick={handlePrevious}
              >
                <MdChevronLeft size={40} />
              </div>
              <div
                id="nextBtnOne"
                className="text-mecaVerificationCodeColor bg-mecaGrayBackgroundColor rounded-full flex justify-center items-center w-[60px] h-[60px] hover:text-mecaDarkBlueBackgroundOverlay"
                onClick={handleNext}
              >
                <MdChevronRight size={40} />
              </div>
            </span>
          </div>
          <div id="carouselProductDescription">
            {/* <Carousel
              partialVisible={true}
              draggable={false}
              responsive={responsive}
              ssr={true}
              infinite
              autoPlay={true}
              arrows={false}
              ref={carouselRef}
              itemClass="lg:pr-8"
            >
              <Card image={HomeImage1} />
              <Card image={HomeImage2} />
              <Card image={HomeImage1} />
            </Carousel> */}
          </div>
        </div>
        <div
          className="text-mecaDarkBlueBackgroundOverlay py-8"
          id="productDescriptionCarouselTwo"
        >
          <div
            className="flex justify-between items-center my-8"
            id="carouselContainer"
          >
            <p className="text-3xl font-semibold" id="carouselTitle">
              More Products Like This
            </p>
            <span className="flex gap-8" id="carouselButtonSpan">
              <div
                id="previousBtn"
                className="text-mecaVerificationCodeColor bg-mecaGrayBackgroundColor rounded-full flex justify-center items-center w-[60px] h-[60px] hover:text-mecaDarkBlueBackgroundOverlay"
                onClick={handlePrevious}
              >
                <MdChevronLeft size={40} />
              </div>
              <div
                id="nextBtn"
                className="text-mecaVerificationCodeColor bg-mecaGrayBackgroundColor rounded-full flex justify-center items-center w-[60px] h-[60px] hover:text-mecaDarkBlueBackgroundOverlay"
                onClick={handleNext}
              >
                <MdChevronRight size={40} />
              </div>
            </span>
          </div>
          <div id="carousel">
            {/* <Carousel
              partialVisible={true}
              draggable={false}
              responsive={responsive}
              ssr={true}
              infinite
              autoPlay={true}
              arrows={false}
              ref={carouselRef}
              itemClass="lg:pr-8"
            >
              <Card image={HomeImage1} />
              <Card image={HomeImage2} />
              <Card image={HomeImage1} />
            </Carousel> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
