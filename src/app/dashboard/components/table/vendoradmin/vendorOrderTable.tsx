import React, { useState } from "react";
import styles from "../styles.module.css";
import image1 from "../../../../../assets/dashboardAssets/Avatar.png";
import image2 from "../../../../../assets/dashboardAssets/Avatar1.png";
import Image from "next/image";
import Details from "../../../../category/products/viewDetails/[details]/page";
import dayjs from "dayjs";
import { formatAmount } from "../../../../../components/utils";

type VendorData = {
  orderId: string;
  amount: string;
  buyers: number;
  dateOrdered: string;
};

interface VendorTableProps {
  data: VendorData[];
  isLoading?: boolean;
  isError?: boolean;
}

const VendorOrderTable = ({ data }: VendorTableProps) => {
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
          <tbody>
            {data?.map((d, index) => {
              const { date, time } = formatDateTime(d.dateOrdered);
              const formattedTransactionValue = formatAmount(d.amount);

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
                    {d.amount}
                  </td>

                  <td id={`companyData_${index}`}>
                    <div
                      className={`flex gap-3 text-[0.88rem] py-[1rem] px-[1.25rem]`}
                    >
                      <div id={`companyDetails_${index}`}>
                        <div>{d.buyers}</div>
                      </div>
                    </div>
                  </td>

                  <td id={`dateOrdered${index}`}>
                    <div className={`text-[0.88rem] py-[1rem] px-[2.75rem]`}>
                      <div id={`date_${index}`}>{date}</div>
                      <div className={`text-[#4B5565]`} id={`time_${index}`}>
                        {time}
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
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
