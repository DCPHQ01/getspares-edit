"use client";

import Card from "@mui/material/Card";
import { useRouter } from "next/navigation";
import { useGetCategoryQuery } from "../../../redux/features/users/authQuery";
import { paths } from "../../../path/paths";
import { useEffect, useRef, useState } from "react";
import { MdChevronLeft, MdClear } from "react-icons/md";

interface DropdownPageProps {
  closeDropdown: () => void;
}
const DropdownPage: React.FC<DropdownPageProps> = ({ closeDropdown }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeDropdown]);

  const router = useRouter();
  const { data: getCategoriesData } = useGetCategoryQuery({});
  "buyers category  ", getCategoriesData;
  const handleProductDescription = (
    categoryName: string,
    categoryId: string
  ) => {
    if (categoryId) {
      sessionStorage.setItem("categoryId", categoryId);
    }
    router.push(paths.toCategoryProducts(categoryName));
  };

  const [open, setOpen] = useState(false);
  const handleNav = () => {
    setOpen(!open);
  };
  useEffect(() => setOpen(true), []);
  return (
    <div ref={dropdownRef} className="">
      <div>
        <Card
          className="w-full  lg:h-96 h-[100vh]  scrollbar-none overflow-y-scroll  "
          style={{
            boxShadow: "0px 2px 8px 0px #63636333",
            zIndex: 200,
          }}
        >
          <div className="lg:hidden ">
            <div className="lg:pl-2 lg:pr-2 pl-5 pr-5">
              <div
                className="w-[100%]  h-[60px] border-b-2 border-b-mecaBottomBorder items-center lg:hidden "
                id="mobiledropviewcontainer2"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {/* <div className="" id="mobiledropviewcontainer3"> */}
                <div
                  className="font-nunito font-bold"
                  id="mobiledropviewcontainer4"
                  style={{ display: "flex", gap: "10px" }}
                >
                  <MdChevronLeft className="mt-[5px] text-lg" />
                  <span className="text-lg"> Category</span>
                </div>

                {/* <Link href="../app/reusables/NavBar/page"> */}
                <MdClear
                  onClick={handleNav}
                  id="mobiledropviewcontainer5"
                  size={20}
                  className="text-mecaGoBackArrow cursor-pointer"
                />
                {/* </Link> */}
                {/* </div> */}
              </div>
            </div>
            <hr id="mobiledropviewcontainer6" className=""></hr>
          </div>

          <div className="w-full p-10 lg:grid lg:grid-cols-3  gap-x-10 scrollbar-none overflow-y-scroll  ">
            {getCategoriesData?.data.map((category: any) => (
              <div
                onClick={() =>
                  handleProductDescription(category?.name, category?.id)
                }
                className=" w-[100%] h-10 cursor-pointer"
                key={category.id}
              >
                {category.name}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DropdownPage;
