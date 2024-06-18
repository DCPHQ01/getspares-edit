"use client";
import React, { useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

function Index() {
  const [clicked, setClicked] = useState(false);

  const items = [
    "Bumper",
    "Air filters",
    "Bonnets",
    "Tractor parts",
    "Bulldozer parts",
    "Brakes",
    "Ball joints",
    "Back mirrors",
    "Bonnets",
    "Tractor parts",
    "Bulldozer parts",
  ];

  const handleButtonClicked = () => {
    setClicked(!clicked);
  };

  const DropdownMenu = () => {
    return (
      <div
        className={`absolute mt-2 w-[17rem] cursor-pointer p-1 shadow-[0_2px_8px_0_rgba(0,0,0,0.2)] rounded-[8px] bg-white `}
      >
        <div className={`mx-auto p-[0.75rem] `}>
          {items.map((item, index) => (
            <button
              key={index}
              className={`border inline-block border-[#9AA4B2] text-[0.75rem] hover:bg-[#EFF4FF] hover:border-white text-center text-[#4B5565] rounded-full px-3 py-1 mx-1 my-2`}
            >
              {item}
            </button>
          ))}
        </div>
        <hr className={`border border-[#CDD5DF] mx-3`} />
        <div className={`mx-3 flex justify-between my-[1rem]`}>
          <button
            className={`border border-[#095AD3] text-[#095AD3] py-[0.4rem] px-[1.5rem] rounded-full`}
          >
            Reset
          </button>
          <button
            onClick={handleButtonClicked}
            className={`bg-[#095AD3] text-white py-[0.4rem] px-[1.5rem] rounded-full`}
          >
            Apply
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="relative inline-block -z-50">
      <button
        className={`bg-[#F8FAFC] border cursor-pointer border-[#CDD5DF] inline-block rounded-full px-3 py-2 mb-[0.5rem]`}
        onClick={handleButtonClicked}
      >
        <div className={`flex items-center gap-2 `}>
          <p>Categories</p>
          <p>
            {clicked ? <MdExpandLess size={18} /> : <MdExpandMore size={18} />}
          </p>
        </div>
      </button>
      {clicked && <DropdownMenu />}
    </div>
  );
}

export default Index;
