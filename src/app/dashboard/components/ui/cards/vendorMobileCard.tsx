import React from "react";
import Card from "../../../../../components/cards/card";
import { formatAmount4 } from "../../../../../components/utils";

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
      total: "Total transaction value",
      amount: formatAmount4(String(cardField.totalOrderValue)),
      percentage: 59,
      onClick: () => {
        ("View total transaction value");
      },
    },
    {
      total: "Total number of agents",
      amount: cardField.totalNumberOfAgents,
      percentage: 32,
      onClick: () => {
        ("View total number of parts ordered");
      },
    },
    {
      total: "number of agents",
      amount: cardField.totalNumberOfProductsSold,
      percentage: 10,
      onClick: () => {
        ("View total number of agents");
      },
    },
  
   
  ];

  return (
    <div
      id="cardContainer"
      className={`lg:mt-[1rem] mb-[1rem] gap-4 lg:flex justify-between w-full`}
    >
      {cardProps?.map((card, index) => (
        <div id={`card_${index}`} key={index} className="">
          <Card
            total={card.total}
            amount={card.amount}
            percentage={card.percentage}
            onClick={card.onClick}
            style={``}
          />
        </div>
      ))}
    </div>
  );
};

export default Index;
