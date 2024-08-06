"use client";
import Sidepanel from "../dashboard/components/sidepanel";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div>
        <div className="hidden lg:flex flex-col">
          <Sidepanel />
        </div>
        <div
          className={`flex-1 my-[3.25rem] lg:ml-[17.5rem] pl-[1.375rem] mr-[2.125rem] `}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default RootLayout;
