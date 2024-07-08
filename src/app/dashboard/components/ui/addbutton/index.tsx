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
        className={`bg-[#095AD3] lg:w-[180px] w-[100%] text-white rounded-full py-2 px-2 `}
      >
        <div className={`flex text-white items-center justify-center`}>
          <MdAdd size={18} />

          <span className="ml-1"> {title}</span>
        </div>
      </button>
    </>
  );
}

export default Index;
