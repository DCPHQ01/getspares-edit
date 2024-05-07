"use client";

import { useEffect, useState } from "react";
import { MdChevronLeft, MdClear } from "react-icons/md";
import TopBar from "./TopBar/page";
import Link from "next/link";
// import NavBar from "@/app/reusables/NavBar/page";
import NavBar from "../app/reusables/NavBar/page";
import { Nunito_Sans } from "next/font/google";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito_sans",
  adjustFontFallback: false,
  display: "swap",
});

const MobileDropdownViewPage = () => {
  const [open, setOpen] = useState(false);
  const handleNav = () => {
    setOpen(!open);
  };
  useEffect(() => setOpen(true), []);

  return (
    <div className={nunito.className}>
      {open && (
        <div className="w-full h-screen " id="mobiledropviewcontainer1">
          <div
            className=" w-full h-[60px] border-b-2 border-b-mecaBottomBorder px-4 items-center lg:hidden "
            id="mobiledropviewcontainer2"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            {/* <div className="" id="mobiledropviewcontainer3"> */}
            <p
              className="text-mecaActiveIconsNavColor text-xl font-nunito font-bold"
              id="mobiledropviewcontainer4"
            >
              <MdChevronLeft /> <span>Category</span>
            </p>

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
          <hr id="mobiledropviewcontainer6" className="w-full"></hr>
          <div
            id="mobiledropviewcontainer7"
            className="gap-y-8
           px-4 mt-4"
          >
            <div
              id="mobiledropviewcontainer8"
              className=" p-16 leading-10 cursor-pointer "
              style={{
                flexDirection: "column",
                display: "flex",
                lineHeight: "3rem",
                color: "black",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              <a
                style={{
                  color: "black",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
                href=""
              >
                AC
              </a>
              <a
                style={{
                  color: "black",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
                href=""
              >
                Air Filters
              </a>
              <a
                style={{
                  color: "black",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
                href=""
              >
                Air Flow Meters
              </a>
              <a
                style={{
                  color: "black",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
                href=""
              >
                Alternators
              </a>
              <a
                style={{
                  color: "black",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
                href=""
              >
                Axles
              </a>
              <a
                style={{
                  color: "black",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
                href=""
              >
                Back Mirrors
              </a>
              <a
                style={{
                  color: "black",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
                href=""
              >
                Ball Joints
              </a>
              <a
                style={{
                  color: "black",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
                href=""
              >
                Batteries
              </a>
              <a
                style={{
                  color: "black",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
                href=""
              >
                Bonnets
              </a>
              <a
                style={{
                  color: "black",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
                href=""
              >
                Tractor Parts
              </a>
              <a
                style={{
                  color: "black",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
                href=""
              >
                Brakes
              </a>
              <a
                style={{
                  color: "black",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
                href=""
              >
                Bulldozer Parts
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileDropdownViewPage;
