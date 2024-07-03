import React from "react";
import { cn } from "../../../../../components/utils";
import Greeting from "../../utils/Greeting";

interface IProps {
  title?: string;
  subtitle?: string;
  amount?: number | string;
  name?: string;
}

const Index: React.FC<IProps> = ({ title, subtitle, amount, name }) => {
  return (
    <>
      <div className="flex items-center gap-0.5">
        <h1
          id="topHeaderTitle"
          className={cn(
            `font-semibold text-[1.5rem] text-[#101828] ${
              name ? "text-[1.9rem]" : ""
            }`
          )}
        >
          {name ? (
            <>
              <Greeting />,
              &nbsp;<span>{name}</span>
            </>
          ) : (
            <span>{title}</span>
          )}
        </h1>
         {amount && <p className="border inline-block border-[#9AA4B2] text-center text-[#9AA4B2] rounded-full px-3 ml-2">
            {amount}
         </p> }

      </div>

      <p id="topHeaderSubtitle" className={`text-[#4B5565]`}>
        {subtitle}
      </p>
    </>
  );
};

export default Index;
