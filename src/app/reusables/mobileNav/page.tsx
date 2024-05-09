"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import MobileDropdownViewPage from "../../../pages/page";
// import MobileDropdownViewPage from "/pages/page";
// import MobileDropdownViewPage from "../../../../src/pages/MobileDropdownView/page";
import MobileDropdownViewPage from "../../../pages/MobileDropdownView/page";
import Filter from "../../category/products/filters/page";
import { MdChevronRight, MdClear, MdExpandMore } from "react-icons/md";
import { useState } from "react";

const mobileNavData = [
  {
    id: 1,
    title: "home",
    icon: "",
    icon2: "",
  },
  {
    id: 2,
    title: "categories",
    icon1: <MdExpandMore size={24} className="text-mecaGoBackArrow" />,
    icon2: <MdChevronRight size={24} className="text-mecaGoBackArrow" />,
  },
  {
    id: 3,
    title: "brands",
    icon: <MdExpandMore size={24} className="text-mecaGoBackArrow" />,
    icon2: <MdChevronRight size={24} className="text-mecaGoBackArrow" />,
  },
  {
    id: 4,
    title: "mechanics",
    icon: <MdExpandMore size={24} className="text-mecaGoBackArrow" />,
    icon2: <MdChevronRight size={24} className="text-mecaGoBackArrow" />,
  },
  {
    id: 5,
    title: "vendors",
    icon: <MdExpandMore size={24} className="text-mecaGoBackArrow" />,
    icon2: <MdChevronRight size={24} className="text-mecaGoBackArrow" />,
  },
  {
    id: 6,
    title: "listings",
    icon: <MdExpandMore size={24} className="text-mecaGoBackArrow" />,
    icon2: <MdChevronRight size={24} className="text-mecaGoBackArrow" />,
  },
  {
    id: 7,
    title: "advertise",
    icon: <MdExpandMore size={24} className="text-mecaGoBackArrow" />,
    icon2: <MdChevronRight size={24} className="text-mecaGoBackArrow" />,
  },
];
interface MobileNavProps {
  handleNav: () => void;
}
export default function MobileNav({ handleNav }: MobileNavProps) {
  const router = useRouter();

  // const handleCategory = () => {
  //   router.push("../../../../src/pages/MobileDropdownView/page");
  // };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div
      className="w-full h-screen z-50 bg-white fixed overflow-y-hidden"
      id="mobileMenuContainer"
    >
      <div
        className="w-full h-[60px] border-b-2 border-b-mecaBottomBorder px-4 flex justify-between items-center lg:hidden"
        id="topBarContentContainer"
      >
        <p className="text-mecaActiveIconsNavColor text-xl font-nunito font-bold">
          e-meca
        </p>
        <div className="flex" id="mdClear">
          <MdClear
            size={24}
            className="text-mecaGoBackArrow"
            onClick={handleNav}
          />
        </div>
      </div>
      <div
        className="flex flex-col gap-y-8
           px-4 mt-4"
        id="navDataMenuWhenClosed"
      >
        {mobileNavData.map((data) => (
          <div
            className="flex justify-between items-center"
            id="navDatum"
            key={data.id}
          >
            <p className="text-mecaGoBackText text-lg capitalize">
              {data.title}
            </p>

            <p
              onClick={data.id === 2 ? toggleModal : undefined}
              // onClick={toggleModal}
            >
              {data.icon2}
            </p>
          </div>
        ))}
        <div
          className=" absolute top-0 "
          style={{ width: "98%", margin: "0px auto" }}
        >
          {isModalOpen && <MobileDropdownViewPage />}
        </div>
      </div>
    </div>
  );
}
