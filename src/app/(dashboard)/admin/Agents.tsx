import React, { useState, useEffect } from "react";
import Header from "../../dashboard/components/ui/header";
import SearchBox from "../../dashboard/components/ui/searchbox";
import PeriodRadios from "../../dashboard/components/ui/periodradios";
import AgentTable from "../../dashboard/components/table/mecaadmin/agentTable";
import { useGetMecaAdminAgentQuery } from "../../../redux/features/dashboard/mecaAdminQuery";

interface Agent{
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

function Agents() {
  const { data, isLoading, isError} = useGetMecaAdminAgentQuery({page:1, size:10 })
  const [agentList, setAgentList] = useState<Agent[]>([]);
  const [page, setPage] = useState(0)
  const size = 10
  console.log("The agent list", data)

  useEffect(() => {
    if (data && Array.isArray(data.data.content)) {
      const list = data.data.content;
      setAgentList(list);
    }
  }, [data]);

  console.log("The datas: ", data);

  const handlePreviousPage=()=>{
    if(page > 0){
      setPage(prevPage => prevPage + 1);
    }
  }

  const handleNextPage=()=>{
    // if (data.length === size) {
      setPage(prevPage => prevPage + 1);
    // }
  }

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

      <AgentTable agentList={agentList}/>

      <div className="flex gap-[89%] md:gap-[85%] mt-10 text-mecaBluePrimaryColor font-bold text-lg">
          <button className="flex gap-x-2" 
          onClick={handlePreviousPage}
          disabled={page === 0}
          >
            <MdChevronLeft className="mt-1 text-2xl" /> <span>Previous</span>
          </button>
          <button className="flex gap-x-2" 
          onClick={handleNextPage}
          // disabled={data.length === 0}
          >
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
