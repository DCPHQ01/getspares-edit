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
      <div className="">
        <Header
          subtitle={`Keep track of agents and their service ratings.`}
          title={`Agents`}
          amount={`500,607`}
        />
        <div className={`my-[1.25rem] flex justify-end`}>
          <SearchBox placeholder={`Search for agent`} />
        </div>
      </div>

      <AgentTable />

      <div className="flex justify-end mt-10 text-mecaBluePrimaryColor font-bold text-lg">
        {/* <button className="flex gap-x-2">
            <MdChevronLeft className="mt-1 text-2xl" /> <span>Previous</span>
          </button> */}
        <button className="flex gap-x-2">
          Next
          <span>
            <MdChevronRight className="mt-[2px] text-2xl" />{" "}
          </span>
        </button>
      </div>
    </>
  );
}

export default Agents;
