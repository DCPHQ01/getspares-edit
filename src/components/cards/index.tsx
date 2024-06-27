import React from "react";
import Card from "./card";
import { paths } from "../../path/paths";
import { sidePanel } from "../../app/dashboard/components/utils/utils";

interface CardProp {
  totalNumberOfAgents?: number
  totalNumberOfProductsSold?: number
  totalOrderValue?: number
  totalNumberOfPartOrdered?: number,
  totalNumberOfAgent?: number,
  totalTransactionValue?: number,
  totalNumberOfVendor?: number,
}

interface CardProps {
     cardField: CardProp;
}

const Index:React.FC<CardProps> = ({cardField}) => {
  const cardProps = [
    {
<<<<<<< HEAD
      total: "Total number of parts ordered",
      amount: cardField.totalNumberOfPartOrdered,
=======
      total: "number of parts ordered",
      amount: cardField.totalNumberOfPartOrdered || 0,
>>>>>>> 40245a68be0518195005c0a7aa08e73b7af0a0ac
      percentage: 32,
      onClick: () => {
        console.log("View total number of parts ordered");
      },
    },
    {
<<<<<<< HEAD
      total: "Total number of agents",
      amount: cardField.totalNumberOfAgent || cardField.totalNumberOfAgents,
=======
      total: "number of agents",

      amount: cardField.totalNumberOfAgent || cardField.totalNumberOfAgents || 0,
>>>>>>> 40245a68be0518195005c0a7aa08e73b7af0a0ac
      percentage: 10,

      onClick: () => {
        console.log("View total number of agents");
      },
    },
    {
<<<<<<< HEAD
      total: "Total transaction value",
      amount: cardField.totalTransactionValue || cardField.totalOrderValue,
=======
      total: "transaction value",
      amount: cardField.totalTransactionValue || cardField.totalOrderValue || 0,
>>>>>>> 40245a68be0518195005c0a7aa08e73b7af0a0ac
      percentage: 59,
      onClick: () => {
        console.log("View total transaction value");
      },
    },
    {
<<<<<<< HEAD
      total: "Total number of Product sold",
      amount: cardField.totalNumberOfVendor || cardField.totalNumberOfProductsSold,
=======
      total: "total number of Product sold",
      amount: cardField.totalNumberOfVendor || cardField.totalNumberOfProductsSold || 0,
>>>>>>> 40245a68be0518195005c0a7aa08e73b7af0a0ac
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


