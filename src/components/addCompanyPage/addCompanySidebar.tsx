"use client";

import Image from "next/image";
import emeca from "../../assets/mecaLogo/emeca.png";
import mail from "../../assets/icons/Icon.svg";
import connectorwrap from "../../assets/images/connectorwrap.svg";
import locationwrap from "../../assets/images/locationwrap.svg";
import previewwrap from "../../assets/images/previewwrap.svg";
import { useEffect, useState } from "react";

import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux";
import { setCurrentStep } from "../../redux/features/company/companySlice";

// import { makeStyles, useTheme } from "@material-ui/core/styles";

const drawerWidth = 240;
interface SideBarProps {
  active: boolean;
  setActive: (active: boolean) => void;
}
function ResponsiveDrawer({ active, setActive }: SideBarProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const currentPage = useAppSelector(
    (state: RootState) => state.company.currentStep
  );
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // const [activeTab, setActiveTab] = useState<number | null>(null);

  const handleTabClick = (index: number) => {
    // setActiveTab(index === activeTab ? null : index);
  };

  const details = [
    {
      id: 1,
      title: "Company details",
      description: "Provide the name, description, logo etc",
      image: connectorwrap,
    },
    {
      id: 2,
      title: "Location",
      description: "Provide addresses, contacts & email",
      image: locationwrap,
    },
    {
      id: 3,
      title: "Preview",
      description: "On your mark, get ready, lets go live",
      image: previewwrap,
    },
  ];
  const dispatch = useAppDispatch();
  const handleToggle = (step: number) => {
    "step ", step;
    dispatch(setCurrentStep(step - 1));
  };

  interface dataObject {
    id: number;
    title: string;
    description: string;
    image: any;
  }

  useEffect(() => {
    dispatch(setCurrentStep(0));
    setActive(true);
  }, []);
  return (
    <div className="relative md:flex h-[800px] p-4 w-full" id="sidebar">
      <div
        className="hidden md:flex gap-x-4 w-full h-1/2 mt-6 "
        id="sidebardiv2"
      >
        <div
          className="flex flex-col justify-center mt-8 gap-y-12"
          id="sidebardiv3"
        >
          <Image src={emeca} alt="logo" className="w-[90px]" id="sidebarImg" />
          <div
            className="flex flex-col justify-center h-full "
            id="sidebardiv4"
          >
            {details.map((item: dataObject) => (
              <div
                className="flex gap-x-4 items-center cursor-pointer"
                id="sidebardiv5"
                key={item.id}
                onClick={() => handleToggle(item.id)}
              >
                <Image
                  width={40}
                  src={item.image}
                  alt={item.title}
                  id="sidebarImg2"
                />
                <div
                  id="sidebardiv6"
                  onClick={() => handleTabClick(item.id)}
                  className={`text-gray-400 flex flex-col -mt-4 lg:-mt-10 ${
                    active && item.id === currentPage + 1
                      ? "text-gray-800"
                      : "`text-gray-800"
                  }`}
                  // sx="flex flex-col -mt-4 lg:-mt-10"
                >
                  <p
                    className="font-bold text-base font-nunito_sans"
                    id="sidebardivHeader"
                  >
                    {item.title}
                  </p>
                  <p
                    className="text-base font-nunito_sans"
                    id="sidebardivDescription"
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/*<div*/}
      {/*  className="hidden md:flex w-full h-[50px] justify-between text-sm items-center absolute bottom-0 left-0 p-2"*/}
      {/*  id="sidebardivFooterText"*/}
      {/*>*/}
      {/*  <p id="sidebarProductiondate">© Meca 2024</p>*/}
      {/*  <div className="flex gap-x-2 " id="sidebardivcopyright">*/}
      {/*    <Image src={mail} alt="mail" id="mail" className="w-auto" />*/}
      {/*    <p id="copyright">info@meca.com.ng</p>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
}

export default ResponsiveDrawer;
