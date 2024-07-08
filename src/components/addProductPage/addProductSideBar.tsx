"use client";

import { link } from "fs";
import connectorwrap from "../../assets/images/connectorwrap.svg";
import locationwrap from "../../assets/images/locationwrap.svg";
import previewwrap from "../../assets/images/previewwrap.svg";
import { useEffect, useLayoutEffect, useState } from "react";

import React from "react";

import { MdCheckCircle } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import { paths } from "../../path/paths";

function ResponsiveDrawer({ step, setStep }: any) {
  // const [mobileOpen, setMobileOpen] = React.useState(false);

  // const [activeTab, setActiveTab] = useState(details[step - 1].id);

  // const handleTabClick = (index: number) => {
  //   setActiveTab(index === activeTab ? null : index);
  // };

  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("");

  const router = useRouter();

  const basicInfoData =
    typeof window !== "undefined" && window.sessionStorage
      ? JSON.parse(sessionStorage.getItem("basicInfoValues") || "{}")
      : {};

  const imagesData =
    typeof window !== "undefined" && window.sessionStorage
      ? JSON.parse(sessionStorage.getItem("images") || "[]")
      : [];

  const specsData =
    typeof window !== "undefined" && window.sessionStorage
      ? JSON.parse(sessionStorage.getItem("specInfo") || "{}")
      : {};
  const detailsData =
    typeof window !== "undefined" && window.sessionStorage
      ? JSON.parse(sessionStorage.getItem("detailsInfo") || "{}")
      : {};

  const details = [
    {
      id: 1,
      title: "Basic information",
      description: "Provide the name, description, logo etc",
      image: connectorwrap,
      isCompleted:
        !pathname?.includes("basicInfo") &&
        !!basicInfoData?.price &&
        !!basicInfoData?.productCategory &&
        !!basicInfoData?.productName &&
        !!basicInfoData?.quantity &&
        !!basicInfoData?.productDescription,
      link: "/basicInfo",
    },
    {
      id: 2,
      title: "Images",
      description: "Provide addresses, contacts & email",
      image: locationwrap,
      isCompleted: !pathname?.includes("addImages") && imagesData?.length < 0,
      link: "/addImages",
    },

    {
      id: 3,
      title: "Specifications",
      description: "On your mark, get ready, lets go live",
      image: previewwrap,
      isCompleted:
        !pathname?.includes("specifications") &&
        !!specsData?.quantity &&
        !!specsData?.color,
      link: "/specifications",
    },

    {
      id: 4,
      title: "Technical details",
      description: "On your mark, get ready, lets go live",
      image: previewwrap,
      isCompleted:
        !pathname?.includes("details") &&
        !!detailsData?.brand &&
        !!detailsData?.model &&
        !!detailsData?.countryOfOrigin &&
        !!detailsData?.manufacturerParts,
      link: "/details",
    },
  ];
  const handleToggle = (step: number, link: string) => {
    setStep(step);
    router.push(`/addProductDashboard/${link}`);
  };

  interface dataObject {
    id: number;
    title: string;
    description: string;
    image: any;
    isCompleted: boolean | undefined;
    link: string;
  }

  useLayoutEffect(() => {
    if (pathname === "/addProductDashboard") {
      router.push(paths.toAddProductDashboardBasicInfo());
    }
  }, []);

  useEffect(() => {
    const activeDetail = details.find(
      (detail) => `/addProductDashboard${detail.link}` === pathname
    );
    if (activeDetail) {
      setActiveTab(activeDetail.title);
    }
  }, [pathname]);

  return (
    <div className="relative md:flex h-[800px] w-full" id="side">
      <div className="hidden md:flex gap-x-4 w-full h-1/2  " id="sidebardiv2">
        <div className="flex flex-col justify-center gap-y-12" id="sidebardiv3">
          <div
            className="flex flex-col justify-center h-full w-[200px] gap-y-2"
            id="sidebardiv4"
          >
            {details.map((item: dataObject, index: number) => (
              <div
                className="flex justify-between items-center cursor-pointer"
                id="sidebardiv5"
                key={index}
                onClick={() => handleToggle(item.id, item.link)}
              >
                <div
                  id="sidebardiv6"
                  className={`text-gray-400 cursor-pointer flex flex-col${
                    activeTab === item.title
                      ? "text-mecaAddProductSidebarList text-base font-semibold bg-mecaSearchColor"
                      : "`text-mecaAddProductSidebarList font-normal text-sm"
                  }`}
                >
                  <p
                    className="font-bold text-base font-nunito_sans"
                    id="sidebardivHeader"
                  >
                    {item.title}
                  </p>
                </div>
                {item.isCompleted === true && (
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
