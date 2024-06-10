"use client";
// import AddCompanySidebar from "../../../../components/addCompanyPage/addCompanySidebar";
import AddProductSideBar from "../../components/addProductPage/addProductSideBar";
import CalledPagesPageOnePages from "../../components/addProductBody/pageOne/page";
import CalledPagesPageTwoPages from "../../components/addProductBody/pageTwo/page";
import CalledPagesPageThreePages from "../../components/addProductBody/pageThree/page";
import { useEffect, useState } from "react";
import Link from "next/link";
import AddProductToggle from "./addProducttoggle";
import CalledPagesPageFivePages from "../../components/addProductBody/pageFive/page";
import CalledPagesPageFourPages from "../../components/addProductBody/pageFour/page";
import AddProductImage from "./addProductImage";

const number = [1, 2, 3];

const Dashboard = () => {
  const [step, setStep] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<boolean>(false); // Default active tab is 'company'
  const goToNextPage = () => {
    setStep(step + 1);
  };

  useEffect(() => {
    setActiveTab(true);
  }, [step]);
  const goToPreviousPage = () => {
    // Navigate to the previous page if it's available
    setStep(step - 1);
  };

  const togglePages = (step: number) => {
    switch (step) {
      case 1:
        return (
          <CalledPagesPageOnePages
            setStep={setStep}
            step={step}
            setActive={setActiveTab}
            active={activeTab}
          />
        );
      case 2:
        return (
          <CalledPagesPageTwoPages
            setStep={setStep}
            step={step}
            setActive={setActiveTab}
            active={activeTab}
          />
        );
      case 3:
        return (
          <CalledPagesPageThreePages
          // setStep={setStep}
          // step={step}
          // setActive={setActiveTab}
          // active={activeTab}
          />
        );

      case 4:
        return (
          <CalledPagesPageFourPages
            setStep={setStep}
            step={step}
            setActive={setActiveTab}
            active={activeTab}
          />
        );

      case 5:
        return (
          <CalledPagesPageFivePages
            setStep={setStep}
            step={step}
            setActive={setActiveTab}
            active={activeTab}
          />
        );
      default:
        return (
          <CalledPagesPageOnePages
            setStep={setStep}
            step={step}
            setActive={setActiveTab}
            active={activeTab}
          />
        );
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
          {togglePages(step)}
        </div>

        <AddProductToggle />
      </div>
    </div>
  );
};

export default Dashboard;
