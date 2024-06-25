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
      amount: 2250,
      percentage: 32,
      onClick: () => {
        console.log("View total number of parts ordered");
      },
    },
    {
      total: "number of agents",
      amount: 1475,
      percentage: 10,
      onClick: () => {
        console.log("View total number of agents");
      },
    },
    {
      total: "transaction value",
      amount: 1250,
      percentage: 59,
      onClick: () => {
        console.log("View total transaction value");
      },
    },
    {
      total: "number of vendors",
      amount: 1280,
      percentage: 43,
      onClick: () => {
        console.log("View total number of vendors");
      },
    },
  ];
  return (
    <div
      id="cardContainer"
      className={`lg:mt-[1rem] mb-[1rem]  gap-4 lg:flex justify-between w-full`}
    >
      {cardProps?.map((card, index) => (
        <div id={`card_${index}`} key={index} className="">
          <Card
            amount={card.amount}
            percentage={card.percentage}
            total={card.total}
            onClick={card.onClick}
          />
        </div>
      ))}
    </div>
  );
}

export default Index;
