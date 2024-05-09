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
import Switches from "../../../../app/reusables/switch/page";
import Footer from "../../../../components/footer/Footer";
import TruncateText from "../../../utils/page";
import Filter from "../filters/page";
import { useSearchParams } from "next/navigation";

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

  const [showFilter, setShowFilter] = useState(true);
  const handleToggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const searchParams = useSearchParams()!;
  const search = searchParams.get("type");
  const searchWords = search ? search.replace(/([A-Z])/g, " $1").trim() : "";

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
            <div className="flex items-center gap-4 mt-6" id="breadCrumbsDiv">
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
        <TopBar />
        <div
          className="flex items-center gap-2 mt-6 px-8"
          id="breadCrumbsDivDesktop"
        >
          <p className="font-nunito text-sm font-medium text-mecaDarkBlueBackgroundOverlay">
            Home
          </p>
          <MdChevronRight size={20} />
          <p className="font-nunito text-sm font-medium text-mecaGoBackArrow">
            {searchWords}
          </p>
        </div>
        <div
          className="mt-4 flex justify-between items-center px-8"
          id="laptopContent"
        >
          <p className="text-2xl text-mecaDarkBlueBackgroundOverlay font-bold font-nunito">
            {searchWords}
          </p>
          <div className="flex gap-x-2 items-center" id="toggler/header">
            <p className="text-sm text-mecaDarkBlueBackgroundOverlay font-normal font-nunito">
              Hide filters
            </p>
            <Switches onClick={handleToggleFilter} />
          </div>
        </div>
        <div
          className="mt-8 px-8 flex gap-x-4 justify-between"
          id="filterDivForDesktopContainer"
        >
          <div
            className={`flex flex-col ${showFilter ? "w-[28%]" : "hidden"}`}
            id="filterSideBarContainer"
          >
            <p className="text-lg font-medium text-nunito text-mecaDarkBlueBackgroundOverlay">
              Filter by
            </p>
            {filterData.map((data) => (
              <div className="" id="navDatum" key={data.id}>
                <Accordion
                  defaultExpanded
                  className="w-full"
                  style={{ boxShadow: "none" }}
                >
                  <AccordionSummary
                    expandIcon={<MdExpandMore size={28} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <p className="text-mecaGoBackText text-[16px] font-semibold font-nunito capitalize">
                      {data.title}
                    </p>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="flex flex-col gap-y-4">
                      <FormControl>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          name="radio-buttons-group"
                          defaultValue={data.items[0].title}
                        >
                          {data.items.map((item: any) => (
                            <div
                              className="flex items-center gap-4"
                              key={item.id}
                              id="checkboxItemList"
                            >
                              <FormControlLabel
                                className="text-mecaGoBackText text-sm font-nunito"
                                control={item.icon}
                                label={`${item.title}`}
                              />
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
            ))}
            <div className="mt-8 flex flex-col justify-center gap-y-4 w-[273px] h-[100px]">
              <button
                type="button"
                className="w-full h-[48px] bg-mecaBluePrimaryColor text-white font-nunito font-semibold text-sm rounded-full"
                id="applyFilterButton"
              >
                Apply Filter
              </button>
              <button
                type="button"
                className="w-full h-[48px] border border-mecaBluePrimaryColor text-mecaBluePrimaryColor font-nunito font-semibold text-sm rounded-full"
                id="clearFilterButton"
              >
                Cancel Filter
              </button>
            </div>
          </div>
          <div
            className="flex flex-wrap justify-between w-full"
            id="allItemsContainerDivDesktop"
          >
            {itemsData.map((item: ItemsDataProps) => (
              <div className="flex flex-col w-[30.4%]" key={item.id}>
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
          </div>
        </div>
        <div id="footerDiv" className="mt-12">
          <Footer />
        </div>
      </div>
    </section>
  );
}
