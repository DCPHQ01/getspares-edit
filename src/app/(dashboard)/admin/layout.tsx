"use client";
import Sidepanel from "../../dashboard/components/sidepanel";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className={`hidden lg:flex flex-col`}>
        <Sidepanel />
        <div
          className={`flex-1 my-[3.25rem] ml-[17.5rem] pl-[1.375rem] mr-[2.125rem] `}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default RootLayout;
