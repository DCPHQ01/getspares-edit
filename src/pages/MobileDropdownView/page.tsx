"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MdChevronLeft, MdClear } from "react-icons/md";
import TopBar from "../TopBar/page";
import Link from "next/link";
import NavBar from "../../components/NavBar/NavBar";
import { Nunito_Sans } from "next/font/google";
import { useGetCategoryQuery } from "../../redux/features/users/authQuery";
import { paths } from "../../path/paths";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito_sans",
  adjustFontFallback: false,
  display: "swap",
});

const categoryMobileScreen = [
  {
    id: 1,
    title: "AC",
  },
  {
    id: 2,
    title: "Air Filters",
  },

  {
    id: 3,
    title: "Air Flow Meters",
  },

  {
    id: 4,
    title: "Alternators",
  },
  {
    id: 5,
    title: "Axles",
  },

  {
    id: 6,
    title: "Back Mirrors",
  },

  {
    id: 7,
    title: "Ball Joints",
  },

  {
    id: 8,
    title: " Batteries",
  },

  {
    id: 9,
    title: "Bonnets",
  },

  {
    id: 10,
    title: "Tractor Parts",
  },

  {
    id: 11,
    title: "Brakes",
  },

  {
    id: 12,
    title: "Bulldozer Parts",
  },
];

const MobileDropdownViewPage = () => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const handleNav = () => {
    setOpen(!open);
  };
  useEffect(() => setOpen(true), []);

  const { data: getCategoriesData } = useGetCategoryQuery({});
  console.log("buyers category  ", getCategoriesData);
  const handleProductDescription = (categoryName: string) => {
    router.push(paths.toCategoryProducts(categoryName, getCategoriesData));
  };

  return (
    <div className={nunito.className}>
      {open && (
        <div
          className="w-[98%] h-screen  scrollbar-none overflow-y-scroll bg-white z-[2000] left-1 px-2   fixed top-0"
          id="mobiledropviewcontainer1"
        >
          <div className="fixed bg-white top-0 w-[97%]">
            <div
              className="w-[100%]  h-[60px] border-b-2 border-b-mecaBottomBorder items-center lg:hidden "
              id="mobiledropviewcontainer2"
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                className=" font-nunito font-bold"
                id="mobiledropviewcontainer4"
                style={{ display: "flex", gap: "10px" }}
              >
                <MdChevronLeft className="mt-[5px] text-lg" />

                <span className="text-lg"> Category</span>
              </div>

              <MdClear
                onClick={handleNav}
                id="mobiledropviewcontainer5"
                size={20}
                className="text-mecaGoBackArrow cursor-pointer"
              />
            </div>
            <hr id="mobiledropviewcontainer6" className="w-full"></hr>
          </div>
          <div id="mobiledropviewcontainer7" className="gap-y-8 px-4 mt-4">
            <div
              id="mobiledropviewcontainer8"
              className=" leading-10 cursor-pointer "
              style={{
                flexDirection: "column",
                display: "flex",
                color: "black",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              {getCategoriesData?.data.map((category: any) => (
                <div
                  onClick={() => handleProductDescription(category.name)}
                  className=""
                  key={category.id}
                  style={{
                    color: "black",
                    textDecoration: "none",
                    cursor: "pointer",
                    marginTop: "30px",
                  }}
                >
                  {category.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileDropdownViewPage;
