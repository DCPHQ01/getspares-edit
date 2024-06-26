"use client";
import { useEffect, useState } from "react";
import {
  MdChevronRight,
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
import Button from "@mui/material/Button";
import { JwtPayload as BaseJwtPayload } from "jsonwebtoken";
import * as JWT from "jwt-decode";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { clearUser } from "../../redux/features/users/userSlice";
import BrandPage from "./brand/page";
import { paths } from "../../path/paths";
import { setCart } from "../../redux/features/product/productSlice";
import { CartProduct } from "../../types/cart/product";

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
    dropdownComponent: <DropdownPage />,
  },
  {
    id: 3,
    title: "brands",
    icon: <MdExpandMore size={18} />,
    icon2: <MdExpandLess size={18} className="text-mecaBluePrimaryColor" />,
    link: "",
    dropdownComponent: <BrandPage />,
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
  const [savedCardItems, setSavedCartItems] = useState<CartProduct[]>([]);

  const { cart } = useAppSelector((state) => state.product);
  useEffect(() => {
    const saveCartItems = JSON.parse(
      localStorage.getItem("savedCartItems") as string
    ) as CartProduct[];
    if (saveCartItems) {
      setSavedCartItems(saveCartItems);
    }
  }, []);

  useEffect(() => {
    if (cart.length === 0 && savedCardItems) {
      dispatch(setCart(savedCardItems));
    }
  }, [cart, savedCardItems]);

  const handleStartShopping = () => {
    router.push(paths.toSignUp());
  };
  const handleLogin = () => {
    router.push(paths.toLogin());
  };
  const [isCategoryOptionOpened, setIsCategoryOptionOpen] = useState(false);

  const toggle = (id: number) => {
    if (id === active) {
      setIsCategoryOptionOpen((prev) => !prev);
      console.log("category ", isCategoryOptionOpened);
    }
    return isCategoryOptionOpened;
  };
  const handleDashboard = () => {
    router.push(paths.toDashboard());
  };
  const [toggleProfile, setToggleProfile] = useState(false);
  const [tokens, setTokens] = useState("");
  const profile = () => {
    setToggleProfile(!toggleProfile);
  };
  let decoded: JwtPayload | null = null;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTokens((sessionStorage.getItem("token") as string | null) ?? "");
    }
  }, []);
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

  const dropDownClicked = () => {
    setActive(null);
  };

  const name = decoded?.given_name;

  const logOut = () => {
    sessionStorage.clear();
    sessionStorage.removeItem("userDetails");
    dispatch(clearUser());
    router.push(paths.toLogin());
  };

  useEffect(() => setActive(1), []);

  const [toggleCategory, setToggleCategory] = useState(false);
  const handleToggleCategory = () => {
    setToggleCategory(!toggleCategory);
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
              <MdSearch
                size={24}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mecaGoBackArrow"
              />
              <input
                id="inputSearchDesktop"
                placeholder="Search for anything"
                className="bg-mecaSearchColor w-full h-[44px] rounded-full pl-12 pr-4 outline-none"
              />
            </div>
          </div>
          <div
            className="w-[28%] h-8 flex justify-end items-center gap-x-2"
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
                  className="flex gap-2"
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

              {toggleProfile && (
                <div
                  className="w-52 h-24 rounded-lg p-1 bg-white absolute top-12 right-24 "
                  style={{ boxShadow: "0px 2px 8px 0px #63636333" }}
                >
                  <button
                    id="profileBtn"
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
              {isCategoryOptionOpened && item.id === active ? (
                <p>{item.icon2}</p>
              ) : (
                <p
                  className={`${
                    active === item.id
                      ? "text-mecaBluePrimaryColor"
                      : "text-mecaGoBackArrow"
                  }`}
                >
                  {item.icon}
                </p>
              )}
            </div>
          </div>
        ))}

        {navData.map(
          (item) =>
            active === item.id && (
              <div className="flex justify-center" key={item.id}>
                <div className="absolute left-96 top-40 z-50">
                  <div onClick={dropDownClicked}>{item.dropdownComponent}</div>
                </div>
              </div>
            )
        )}
      </div>
    </nav>
  );
}
