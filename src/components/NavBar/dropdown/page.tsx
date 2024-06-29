"use client";

import Card from "@mui/material/Card";
import { useRouter } from "next/navigation";
import { useGetCategoryQuery } from "../../../redux/features/users/authQuery";
import { paths } from "../../../path/paths";
import { useEffect, useRef } from "react";

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
  console.log("buyers category  ", getCategoriesData);
  const handleProductDescription = (categoryName: string) => {
    router.push(paths.toCategoryProducts(categoryName));
  };
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
          <div className="w-full p-10 lg:grid lg:grid-cols-3  gap-x-10 scrollbar-none overflow-y-scroll  ">
            {getCategoriesData?.data.map((category: any) => (
              <div
                onClick={() => handleProductDescription(category.name)}
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
