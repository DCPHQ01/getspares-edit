import React from "react";
import Card from "../../../../../components/cards/card";

interface CardProp {
  totalNumberOfAgents: number
  totalNumberOfProductsSold: number
  totalOrderValue: number
  totalNumberOfPartOrdered: number,
  totalNumberOfAgent: number,
  totalTransactionValue: number,
  totalNumberOfVendor: number,
}

interface CardProps {
     cardField: CardProp;
}
const Index:React.FC<CardProps> = ({cardField}) => {
  const cardProps = [
    {
      total: "number of parts ordered",
      amount: cardField.totalNumberOfPartOrdered,
      percentage: 32,
      onClick: () => {
        console.log("View total number of parts ordered");
      },
    },
    {
      total: "number of agents",
      amount: cardField.totalNumberOfAgent || cardField.totalNumberOfAgents,
      percentage: 10,
      onClick: () => {
        console.log("View total number of agents");
      },
    },
    {
      total: "transaction value",
      amount: cardField.totalTransactionValue || cardField.totalOrderValue,
      percentage: 59,
      onClick: () => {
        console.log("View total transaction value");
      },
    },
    {
      total: "number of vendors",
      amount: cardField.totalNumberOfVendor || cardField.totalNumberOfProductsSold,
      percentage: 43,
      onClick: () => {
        console.log("View total number of vendors");
      },
    },
  ];
  return (
    <div
      id="cardContainer"
      className={"lg:mt-[1rem] mb-[1rem]  gap-4 lg:flex justify-between w-full"}
    >
      {cardProps?.map((card, index) => (
        <div id={`card_${index}`} key={index} className="">
          <Card
            total={card.total}
            amount={card.amount}
            percentage={card.percentage}
            onClick={card.onClick}
          />
        </div>
      ))}
    </div>
  );
}

export default Index;


//                 return (
//                   <tr
//                     key={index}
//                     id={row_${index}}
//                     className="cursor-pointer truncate"
//                     onClick={()=> handleDetails(d.orderId)}
//                   >
//                     <td id={companyData_${index}}>
//                       <div className={flex gap-3 text-[0.88rem] py-[1rem] px-[1.25rem]}>
//                         <div id={companyDetails_${index}}>
//                           <div className="mt-2">{d.trackingOrderId}</div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className={text-[0.88rem] py-[1rem] px-[3.13rem]} id={itemsSold_${index}}>
//                       {/* {d.price} */}
//                       {formatAmount(d.amount)}
//                     </td>
//                     <td id={dateJoined_${index}}>
//                       <div className={text-[0.88rem] py-[1rem] px-[2.75rem]}>
//                         <div id={date_${index}}>{date}</div>
//                         <div className={text-[#4B5565]} id={time_${index}}>
//                           {time}
//                         </div>
//                       </div>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//           {selectedOrderId && (
//         <div className="mt-8 ml-10 lg:left-60 right-0 lg:top-0 h-[100vh] lg:w-[84%] w-[100%] lg:h-[100vh]">
//           <div className="bg-white h-[100vh] w-full">
//             <ViewParticularOrderDetailsPage />
//           </div>
//         </div>
//       )}
//         </div>
//       )}
//     </div>
//   );
// };
