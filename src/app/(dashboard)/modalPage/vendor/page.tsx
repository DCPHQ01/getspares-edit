"use client";
import AddCompanySidebar from "../../../../components/addCompanyPage/addCompanySidebar";
import CalledPagesPageOnePages from "../../../../components/calledPages/pageOne/page";
import CalledPagesPageTwoPages from "../../../../components/calledPages/pageTwo/page";
import CalledPagesPageThreePages from "../../../../components/calledPages/pageThree/page";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { RootState } from "../../../../redux";
import { setStep } from "../../../../redux/features/company/companySlice";

const number = [1, 2, 3];

const Dashboard = () => {
  // const step = company.step;
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<boolean>(false);
  const currentPage = useAppSelector(
    (state: RootState) => state.company.currentStep
  );

  const togglePages = (steps: number) => {
    switch (steps) {
      case 1:
        return <CalledPagesPageOnePages />;
      case 2:
        return <CalledPagesPageTwoPages />;
      case 3:
        return <CalledPagesPageThreePages />;
      default:
        return <CalledPagesPageOnePages />;
    }
  };
  return (
    <div className="flex w-full" id="vendorVend1">
      <div className="hidden md:flex w-[32%]" id="vendorVend2">
        <AddCompanySidebar active={activeTab} setActive={setActiveTab} />
      </div>
      <div id="vendorVend3" className="w-[64%]">
        {togglePages(currentPage + 1)}
      </div>

      <div
        id="vendorVend4"
        className="md:hidden fixed bottom-0 left-0 w-full m-auto flex justify-between gap-2 px-8 mt-6 mb-6"
      >
        {/* <div className="mt-8 flex items-center justify-evenly gap-4 h-[8px] w-full"> */}
        {number.map((item, index) => (
          <div
            key={index}
            className={`
            ${
              currentPage === index && activeTab
                ? "w-1/3 bg-blue-800 rounded-lg h-3"
                : "bg-gray-500 rounded-lg h-3 w-1/3"
            }`}
            // className="w-1/3 bg-blue-800 rounded-lg h-3"
            id="switchedButton1"
          ></div>
        ))}

        {/* <div
          className={`
            ${
              activeTab
                ? "w-1/3 bg-blue-800 rounded-lg h-3"
                : "bg-gray-500 rounded-lg h-3 w-1/3"
            }`}
          // onClick={() => setActiveTab(step)}
          // className="h-3 w-1/3 bg-blue-800 rounded-lg"
          id="switchedButton2"
        ></div> */}
        {/* <div
          className={`
            ${
              activeTab
                ? "w-1/3 bg-blue-800 rounded-lg h-3"
                : "bg-gray-500 rounded-lg h-3 w-1/3"
            }`}
          // onClick={() => setActiveTab("preview")}
          // className="h-3 w-1/3 bg-blue-800 rounded-lg"
          id="switchedButton3"
        ></div> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
