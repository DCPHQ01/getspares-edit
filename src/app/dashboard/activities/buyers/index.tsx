import React from "react";
import { roles } from "../../../app/dashboard/utils";

import { MdSearch } from "react-icons/md";

interface IProps {
  buyerRoles: string;
}

function Index({ buyerRoles }: IProps) {
  const role: any = buyerRoles;

  return (
    <div className="">
      <div>
        <div className="flex gap-x-2 ">
          <h1
            id="welcomeTitle"
            className={`font-semibold text-[1.9rem] text-[#101828]`}
          >
            Buyers
          </h1>
          <div className="w-16 h-6 rounded-full border-2 mt-3">
            <p className="text-xs text-center mt-1 ">430,607</p>
          </div>
        </div>
        <p id="welcomeText" className={`text-[#364152]`}>
          Keep track of buyers, items bought and their transaction values.
        </p>
      </div>

      <div
        className="flex mt-4 items-center gap-x-2 relative"
        id="searchDesktop"
      >
        <MdSearch size={24} className="absolute left-1 text-mecaGoBackArrow" />
        <input
          id="inputSearchDesktop"
          placeholder="Search for buyers"
          className="border-2 w-[253px]  h-[44px] rounded-full px-9 outline-none"
        />
      </div>
    </div>
  );
}

export default Index;
