"use client";
import { MdChevronRight, MdExpandMore } from "react-icons/md";
import part from "../../../../assets/images/parts.png";
import star from "../../../../assets/images/Star.png";
import Image from "next/image";

import { useEffect, useState } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
} from "@mui/material";
import TopBar from "../../../../app/reusables/TopBar/page";
import Switches from "../../../../components/switch/Switches";
import Footer from "../../../../components/footer/Footer";
import TruncateText from "../../../../components/utils/utils";
import Filter from "../../../../components/filters/Filter";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FilterFixedPage from "../../filterFixedPage";
import SideFilter from "../../sideFilter";

interface ItemsDataProps {
  id: number;
  desc: string;
  rating: number;
  price: string;
  image: any;
}

const itemsData: ItemsDataProps[] = [
  {
    id: 1,
    desc: "E46 Engine 1996 Model",
    rating: 3,
    price: "₦97,500.00",
    image: part,
  },
  {
    id: 2,
    desc: "E46 Engine 1996 Model",
    rating: 3,
    price: "₦97,500.00",
    image: part,
  },
  {
    id: 3,
    desc: "E46 Engine 1996 Model",
    rating: 3,
    price: "₦97,500.00",
    image: part,
  },
  {
    id: 4,
    desc: "E46 Engine 1996 Model",
    rating: 3,
    price: "₦97,500.00",
    image: part,
  },
  {
    id: 5,
    desc: "E46 Engine 1996 Model",
    rating: 3,
    price: "₦97,500.00",
    image: part,
  },
  {
    id: 6,
    desc: "E46 Engine 1996 Model",
    rating: 3,
    price: "₦97,500.00",
    image: part,
  },
  {
    id: 7,
    desc: "E46 Engine 1996 Model",
    rating: 3,
    price: "₦97,500.00",
    image: part,
  },
  {
    id: 8,
    desc: "E46 Engine 1996 Model",
    rating: 3,
    price: "₦97,500.00",
    image: part,
  },
];

export default function Products() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const handleOpeningFilterButton = () => {
    setIsFilterOpen(!isFilterOpen);
    console.log(isFilterOpen, "isFilterOpen");
  };

  const router = useRouter();
  const [showFilter, setShowFilter] = useState(true);
  const handleToggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const searchParams = usePathname()!;
  const segments = searchParams.split("/");
  const searches = segments[3];
  const searchWords = segments[3]?.replace(/([A-Z])/g, " $1")?.trim();
  // const searchWords = search ? search.replace(/([A-Z])/g, " $1").trim() : "";

  const handleProductDescription = (id: number) => {
    router.push(`/category/products/${searches}/${id}`);
  };

  const filterData = [
    {
      id: 1,
      title: "Brand",
      items: [
        {
          id: 1,
          title: "JCB Agriculture",
          icon: <Checkbox />,
        },
        {
          id: 2,
          title: "AGCO Challenger",
          icon: <Checkbox />,
        },
        {
          id: 3,
          title: "Deutz-Fahr",
          icon: <Checkbox />,
        },
        {
          id: 4,
          title: "Kuhn",
          icon: <Checkbox />,
        },
      ],
    },
    {
      id: 2,
      title: "Model",
      items: [
        {
          id: 1,
          title: "New",
          icon: <Checkbox />,
        },
        {
          id: 2,
          title: "Refurbished",
          icon: <Checkbox />,
        },
        {
          id: 3,
          title: "Not specified",
          icon: <Checkbox />,
        },
      ],
    },
    {
      id: 3,
      title: "Conditions",
      items: [
        {
          id: 1,
          title: "New",
          icon: <Checkbox />,
        },
        {
          id: 2,
          title: "Refurbished",
          icon: <Checkbox />,
        },
        {
          id: 3,
          title: "Not specified",
          icon: <Checkbox />,
        },
      ],
    },
    {
      id: 4,
      title: "Price",
      items: [
        {
          id: 1,
          title: "200,000",
          icon: <Radio value={"200000"} />,
        },
        {
          id: 2,
          title: "300,000",
          icon: <Radio value={"300000"} />,
        },
        {
          id: 3,
          title: "1,000,000",
          icon: <Radio value={"1000000"} />,
        },
      ],
    },
  ];
  // useEffect(() => {
  //   setIsFilterOpen(false);
  // }, []);

  return (
    <section id="productCategory w-full">
      {/* mobile and Tab */}
      {!isFilterOpen ? (
        <div className="flex flex-col lg:hidden" id="ProductMobileDivContainer">
          <TopBar />
          <div
            className="px-4 flex flex-col gap-y-4 lg:hidden"
            id="productCategoryContentDiv"
          >
            <div className="flex items-center gap-4 mt-52" id="breadCrumbsDiv">
              <p className="font-nunito text-sm font-medium text-mecaDarkBlueBackgroundOverlay">
                Home
              </p>
              <MdChevronRight size={20} />
              <p className="font-nunito text-sm font-medium text-mecaGoBackArrow">
                {searchWords}
              </p>
            </div>
            <div className="flex flex-col mt-6" id="productItems">
              <div
                className="flex justify-between items-center"
                id="productHeader"
              >
                <h1 className="text-lg font-semibold font-nunito text-mecaDarkBlueBackgroundOverlay">
                  {searchWords}
                </h1>
                <div className="w-[60px] h-[24px]" id="filterButtonDiv">
                  <button
                    type="button"
                    className="w-full h-full border border-mecaBgDisableColor rounded-full"
                    id="filterButton"
                    onClick={handleOpeningFilterButton}
                  >
                    <p className="font-nunito text-sm font-medium text-mecaGrayBodyText">
                      Filters
                    </p>
                  </button>
                </div>
              </div>
              <div
                className="mt-4 w-full flex items-center flex-wrap gap-x-5"
                id="allItemsContainerDiv"
              >
                {itemsData.map((item: ItemsDataProps) => (
                  <div
                    className="w-[46%] h-[270px] flex flex-col justify-center gap-y-3 mb-8"
                    id="eachItemDiv"
                    key={item.id}
                  >
                    <div
                      className="w-full h-[194px] flex justify-center items-center bg-mecaSearchColor"
                      id="itemImageDiv"
                    >
                      <Image
                        src={item.image}
                        alt="tractor image"
                        width={144}
                        height={106}
                      />
                    </div>
                    <div
                      className="w-full flex flex-col gap-y-4"
                      id="itemContentDiv"
                    >
                      <div className="flex justify-between items-center md:hidden">
                        <TruncateText text={item.desc} maxLength={15} />
                        <div
                          id="ratingContainerMobile"
                          className="flex items-center gap-x-1"
                        >
                          <Image
                            src={star}
                            alt="rating"
                            width={12}
                            height={12}
                          />
                          <p className="text-[12px] text-mecaDarkBlueBackgroundOverlay">
                            {item.rating}
                          </p>
                        </div>
                      </div>
                      <div
                        id="priceContainerDiv"
                        className="flex items-center ml-6"
                      >
                        <p className="text-mecaDarkBlueBackgroundOverlay text-sm font-nunito font-bold text-center">
                          {item.price}
                        </p>
                      </div>
                      <div className="hidden md:flex justify-between items-center lg:hidden">
                        <TruncateText text={item.desc} maxLength={25} />
                        <div
                          id="ratingContainerTabDiv"
                          className="flex items-center"
                        >
                          <Image
                            src={star}
                            alt="rating"
                            width={10}
                            height={10}
                          />
                          <p>{item.rating}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        <Filter isFilterOpen={isFilterOpen} setIsFilterOpen={setIsFilterOpen} />
      )}
      {/* desktop */}
      <div className="hidden lg:flex flex-col" id="desktopDiv">
        <div className="">
          <TopBar />
        </div>
        <div className="">
          <FilterFixedPage />
        </div>
        <div
          className="  flex gap-x-32 mt-80 mr-30 justify-between"
          id="filterDivForDesktopContainer"
        >
          <div
            className={`flex flex-col ${showFilter ? "w-[28%]" : "hidden"}`}
            id="filterSideBarContainer"
          >
            <SideFilter />
          </div>
          <div
            className="flex flex-wrap -mt-3 justify-between pr-8 "
            id="allItemsContainerDivDesktop"
          >
            {itemsData.map((item: ItemsDataProps) => (
              <div
                className="flex flex-col w-[30.4%] cursor-pointer"
                key={item.id}
                onClick={() => handleProductDescription(item.id)}
              >
                <div
                  className="w-full h-[194px] flex justify-center items-center bg-mecaSearchColor"
                  id="itemImage"
                >
                  <Image
                    src={item.image}
                    alt="tractor image"
                    width={144}
                    height={106}
                  />
                </div>
                <div
                  className="w-full flex flex-col gap-y-4 mt-4"
                  id="itemContent"
                >
                  <div className="flex justify-between items-center">
                    <TruncateText text={item.desc} maxLength={50} />
                    <div
                      id="ratingContainerDesktop"
                      className="flex items-center gap-x-1"
                    >
                      <Image src={star} alt="rating" width={12} height={12} />
                      <p className="text-[12px] text-mecaDarkBlueBackgroundOverlay">
                        {item.rating}
                      </p>
                    </div>
                  </div>
                  <div
                    id="priceContainer"
                    className="flex items-center ml-6 mb-4"
                  >
                    <p className="text-mecaDarkBlueBackgroundOverlay text-sm font-nunito font-bold text-center">
                      {item.price}
                    </p>
                  </div>
                  <div className="hidden md:flex justify-between items-center lg:hidden">
                    <TruncateText text={item.desc} maxLength={25} />
                    <div id="ratingContainerTab" className="flex items-center">
                      <Image src={star} alt="rating" width={10} height={10} />
                      <p>{item.rating}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div id="footerDiv" className="mt-12 w-[100%]">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
