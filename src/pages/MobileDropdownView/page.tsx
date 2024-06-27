"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MdChevronLeft, MdClear } from "react-icons/md";

import NavBar from "../../components/NavBar/NavBar";
// import { useGetCategoryQuery } from "../../redux/features/users/authQuery";
import { paths } from "../../path/paths";

  const router = useRouter();

const MobileDropdownView = () => {
  const [open, setOpen] = useState(false);
  const handleNav = () => {
    setOpen(!open);
  };
  useEffect(() => setOpen(true), []);

  // const { data: getCategoriesData } = useGetCategoryQuery({});
  // console.log("buyers category  ", getCategoriesData);
  // const handleProductDescription = (categoryName: string) => {
  //   router.push(paths.toCategoryProducts(categoryName));
  // };

  return (
    <div>
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
              {/* {getCategoriesData?.data.map((category: any) => (
                <div
                  onClick={() => handleProductDescription}
                  className=""
                  style={{
                    color: "black",
                    textDecoration: "none",
                    cursor: "pointer",
                    marginTop: "30px",
                  }}
                >
                  {category.name}
                </div>
              ))} */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileDropdownView;
