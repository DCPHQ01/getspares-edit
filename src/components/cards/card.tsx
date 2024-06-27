import React from "react";

interface CardProps {
  total: string;
  amount: number ;
  percentage: number;
  onClick: () => void;
}
function Card({ total, amount, percentage, onClick }: CardProps) {
  return (
    <div
      id="cardsContainer"
      className={`border border-[#EAECF0] lg:w-[18.5vw] lg:h-[90%] h-[90%] rounded-[0.75rem] mb-5 `}
    >
      <div id="cardContent" className={`m-[24px]`}>
        <p id="totalText" className={`text-[14px] text-[#4B5565] pb-[8px]`}>
          {total}
        </p>
        <p id="amountText" className={`font-[700] text-[30px]`}>
          {amount}
        </p>
      </div>
      <hr id="divider" />
      <div
        id="footer"
        className={`flex px-[24px] py-[11px] items-center justify-between `}
      >
        <p
          id="percentageText"
          className={`text-[12px] py-[2px] px-[8px] rounded-[16px] bg-[#ECFDF3] text-[#085D3A]`}
        >
          Up by {percentage}%
        </p>
        {/* <button
          id="viewAllButton"
          onClick={onClick}
          className={`font-[600] text-[14px] text-[#095AD3] leading-[20px]`}
        >
<<<<<<< HEAD
       
        </button>
=======
          View all
        </button> */}
>>>>>>> 40245a68be0518195005c0a7aa08e73b7af0a0ac
      </div>
    </div>
  );
}

export default Card;
