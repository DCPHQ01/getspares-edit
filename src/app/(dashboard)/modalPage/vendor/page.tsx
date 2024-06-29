"use client";
import AddCompanySidebar from "../../../../components/addCompanyPage/addCompanySidebar";
import CalledPagesPageOnePages from "../../../../components/calledPages/pageOne/page";
import CalledPagesPageTwoPages from "../../../../components/calledPages/pageTwo/page";
import CalledPagesPageThreePages from "../../../../components/calledPages/pageThree/page";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { RootState } from "../../../../redux";
import { setStep } from "../../../../redux/features/company/companySlice";
import {useGetCompanyProfileQuery} from "../../../../redux/features/company/companyQuery";
import UpdateCompanyStepOne from "../../../../components/calledPages/pageOne/UpdateCompanyStepOne";
import UpdateCompanyStepTwo from "../../../../components/calledPages/pageTwo/UpdateCompanyStepTwo";
import UpdateCompanyPageThree from "../../../../components/calledPages/pageThree/UpdateCompanyPageThree";

const number = [1, 2, 3];

const Dashboard = () => {

  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<boolean>(false);
  const currentPage = useAppSelector(
    (state: RootState) => state.company.currentStep
  );

   const { data, isLoading, isError } = useGetCompanyProfileQuery({});


   interface newData {
      name?: string;
      description?: string;
      website?: string;
      companyEmail?: string;
      phoneNumber?: string;
      cac?: string;
      address1?: string;
      address2?:string;
   };

   const togglePages = (steps:number, newData: newData) => {
    switch (steps) {
      case 1:
        return <UpdateCompanyStepOne companyData={newData}/>;
      case 2:
        return <UpdateCompanyStepTwo companyData={newData}/>;
      case 3:
        return <UpdateCompanyPageThree companyData={newData}/>;
      default:
        return <UpdateCompanyStepOne companyData={newData}/>;
    }
  };
  return (
    <div className="flex w-full h-full" id="vendorVend1">
      <div className="hidden md:flex w-[32%]" id="vendorVend2">
        <AddCompanySidebar active={activeTab} setActive={setActiveTab} />
      </div>
      <div id="vendorVend3" className="w-full h-full px-5 md:px-0 md:w-[64%]">
        {togglePages(currentPage + 1, data?.data)}
      </div>

      <div
        id="vendorVend4"
        className="md:hidden fixed bottom-0 left-0 w-full m-auto flex justify-between gap-2 px-8 mt-6 mb-6"
      >
        {number.map((item, index) => (
          <div key={index} className={`${currentPage === index && activeTab
         ? "w-1/3 bg-blue-800 rounded-lg h-3"
         : "bg-gray-500 rounded-lg h-3 w-1/3"}`} id="switchedButton1"/>
        ))}

      </div>
    </div>
  );
};

export default Dashboard;
