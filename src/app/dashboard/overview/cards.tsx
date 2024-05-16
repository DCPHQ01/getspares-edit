import React from 'react';

interface IProps{
    total: string
    amount: number;
    percentage: number;
    onClick: ()=> void;
}
function Cards({total, amount, percentage, onClick}: IProps) {
    return (
        <div id="cardsContainer" className={`border border-[#EAECF0] w-[17.5rem] min-h-[9.63rem] rounded-[0.75rem]`}>
            <div id="cardContent" className={`m-[24px]`}>
                <p id="totalText" className={`text-[14px] text-[#4B5565] pb-[8px]`}>Total {total}</p>
                <p id="amountText" className={`font-[700] text-[30px]`}>{amount}</p>
            </div>
            <hr id="divider" />
            <div id="footer" className={`flex px-[24px] py-[11px] items-center justify-between `}>
                <p id="percentageText" className={`text-[12px] py-[2px] px-[8px] rounded-[16px] bg-[#ECFDF3] text-[#085D3A]`}>Up by {percentage}%</p>
                <button id="viewAllButton" onClick={onClick} className={`font-[600] text-[14px] text-[#095AD3] leading-[20px]`}>View all</button>
            </div>
        </div>
    );
}


export default Cards;