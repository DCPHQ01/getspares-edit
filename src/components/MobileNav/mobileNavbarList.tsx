"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import Filter from "../../../components/filters/Filter";
import MobileDropdownBrandPage from "../../pages/MobileDropdownBrand/page";
import {
  MdChevronRight,
  MdClear,
  MdExpandMore,
  MdLogout,
} from "react-icons/md";
import { useState } from "react";
import { paths } from "../../path/paths";
// import MobileDropdownViewPage from "../../pages/MobileDropdownView/page";
import DropdownPage from "../NavBar/dropdown/page";

const mobileNavData = [
  {
    id: 1,
    title: "home",
    icon: "",
    icon2: "",
    link: "/",
  },
  {
    id: 2,
    title: "categories",
    icon1: <MdExpandMore size={24} className="text-mecaGoBackArrow" />,
    icon2: <MdChevronRight size={24} className="text-mecaGoBackArrow" />,
    link: "",
    mobileNavHeader: <DropdownPage closeDropdown={() => {}} />,
  },
  {
    id: 3,
    title: "brands",
    icon: <MdExpandMore size={24} className="text-mecaGoBackArrow" />,
    icon2: <MdChevronRight size={24} className="text-mecaGoBackArrow" />,
    link: "",
    mobileNavHeader: <MobileDropdownBrandPage />,
  },

  {
    id: 5,
    title: "vendors",
    icon: <MdExpandMore size={24} className="text-mecaGoBackArrow" />,
    icon2: <MdChevronRight size={24} className="text-mecaGoBackArrow" />,
    link: "",
  },

  {
    id: 8,
    title: "logout",
    icon: <MdLogout size={24} className="text-mecaGoBackArrow" />,
    link: "/login",
  },
];
interface MobileNavProps {
  handleNav?: () => void;
}
export default function MobileNavbarList({ handleNav }: MobileNavProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const [active, setActive] = useState<number | null>(1);
  const handleClick = (id: number) => {
    setActive(id);
  };

  const dropDownClicked = () => {
    setActive(null);
  };

  const [isCategoryOptionOpened, setIsCategoryOptionOpen] = useState(false);

  const toggle = (id: number) => {
    if (id === active) {
      setIsCategoryOptionOpen((prev) => !prev);
    }
    return isCategoryOptionOpened;
  };
  return (
    <div
      className="w-full h-screen bg-white absolute z-[3500] top-0 overflow-y-hidden"
      id="mobileMenuContainer"
    >
      <div
        className="w-full h-[60px] border-b-2 border-b-mecaBottomBorder px-4 flex justify-between items-center lg:hidden"
        id="topBarContentContainer"
      >
        <p
          className="text-mecaActiveIconsNavColor text-xl font-nunito font-bold cursor-pointer"
          onClick={() => router.push(paths.toHome())}
        >
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
        className="flex flex-col gap-y-2
           px-4 mt-4"
        id="navDataMenuWhenClosed"
      >
        {mobileNavData.map((data) => (
          <div
            className={`flex justify-between items-center cursor-pointer  ${
              active === data.id ? "bg-mecaActiveBackgroundNavColor" : ""
            } rounded-md`}
            id="navDatum"
            onClick={() => handleClick(data.id)}
            key={data.id}
          >
            <p
              // className="text-mecaGoBackText text-lg capitalize"
              className={`${
                active === data.id
                  ? "text-mecaBluePrimaryColor pt-3 pb-3 pl-3"
                  : "text-mecaDarkBlueBackgroundOverlay"
              } text-sm font-nunito font-semibold capitalize pt-3 pb-3 pl-3`}
              onClick={() => router.push(data.link)}
            >
              {data.title}
            </p>

            {isCategoryOptionOpened && data.id === active ? (
              <p>{data.icon2}</p>
            ) : (
              <p
                className={`${
                  active === data.id
                    ? "text-mecaBluePrimaryColor"
                    : "text-mecaGoBackArrow"
                }`}
              >
                {data.icon2}
              </p>
            )}
          </div>
        ))}

        {mobileNavData.map(
          (data) =>
            active === data.id && (
              <div
                key={data.id}
                className=" absolute top-0 left-0 right-0"
                style={{ width: "100%", margin: "0px auto" }}
              >
                <div className="" onClick={dropDownClicked}>
                  {data.mobileNavHeader}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}
