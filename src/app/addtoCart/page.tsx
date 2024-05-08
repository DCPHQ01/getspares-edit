"use client";
import { useState } from "react";
import {
  MdChevronRight,
  MdExpandMore,
  MdMenu,
  MdOutlineShoppingCart,
  MdSearch,
} from "react-icons/md";
import HeaderPage from "../reusables/Header/page";
import NavBar from "../reusables/NavBar/page";
import Link from "next/link";

const AddtoCartPage = () => {
  const [open, setOpen] = useState(false);
  const handleNav = () => {
    setOpen(!open);
  };
  return (
    <div>
      <div className="">
        <div className="">
          <HeaderPage />
        </div>

        <div className="">
          {/* mobile and tab */}
          <div
            className="w-full h-[60px] border-b-2 border-b-mecaBottomBorder px-4 flex justify-between items-center lg:hidden"
            id="contentContainer"
          >
            <p className="text-mecaActiveIconsNavColor text-xl font-nunito font-bold">
              e-meca
            </p>
            <div className="flex items-center gap-x-2" id="menuSearchCart">
              <MdSearch size={18} />
              <div
                className="w-[49px] h-[28px] flex items-center gap-x-2 bg-mecaActiveBackgroundNavColor border border-bg-mecaCartColor rounded-full px-1"
                id="textCart"
              >
                <MdOutlineShoppingCart
                  size={18}
                  className="text-mecaBluePrimaryColor"
                />
                <p className="text-mecaBluePrimaryColor text-sm font-nunito font-semibold">
                  0
                </p>
              </div>
              <div id="mobileMenuBtn" onClick={() => setOpen(!open)}>
                <MdMenu size={18} />
              </div>
            </div>
          </div>
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
                <p className="text-mecaActiveIconsNavColor text-3xl font-nunito font-bold">
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
                className="w-[28%] h-8 flex justify-end items-center gap-x-2"
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
                  className="w-[40%] h-full bg-mecaBluePrimaryColor text-white text-[12px] xl:text-sm font-nunito font-semibold rounded-full"
                  id="startShoppingBtn"
                >
                  Start shopping
                </button>
                <p className="text-sm font-nunito font-medium">Need Help?</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4">
        <div className="flex items-center gap-4 mt-6" id="breadCrumbsDiv">
          <p className="font-nunito text-sm font-medium text-mecaDarkBlueBackgroundOverlay">
            Home
          </p>
          <MdChevronRight size={20} />
          <p className="font-nunito text-sm font-medium text-mecaGoBackArrow">
            Shopping Cart
          </p>
        </div>
        <div className="">
          <h1 className="text-lg font-semibold font-nunito text-mecaDarkBlueBackgroundOverlay mt-6">
            Shopping Cart
          </h1>
        </div>
        <div className="">
         
        </div>
      </div>
    </div>
  );
};

export default AddtoCartPage;
