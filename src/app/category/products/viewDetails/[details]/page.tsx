"use client";

import TopBarWhileInside from "../../../../reusables/TopBarWhileInside/page";
import tractor from "../../../../../assets/images/tractors.png";
import { useState } from "react";
import { MdChevronRight } from "react-icons/md";
import Image from "next/image";
import * as React from "react";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "../../../../../redux/hooks";
import { addToCart } from "../../../../../redux/features/product/productSlice";
// import BasicTabs from "../../../../dashboard/components/table/buyerAdmin/tab";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BasicTabs from "../../../../dashboard/components/table/buyerAdmin/FeedBackTab";
import ProductReview from "../../../../dashboard/components/table/buyerAdmin/ProductReview";
import DetailsTable from "../../../../dashboard/components/table/buyerAdmin/tab";
import BuyerModal from "../../../../dashboard/components/table/vendoradmin/vendorModal";
import { paths } from "../../../../../path/paths";

interface State {
  open: boolean;
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
  const [state, setState] = React.useState<State>({
    open: false,
  });

  const handleOpen = () => setOpens(true);
  const handleClose = () => setOpens(false);

  const [showAllImages, setShowAllImages] = useState(false);
  const tabs = [
    {
      label: 'Details',
      content: <div> <DetailsTable/> </div>,
    },
    {
      label: 'Reviews',
      content: <ProductReview/>,
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

  const [productDescription, setProductDescription] = useState(false);
  const handleProductDescription = () => {
    setProductDescription(!productDescription);
  };

  const firstImages = images.slice(0, 5);
  const remainingImages = images.slice(5);

  return (
    <div className="relative pt-12">
      <div id="mainContainer" className="container px-4 md:px-8 lg:px-16">
        <div className="flex flex-col space-y-8 w-full" id="productDescriptionContentContainer">
          <div id="productDescriptionBreadcrumbs" className="flex items-center gap-x-2">
            <Link href={paths.toDashboard()}>
              <button className="text-lg cursor-pointer font-nunito font-normal text-mecaDarkBlueBackgroundOverlay">
                Caterpillar engine v1
              </button>
            </Link>
            <MdChevronRight size={20} />
            <p className="text-lg font-nunito font-normal text-mecaGoBackArrow">View details</p>
          </div>

          <div className="flex flex-col">
            <div id="productDescriptionDetails" className="w-full lg:flex gap-16 justify-between">
              <div id="productImage" className="lg:w-1/2 w-full flex flex-col gap-y-4">
                <div id="imageDiv" className="w-full bg-mecaSearchColor flex justify-start items-center" onClick={handleOpen}>
                  <Image src={images[selectedImageIndex].src} alt={images[selectedImageIndex].alt} className="max-w-full max-h-full" />
                </div>
                <div id="otherImagesDiv" className="w-full flex flex-wrap gap-5 justify-center lg:justify-start">
                  {(showAllImages ? images : firstImages).map((image, i) => (
                    <div
                      className={`w-1/6 h-24 cursor-pointer rounded-lg flex justify-center items-center bg-mecaSearchColor relative ${
                        selectedImageIndex === i ? "border-4 border-blue-500" : ""
                      }`}
                      key={i}
                      onClick={() => handleImageClick(i)}
                    >
                      <Image src={image.src} alt={image.alt} className="h-full w-full object-cover" />
                      {!showAllImages && i === firstImages.length - 1 && remainingImages.length > 0 && (
                        <div
                          id="moreImages"
                          className="absolute rounded-lg inset-0 flex justify-center items-center bg-mecaDarkBlueBackgroundOverlay bg-opacity-50"
                          onClick={() => setShowAllImages(true)}
                        >
                          <p className="text-white text-3xl font-nunito font-semibold">+{remainingImages.length}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div id="productDetails" className="lg:w-1/2 w-full flex flex-col h-auto mt-8 lg:mt-0">
                <div id="titleCompanyDiv" className="w-full flex flex-col gap-y-4">
                  <h2 className="text-2xl text-mecaDarkBlueBackgroundOverlay font-normal font-nunito">Catapillar engine V</h2>
                  <div id="aboutProduct" className="w-full mt-3">
                    <p className="text-sm font-nunito font-normal text-mecaGrayBodyText">
                      For a 1996 BMW model, you would be looking at engines from the E36 generation. These engines varied depending on the specific model and trim level but generally included inline-four, inline-six, and V8 options. They are known for their performance, reliability, and smooth operation typical of BMW engines.
                    </p>
                  </div>
                  <div id="priceButtonDiv" className="flex flex-col mt-6">
                    <div id="priceDiv" className="flex gap-x-6 items-center">
                      <p className="text-mecaDarkBlueBackgroundOverlay text-3xl font-extrabold">₦97,500.00</p>
                      <div id="inStockBtn" className="w-[68px] h-[22px] bg-mecaSuccess rounded-full flex justify-center items-center">
                        <p className="text-mecaIconSuccessColor text-sm font-normal">In stock</p>
                      </div>
                    </div>
                    <div id="buttonDiv" className="w-full h-full mt-4 flex flex-col gap-y-4">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <BasicTabs tabs={tabs}/>
          </div>
        </div>
      </div>
      <div>
        <BuyerModal open={opens} handleClose={handleClose} />
      </div>
    </div>
  );
}
