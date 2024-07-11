import React from "react";
import Card from "./card";
import { formatAmount4 } from "../utils";

interface CardProp {
  totalNumberOfAgents: number;
  totalNumberOfProductsSold: number;
  totalOrderValue: number;
}

interface CardProps {
  cardField: CardProp;
}

const Index: React.FC<CardProps> = ({ cardField }) => {
  const cardProps = [
    {
      total: "Total number of agents",
      amount: cardField.totalNumberOfAgents,
      percentage: 0,
      onClick: () => {
        ("View total number of agents");
      },
    },
    {
      total: "Total transaction value",
      // amount: cardField.totalOrderValue,
      amount: formatAmount4(String(cardField.totalOrderValue)),
      percentage: 0,
      onClick: () => {
        ("View total transaction value");
      },
    },
    {
      total: "Total number of product sold",
      amount: cardField.totalNumberOfProductsSold,
      percentage: 0,
      onClick: () => {
        ("View total number of vendors");
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
