"use client";
import AddProductSideBar from "../../components/addProductPage/addProductSideBar";
import CalledPagesPageOnePages from "./basicInfo/page";
import CalledPagesPageTwoPages from "./addImages/page";
import CalledPagesPageFourPages from "./specifications/page";
import CalledPagesPageFivePages from "./details/page";
import React, { useState } from "react";

// import AddProductToggle from "./addProducttoggle";
import AddProductImage, { WrappedAddProductImage } from "./addProductImage";

const number = [1, 2, 3];

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const [step, setStep] = useState<number>(1);

  const togglePages = (step: number) => {
    switch (step) {
      case 1:
        return <CalledPagesPageOnePages />;
      case 2:
        return <CalledPagesPageTwoPages />;
      case 3:
      // return <CalledPagesPageThreePages />;

      case 4:
        return <CalledPagesPageFourPages />;

      case 5:
        return <CalledPagesPageFivePages />;
      default:
        return <CalledPagesPageOnePages />;
    }
  };

  return (
    <>
      <div id="vendorVend1">
        {/* <AddProductImage /> */}
        <WrappedAddProductImage />

        <div className=" flex w-[80%] m-auto ">
          <div
            className=" mt-4 md:flex lg:w-[34%] w-0 lg:fixed "
            id="vendorVend2"
          >
            <AddProductSideBar step={step} setStep={setStep} />
          </div>
          <div
            id="vendorVend3"
            className="lg:w-[70%] w-[95%] m-auto  lg:absolute lg:mt-16 lg:right-0"
          >
            {/* {togglePages(step)} */}
            {children}
          </div>

          {/* <AddProductToggle /> */}
        </div>
      </div>
    </>
  );
};

export default RootLayout;
