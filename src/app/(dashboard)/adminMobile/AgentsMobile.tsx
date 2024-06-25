import React, { useState, useEffect } from "react";
import Header from "../../dashboard/components/ui/header";
import SearchBox from "../../dashboard/components/ui/searchbox";
import AgentTable from "../../dashboard/components/table/mecaadmin/agentTable";
import { useGetMecaAdminAgentQuery } from "../../../redux/features/dashboard/mecaAdminQuery";

interface Agent {
  firstName: string;
  email: string;
  quantitySold: number;
  transactionValue: number;
  dateAdded: string;
}
import {
  MdArrowBack,
  MdArrowForward,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";

function AgentsMobile() {
  const { data, isError } = useGetMecaAdminAgentQuery({
    page: 1,
    size: 10,
  });
  const [agentList, setAgentList] = useState<Agent[]>([]);
  console.log("The agent mobile list", data);

  useEffect(() => {
    if (data && Array.isArray(data.data.content)) {
      const list = data.data.content;
      setAgentList(list);
    }
  }, [data]);

  console.log("The agentMobile datas: ", data);

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

      <div className="">
        <AgentTable agentList={agentList} />
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

export default AgentsMobile;
