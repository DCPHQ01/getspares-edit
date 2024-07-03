"use client";
import { MdChevronRight, MdExpandMore } from "react-icons/md";
import part from "../../assets/images/parts.png";

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

const SideFilter = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const handleOpeningFilterButton = () => {
    setIsFilterOpen(!isFilterOpen);
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
    <div className="pl-8 h-full">
      {" "}
      <div>
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
    </div>
  );
};

export default SideFilter;
