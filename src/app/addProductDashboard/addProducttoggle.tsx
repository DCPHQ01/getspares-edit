
"use client";
import CalledPagesPageOnePages from "../../components/addProductBody/pageOne/page";
import CalledPagesPageTwoPages from "../../components/addProductBody/pageTwo/page";
// import CalledPagesPageThreePages from "../../components/addProductBody/pageThree/page";
import { useEffect, useState } from "react";
import CalledPagesPageFourPages from "../../components/addProductBody/pageFour/page";
import CalledPagesPageFivePages from "../../components/addProductBody/pageFive/page";
        
const number = [1, 2, 3];

const AddProductToggle = () => {
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
    <div
      id="vendorVend4"
      className="md:hidden fixed bottom-0 left-0 w-full m-auto flex justify-between gap-2 px-8 mt-6 mb-6"
    >
      <div className="">
        {number.map((item, index) => (
          <div
            key={index}
            className={`
            ${
              step - 1 === index && activeTab
                ? "w-1/3 bg-blue-800 rounded-lg h-3"
                : "bg-gray-500 rounded-lg h-3 w-1/3"
            }`}
            id="switchedButton1"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default AddProductToggle;
