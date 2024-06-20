"use client";
import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { MdClose } from "react-icons/md";
import Image from "next/image";
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

import {
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

import { useAppDispatch } from "../../../../redux/hooks";
import { dashboardActions } from "../../../../redux/features/dashboard/dashboardSlice";
import { clearUser, setUser } from "../../../../redux/features/users/userSlice";
import { useRouter } from "next/navigation";
import { roles, sidePanel } from "../utils/utils";
import { useUserRole } from "../../../hooks/useUserRole";
import featuredicons from "../../../../assets/images/Featuredicon.svg";
import Link from "next/link";
function Index({ sidePanelRoles }: { sidePanelRoles?: any }) {
  //   const { user } = useAppSelector((state) => state.user);
  //   console.log("dashboard ", user);
  //   const dispatch = useAppDispatch();
  //   let decoded: JwtPayload = JWT.jwtDecode(user.access_token);

  //   const userRole = decoded?.resource_access?.meca?.roles[0];
  //   const names = decoded;
  const dispatch = useAppDispatch();
  const [activeButton, setActiveButton] = useState<number | null>(0);
  const [bottomActiveBtn, setBottomActiveButton] = useState<number | null>(
    null
  );

  const userRole = useUserRole();
  const role = userRole;

  const router = useRouter();

  const logOut = () => {
    // dispatch(clearUser());
    // router.push("/logoutModal");
  };

  // console.log(roles, " roles");

  const profileBtn = () => {
    handleButtonClick(sidePanel.PROFILE);
    setActiveButton(null);
    setBottomActiveButton(0);
  };

  const buttons = [
    {
      icon: <MdDashboard />,
      title: "Overview",
      size: 18,
      panel: sidePanel.OVERVIEW,
      role: [roles.MECA_ADMIN, roles.VENDOR_ADMIN, roles.AGENTS, roles.BUYER],
    },
    {
      icon: <MdYard />,
      title: "Vendors",
      size: 18,
      panel: sidePanel.VENDORS,
      role: [roles.MECA_ADMIN, roles.AGENTS],
    },
    {
      icon: <MdLocalPolice />,
      title: "Agents",
      size: 18,
      panel: sidePanel.AGENTS,
      role: [roles.MECA_ADMIN, roles.VENDOR_ADMIN],
    },
    {
      icon: <MdBusinessCenter />,
      title: "Buyers",
      size: 18,
      panel: sidePanel.BUYERS,
      role: [roles.MECA_ADMIN],
    },
    {
      icon: <MdBusinessCenter />,
      title: "Orders",
      size: 18,
      panel: sidePanel.ORDERS,
      role: [roles.VENDOR_ADMIN, roles.AGENTS, roles.BUYER],
    },
    {
      icon: <MdShoppingCart />,
      title: "Cart",
      size: 18,
      panel: sidePanel.CART,
      role: [roles.BUYER],
    },
    {
      icon: <MdInventory2 />,
      title: "Inventory",
      size: 18,
      panel: sidePanel.INVENTORY,
      role: [roles.MECA_ADMIN, roles.VENDOR_ADMIN],
    },
    {
      icon: <MdCategory />,
      title: "Category",
      size: 18,
      panel: sidePanel.CATEGORY,
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
      onClick: () => {
        setOpen(true);
      },
    },
  ];

  const logoutCompletely = () => {
    sessionStorage.clear();
    sessionStorage.removeItem("userDetails");
    dispatch(setUser({}));
    router.push("/login");
  };

  const handleButtonClick = (panel: any, index?: any) => {
    setActiveButton(index);
    dispatch(dashboardActions.setNavButton(panel));
    setBottomActiveButton(null);
  };

  const filteredButtons = buttons.filter((button) =>
    button.role.includes(role)
  );

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div id="sidePanelContainer" className={`z-[1000]`}>
      <div
        id="sidePanel"
        className={`w-[17.5rem] fixed h-screen py-[2rem] border border-r-[#EAECF0] bg-white`}
      >
        <h1
          id="sidePanelTitle"
          className={`text-[#0852C0] mx-[2.19rem] text-[1.9rem] font-[700]`}
        >
          e-meca
        </h1>
        <div id="buttonContainer" className={`mx-[2rem] mt-[3.25rem]`}>
          {filteredButtons.map((btn, index) => (
            <button
              type="button"
              key={index}
              id={`button_${index}2`}
              className={`flex items-center text-[#364152] rounded-full hover:bg-[#EFF4FF] hover:text-[#0852C0] w-full py-[0.5rem] px-[0.75rem] gap-4 mb-[1rem] ${
                activeButton === index ? "bg-[#EFF4FF] text-[#0852C0]" : ""
              }`}
              onClick={() => handleButtonClick(btn.panel, index)}
            >
              <span>{React.cloneElement(btn.icon, { size: btn.size })}</span>
              <span>{btn.title}</span>
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
                bottomActiveBtn === index ? "bg-[#EFF4FF] text-[#0852C0]" : ""
              }`}
              onClick={btn.onClick}
            >
              <span>{React.cloneElement(btn.icon, { size: btn.size })}</span>
              <span>{btn.title}</span>
            </button>
          ))}
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

export default Index;
