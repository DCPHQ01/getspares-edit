import React from "react";
import Card from "./card";

interface CardProp {
  totalNumberOfAgents: number
  totalNumberOfProductsSold: number
  totalOrderValue: number
}

interface CardProps {
     cardField: CardProp;
}

<<<<<<< HEAD

function Index({ cardProps }: { cardProps: CardProps[] }) {
  console.log("Received cardProps:", cardProps); 
  
=======
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
      amount: cardField.totalNumberOfAgents,
      percentage: 10,
      onClick: () => {
        console.log("View total number of agents");
      },
    },
    {
      total: "transaction value",
      amount: cardField.totalOrderValue,
      percentage: 59,
      onClick: () => {
        console.log("View total transaction value");
      },
    },
    {
      total: "total number of Product sold",
      amount: cardField.totalNumberOfProductsSold,
      percentage: 43,
      onClick: () => {
        console.log("View total number of vendors");
      },
    },
  ];
>>>>>>> 7c710c5ee0bac1ae30f80ac807e0b5f24ac2379d
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
