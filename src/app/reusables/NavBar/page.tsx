"use client";
import { useEffect, useState } from "react";
import {
  MdExpandMore,
  MdMenu,
  MdOutlineShoppingCart,
  MdSearch,
} from "react-icons/md";
import IconButton from "@mui/material/IconButton";
import DropdownPage from "./dropdown/page";

const navData = [
  {
    id: 1,
    title: "home",
    icon: "",
  },
  {
    id: 2,
    title: "categories",
    icon: <MdExpandMore size={18} />,
  },
  {
    id: 3,
    title: "brands",
    icon: "",
  },
  {
    id: 4,
    title: "mechanics",
    icon: "",
  },
  {
    id: 5,
    title: "vendors",
    icon: "",
  },
  {
    id: 6,
    title: "listings",
    icon: "",
  },
  {
    id: 7,
    title: "advertise",
    icon: "",
  },
];
export const NavBar = ({ defaultState = false }) => {
  const [active, setActive] = useState(1);
  const handleClick = (id: number) => {
    setActive(id);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [isOpen, setIsOpen] = useState(defaultState);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => setActive(1), []);
  return (
    <nav className="w-full" id="navbarContainer">
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
          <MdMenu size={18} />
        </div>
      </div>
      {/* desktop */}
      <div
        className="hidden lg:flex flex-col border-b-2 border-b-mecaBottomBorder px-5"
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
            <div
              className="w-[49px] h-[28px] flex items-center gap-x-2 bg-mecaActiveBackgroundNavColor border border-bg-mecaCartColor rounded-full px-1 cursor-pointer"
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
            <button className="w-[40%] h-full bg-mecaBluePrimaryColor text-white text-[12px] xl:text-sm font-nunito font-semibold rounded-full">
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
          >
            <p
              className={`${
                active === item.id
                  ? "text-mecaBluePrimaryColor"
                  : "text-mecaDarkBlueBackgroundOverlay"
              } text-sm font-nunito font-semibold capitalize`}
            >
              {item.title}
            </p>
            <IconButton
              onClick={toggle}
              size="small"
              // sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              {item.icon}
            </IconButton>
          </div>
        ))}
      </div>
      {isOpen && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "-10px",
          }}
          onClick={toggle}
        >
          <div className="dropdownStyle">
            <DropdownPage />
          </div>
        </div>
      )}
    </nav>
  );
};
