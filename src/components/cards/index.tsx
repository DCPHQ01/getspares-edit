import React from "react";
import Card from "./card";
import { paths } from "../../path/paths";
import { sidePanel } from "../../app/dashboard/components/utils/utils";

interface CardProp {
  totalNumberOfAgents?: number;
  totalNumberOfProductsSold?: number;
  totalOrderValue?: number;
  totalNumberOfPartOrdered?: number;
  totalNumberOfAgent?: number;
  totalTransactionValue?: number;
  totalNumberOfVendor?: number;
}

interface CardProps {
  cardField: CardProp;
}

const Index: React.FC<CardProps> = ({ cardField }) => {
  const cardProps = [
    {
      total: "Number of parts ordered",
      amount: cardField.totalNumberOfPartOrdered || 0,
      percentage: 32,
      onClick: () => {
        console.log("View total number of parts ordered");
      },
    },
    {
      total: "Number of agents",

      amount:
        cardField.totalNumberOfAgent || cardField.totalNumberOfAgents || 0,
      percentage: 10,

      onClick: () => {
        console.log("View total number of agents");
      },
    },
    {
      total: "Transaction value",
      amount: cardField.totalTransactionValue || cardField.totalOrderValue || 0,
      percentage: 59,
      onClick: () => {
        console.log("View total transaction value");
      },
    },
    {
      total: "Number of vendors",
      amount:
        cardField.totalNumberOfVendor ||
        cardField.totalNumberOfProductsSold ||
        0,
      percentage: 43,
      onClick: () => {
        console.log("View total number of vendors");
      },
    },
  ];
  return (
    <div id="cardContainer" className={`mt-[1rem] flex justify-between w-full`}>
      {cardProps?.map((card, index) => (
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
};

export default Index;



