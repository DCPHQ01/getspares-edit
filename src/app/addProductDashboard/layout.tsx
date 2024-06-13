"use client";
// import AddCompanySidebar from "../../../../components/addCompanyPage/addCompanySidebar";
import AddProductSideBar from "../../components/addProductPage/addProductSideBar";
import CalledPagesPageOnePages from "../../components/addProductBody/pageOne/page";
import CalledPagesPageTwoPages from "../../components/addProductBody/pageTwo/page";
import CalledPagesPageThreePages from "../../components/addProductBody/pageThree/page";
import React, { useState } from "react";

// import AddProductToggle from "./addProducttoggle";
import CalledPagesPageFivePages from "../../components/addProductBody/pageFive/page";
import CalledPagesPageFourPages from "../../components/addProductBody/pageFour/page";
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
        return <CalledPagesPageThreePages />;

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
        <div className="hidden mt-48 md:flex w-[34%] fixed " id="vendorVend2">
          <AddProductSideBar step={step} setStep={setStep} />
        </div>
        <div id="vendorVend3" className="w-[70%] absolute mt-56   right-0">
          {/* {togglePages(step)} */}
          {children}
        </div>

        {/* <AddProductToggle /> */}
      </div>
    </div>
  );
};

export default RootLayout;
