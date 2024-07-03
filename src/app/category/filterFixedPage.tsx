"use client";
import { MdChevronRight, MdExpandMore } from "react-icons/md";
import part from "../../assets/images/parts.png";
import { useEffect, useState } from "react";
import { Checkbox, Radio } from "@mui/material";
import Switches from "../../components/switch/Switches";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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

const FilterFixedPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const handleOpeningFilterButton = () => {
    setIsFilterOpen(!isFilterOpen);
    isFilterOpen, "isFilterOpen";
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

  return (
    <div className="z-50 w-full h-28 bg-red-400">
      <div
        className="flex items-center gap-2 mt-24 px-8"
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
    </div>
  );
};

export default FilterFixedPage;
