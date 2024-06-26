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
  const [page, setPage] = useState(0)
  const size = 10
  const [first, setFirst] = useState(false);
  const [last, setLast] = useState(false);
  const { data, isLoading, isError} = useGetMecaAdminAgentQuery({
    page:page, 
    size:size 
  })
  const [agentList, setAgentList] = useState<Agent[]>([]);
  console.log("The agent mobile list", data);

  useEffect(() => {
    if (data && Array.isArray(data.data.content)) {
      const list = data.data.content;
      const lists = data.data;
      setAgentList(list);
      setFirst(lists.first)
      setLast(lists.last)
    }
  }, [data]);

  console.log("The agentMobile datas: ", data);

  const handleNextPage=()=>{
    if(first){
      setPage(prevPage => prevPage + 1);
    }
  }

  const  handlePreviousPage=()=>{
    if (last) {
      setPage(prevPage => prevPage - 1);
    }
  }

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
        <AgentTable agentList={agentList} isLoading={isLoading}/>
        <div className=" flex justify-end mt-10 mb-10 font-bold text-lg">
          <button className={`flex gap-x-2 border border-[#EAECF0]  rounded-md h-[36px] w-[36px] pl-1  ${!last ? "text-gray-400 cursor-not-allowed" : ""}`}
          onClick={handlePreviousPage}
          disabled={first}
          >
            <MdChevronLeft className="mt-1 text-2xl" /> 
          </button>
          <button className={`flex gap-x-2 border border-[#EAECF0] rounded-md h-[36px] w-[36px] pl-1  ${last ? "text-gray-400 cursor-not-allowed" : ""}`}
            onClick={handleNextPage}
            disabled={last}
          >
            <MdChevronRight className="mt-1 text-2xl" />
          </button>
        </div>
      </div>
    </>
  );
}

export default AgentsMobile;
