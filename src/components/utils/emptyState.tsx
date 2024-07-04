import { MdBusinessCenter } from "react-icons/md";

const EmptyState =({datad}:any) => {
    const data = [];
    return(
            <>
              {
                data.length === 0 ?(
                  <div className="-z-50 flex flex-col justify-center items-center pt-32 leading-10">
                    <div className=" h-28">
                      <div className="w-[5.6rem] h-[5.6rem] bg-blue-100 flex justify-center items-center rounded-full">
                        <MdBusinessCenter
                          style={{ fontSize: "2rem", color: "#0852C0" }}
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      <h1 className="text-xl">No order created yet</h1>
                      <h1 className="text-gray-500">
                        All your orders will appear here
                      </h1>
                    </div>
                  </div>
                ) : <></>
              }
            </>
          )
  
  };
  export default EmptyState;
  