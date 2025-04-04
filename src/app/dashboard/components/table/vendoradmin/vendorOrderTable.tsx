import React, { useState } from "react";
import styles from "../styles.module.css";
import image1 from "../../../../../assets/dashboardAssets/Avatar.png";
import image2 from "../../../../../assets/dashboardAssets/Avatar1.png";
import Image from "next/image";
import Details from "../../../../category/products/viewDetails/[details]/page";
import dayjs from "dayjs";
import { formatAmount44 } from "../../../../../components/utils";
import { formatAmount44ToNaira } from "../../../../../components/utils";
import { MdBusinessCenter } from "react-icons/md";
import { formatAllDateTwo } from "../../utils/utils";
import {ColorRing} from "react-loader-spinner";

type VendorData = {
  orderId: string;
  transactionValue: string;
  buyerName: string;
  dateOrdered: string;
};

interface VendorTableProps {
  data: VendorData[];
  isLoading?: boolean;
  isError?: boolean;
}

const VendorOrderTable = ({ data, isLoading }: VendorTableProps) => {

  const [renderDetails, setRenderDetails] = useState(false);
  const formatDateTime = (dateTime: string) => {
    const date = dayjs(dateTime).format("DD-MM-YYYY");
    const time = dayjs(dateTime).format("HH:mm:ss");
    return { date, time };
  };

  const handleDetails = () => {
    setRenderDetails(!renderDetails);
  };

  return (
    <div id="tableContainer">
      <div
        id="mecaAdminTable"
        className={` w-full max-h-[34rem] overflow-y-auto scrollbar-none ${styles.table}`}
      >
        <table id="adminTable" className={`w-full`}>
          <thead>
            <tr className="truncate">
              <th
                id="totalItemsSoldHeader"
                className={`lg:sticky`}
                style={{ paddingLeft: "4rem" }}
              >
                Order ID
              </th>
              <th
                id="transactionValueHeader"
                className={`lg:sticky`}
                style={{ paddingLeft: "4rem" }}
              >
                Amount
              </th>
              <th
                id="dateTimeJoinedHeader"
                className={`lg:sticky`}
                style={{ paddingLeft: "2rem" }}
              >
                Buyers
              </th>
              <th id="dateTimeJoinedHeader" className={`lg:sticky`}>
                Date & time ordered
              </th>
            </tr>
          </thead>
          <tbody className={`-z-50 h-[25rem]`} >
          {isLoading ? (
              <div className="text-center mt-28 relative lg:left-[100%] lg:right[100%] h-[30rem]">
                <ColorRing
                    visible={true}
                    height="40"
                    width="40"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{
                      position: "absolute",
                      bottom: "75%",
                      left: "44%",
                    }}
                    wrapperClass="color-ring-wrapper"
                    colors={[
                      "#095AD3",
                      "#095AD3",
                      "#095AD3",
                      "#095AD3",
                      "#095AD3",
                    ]}
                />
              </div>
              ) : data.length === 0 ? (
              <div className="h-28 mt-[35rem] relative right-[80%] left-[80%]">
                <div className="flex justify-center">
                  <div className="w-[5.6rem] h-[5.6rem] bg-blue-100 flex justify-center items-center rounded-full">
                    <MdBusinessCenter size={40} color="#0852C0" />
                  </div>
                </div>
                <div className="text-center mt-4">
                  <p className="text-xl">No orders made yet</p>
                  <p className="text-mecaLightGrayText">
                    All your orders will appear here
                  </p>
                </div>
              </div>
            ) : (
              data?.map((d, index) => {
                const { date, time } = formatDateTime(d.dateOrdered);
                const formattedTransactionValue = formatAmount44ToNaira(
                  d.transactionValue
                );

                return (
                  <tr
                    key={index}
                    id={`row_${index}`}
                    className=" truncate"
                    // onClick={handleDetails}
                  >
                    {/* <td id={`companyData_${index}`}>
                  <div
                    className={`flex gap-3 text-[0.88rem] py-[1rem] px-[1.25rem]`}
                  >
                    <Image
                      src={d.avatar}
                      className="object-contain"
                      alt="Avatar"
                      id={`avatar_${index}`}
                    />
                    <div className="mt-2" id={`companyDetails_${index}`}>
                      <div>{d.name}</div>
                    </div>
                  </div>
                </td> */}
                    <td
                      className={`text-[0.88rem] py-[1rem] px-[3.13rem]`}
                      id={`itemsSold_${index}`}
                    >
                      {d.orderId}
                    </td>

                    <td
                      className={`text-[0.88rem] py-[1rem] px-[3.13rem]`}
                      id={`transactionValue_${index}`}
                    >
                      {formattedTransactionValue}
                    </td>

                    <td id={`companyData_${index}`}>
                      <div
                        className={`flex gap-3 text-[0.88rem] py-[1rem] px-[1.25rem]`}
                      >
                        <div id={`companyDetails_${index}`}>
                          <div>{d.buyerName}</div>
                        </div>
                      </div>
                    </td>

                    <td id={`dateOrdered${index}`}>
                      <div className={`text-[0.88rem] py-[1rem] px-[2.75rem]`}>
                        <div id={`date_${index}`}>{formatAllDateTwo(d.dateOrdered)}</div>
                        <div className={`text-[#4B5565]`} id={`time_${index}`}>
                          {time}
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {renderDetails && (
        <div className="absolute top-0 bg-white lg:w-[83%] w-[100%] ml-0 lg:h-[100vh]">
          <Details />
        </div>
      )}
    </div>
  );
};
export default VendorOrderTable;

{
  /* {data?.map((d, index) => (
              const { date, time } = formatDateTime(d.dateJoined); 

              return (
              <tr
                key={index}
                id={`row_${index}`}
                className="cursor-pointer truncate"
                onClick={handleDetails}
              >
                {/* <td id={`companyData_${index}`}>
                  <div
                    className={`flex gap-3 text-[0.88rem] py-[1rem] px-[1.25rem]`}
                  >
                    <Image
                      src={d.avatar}
                      className="object-contain"
                      alt="Avatar"
                      id={`avatar_${index}`}
                    />
                    <div className="mt-2" id={`companyDetails_${index}`}>
                      <div>{d.name}</div>
                    </div>
                  </div>
                </td> */
}

// <td
//   className={`text-[0.88rem] py-[1rem] px-[3.13rem]`}
//   id={`itemsSold_${index}`}
// >
//   {d.orderId}
// </td>

// <td
//   className={`text-[0.88rem] py-[1rem] px-[3.13rem]`}
//   id={`transactionValue_${index}`}
// >
//   {d.amount}
// </td>

// <td id={`companyData_${index}`}>
//   <div
//     className={`flex gap-3 text-[0.88rem] py-[1rem] px-[1.25rem]`}
//   >
{
  /* <Image
                      src={d.avatar}
                      className="object-contain"
                      alt="Avatar"
                      id={`avatar_${index}`}
                    /> */
}
// <div id={`companyDetails_${index}`}>
//   <div>{d.buyers}</div>
{
  /* <div className={`text-[#4B5565]`} id={`email_${index}`}>
                        {d.email}
//                       </div> */
}
//                     </div>
//                   </div>
//                 </td>

//                 <td id={`dateOrdered${index}`}>
//                   <div className={`text-[0.88rem] py-[1rem] px-[2.75rem]`}>
//                     <div id={`date_${index}`}>{date}</div>
//                     <div className={`text-[#4B5565]`} id={`time_${index}`}>
//                       {time}
//                     </div>
//                   </div>
//                 </td>
//               </tr>
//             );
//           })
//         )}
//           </tbody>
//         </table>
//       </div>
//       {renderDetails && (
//         <div className="absolute top-0 bg-white lg:w-[83%] w-[100%] ml-0 lg:h-[100vh]">
//           <Details />
//         </div>
//       )}
//     </div>
//   );
// }; */}
