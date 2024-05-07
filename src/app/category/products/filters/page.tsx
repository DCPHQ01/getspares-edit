"use client";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useEffect, useState } from "react";
import { MdClear, MdExpandMore } from "react-icons/md";

interface FilterProps {
  isFilterOpen: boolean;
  setIsFilterOpen: (value: boolean) => void;
}

const Filter: React.FC<FilterProps> = ({ isFilterOpen, setIsFilterOpen }) => {
  const [onPicked, setOnPicked] = useState(false);

  useEffect(() => {
    setIsFilterOpen(isFilterOpen);
  });

  const handlePicked = () => {
    setOnPicked(!onPicked);
  };
  const filterData = [
    {
      id: 1,
      title: "Shop by Brand",
      items: [
        {
          id: 1,
          title: "JCB Agriculture",
          icon: <Checkbox defaultChecked />,
        },
        {
          id: 2,
          title: "AGCO Challenger",
          icon: <Checkbox defaultChecked />,
        },
        {
          id: 3,
          title: "Deutz-Fahr",
          icon: <Checkbox defaultChecked />,
        },
        {
          id: 4,
          title: "Kuhn",
          icon: <Checkbox defaultChecked />,
        },
      ],
    },
    {
      id: 2,
      title: "Shop by Model",
      items: [
        {
          id: 1,
          title: "New",
          icon: <Checkbox defaultChecked />,
        },
        {
          id: 2,
          title: "Refurbished",
          icon: <Checkbox defaultChecked />,
        },
        {
          id: 3,
          title: "Not specified",
          icon: <Checkbox defaultChecked />,
        },
      ],
    },
    {
      id: 3,
      title: "Shop by Conditions",
      items: [
        {
          id: 1,
          title: "New",
          icon: <Checkbox defaultChecked />,
        },
        {
          id: 2,
          title: "Refurbished",
          icon: <Checkbox defaultChecked />,
        },
        {
          id: 3,
          title: "Not specified",
          icon: <Checkbox defaultChecked />,
        },
      ],
    },
    {
      id: 4,
      title: "Shop by Price",
      items: [
        {
          id: 1,
          title: "200,000",
          icon: <Radio value={"200000"} onChange={handlePicked} />,
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
  const handleNav = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <section className="w-full" id="filterContainer">
      <div className="w-full h-screen lg:hidden">
        <div
          className="w-full h-[60px] border-b-2 border-b-mecaBottomBorder px-4 flex justify-between items-center"
          id="topBarContentContainer"
        >
          <p className="text-mecaDarkBlueBackgroundOverlay text-xl font-nunito font-bold">
            Filter
          </p>
          <div className="flex" id="mdClear">
            <MdClear
              size={24}
              className="text-mecaGoBackArrow"
              onClick={handleNav}
            />
          </div>
        </div>
        <div
          className="flex flex-col
           mt-4"
          id="navDataMenuWhenClosed"
        >
          {filterData.map((data) => (
            <div className="" id="navDatum" key={data.id}>
              <Accordion className="w-full" style={{ boxShadow: "none" }}>
                <AccordionSummary
                  expandIcon={<MdExpandMore size={28} />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <p className="text-mecaGoBackText text-lg capitalize">
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
                          >
                            <FormControlLabel
                              control={item.icon}
                              label={`₦${item.title}`}
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
        </div>
      </div>
    </section>
  );
};
export default Filter;
