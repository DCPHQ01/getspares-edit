"use client";
import React, { useState } from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import featuredicons from "../../assets/images/Featuredicon.svg";

import {
  MdClose,
  MdMenu,
  MdBusinessCenter,
  MdCategory,
  MdDashboard,
  MdInventory2,
  MdLocalPolice,
  MdLogout,
  MdPersonPin,
  MdShoppingCart,
  MdYard,
} from "react-icons/md";

import { useAppDispatch } from "../../redux/hooks";
import { dashboardSlice } from "../../redux/features/dashboard/dashboardSlice";
import { clearUser, setUser } from "../../redux/features/users/userSlice";
import { useRouter } from "next/navigation";
// import { roles, sidePanel, userRole } from "../../utils/utils";
import { roles } from "../dashboard/components/utils/utils";

import { useUserRole } from "../hooks/useUserRole";
import { paths } from "../../path/paths";
import withAuth from "../withAuth";
import VendorMobilePage from "./actors/vendoradmin/vendorMobile/page";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 250,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "20px",
  p: 2,
};

function Page() {
  const [activeButton, setActiveButton] = useState<number | null>(0);
  const [bottomActiveBtn, setBottomActiveButton] = useState<number | null>(
    null
  );
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [vendorMobileOpen, setVendorMobileOpen] = useState(false);

  const dispatch = useAppDispatch();

  const role = useUserRole();

  const router = useRouter();

  const logOut = () => {
    dispatch(clearUser());
    router.push(paths.toHome());
  };

  const profileBtn = () => {
    router.push("/dashboard/profile");
    setActiveButton(null);
    setBottomActiveButton(0);
  };

  const buttons = [
    {
      icon: <MdDashboard />,
      title: "Overview",
      size: 18,
      // link: `${handleDynamicRoutingByRoles}/overview`,
      link: `${
        role === "MECA_ADMIN" ? "/admin/overview" : "/dashboard/overview"
      } `,
      // panel: sidePanel.OVERVIEW,
      role: [roles.MECA_ADMIN, roles.VENDOR_ADMIN, roles.AGENTS, roles.BUYER],
    },
    {
      icon: <MdYard />,
      title: "Vendors",
      size: 18,
      link: "/admin/vendor",
      // panel: sidePanel.VENDORS,
      role: [roles.MECA_ADMIN, roles.AGENTS],
    },
    {
      icon: <MdLocalPolice />,
      title: "Agents",
      size: 18,
      link: `${role === "MECA_ADMIN" ? "/admin/agents" : "/dashboard/agents"} `,
      // panel: sidePanel.AGENTS,
      role: [roles.MECA_ADMIN, roles.VENDOR_ADMIN],
    },
    {
      icon: <MdBusinessCenter />,
      title: "Buyers",
      size: 18,
      link: "/admin/buyers",
      // panel: sidePanel.BUYERS,
      role: [roles.MECA_ADMIN],
    },
    {
      icon: <MdBusinessCenter />,
      title: "Orders",
      size: 18,
      link: "dashboard/order",
      // panel: sidePanel.ORDERS,
      role: [roles.VENDOR_ADMIN, roles.AGENTS, roles.BUYER],
    },
    {
      icon: <MdShoppingCart />,
      title: "Cart",
      size: 18,
      link: "/dashboard/cart",
      // panel: sidePanel.CART,
      role: [roles.BUYER],
    },
    {
      icon: <MdInventory2 />,
      title: "Inventory",
      size: 18,
      link: `${
        role === "MECA_ADMIN" ? "/admin/inventory" : "/dashboard/inventory"
      } `,
      // panel: sidePanel.INVENTORY,
      role: [roles.MECA_ADMIN, roles.VENDOR_ADMIN],
    },
    {
      icon: <MdCategory />,
      title: "Category",
      size: 18,
      link: `${
        role === "MECA_ADMIN" ? "/admin/category" : "/dashboard/category"
      }`,
      // panel: sidePanel.CATEGORY,
      role: [roles.MECA_ADMIN],
    },
  ];

  const bottomButton = [
    {
      icon: <MdPersonPin />,
      title: "Profile",
      size: 18,
      onClick: profileBtn,
    },
    {
      icon: <MdLogout />,
      title: "Logout",
      size: 18,
      onClick: handleOpen,
    },
  ];

  const logoutCompletely = () => {
    sessionStorage.clear();
    sessionStorage.removeItem("userDetails");
    dispatch(setUser({}));
    router.push("/login");
  };

  const filteredButtons = buttons.filter((button) =>
    button.role.includes(role)
  );
  const [mecaMobileOpen, setMecaMobileOpen] = useState(false);

  const handleVendorMobileOpen = () => {
    setVendorMobileOpen(!vendorMobileOpen);
  };
  return (
    <div className="">
      {/* desktop */}
      <div className={`hidden lg:flex flex-col`}>
        {/* <Sidepanel /> */}
        <div
          className={`flex-1 my-[3.25rem] ml-[17.5rem] pl-[1.375rem] mr-[2.125rem]`}
        >
          {/* <SidePanelButton /> */}
        </div>
      </div>

      {/* mobile */}
      <div className="lg:hidden w-full" id="contentContainerAddToCartMobile">
        <div className="w-[100%] fixed top-0">
          <div style={{ width: "100%" }}>
            <div>
              <div className="">
                <div className="bg-white z-50">
                  <div
                    className="w-full h-[60px] border-b-2 border-b-mecaBottomBorder px-4 flex justify-between items-center lg:hidden z-50 "
                    id="contentContainer"
                  >
                    <p
                      className="text-mecaActiveIconsNavColor text-xl font-nunito font-bold cursor-pointer"
                      onClick={() => router.push(paths.toHome())}
                    >
                      e-meca
                    </p>

                    <div onClick={handleVendorMobileOpen} id="mobileMenuBtn">
                      <MdMenu size={18} className="cursor-pointer" />
                    </div>
                  </div>

                  {vendorMobileOpen && (
                    <div
                      onClick={handleVendorMobileOpen}
                      className="absolute z-[1000] top-0 bg-white w-[100%] h-[100vh] "
                    >
                      <div className=" z-[1000]">
                        <div
                          className="w-full h-[60px] border-b-2 border-b-mecaBottomBorder px-4 flex justify-between items-center lg:hidden"
                          id="contentContainer"
                        >
                          <p
                            className="text-mecaActiveIconsNavColor text-xl font-nunito font-bold cursor-pointer"
                            onClick={() => router.push(paths.toHome())}
                          >
                            e-meca
                          </p>

                          <div
                            onClick={handleVendorMobileOpen}
                            id="mobileMenuBtn"
                          >
                            <MdClose size={18} className="cursor-pointer" />
                          </div>
                        </div>
                      </div>

                      <div
                        id="sidePanelContainer"
                        className={`z-[1000]
        `}
                      >
                        <div
                          id="sidePanel"
                          className={`w-[17.5rem] fixed lg:h-screen  h-[90%] `}
                        >
                          {/* <h1
                              id="sidePanelTitle"
                              className={`text-[#0852C0] mx-[2.19rem] text-[1.9rem] font-[700]`}
                            >
                              e-meca
                            </h1> */}
                          <div
                            id="buttonContainer"
                            className={`mx-[2rem] mt-[3.25rem]`}
                          >
                            {filteredButtons.map((btn, index) => (
                              <button
                                key={index}
                                id={`button_${index}`}
                                className={`flex items-center text-[#364152] rounded-full hover:bg-[#EFF4FF] hover:text-[#0852C0] w-full py-[0.5rem] px-[0.75rem] gap-4 mb-[1rem] ${
                                  activeButton === index
                                    ? "bg-[#EFF4FF] text-[#0852C0]"
                                    : ""
                                }`}
                              >
                                <span>
                                  {React.cloneElement(btn.icon, {
                                    size: btn.size,
                                  })}
                                </span>
                                <span className="">{btn.title}</span>
                              </button>
                            ))}
                          </div>
                          <div
                            id="bottomButtonContainer"
                            className={`absolute bottom-0 mx-[2rem]`}
                          >
                            {bottomButton.map((btn, index) => (
                              <button
                                key={index}
                                id={`bottomButton_${index}`}
                                className={`flex items-center text-[#364152] rounded-full hover:bg-[#EFF4FF] hover:text-[#0852C0] w-[13rem] py-[0.5rem] px-[0.75rem] gap-4 mb-[1rem] ${
                                  bottomActiveBtn === index
                                    ? "bg-[#EFF4FF] text-[#0852C0]"
                                    : ""
                                }`}
                                onClick={btn.onClick}
                              >
                                <span>
                                  {React.cloneElement(btn.icon, {
                                    size: btn.size,
                                  })}
                                </span>
                                <span className="">{btn.title}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[90%] m-auto z--50 mt-28 ">
          <VendorMobilePage />
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="">
            <div className="flex justify-between">
              <div className="">
                <Image
                  className="h-12 w-12"
                  src={featuredicons}
                  id="featured icon"
                  alt="featured icon"
                />
              </div>
              <div className="cursor-pointer ">
                <MdClose className="text-2xl" onClick={handleClose} />
              </div>
            </div>

            <div className="text-gray-600 text-base mt-2">
              <p className="font-bold text-xl text-black ">Confirm logout</p>
              <p className="font-semibold text-lg ">
                Are you sure you want to log out?
              </p>
            </div>
            <div className="flex justify-between mb-10 mt-12 font-semibold">
              <div className=" border-2 border-mecaBluePrimaryColor rounded-full">
                <button
                  onClick={handleClose}
                  className="w-40 h-12 text-mecaBluePrimaryColor "
                >
                  Cancel
                </button>
              </div>

              <div className="">
                <button
                  onClick={logoutCompletely}
                  className="w-40 h-12 text-white bottom-2 bg-mecaBluePrimaryColor rounded-full"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default withAuth(Page);
