"use client";
import { useEffect, useState } from "react";
import {
  MdChevronRight,
  MdExpandLess,
  MdExpandMore,
  MdMenu,
  MdOutlineShoppingCart,
  MdSearch,
} from "react-icons/md";
import IconButton from "@mui/material/IconButton";
import DropdownPage from "./dropdown/page";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@mui/material/Button";

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
    icon: <MdExpandMore size={18} className="text-mecaGoBackArrow" />,
    icon2: <MdExpandLess size={18} className="text-mecaBluePrimaryColor" />,
    link: "",
  },
  {
    id: 3,
    title: "brands",
    icon: <MdExpandMore size={18} className="text-mecaGoBackArrow" />,
    icon2: <MdExpandLess size={18} className="text-mecaBluePrimaryColor" />,
    link: "",
  },
  {
    id: 4,
    title: "mechanics",
    icon: <MdExpandMore size={18} className="text-mecaGoBackArrow" />,
    icon2: <MdExpandLess size={18} className="text-mecaBluePrimaryColor" />,
    link: "",
  },
  {
    id: 5,
    title: "vendors",
    icon: <MdExpandMore size={18} className="text-mecaGoBackArrow" />,
    icon2: <MdExpandLess size={18} className="text-mecaBluePrimaryColor" />,
    link: "",
  },
  {
    id: 6,
    title: "listings",
    icon: <MdExpandMore size={18} className="text-mecaGoBackArrow" />,
    icon2: <MdExpandLess size={18} className="text-mecaBluePrimaryColor" />,
    link: "",
  },
  {
    id: 7,
    title: "advertise",
    icon: <MdExpandMore size={18} className="text-mecaGoBackArrow" />,
    icon2: <MdExpandLess size={18} className="text-mecaBluePrimaryColor" />,
    link: "",
  },
];

interface NavBarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
export default function NavBar({ open, setOpen }: NavBarProps) {
  const [active, setActive] = useState(1);
  const handleClick = (id: number) => {
    setActive(id);
  };

  const router = useRouter();
  const handleStartShopping = () => {
    router.push("/signup");
  };
  const [isCategoryOptionOpened, setIsCategoryOptionOpen] = useState(false);

  const toggle = () => {
    setIsCategoryOptionOpen(!isCategoryOptionOpened);
  };

  const [mobileOpen, setMobileOpen] = useState(false);
  const handleMobile = () => {
    setMobileOpen(!mobileOpen);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const routs = (e: any) => {
    e.preventDefault();
    router.push("../../../components/addtoCart/page");
  };

  useEffect(() => setActive(1), []);
  return (
    <nav className="w-full bg-white" id="navbarContainer">
      {/* mobile and tab */}
      <div
        className="w-full h-[60px] border-b-2 z-50 border-b-mecaBottomBorder px-4 flex justify-between items-center lg:hidden"
        id="contentContainer"
      >
        <p
          className="text-mecaActiveIconsNavColor text-xl font-nunito font-bold cursor-pointer"
          onClick={() => router.push("/")}
        >
          e-meca
        </p>
        <div className="flex items-center gap-x-2" id="menuSearchCart">
          <MdSearch size={18} />
          <Link href="/addtoCart">
            <div
              className="w-[49px] h-[28px] flex items-center gap-x-2 bg-mecaActiveBackgroundNavColor border border-bg-mecaCartColor rounded-full px-1"
              id="textCartMobTab"
            >
              <MdOutlineShoppingCart
                size={18}
                className="text-mecaBluePrimaryColor"
              />
              <p className="text-mecaBluePrimaryColor text-sm font-nunito font-semibold">
                0
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
              type="button"
              className="w-[40%] h-full bg-mecaBluePrimaryColor text-white text-[12px] xl:text-sm font-nunito font-semibold rounded-full"
              id="startShoppingBtn"
              onClick={handleStartShopping}
            >
              Start shopping
            </button>
            <p className="text-sm font-nunito font-medium">Need Help?</p>
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
            <div onClick={item.id === 2 ? toggle : () => {}}>
              {!isCategoryOptionOpened ? item.icon : item.icon2}
            </div>
          </div>
        ))}
      </div>

      {isCategoryOptionOpened && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
          onClick={toggle}
        >
          <div className="absolute z-50">
            <DropdownPage />
          </div>
        </div>
      )}
    </nav>
  );
}
