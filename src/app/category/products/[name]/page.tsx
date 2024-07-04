"use client";
import { MdChevronRight, MdExpandMore } from "react-icons/md";
import part from "../../../../assets/images/parts.png";
import star from "../../../../assets/images/Star.png";
import Image from "next/image";

import { Suspense, useEffect, useLayoutEffect, useState } from "react";

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
import TopBarWhileInside from "../../../reusables/TopBarWhileInside/page";
import { useGetProductInCategoryQuery } from "../../../../redux/features/users/authQuery";
import { ColorRing } from "react-loader-spinner";
import { formatAmount } from "../../../../components/utils";

interface ItemsDataProps {
  id: number;
  description: string;
  rating: number;
  price: string;
  image?: any;
  name: string;
}

export default function Products() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const handleOpeningFilterButton = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const router = useRouter();
  const [showFilter, setShowFilter] = useState(true);
  const [categoryId, setCategoryId] = useState<string>("");
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

  const { data, isFetching } = useGetProductInCategoryQuery({
    categoryId,
    pageNumber: 0,
    pageSize: 100,
  });

  useEffect(() => {
    const savedItems = sessionStorage.getItem("categoryId");
    if (savedItems) {
      setCategoryId(savedItems);
    }
  }, []);

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
      id: 3,
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

  return (
    <section id="productCategory w-full">
      <Suspense fallback={<div>Loading...</div>}>
        {/* mobile and Tab */}
        {!isFilterOpen ? (
          <div
            className="flex flex-col lg:hidden"
            id="ProductMobileDivContainer"
          >
            <TopBarWhileInside />
            <div
              className="px-4 flex flex-col gap-y-4 lg:hidden"
              id="productCategoryContentDiv"
            >
              <div
                className="flex items-center gap-4 mt-12"
                id="breadCrumbsDiv"
              >
                <p className="font-nunito text-sm font-medium text-mecaDarkBlueBackgroundOverlay">
                  Home
                </p>
                <MdChevronRight size={20} />
                <p className="font-nunito text-sm font-medium text-mecaGoBackArrow capitalize">
                  {searchWords}
                </p>
              </div>
              <div className="flex flex-col mt-6" id="productItems">
                <div
                  className="flex justify-between items-center"
                  id="productHeader"
                >
                  <h1 className="text-lg font-semibold capitalize font-nunito text-mecaDarkBlueBackgroundOverlay">
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
                          "#0000FF",
                          "#0000FF",
                          "#0000FF",
                          "#0000FF",
                          "#0000FF",
                        ]}
                      />
                    </div>
                  ) : data?.data?.content?.length <= 0 ? (
                    <div className="w-full flex justify-center items-center">
                      <p className="text-mecaDarkBlueBackgroundOverlay text-4xl font-nunito font-semibold">
                        No Product Found
                      </p>
                    </div>
                  ) : (
                    data?.data?.content.map((item: ItemsDataProps) => (
                      <div
                        className="w-[46%] h-[270px] flex flex-col justify-center gap-y-3 mb-8"
                        id="eachItemDiv"
                        key={item.id}
                      >
                        <div
                          className="w-full h-[194px] flex justify-center items-center bg-mecaSearchColor"
                          id="itemImageDiv"
                        >
                          {item?.image ? (
                            <Image
                              src={item?.image}
                              alt="tractor image"
                              width={144}
                              height={106}
                            />
                          ) : null}
                        </div>
                        <div
                          className="w-full flex flex-col gap-y-4"
                          id="itemContentDiv"
                        >
                          <div className="flex justify-between items-center md:hidden">
                            <TruncateText text={item.name} maxLength={15} />
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
                              {formatAmount(Number(item.price))}
                            </p>
                          </div>
                          <div className="hidden md:flex justify-between items-center lg:hidden">
                            <TruncateText
                              text={item.description}
                              maxLength={25}
                            />
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
                    ))
                  )}
                </div>
              </div>
            </div>
            <Footer />
          </div>
        ) : (
          <Filter
            isFilterOpen={isFilterOpen}
            setIsFilterOpen={setIsFilterOpen}
          />
        )}
        {/* desktop */}
        <div className="hidden lg:flex flex-col" id="desktopDiv">
          <TopBarWhileInside />
          <div
            className="flex items-center gap-2 mt-40 px-8"
            id="breadCrumbsDivDesktop"
          >
            <p
              className="font-nunito cursor-pointer text-sm font-medium text-mecaDarkBlueBackgroundOverlay"
              onClick={() => router.push("/")}
            >
              Home
            </p>
            <MdChevronRight size={20} />
            <p className="font-nunito text-sm capitalize font-medium text-mecaGoBackArrow">
              {decodeURIComponent(searchWords)}
            </p>
          </div>
          <div
            className="mt-4 flex justify-between items-center px-8"
            id="laptopContent"
          >
            <p className="text-2xl capitalize text-mecaDarkBlueBackgroundOverlay font-bold font-nunito">
              {decodeURIComponent(searchWords)}
            </p>
            {data?.data?.content?.length > 0 && (
              <div className="flex gap-x-2 items-center" id="toggler/header">
                <p className="text-sm text-mecaDarkBlueBackgroundOverlay font-normal font-nunito">
                  Hide filters
                </p>
                <Switches onClick={handleToggleFilter} />
              </div>
            )}
          </div>
          <div
            className="mt-8 px-8 flex gap-x-4 justify-between"
            id="filterDivForDesktopContainer"
          >
            {data?.data?.content?.length > 0 && (
              <div
                className={`flex flex-col ${showFilter ? "w-[28%]" : "hidden"}`}
                id="filterSideBarContainer"
              >
                <p className="text-lg font-medium text-nunito text-mecaDarkBlueBackgroundOverlay">
                  Filter by
                </p>
                {filterData.map((data) => (
                  <div className="-ml-4" id="navDatum" key={data.id}>
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
            )}
            <div
              className="flex flex-wrap justify-between w-full"
              id="allItemsContainerDivDesktop"
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
                      "#095AD3",
                      "#095AD3",
                      "#095AD3",
                      "#095AD3",
                      "#095AD3",
                    ]}
                  />
                </div>
              ) : data?.data?.content?.length <= 0 ? (
                <div className="w-full flex justify-center items-center">
                  <p className="text-mecaDarkBlueBackgroundOverlay text-4xl font-nunito font-semibold">
                    No Product Found
                  </p>
                </div>
              ) : (
                data?.data?.content.map((item: ItemsDataProps) => (
                  <div
                    className="flex flex-col w-[30.4%] cursor-pointer"
                    key={item.id}
                    onClick={() => handleProductDescription(item.id)}
                  >
                    <div
                      className="w-full h-[194px] flex justify-center items-center bg-mecaSearchColor"
                      id="itemImage"
                    >
                      {item?.image ? (
                        <Image
                          src={item?.image}
                          alt="tractor image"
                          width={144}
                          height={106}
                        />
                      ) : null}
                    </div>
                    <div
                      className="w-full flex flex-col gap-y-4 mt-4"
                      id="itemContent"
                    >
                      <div className="flex justify-between items-center">
                        <TruncateText text={item.name} maxLength={50} />
                        <div
                          id="ratingContainerDesktop"
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
                        id="priceContainer"
                        className="flex items-center mb-4"
                      >
                        <p className="text-mecaDarkBlueBackgroundOverlay text-sm font-nunito font-bold text-center">
                          {formatAmount(Number(item.price))}
                        </p>
                      </div>
                      <div className="hidden md:flex justify-between items-center lg:hidden">
                        <TruncateText text={item.description} maxLength={25} />
                        <div
                          id="ratingContainerTab"
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
                ))
              )}
            </div>
          </div>
          <div id="footerDiv" className="mt-12">
            <Footer />
          </div>
        </div>
      </Suspense>
    </section>
  );
}
