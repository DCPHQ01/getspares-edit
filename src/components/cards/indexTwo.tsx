import React from "react";
import Card from "./card";
import { formatAmount4,formatAmount5 } from "../utils";


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
    // {
    //   total: "Total transaction value",
    //   amount: formatAmount5(cardField.totalOrderValue.toString()),
    //   percentage: 0,
    //   onClick: () => {
    //     ("View total transaction value");
    //   },
    // },
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
    <div>
      <div className="w-full">
      <Card 
      total="Total transaction value"
      amount={formatAmount4(String(cardField?.totalOrderValue ?? ""))}
      percentage={59}
      onClick={() => {
        ("View total transaction value");
      }}
      style= {`w-[100%]`}

      />
       </div>
    
    <div id="cardContainer" className={`mt-[1rem] flex justify-between w-full`}>
      {cardProps?.map((card, index) => (
        <div id={`card_${index}`} key={index}>
          <Card
            total={card.total}
            amount={card.amount}
            percentage={card.percentage}
            onClick={card.onClick}
            style= {`lg:w-[40.6vw] lg:h-[90%] h-[90%] `}
          />
        </div>
      ))}
    </div>
    </div>
  );
};

export default Index;
