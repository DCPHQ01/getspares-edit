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
        className={`bg-[#095AD3] text-white rounded-full py-[0.38rem] px-[1.5rem] ${
          long && `w-full`
        }`}
      >
        <div className={`flex text-white items-center justify-center`}>
          <MdAdd size={18} />
          {title}
        </div>
      </button>
    </>
  );
}

export default Index;
