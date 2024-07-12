"use client";

import TopBarWhileInside from "../../../../reusables/TopBarWhileInside/page";
import tractor from "../../../../../assets/images/tractors.png";
import { useState, useEffect } from "react";
import { MdChevronRight } from "react-icons/md";
import Image from "next/image";
import * as React from "react";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "../../../../../redux/hooks";
import { addToCart } from "../../../../../redux/features/product/productSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BasicTabs from "../../../../dashboard/components/table/buyerAdmin/FeedBackTab";
import ProductReview from "../../../../dashboard/components/table/buyerAdmin/ProductReview";
import DetailsTable from "../../../../dashboard/components/table/buyerAdmin/tab";
import VendorModal from "../../../../dashboard/components/table/vendoradmin/vendorModal";
import { paths } from "../../../../../path/paths";
import { formatAmount2 } from "../../../../../components/utils";
import { useGetViewBuyersProductDetailsQuery } from "../../../../../redux/features/feedback/feedbackQuery";
import AmountComponentsPage from "../../../../reusables/AmountComponents/page";
interface State {
  open: boolean;
}

interface viewBuyersProductDetails {
  id: string;
  name: string;
  description: string;
  availabilityStatus: string;
  category: string;
  companyId: string;
  amount: any;
  color: string;
  images: [string];
  company: string;
}

interface productInformation {
  manufacturer: string;
  brand: string;
  model: string;
  itemWeight: string;
  productDimension: null;
  countryOfOrigin: string;
  itemModelNumber: string;
  manufacturerPartNumber: string;
  voltage: string;
  quantity: number;
}

const images = [
  { src: tractor, alt: "Front View" },
  { src: tractor, alt: "Back View" },
  { src: tractor, alt: "Right Side View" },
  { src: tractor, alt: "Left Side View" },
  { src: tractor, alt: "Top View" },
  { src: tractor, alt: "Right Side View" },
  { src: tractor, alt: "Bottom View" },
  { src: tractor, alt: "other side" },
];

export default function Details() {
  const [opens, setOpens] = React.useState<boolean>(false);
  const [productInformations, setProductInformations] =
    useState<productInformation>();
  const [state, setState] = React.useState<State>({
    open: false,
  });

  const handleOpen = () => setOpens(true);
  const handleClose = () => setOpens(false);
  let productId = "";
  const [showAllImages, setShowAllImages] = useState(false);
  const { data } = useGetViewBuyersProductDetailsQuery({
    productId: productId as string,
  });
  const tabs = [
    {
      label: "Details",
      content: (
        <div>
          <DetailsTable data={data} />{" "}
        </div>
      ),
    },
    {
      label: "Reviews",
      content: <ProductReview />,
    },
  ];

  const { open } = state;
  const dispatch = useAppDispatch();
  const searchParams = usePathname()!;
  const search = searchParams;
  const segments = searchParams.split("/");
  const searches = segments[3];
  const id = segments[4];
  const router = useRouter();

  // const handleClick = () => {
  //   dispatch(
  //     addToCart({
  //       id,
  //     })
  //   );
  //   setState({ ...state, open: true });

  //   setTimeout(() => {
  //     setState({ ...state, open: false });
  //   }, 3000);
  // };

  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };
  const [images, setImages] = useState([]);

  const [productDescription, setProductDescription] = useState(false);
  const handleProductDescription = () => {
    setProductDescription(!productDescription);
  };

  const firstImages = images?.slice(0, 5);
  const remainingImages = images?.slice(5);

  // const productId = sessionStorage.getItem("productId");
  useEffect(() => {
    const savedId = sessionStorage.getItem("myProductId");
    console.log("sessionstorage", savedId);
    if (savedId) {
      productId = JSON.parse(savedId);
    }
  }, []);

  const [viewBuyerProducts, setViewBuyerProducts] =
    useState<viewBuyersProductDetails>();

  useEffect(() => {
    if (data) {
      const viewOfProduct = data.data;
      setViewBuyerProducts(viewOfProduct);
      const informationList = data.data.productInformation;
      setProductInformations(informationList);
    }
  }, [data]);

  useEffect(() => {
    setImages(data?.data.images);
  }, [data]);

  const [openVendorModal, setOpenVendorModal] = useState(false);
  const handleOpenVendorModal = () => {
    setOpenVendorModal((val) => !val);
  };
  return (
    <div className="relative pt-5" id="detailsDiv">
      <div id="mainContainer" className="container px-4 md:px-8 lg:px-16">
        <div
          className="flex flex-col space-y-8 w-full"
          id="productDescriptionContentContainer"
        >
          <div
            id="productDescriptionBreadcrumbs"
            className="flex items-center gap-x-2"
          >
            <Link href="/dashboard">
              <button className="text-base cursor-pointer font-nunito font-normal text-mecaDarkBlueBackgroundOverlay">
                {viewBuyerProducts?.name}
              </button>
            </Link>
            <MdChevronRight size={20} />
            <p className="text-base font-nunito font-normal text-mecaGoBackArrow">
              View details
            </p>
          </div>

          <div className="flex flex-col">
            <div
              id="productDescriptionDetails"
              className="w-full lg:flex gap-16 justify-between"
            >
              <div
                id="productImage"
                className="lg:w-1/2 w-[458px] h-[361px] flex flex-col gap-y-4"
              >
                <div
                  id="imageDiv"
                  className="w-[458px] h-[266px] bg-mecaSearchColor flex justify-center items-center"
                  onClick={handleOpen}
                >
                  <img
                    src={data?.data.images[selectedImageIndex]}
                    alt="product image"
                    className="w-[272px] h-[190px]"
                  />
                </div>
                <div
                  id="otherImagesDiv"
                  className="w-[458px] h-[75px] flex gap-5"
                >
                  {(showAllImages ? images : firstImages)?.map((image, i) => (
                    <div
                      className={`w-[98px] h-[75px] cursor-pointer rounded-lg flex justify-center items-center bg-mecaSearchColor relative ${
                        selectedImageIndex === i
                          ? "border-4 border-blue-500"
                          : ""
                      }`}
                      key={i}
                      onClick={() => handleImageClick(i)}
                    >
                      <img
                        src={image}
                        alt="images"
                        className="h-[45px] w-[59px] object-cover"
                      />
                      {!showAllImages &&
                        i === firstImages?.length - 1 &&
                        remainingImages?.length > 0 && (
                          <div
                            id="moreImages"
                            className="absolute rounded-lg inset-0 flex justify-center items-center bg-mecaDarkBlueBackgroundOverlay bg-opacity-50"
                            onClick={handleOpenVendorModal}
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
                className="lg:w-1/2 max-w-full flex flex-col h-auto mt-8 lg:mt-0"
              >
                <div
                  id="titleCompanyDiv"
                  className="w-full flex flex-col gap-y-4"
                >
                  <div className="border-2 text-center pb-6 w-52 h-6 rounded-full">
                    {viewBuyerProducts?.category}
                  </div>
                  <h2 className="text-2xl text-mecaDarkBlueBackgroundOverlay font-normal font-nunito">
                    {viewBuyerProducts?.name}
                  </h2>
                  <div id="aboutProduct" className="w-full mt-3">
                    <p className="text-sm font-nunito font-normal text-mecaGrayBodyText">
                      {viewBuyerProducts?.description}
                    </p>
                  </div>
                  <div id="priceButtonDiv" className="flex flex-col mt-6">
                    <div id="priceDiv" className="flex gap-x-6 items-center">
                      <p className="text-mecaDarkBlueBackgroundOverlay text-3xl font-semibold">
                        {formatAmount2(viewBuyerProducts?.amount)}
                        {/* {viewBuyerProducts?.amount} */}
                      </p>
                      <div
                        id="inStockBtn"
                        className="w-[68px] h-[22px] bg-mecaSuccess rounded-full flex justify-center items-center"
                      >
                        <p className="text-mecaIconSuccessColor text-sm font-normal">
                          {viewBuyerProducts?.availabilityStatus.toLocaleLowerCase()}
                        </p>
                      </div>
                    </div>
                    <div
                      id="buttonDiv"
                      className="w-full h-full mt-4 flex flex-col gap-y-4"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <BasicTabs tabs={tabs} />
          </div>
        </div>
      </div>
      <div>
        {openVendorModal && (
          <div className="">
            <VendorModal handleModalClose={handleOpenVendorModal} />
          </div>
        )}
      </div>
    </div>
  );
}
