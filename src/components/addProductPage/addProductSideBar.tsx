"use client";

import Image from "next/image";
import emeca from "../../assets/mecaLogo/emeca.png";
import mail from "../../assets/icons/Icon.svg";
import connectorwrap from "../../assets/images/connectorwrap.svg";
import locationwrap from "../../assets/images/locationwrap.svg";
import previewwrap from "../../assets/images/previewwrap.svg";
import { useEffect, useState } from "react";
import { title } from "process";

import React from "react";

// import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

const drawerWidth = 240;

function ResponsiveDrawer({ step, setStep }: any) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [activeTab, setActiveTab] = useState<number | null>(null);

  const handleTabClick = (index: number) => {
    setActiveTab(index === activeTab ? null : index);
  };

  const details = [
    {
      id: 1,
      title: "Basic information",
      description: "Provide the name, description, logo etc",
      image: connectorwrap,
    },
    {
      id: 2,
      title: "Images",
      description: "Provide addresses, contacts & email",
      image: locationwrap,
    },

    {
      id: 4,
      title: "Specifications",
      description: "On your mark, get ready, lets go live",
      image: previewwrap,
    },

    {
      id: 5,
      title: "Technical details",
      description: "On your mark, get ready, lets go live",
      image: previewwrap,
    },

  ];
  const handleToggle = (step: number) => {
    console.log("step ", step);
    setStep(step);
  };

  interface dataObject {
    id: number;
    title: string;
    description: string;
    image: any;
  }

  useEffect(() => {
    setActiveTab(details[step - 1].id);
  }, []);
  return (
    <div className="relative md:flex h-[800px] w-full" id="side">
      <div className="hidden md:flex gap-x-4 w-full h-1/2  " id="sidebardiv2">
        <div
          className="flex flex-col justify-center  gap-y-12"
          id="sidebardiv3"
        >
          {/* <Image src={emeca} alt="logo" className="w-[90px]" id="sidebarImg" /> */}
          <div
            className="flex flex-col justify-center h-full "
            id="sidebardiv4"
          >
            {details.map((item: dataObject) => (
              <div
                className="items-center cursor-pointer"
                id="sidebardiv5"
                key={item.id}
                onClick={() => handleToggle(item.id)}
              >
                <div
                  id="sidebardiv6"
                  onClick={() => handleTabClick(item.id)}
                  className={`text-gray-400 flex flex-col h-10 py-2 px-4   ${
                    activeTab === item.id
                      ? "text-mecaAddProductSidebarList text-base font-semibold  bg-mecaSearchColor"
                      : "`text-mecaAddProductSidebarList font-normal text-sm"
                  }`}
                  // sx="flex flex-col -mt-4 lg:-mt-10"
                >
                  <p
                    className="font-bold    text-base font-nunito_sans "
                    id="sidebardivHeader"
                  >
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResponsiveDrawer;
