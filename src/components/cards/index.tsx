import React from "react";
import Card from "./card";
import { paths } from "../../path/paths";
import { sidePanel } from "../../app/dashboard/components/utils/utils";

interface CardProp {
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
      total: "Total number of parts ordered",
      amount: cardField.totalNumberOfPartOrdered,
      percentage: 32,
      onClick: () => {
        console.log("View total number of parts ordered");
      },
    },
    {
      total: "Total number of agents",
      amount: cardField.totalNumberOfAgent ,
      percentage: 10,

      onClick: () => {
        console.log("View total number of agents");
      },
    },
    {
      total: "Total transaction value",
      amount: cardField.totalTransactionValue ,
      percentage: 59,
      onClick: () => {
        console.log("View total transaction value");
      },
    },
    {
      total: "Total number of Product sold",
      amount: cardField.totalNumberOfVendor ,
      percentage: 43,
      onClick: () => {
        console.log("View total number of vendors");
      },
    },
  ];
  return (
    <div id="cardContainer" className={`mt-[1rem] flex justify-between w-full`}>
      {cardProps?.map((card ,index) => (
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


