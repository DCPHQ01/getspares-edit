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
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const [first, setFirst] = useState(false);
  const [last, setLast] = useState(false);
  const { data, isLoading, isError} = useGetMecaAdminAgentQuery({page:page, size:size })
  const [agentList, setAgentList] = useState<Agent[]>([]);


  useEffect(() => {
    if (data && Array.isArray(data.data.content)) {
      const list = data?.data.content;
      const lists = data?.data;
      setAgentList(list);
      setFirst(lists.first)
      setLast(lists.last)
      setPage(data.data?.pageable.pageNumber)
      setSize(lists.pageable?.pageSize)
      setTotalElements(lists.totalElements)
    }
  }, [data]);


  const handleNextPage=()=>{
    if(size === 10){
      setPage(prevPage => prevPage + 1);
    }
  }

  const  handlePreviousPage=()=>{
    if (page > 0) {
      setPage(prevPage => prevPage - 1);
    }
  }

  return (
    <>
      <div className="">
        <Header
          subtitle={`Keep track of agents and their service ratings.`}
          title={`Agents`}
          amount={totalElements}
        />
        <div className={`my-[1.25rem] flex justify-end`}>
          <SearchBox placeholder={`Search for agent`} />
        </div>
      </div>

      <AgentTable agentList={agentList} isLoading={isLoading}/>

      <div className="flex justify-between mt-10 text-mecaBluePrimaryColor font-bold text-lg">
        
          { !first?
            <button className={`flex gap-x-2 `}
            onClick={handlePreviousPage}
            // disabled={first}
            >
              <MdChevronLeft className="mt-1 text-2xl" /> <span>Previous</span>
            </button> : <div>{""}</div> 
          }
         { !last ? <button className={`flex gap-x-2  `}
          onClick={handleNextPage}
          //  disabled={last}
          >
            Next
            <span>
              <MdChevronRight className="mt-[2px] text-2xl" />{" "}
            </span>
          </button> : <div>{""}</div> }

        </div>
    </>
  );
}

export default Agents;
