"use client";
import {
  MdChevronRight,
  MdClear,
  MdExpandMore,
  MdMenu,
  MdOutlineShoppingCart,
  MdSearch,
} from "react-icons/md";
import Header from "../../app/reusables/Header/page";
import NavBar from "../../app/reusables/NavBar/page";
import Link from "next/link";
import { useEffect, useState } from "react";
// import MobileDropdownViewPage from "@/pages/page";
import MobileDropdownViewPage from "../page";
import { IconButton } from "@mui/material";

const mobileNavData = [
  {
    id: 1,
    title: "home",
    icon: "",
  },
  {
    id: 2,
    title: "categories",
    icon1: <MdExpandMore size={24} className="text-mecaGoBackArrow" />,
    icon2: <MdChevronRight size={24} className="text-mecaGoBackArrow" />,
  },
  {
    id: 3,
    title: "brands",
    icon: <MdExpandMore size={24} className="text-mecaGoBackArrow" />,
    icon2: <MdChevronRight size={24} className="text-mecaGoBackArrow" />,
  },
  {
    id: 4,
    title: "mechanics",
    icon: <MdExpandMore size={24} className="text-mecaGoBackArrow" />,
    icon2: <MdChevronRight size={24} className="text-mecaGoBackArrow" />,
  },
  {
    id: 5,
    title: "vendors",
    icon: <MdExpandMore size={24} className="text-mecaGoBackArrow" />,
    icon2: <MdChevronRight size={24} className="text-mecaGoBackArrow" />,
  },
  {
    id: 6,
    title: "listings",
    icon: <MdExpandMore size={24} className="text-mecaGoBackArrow" />,
    icon2: <MdChevronRight size={24} className="text-mecaGoBackArrow" />,
  },
  {
    id: 7,
    title: "advertise",
    icon: <MdExpandMore size={24} className="text-mecaGoBackArrow" />,
    icon2: <MdChevronRight size={24} className="text-mecaGoBackArrow" />,
  },
];

const TopBar = () => {
  const [open, setOpen] = useState(false);
  const handleNav = () => {
    setOpen(!open);
  };

  useEffect(() => setOpen(true), []);
  return (
    <section className="relative w-full" id="topBar">
      {open ? (
        <>
          <Header />
          <NavBar open={open} setOpen={setOpen} />
        </>
      ) : (
        <div className="w-full h-screen">
          <div
            className="w-full h-[60px] border-b-2 border-b-mecaBottomBorder px-4 flex justify-between items-center lg:hidden"
            id="topBarContentContainer"
          >
            <p className="text-mecaActiveIconsNavColor text-xl font-nunito font-bold">
              e-meca
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
            className="flex flex-col gap-y-8
           px-4 mt-4"
            id="navDataMenuWhenClosed"
          >
            {mobileNavData.map((data, id) => (
              <div
                className="flex justify-between items-center"
                id="navDatum"
                key={data.id}
              >
                <p className="text-mecaGoBackText text-lg capitalize">
                  {data.title}
                </p>
                <Link
                  href={`${data.id === 2 ? "../page" : ""}`}
                  // onClick={() => data.id === 2 && <MobileDropdownViewPage />}
                  className="flex"
                  id="mdMenu"
                >
                  {data.icon2}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default TopBar;
