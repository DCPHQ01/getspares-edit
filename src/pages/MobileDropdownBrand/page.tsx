"use client";

import { useEffect, useState } from "react";
import { MdChevronLeft, MdClear } from "react-icons/md";
import TopBar from "../TopBar/page";
import Link from "next/link";
// import NavBar from "@/app/reusables/NavBar/page";
import NavBar from "../../components/NavBar/NavBar";
import { Nunito_Sans } from "next/font/google";
// import MobileNav from "../../app/reusables/mobileNav/page";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito_sans",
  adjustFontFallback: false,
  display: "swap",
});

const categoryMobileScreen = [
  {
    id: 1,
    title: "Toyota",
  },
  {
    id: 2,
    title: "Benz",
  },

  {
    id: 3,
    title: "Peguot",
  },

  {
    id: 4,
    title: "Farari",
  },
  {
    id: 5,
    title: "Camry",
  },

  {
    id: 6,
    title: "Jeep",
  },

  {
    id: 7,
    title: "Truck",
  },

  {
    id: 8,
    title: "Viola",
  },

  {
    id: 9,
    title: "Bonnets",
  },

  {
    id: 10,
    title: "Tractor Parts",
  },

  {
    id: 11,
    title: "Brakes",
  },

  {
    id: 12,
    title: "Bulldozer Parts",
  },
];

const MobileDropdownBrandPage = () => {
  const [open, setOpen] = useState(false);
  const handleNav = () => {
    setOpen(!open);
  };
  useEffect(() => setOpen(true), []);

  return (
    <div className={nunito.className}>
      {open && (
        <div className="w-full h-screen bg-white" id="mobiledropviewcontainer1">
          <div
            className="w-full h-[60px] border-b-2 border-b-mecaBottomBorder px-4 items-center lg:hidden "
            id="mobiledropviewcontainer2"
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {/* <div className="" id="mobiledropviewcontainer3"> */}
            <div
              className="text-xl font-nunito font-bold"
              id="mobiledropviewcontainer4"
              style={{ display: "flex", gap: "20px" }}
            >
              <div className="">
                <MdChevronLeft />
              </div>

              <span> Brand</span>
            </div>

            {/* <Link href="../app/reusables/NavBar/page"> */}
            <MdClear
              onClick={handleNav}
              id="mobiledropviewcontainer5"
              size={20}
              className="text-mecaGoBackArrow"
              style={{ marginTop: "15px" }}
            />
            {/* </Link> */}
            {/* </div> */}
          </div>
          <hr id="mobiledropviewcontainer6" className=""></hr>
          <div
            id="mobiledropviewcontainer7"
            className="gap-y-8
           px-4 mt-4"
          >
            <div
              id="mobiledropviewcontainer8"
              className=" leading-10 cursor-pointer "
              style={{
                flexDirection: "column",
                display: "flex",
                lineHeight: "3rem",
                color: "black",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              {categoryMobileScreen.map((cartMob) => (
                <div className="" key={cartMob.id}>
                  <a
                    style={{
                      color: "black",
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                    href=""
                  >
                    {cartMob.title}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileDropdownBrandPage;
