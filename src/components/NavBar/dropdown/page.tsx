"use client";

import Card from "@mui/material/Card";
import { useRouter } from "next/navigation";
import { useGetCategoryQuery } from "../../../redux/features/users/authQuery";
import { paths } from "../../../path/paths";
import { useEffect, useRef, useState } from "react";
import { MdChevronLeft, MdClear } from "react-icons/md";
import Menu from "@mui/material/Menu";
import { ColorRing } from "react-loader-spinner";
import TruncateText from "../../utils/utils";

interface DropdownPageProps {
  closeDropdown: () => void;
}

const DropdownPage: React.FC<DropdownPageProps> = ({ closeDropdown }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const openA = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    closeDropdown();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      setAnchorEl(null);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeDropdown]);

  const router = useRouter();
  const {
    data: getCategoriesData,
    isFetching,
    isLoading,
  } = useGetCategoryQuery({});

  const handleProductDescription = async (
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
    <div className="">
      <div className="hidden lg:flex flex-col">
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          className="mt-48 border-2 border-white hidden lg:flex flex-col"
        >
          <div>
            {isLoading ? (
              <div className="w-[700px] h-96 flex justify-center items-center">
                <ColorRing
                  visible={true}
                  height="40"
                  width="40"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={[
                    "#0000FF",
                    "#0000FF",
                    "#0000FF",
                    "#0000FF",
                    "#0000FF",
                  ]}
                />
              </div>
            ) : (
              <div className="w-[700px] h-96 px-6 lg:grid lg:grid-cols-3 gap-x-10 scrollbar-none overflow-y-scroll">
                {getCategoriesData?.data.map((category: any) => (
                  <div
                    onClick={() =>
                      handleProductDescription(category.name, category.id)
                    }
                    className="w-[100%] h-10 cursor-pointer"
                    key={category.id}
                  >
                    <TruncateText text={category.name} maxLength={20} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </Menu>
      </div>

      {/* mobile */}

      <div className="lg:hidden">
        <Card
          className="w-full lg:h-96 h-[100vh] scrollbar-none overflow-y-scroll"
          style={{
            boxShadow: "0px 2px 8px 0px #63636333",
            zIndex: 200,
          }}
        >
          <div>
            <div className="lg:hidden w-full">
              <div className="pl-5 pr-5">
                <div
                  className="w-full h-[60px] border-b-2 border-b-mecaBottomBorder items-center lg:hidden"
                  id="mobiledropviewcontainer2"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    className="font-nunito font-bold"
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
              </div>
              <hr id="mobiledropviewcontainer6" className=""></hr>
            </div>

            {isLoading ? (
              <div className="mt-72 flex justify-center items-center">
                {/*<ColorRing*/}
                {/*  visible={true}*/}
                {/*  height="40"*/}
                {/*  width="40"*/}
                {/*  ariaLabel="color-ring-loading"*/}
                {/*  wrapperStyle={{}}*/}
                {/*  wrapperClass="color-ring-wrapper"*/}
                {/*  colors={[*/}
                {/*    "#0000FF",*/}
                {/*    "#0000FF",*/}
                {/*    "#0000FF",*/}
                {/*    "#0000FF",*/}
                {/*    "#0000FF",*/}
                {/*  ]}*/}
                {/*/>*/}
              </div>
            ) : (
              <div className="w-full p-10 lg:grid lg:grid-cols-3 gap-x-10 scrollbar-none overflow-y-scroll">
                {getCategoriesData?.data.map((category: any) => (
                  <div
                    onClick={() =>
                      handleProductDescription(category.name, category.id)
                    }
                    className="w-[100%] h-10 cursor-pointer"
                    key={category.id}
                  >
                    {category.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DropdownPage;
