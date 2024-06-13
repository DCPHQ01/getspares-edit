"use client";
import { useAppSelector } from "../../../../redux";
import Sidepanel from "../../components/sidepanel";
import { sidePanel } from "../../components/utils/utils";
import Overview from "./Overview";
import Orders from "./Orders";
import Cart from "./Cart";
import Profile from "./Profile";
import router from "next/router";
import { MdMenu, MdClose } from "react-icons/md";
import BuyerMobileDashboardPage from "./buyerMobileDashboard/page";
import React, { useState } from "react";
import { useAppDispatch } from "../../../../redux/hooks";
import { dashboardActions } from "../../../../redux/features/dashboard/dashboardSlice";
import { clearUser, setUser } from "../../../../redux/features/users/userSlice";
import { useRouter } from "next/navigation";
import { roles, userRole } from "../../../dashboard/components/utils/utils";
import { useUserRole } from "../../../hooks/useUserRole";

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

function Index() {
  const SidePanelButton = () => {
    const buyermobile = useAppSelector(
      (state) => state.dashboard.sidePanelButton
    );
    switch (buyermobile) {
      case sidePanel.OVERVIEW:
        return <Overview />;
      case sidePanel.ORDERS:
        return <Orders />;
      case sidePanel.CART:
        return <Cart />;
      case sidePanel.PROFILE:
        return <Profile />;
      default:
        return null;
    }
  };

  const dispatch = useAppDispatch();
  const [activeButton, setActiveButton] = useState<number | null>(0);
  const [bottomActiveBtn, setBottomActiveButton] = useState<number | null>(
    null
  );

  const userRole = useUserRole();
  const role = userRole;

  const router = useRouter();

  const logOut = () => {
    dispatch(clearUser());
    router.push("/");
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
        sessionStorage.clear();
        sessionStorage.removeItem("userDetails");
        dispatch(setUser({}));
        router.push("/login");
      },
    },
  ];

  const handleButtonClick = (panel: any, index?: any) => {
    setActiveButton(index);
    dispatch(dashboardActions.setNavButton(panel));
    setBottomActiveButton(null);
  };

  const filteredButtons = buttons.filter((button) =>
    button.role.includes(role)
  );
  const [buyerMobileDashboard, setBuyerMobileDashboard] = useState(false);

  const handleBuyerMobileDashboard = () => {
    setBuyerMobileDashboard(!buyerMobileDashboard);
  };

  return (
    <>
      <div className={`hidden lg:flex flex-col`}>
        {/* desktop */}
        <Sidepanel />
        <div
          className={`flex-1 my-[3.25rem] ml-[17.5rem] pl-[1.375rem] mr-[2.125rem]`}
        >
          <SidePanelButton />
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
                      onClick={() => router.push("/")}
                    >
                      e-meca
                    </p>

                    <div
                      onClick={handleBuyerMobileDashboard}
                      id="mobileMenuBtn"
                    >
                      <MdMenu size={18} className="cursor-pointer" />
                    </div>
                  </div>

                  {buyerMobileDashboard && (
                    <div
                      onClick={handleBuyerMobileDashboard}
                      className="absolute z-[1000] top-0 bg-white w-[100%] h-[100vh] "
                    >
                      <div className=" z-[1000]">
                        <div
                          className="w-full h-[60px] border-b-2 border-b-mecaBottomBorder px-4 flex justify-between items-center lg:hidden"
                          id="contentContainer"
                        >
                          <p
                            className="text-mecaActiveIconsNavColor text-xl font-nunito font-bold cursor-pointer"
                            onClick={() => router.push("/")}
                          >
                            e-meca
                          </p>

                          <div
                            onClick={handleBuyerMobileDashboard}
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
                                onClick={() =>
                                  handleButtonClick(btn.panel, index)
                                }
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
          <BuyerMobileDashboardPage />
        </div>
      </div>
    </>
  );
}

export default Index;
