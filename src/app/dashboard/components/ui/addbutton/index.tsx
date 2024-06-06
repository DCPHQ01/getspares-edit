import { MdAdd } from "react-icons/md";
interface IProps {
  title: string;
  long?: boolean;
}
function Index({ title, long }: IProps) {
  return (
    <>
      <button
        id="addButton"
        className={`bg-[#095AD3] lg:w-[250px] w-[100%] text-white rounded-full py-[0.58rem] px-[1.5rem] 
        `}
      >
        <div className={`flex text-white items-center justify-center`}>
          <MdAdd size={18} />

          <span className="ml-5">  {title}</span>
        </div>
      </button>
    </>
  );
}

export default Index;
