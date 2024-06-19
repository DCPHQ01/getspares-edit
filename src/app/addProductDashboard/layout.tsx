"use client";
import AddProductSideBar from "../../components/addProductPage/addProductSideBar";
import CalledPagesPageOnePages from "./basicInfo/page";
import CalledPagesPageTwoPages from "./addImages/page";
import CalledPagesPageFourPages from "./specifications/page";
import CalledPagesPageFivePages from "./details/page";
import React, { useState } from "react";

// import AddProductToggle from "./addProducttoggle";
import AddProductImage from "./addProductImage";

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
    <div id="vendorVend1">
      <AddProductImage />

      <div className=" flex w-[80%] m-auto ">
        <div className="hidden mt-4 md:flex w-[34%] fixed " id="vendorVend2">
          <AddProductSideBar step={step} setStep={setStep} />
        </div>
        <div id="vendorVend3" className="w-[70%] absolute mt-16 right-0">
          {/* {togglePages(step)} */}
          {children}
        </div>

        {/* <AddProductToggle /> */}
      </div>
    </div>
  );
};

export default RootLayout;
