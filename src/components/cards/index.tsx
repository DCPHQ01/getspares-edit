import React from "react";
import Card from "./card";
import { paths } from "../../path/paths";
import { sidePanel } from "../../app/dashboard/components/utils/utils";
import { formatAmount5,formatAmount4 } from "../utils";

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
        ("View total number of parts ordered");
      },
    },
    {
      total: "Number of agents",

      amount:
        cardField.totalNumberOfAgent || cardField.totalNumberOfAgents || 0,
      percentage: 10,

      onClick: () => {
        ("View total number of agents");
      },
    },
    // {
    //   total: "Transaction value",
    //   amount: formatAmount5(cardField?.totalTransactionValue?.toString() ?? "") || cardField.totalOrderValue || 0,
    //   percentage: 59,
    //   onClick: () => {
    //     ("View total transaction value");
    //   },
    // },
    {
      total: "Number of vendors",
      amount:
        cardField.totalNumberOfVendor ||
        cardField.totalNumberOfProductsSold ||
        0,
      percentage: 43,
      onClick: () => {
        ("View total number of vendors");
      },
    },
  ];
  return (
    <div >
      <div className="w-full">
      <Card 
      total="Transaction value"
      amount={formatAmount4(String(cardField?.totalTransactionValue ?? ""))}
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
            style = {`lg:w-[26.5vw] lg:h-[90%] h-[90%] `}
          />
        </div>
      ))}
    </div>
    </div>
  );
};

export default Index;
