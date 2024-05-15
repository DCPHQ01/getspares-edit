"use client";
import { useEffect, useState } from "react";
import {
  MdExpandLess,
  MdExpandMore,
  MdMenu,
  MdOutlineShoppingCart,
  MdSearch,
} from "react-icons/md";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NavBarWhileInsideApp() {
  const router = useRouter();
  const handleStartShopping = () => {
    router.push("/signup");
  };

  return (
    <nav className="w-full bg-white" id="navbarContainer">
      {/* mobile and tab */}

      {/* desktop */}
      <div
        className="hidden lg:flex flex-col border-b-2 border-b-mecaBottomBorder px-10"
        id="menuContainerDesktop"
      >
        <div
          className="w-full h-[83px] flex justify-between items-center"
          id="desktopNavContentContainer"
        >
          <div className="w-[20%]" id="mecaLogoDesktop">
            <p
              className="text-mecaActiveIconsNavColor text-3xl font-nunito font-bold cursor-pointer"
              onClick={() => router.push("/")}
            >
              e-meca
            </p>
          </div>
          <div
            className="w-1/3 flex items-center gap-x-2 relative"
            id="searchDesktop"
          >
            <MdSearch
              size={24}
              className="absolute left-1 text-mecaGoBackArrow"
            />
            <input
              id="inputSearchDesktop"
              placeholder="Search for anything"
              className="bg-mecaSearchColor w-[580px] h-[44px] rounded-full px-9 outline-none"
            />
          </div>
          <div
            className="w-[28%] h-8 flex justify-end items-center gap-x-4"
            id="cartDesktop"
          >
            <Link href="/addtoCart">
              <div
                className="w-[49px] h-[28px] flex items-center gap-x-2 bg-mecaActiveBackgroundNavColor border border-bg-mecaCartColor rounded-full px-1 cursor-pointer"
                id="textCart"
              >
                <MdOutlineShoppingCart
                  size={18}
                  className="text-mecaBluePrimaryColor"
                  // onClick={routs}
                />
                <p className="text-mecaBluePrimaryColor text-sm font-nunito font-semibold">
                  0
                </p>
              </div>
            </Link>

            <button
              type="button"
              className="w-[20%] h-full border border-mecaBluePrimaryColor bg-white text-mecaBluePrimaryColor text-[12px] xl:text-sm font-nunito font-semibold rounded-full"
              id="startShoppingBtn"
              onClick={handleStartShopping}
            >
              Login
            </button>
            <button
              type="button"
              className="w-[40%] h-full bg-mecaBluePrimaryColor text-white text-[12px] xl:text-sm font-nunito font-semibold rounded-full"
              id="startShoppingBtn"
              onClick={handleStartShopping}
            >
              Create an account
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
