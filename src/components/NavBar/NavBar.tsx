"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  MdExpandLess,
  MdExpandMore,
  MdMenu,
  MdOutlineShoppingCart,
  MdSearch,
  MdOutlineAccountCircle,
  MdLogout,
} from "react-icons/md";
import IconButton from "@mui/material/IconButton";
import DropdownPage from "./dropdown/page";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { JwtPayload as BaseJwtPayload } from "jsonwebtoken";
import * as JWT from "jwt-decode";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { clearUser } from "../../redux/features/users/userSlice";
import BrandPage from "./brand/page";
import { paths } from "../../path/paths";
import { setCart } from "../../redux/features/product/productSlice";
import { CartProduct } from "../../types/cart/product";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MecaGlobalSearch from "./MecaGlobalSearch";

import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";

const navData = [
  {
    id: 1,
    title: "home",
    icon: "",
    icon2: "",
    link: "/",
  },
  {
    id: 2,
    title: "categories",
    icon: <MdExpandMore size={18} />,
    icon2: <MdExpandLess size={18} className="text-mecaBluePrimaryColor" />,
    link: "",
    dropdownComponent: <DropdownPage closeDropdown={() => {}} />,
  },
  {
    id: 3,
    title: "brands",
    icon: <MdExpandMore size={18} />,
    icon2: <MdExpandLess size={18} className="text-mecaBluePrimaryColor" />,
    link: "",
    dropdownComponent: <BrandPage closeDropdown={() => {}} />,
  },

  {
    id: 5,
    title: "vendors",
    link: "",
  },
];

interface NavBarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface JwtPayload extends BaseJwtPayload {
  role?: string;
}
export default function NavBar({ open, setOpen }: NavBarProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [active, setActive] = useState<number | null>(1);

  const handleClick = (id: number) => {
    setActive(id);
  };
  const closeDropdown = () => {
    setActive(null);
  };

  const { cart } = useAppSelector((state) => state.product);
  let saveCartItems: any;

  if (typeof window !== "undefined") {
    saveCartItems = JSON.parse(
      localStorage.getItem("savedCartItems") as string
    ) as CartProduct[];
  }

  useEffect(() => {
    if (cart.length === 0 && saveCartItems && saveCartItems.length > 0) {
      dispatch(setCart(saveCartItems));
    }
  }, [cart, saveCartItems]);

  const handleStartShopping = () => {
    router.push(paths.toSignUp());
  };
  const handleLogin = () => {
    router.push(paths.toLogin());
  };

  const handleDashboard = () => {
    router.push(paths.toDashboard());
  };
  const [toggleProfile, setToggleProfile] = useState(false);
  const [tokens, setTokens] = useState("");

  // const dropdownRef = useRef<HTMLDivElement | null>(null);
  const profile = (event: React.MouseEvent<HTMLButtonElement>) => {
    setToggleProfile((prev) => !prev);
    setAnchorEl(event.currentTarget);
  };
  let decoded: JwtPayload | null = null;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTokens((sessionStorage.getItem("token") as string | null) ?? "");
    }
  }, []);
  try {
    if (tokens && tokens.split(".").length === 3) {
      decoded = JWT.jwtDecode(tokens);
    }
  } catch (error) {
    console.error("Failed to decode token:", error);
  }

  const name = decoded?.given_name;

  const logOut = () => {
    sessionStorage.clear();
    sessionStorage.removeItem("userDetails");
    dispatch(clearUser());
    router.push(paths.toLogin());
  };

  useEffect(() => setActive(1), []);
  useEffect(() => {
    if (active === null) {
      setActive(1);
    }
  }, [active]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openNavbar = Boolean(anchorEl);
  const handleNavbarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className="w-full bg-white relative" id="navbarContainer">
      {/* mobile and tab */}
      <div
        className="w-full h-[60px] border-b-2 z-50 border-b-mecaBottomBorder px-4 flex justify-between items-center lg:hidden"
        id="contentContainer"
      >
        <p
          className="text-mecaActiveIconsNavColor text-xl font-nunito font-bold cursor-pointer"
          onClick={() => router.push(paths.toHome())}
        >
          e-meca
        </p>
        <div className="flex items-center gap-x-2" id="menuSearchCart">
          <MdSearch size={18} />
          <Link href={paths.toCart()}>
            <div
              className="w-[49px] h-[28px] flex items-center gap-x-2 bg-mecaActiveBackgroundNavColor border border-bg-mecaCartColor rounded-full px-1"
              id="textCartMobTab"
            >
              <MdOutlineShoppingCart
                size={18}
                className="text-mecaBluePrimaryColor"
              />
              <p className="text-mecaBluePrimaryColor text-sm font-nunito font-semibold">
                {cart?.length || 0}
              </p>
            </div>
          </Link>
          <div
            id="mobileMenuBtn"
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          >
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
            <p
              className="text-mecaActiveIconsNavColor text-3xl font-nunito font-bold cursor-pointer"
              onClick={() => router.push(paths.toHome())}
            >
              e-meca
            </p>
          </div>
          <div
            className="flex-grow flex justify-center items-center gap-x-2 relative"
            id="searchDesktop"
          >
            <div className="relative w-full max-w-[580px]">
              <MecaGlobalSearch />
            </div>
          </div>
          <div
            className="w-[28%] h-8 flex justify-end items-center gap-x-2"
            id="cartDesktop"
          >
            <Link href={paths.toCart()}>
              <div
                className="w-[49px] h-[28px]  flex items-center gap-x-2 bg-mecaActiveBackgroundNavColor border border-bg-mecaCartColor rounded-full px-1 cursor-pointer"
                id="textCart"
              >
                <MdOutlineShoppingCart
                  size={18}
                  className="text-mecaBluePrimaryColor"
                />
                <p className="text-mecaBluePrimaryColor text-sm font-nunito font-semibold">
                  {cart?.length || 0}
                </p>
              </div>
            </Link>
            <div className="w-full flex items-center h-full">
              {!tokens ? (
                <div className="w-full flex justify-end items-center h-full gap-4">
                  <button
                    type="button"
                    className="w-[28%] xl:w-[38%] h-full border border-mecaBluePrimaryColor bg-white text-mecaBluePrimaryColor text-[12px] xl:text-sm font-nunito font-semibold rounded-full"
                    id="startShoppingBtnMainNavBar"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    className="w-[75%] xl:w-[52%] h-full bg-mecaBluePrimaryColor text-white text-[12px] xl:text-sm font-nunito font-semibold rounded-full"
                    id="startShoppingBtn"
                    onClick={handleStartShopping}
                  >
                    Create an account
                  </button>
                </div>
              ) : (
                <div className="">
                  <Button
                    id="fadebutton"
                    aria-controls={openNavbar ? "fade-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openNavbar ? "true" : undefined}
                    onClick={handleNavbarClick}
                  >
                    <div className="flex gap-x-2">
                      <div className="">
                        <p className="mt-1 capitalize  text-mecaDarkBlueBackgroundOverlay text-base font-medium">
                          Hi, {name}
                        </p>
                      </div>
                      <div className="">
                        {openNavbar ? (
                          <MdExpandLess className="text-mecaGoBackArrow w-5 h-5 mt-1.5" />
                        ) : (
                          <MdExpandMore className="text-mecaGoBackArrow w-5 h-5 mt-1.5" />
                        )}
                      </div>
                    </div>
                  </Button>
                </div>
              )}
              <Menu
                id="fade-menu"
                MenuListProps={{
                  "aria-labelledby": "fade-button",
                }}
                className="z-[2000]"
                anchorEl={anchorEl}
                open={openNavbar}
                onClose={handleClose}
              >
                <button
                  id="profileBtn"
                  onClick={handleClose}
                  className="flex gap-2 w-44 m-auto  h-10 p-2 pt-3 hover:bg-mecaActiveBackgroundNavColor hover:text-mecaActiveIconsNavColor"
                >
                  <MdOutlineAccountCircle className="text-mecaProfileColor w-6 h-6 " />
                  <span
                    className="w-24 h-6 flex gap-1 font-normal text-base text-mecaDarkBlueBackgroundOverlay hover:text-mecaActiveIconsNavColor"
                    onClick={handleDashboard}
                  >
                    <span>My</span>
                    <span>Dashboard</span>
                  </span>
                </button>

                <div className="mt-1">
                  <button
                    onClick={handleClose}
                    className="flex gap-2 m-auto w-44 h-10 p-2 pt-3 hover:bg-mecaActiveBackgroundNavColor hover:text-mecaActiveIconsNavColor"
                  >
                    <MdLogout className="text-mecaProfileColor w-6 h-6 " />
                    <span
                      className="h-6 font-normal text-base text-mecaDarkBlueBackgroundOverlay hover:text-mecaActiveIconsNavColor"
                      onClick={logOut}
                    >
                      Logout
                    </span>
                  </button>
                </div>
              </Menu>
            </div>
          </div>
        </div>
      </div>
      <div
        className="hidden w-full h-20 lg:flex justify-center items-center"
        id="navigationData"
      >
        {navData.map((item) => (
          <div
            className={`w-[110px] h-8 flex justify-center items-center px-3 cursor-pointer ${
              active === item.id ? "bg-mecaActiveBackgroundNavColor" : ""
            } rounded-full`}
            id="navItem"
            onClick={() => handleClick(item.id)}
            key={item.id}
          >
            <p
              className={`${
                active === item.id
                  ? "text-mecaBluePrimaryColor"
                  : "text-mecaDarkBlueBackgroundOverlay"
              } text-sm font-nunito font-semibold capitalize`}
              onClick={() => router.push(item.link)}
            >
              {item.title}
            </p>
            <div>
              {item.id === active ? (
                <p>{item.icon2}</p>
              ) : (
                <p className="text-mecaGoBackArrow">{item.icon}</p>
              )}
            </div>
          </div>
        ))}

        {navData.map(
          (item) =>
            active === item.id && (
              <div
                onClick={closeDropdown}
                className="flex justify-center"
                key={item.id}
              >
                <div className="absolute left-96 top-40 z-50">
                  {item.dropdownComponent &&
                    React.cloneElement(item.dropdownComponent, {
                      // closeDropdown,
                    })}
                </div>
              </div>
            )
        )}
      </div>
    </nav>
  );
}
