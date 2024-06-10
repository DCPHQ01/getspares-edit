"use client";

import { link } from "fs";
import connectorwrap from "../../assets/images/connectorwrap.svg";
import locationwrap from "../../assets/images/locationwrap.svg";
import previewwrap from "../../assets/images/previewwrap.svg";
import { useEffect, useState } from "react";

import React from "react";

import { MdCheckCircle } from "react-icons/md";
import { useRouter } from "next/navigation";

function ResponsiveDrawer({ step, setStep }: any) {
  // const [mobileOpen, setMobileOpen] = React.useState(false);

  // const [activeTab, setActiveTab] = useState(details[step - 1].id);

  // const handleTabClick = (index: number) => {
  //   setActiveTab(index === activeTab ? null : index);
  // };
  const [activeTab, setActiveTab] = useState(0);

  const router = useRouter();

  useEffect(() => {
    setActiveTab(details[step - 1].id);
  }, []);

  const details = [
    {
      id: 1,
      title: "Basic information",
      description: "Provide the name, description, logo etc",
      image: connectorwrap,
      isCompleted: false,
      link: "/basicInfo",
    },
    {
      id: 2,
      title: "Images",
      description: "Provide addresses, contacts & email",
      image: locationwrap,
      isCompleted: false,
      link: "/addImages",
    },

    {
      id: 3,
      title: "Specifications",
      description: "On your mark, get ready, lets go live",
      image: previewwrap,
      isCompleted: false,
      link: "/specifications",
    },

    {
      id: 4,
      title: "Technical details",
      description: "On your mark, get ready, lets go live",
      image: previewwrap,
      isCompleted: false,
      link: "/details",
    },
  ];
  const handleToggle = (step: number, link: string) => {
    console.log("step ", step);
    setStep(step);
    router.push(`/addProductDashboard/${link}`);
  };

  interface dataObject {
    id: number;
    title: string;
    description: string;
    image: any;
    isCompleted: boolean;
    link: string;
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
          <div
            className="flex flex-col justify-center h-full w-[200px]"
            id="sidebardiv4"
          >
            {details.map((item: dataObject) => (
              <div
                className="flex justify-between items-center cursor-pointer"
                id="sidebardiv5"
                key={item.id}
                onClick={() => handleToggle(item.id, item.link)}
              >
                <div
                  id="sidebardiv6"
                  // onClick={() => handleTabClick(item.id)}
                  className={`text-gray-400 flex flex-col h-10 py-2 px-4   ${
                    activeTab === item.id
                      ? "text-mecaAddProductSidebarList text-base font-semibold bg-mecaSearchColor"
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
                {item.isCompleted && (
                  <div
                    id="iconCompletedDiv"
                    className="flex justify-start w-[28px] h-full items-center"
                  >
                    <MdCheckCircle className="text-mecaBluePrimaryColor w-3 h-3" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResponsiveDrawer;
