import React from "react";
import { cn } from "../../../../../components/utils";
import Greeting from "../../utils/Greeting";
import { GoArrowUpRight } from "react-icons/go";
import Link from "next/link";


interface IProps {
  title?: string;
  subtitle?: string;
  amount?: number | string;
  name?: string;
  website?: string | null;
}

const Index: React.FC<IProps> = ({ title, subtitle, amount, name, website }) => {
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
              <Greeting />, <span className="capitalize">{name}</span>
            </>
          ) : (
            <span>{title}</span>
          )}
        </h1>
          {amount !== 0 && amount !== undefined && <p className="border inline-block border-[#9AA4B2] text-center text-[#9AA4B2] rounded-full px-3 ml-2">
            {amount}
         </p> }

      </div>

      <p id="topHeaderSubtitle" className={`text-[#4B5565]`}>
        {subtitle !== 'null' && subtitle}
      </p>
      <div className="flex items-center gap-0.5">
        <p id="topHeaderSubtitle" className={`text-mecaBluePrimaryColor`}>
          {website !== 'null' && website}
        </p>
        {/* <GoArrowUpRight className="ml-1 text-mecaBluePrimaryColor" /> */}
        {website && (
          website !== 'null' && (<Link href={website} passHref>
            {/* <a target="_blank" rel="noopener noreferrer"> */}
              <GoArrowUpRight className="ml-1 text-mecaBluePrimaryColor" />
            {/* </a> */}
          </Link>)
        )}
      </div>
    </>
  );
};

export default Index;
