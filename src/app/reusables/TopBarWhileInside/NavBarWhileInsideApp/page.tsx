"use client";
import React, { useEffect, useState } from "react";
import {
  MdExpandLess,
  MdExpandMore,
  MdLogout,
  MdMenu,
  MdOutlineAccountCircle,
  MdOutlineShoppingCart,
  MdSearch,
} from "react-icons/md";
import { JwtPayload as BaseJwtPayload } from "jsonwebtoken";
import * as JWT from "jwt-decode";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { clearUser } from "../../../../redux/features/users/userSlice";
import MobileNav from "../../../../components/MobileNav/mobileNavbarList";
import NavBar from "../../../../components/NavBar/NavBar";
import { paths } from "../../../../path/paths";
import { Button, Menu } from "@mui/material";
import MecaGlobalSearch from "../../../../components/NavBar/MecaGlobalSearch";

interface JwtPayload extends BaseJwtPayload {
  role?: string;
}
export default function NavBarWhileInsideApp() {
  const router = useRouter();
  const handleStartShopping = () => {
    router.push(paths.toSignUp());
  };
  const handleLogin = () => {
    router.push(paths.toLogin());
  };
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const { cart } = useAppSelector((state) => state.product);

  const [toggleProfile, setToggleProfile] = useState(false);
  const [openNavOptions, setOpenNavOptions] = useState(false);
  const [tokens, setTokens] = useState("");
  const profile = () => {
    setToggleProfile(!toggleProfile);
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      setTokens((sessionStorage.getItem("token") as string | null) ?? "");
    }
  }, []);

  let decoded: JwtPayload | null = null;
  try {
    if (
      tokens &&
      typeof tokens === "string" &&
      tokens.split(".").length === 3
    ) {
      decoded = JWT.jwtDecode(tokens);
    }
  } catch (error) {
    console.error("Failed to decode token:", error);
  }

  const handleDashboard = () => {
    router.push(paths.toBuyerDashboard());
  };
  const logOut = () => {
    sessionStorage.clear();
    sessionStorage.removeItem("userDetails");
    dispatch(clearUser());
    router.push(paths.toLogin());
  };
  const name = decoded?.given_name;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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
      <div className="flex lg:hidden">
        <NavBar open={openNavOptions} setOpen={setOpenNavOptions} />
      </div>
      {/* desktop */}
      <div
        className="hidden lg:flex z-[2000] flex-col border-b-2 border-b-mecaBottomBorder"
        id="menuContainerDesktop"
      >
        <div className={"w-[95%] m-auto"}>
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
              className="w-[28%] h-8 flex justify-end items-center gap-x-4"
              id="cartDesktop"
            >
              <Link href={paths.toCart()}>
                <div
                  className="w-[49px] h-[28px] ml-8 flex items-center gap-x-2 bg-mecaActiveBackgroundNavColor border border-bg-mecaCartColor rounded-full px-1 cursor-pointer"
                  id="textCart"
                >
                  <MdOutlineShoppingCart
                    size={18}
                    className="text-mecaBluePrimaryColor"
                    // onClick={routs}
                  />
                  <p className="text-mecaBluePrimaryColor text-sm font-nunito font-semibold">
                    {cart.length}
                  </p>
                </div>
              </Link>

              {/* <div className="w-full flex items-center h-full" id={"newMe"}>
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
                      className="w-[58%] xl:w-[52%] h-full bg-mecaBluePrimaryColor text-white text-[12px] xl:text-sm font-nunito font-semibold rounded-full"
                      id="startShoppingBtn"
                      onClick={handleStartShopping}
                    >
                      Create an account
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={profile}
                    className="flex gap-2 "
                    type="button"
                    id="profileBtnMainNav"
                  >
                    <MdOutlineAccountCircle className="w-8 h-8 text-mecaProfileColor" />
                    <p className="mt-2 font-normal text-mecaDarkBlueBackgroundOverlay text-sm">
                      Hi, {name}
                    </p>
                    <MdExpandLess className="text-mecaGoBackArrow w-5 h-5 mt-2" />
                  </button>
                )}
              </div> */}
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
          {toggleProfile && (
            <div
              className="w-52 h-24 rounded-lg p-1 bg-white absolute top-24 right-6"
              style={{ boxShadow: "0px 2px 8px 0px #63636333" }}
            >
              <button
                onClick={profile}
                className="flex gap-2 w-48 m-auto  h-10 p-2 pt-3 hover:bg-mecaActiveBackgroundNavColor hover:text-mecaActiveIconsNavColor"
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
                  onClick={profile}
                  className="flex gap-2 m-auto w-48 h-10 p-2 pt-3 hover:bg-mecaActiveBackgroundNavColor hover:text-mecaActiveIconsNavColor"
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
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
