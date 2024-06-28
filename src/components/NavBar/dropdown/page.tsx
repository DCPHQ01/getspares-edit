"use client";

import Card from "@mui/material/Card";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useGetCategoryQuery } from "../../../redux/features/users/authQuery";
import { paths } from "../../../path/paths";

const DropdownPage = () => {
  const router = useRouter();
  const { data: getCategoriesData } = useGetCategoryQuery({});
  console.log("buyers category  ", getCategoriesData);
  const handleProductDescription = (categoryName: string) => {
    router.push(paths.toCategoryProducts(categoryName));
  };
  return (
    <div className="">
      <div>
        <Card
          className="w-full h-96  scrollbar-none overflow-y-scroll  "
          style={{
            boxShadow: "0px 2px 8px 0px #63636333",
            zIndex: 200,
          }}
        >
          <div className="w-full p-10 grid grid-cols-3  gap-x-10 ">
            {getCategoriesData?.data.map((category: any) => (
              <div
                onClick={() => handleProductDescription}
                className=" w-[100%] h-10 cursor-pointer"
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
