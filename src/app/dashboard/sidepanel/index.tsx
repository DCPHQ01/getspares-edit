import React, { useState } from "react";
import {
  MdBusinessCenter,
  MdCategory,
  MdDashboard,
  MdInventory2,
  MdLocalPolice,
  MdPersonPin,
  MdYard,
  MdLogout,
} from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { dashboardActions } from "../../../redux/features/dashboard/dashboardSlice";
import {
  sidePanel,
  roles,
} from "../../../app/dashboard/components/utils/utils";
import { clearUser, setUser } from "../../../redux/features/users/userSlice";
import { useRouter } from "next/navigation";

function Index({ sidePanelRoles }: any) {
  //   const { user } = useAppSelector((state) => state.user);
  //   console.log("dashboard ", user);
  //   const dispatch = useAppDispatch();
  //   let decoded: JwtPayload = JWT.jwtDecode(user.access_token);

  //   const userRole = decoded?.resource_access?.meca?.roles[0];
  //   const names = decoded;

  const dispatch = useAppDispatch();
  const [activeButton, setActiveButton] = useState(0);


  const role = sidePanelRoles;

  const router = useRouter();

  console.log(roles, " roles");

  const buttons = [
    {
      icon: <MdDashboard />,
      title: "Overview",
      size: 18,
      panel: sidePanel.OVERVIEW,
      role: [roles.MECA_ADMIN, roles.VENDOR_ADMIN],
    },
    {
      icon: <MdYard />,
      title: "Vendors",
      size: 18,
      panel: sidePanel.VENDORS,
      role: [roles.MECA_ADMIN],
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
      role: [roles.VENDOR_ADMIN],
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
      onClick: () => {
        console.log("Profile Button Clicked");
      },
    },
    {
      icon: <MdLogout />,
      title: "Logout",
      size: 18,
      onClick: () => {
        dispatch(setUser({}));
        router.push("/");
      },
    },
  ];

  const handleButtonClick = (index: any, panel: any) => {
    setActiveButton(index);
    dispatch(dashboardActions.setNavButton(panel));
  };

  const filteredButtons = buttons.filter((button) =>
    button.role.includes(role)
  );

  const handleBackToHome = () => {
    if (role === "BUYER") {
      router.push("/");
    } else {
      return;
    }
  };
  return (
    <div id="sidePanelContainer" className={`z-[1000]`}>
      <div
        id="sidePanel"
        className={`w-[17.5rem] fixed h-screen py-[2rem] border border-r-[#EAECF0] bg-white`}
      >
        <h1
          id="sidePanelTitle"
          className={`text-[#0852C0] mx-[2.19rem] text-[1.9rem] font-[700]`}
          onClick={handleBackToHome}
        >
          e-meca
        </h1>
        <div id="buttonContainer" className={`mx-[2rem] mt-[3.25rem]`}>
          {filteredButtons.map((btn, index) => (
            <button
              type="button"
              key={index}
              id={`button${index}`}
              className={`flex items-center text-[#364152] rounded-full hover:bg-[#EFF4FF] hover:text-[#0852C0] w-full py-[0.5rem] px-[0.75rem] gap-4 mb-[1rem] ${
                activeButton === index ? "bg-[#EFF4FF] text-[#0852C0]" : ""
              }`}
              onClick={() => handleButtonClick(index, btn.panel)}
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
              className={`flex items-center text-[#364152] rounded-full hover:bg-[#EFF4FF] hover:text-[#0852C0] w-[13rem] py-[0.5rem] px-[0.75rem] gap-4 mb-[1rem]`}
              onClick={btn.onClick}
            >
              <span>{React.cloneElement(btn.icon, { size: btn.size })}</span>
              <span>{btn.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Index;
