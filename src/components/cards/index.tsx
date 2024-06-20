import React from "react";
import Card from "./card";

// const cardProps = [
//   {
//     total: "number of parts ordered",
//     amount: 2250,
//     percentage: 32,
//     onClick: () => {
//       console.log("View total number of parts ordered");
//     },
//   },
//   {
//     total: "number of agents",
//     amount: 1475,
//     percentage: 10,
//     onClick: () => {
//       console.log("View total number of agents");
//     },
//   },
//   {
//     total: "transaction value",
//     amount: 1250,
//     percentage: 59,
//     onClick: () => {
//       console.log("View total transaction value");
//     },
//   },
//   {
//     total: "number of vendors",
//     amount: 1280,
//     percentage: 43,
//     onClick: () => {
//       console.log("View total number of vendors");
//     },
//   },
// ];

type CardProps = {
  total: string;
  amount: number;
  percentage: number;
  onClick: () => void;
};


function Index({ cardProps }: { cardProps: CardProps[] }) {
  console.log("Received cardProps:", cardProps); 
  
  return (
    <div id="cardContainer" className={`mt-[1rem] flex justify-between w-full`}>
      {cardProps?.map((card: CardProps, index: number) => (
        <div id={`card_${index}`} key={index}>
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
