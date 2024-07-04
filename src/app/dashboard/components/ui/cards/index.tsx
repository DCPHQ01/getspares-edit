import React from "react";
import Card from "../../../../../components/cards/card";

interface CardProp {
  totalNumberOfAgent: number;
  totalNumberOfPartOrdered: number;
  totalTransactionValue: number;
  totalNumberOfVendor: number;
}

interface CardProps {
  cardField: CardProp;
}

const Index: React.FC<CardProps> = ({ cardField }) => {
  const cardProps = [
    {
      total: "number of parts ordered",
      amount: cardField.totalNumberOfPartOrdered,
      percentage: 32,
      onClick: () => {
        ("View total number of parts ordered");
      },
    },
    {
      total: "number of agents",
      amount: cardField.totalNumberOfAgent,
      percentage: 10,
      onClick: () => {
        ("View total number of agents");
      },
    },
    {
      total: "transaction value",
      amount: cardField.totalTransactionValue,
      percentage: 59,
      onClick: () => {
        ("View total transaction value");
      },
    },
    {
      total: "number of vendors",
      amount: cardField.totalNumberOfVendor,
      percentage: 43,
      onClick: () => {
        ("View total number of vendors");
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
          />
        </div>
      ))}
    </div>
  );
};

export default Index;
