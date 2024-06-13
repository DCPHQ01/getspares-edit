import React from "react";
import Header from "../../dashboard/components/ui/header";
import SearchBox from "../../dashboard/components/ui/searchbox";
import PeriodRadios from "../../dashboard/components/ui/periodradios";
import AgentTable from "../../dashboard/components/table/mecaadmin/agentTable";
import {
  MdArrowBack,
  MdArrowForward,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";

function Agents() {
  return (
    <>
      <Header
        subtitle={`Keep track of agents and their service ratings.`}
        title={`Agents`}
        amount={`500,607`}
      />
      <div className={`my-[1.25rem] lg:`}>
        <SearchBox placeholder={`Search for agent`} />
      </div>
      <div className={`justify-between items-center mb-[1.25rem] hidden`}>
        <Header
          subtitle={`A quick glance on agents with highest sales on meca`}
          title={`Top performing agents`}
        />
        <PeriodRadios />
      </div>

      <div className="">
        <AgentTable />
        <div className=" flex justify-end mt-10 mb-10 font-bold text-lg">
          {/* <button className="flex gap-x-2 border border-[#EAECF0]  rounded-md h-[36px] w-[36px] pl-1">
            <MdChevronLeft className="mt-1 text-2xl" />
          </button> */}
          <button className="flex gap-x-2 border border-[#EAECF0] rounded-md h-[36px] w-[36px] pl-1">
            <MdChevronRight className="mt-1 text-2xl" />
          </button>
        </div>
      </div>
    </>
  );
}

export default Agents;
