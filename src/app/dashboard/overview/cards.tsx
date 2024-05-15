import React from 'react';

interface IProps{
    total: string
    amount: number;
    percentage: number;
    onClick: ()=> void;
}
function Cards({total, amount, percentage, onClick}: IProps) {
    return (
        <div className={`border border-[#EAECF0] w-[280px] min-h-[154px] rounded-[12px]`}>
            <div className={`m-[24px]`}>
                <p className={`text-[14px] text-[#4B5565] pb-[8px]`}>Total {total}</p>
                <p className={`font-[700] text-[30px]`}>{amount}</p>
            </div>
            <hr/>
            <div className={`flex px-[24px] py-[11px] items-center justify-between `}>
                <p className={`text-[12px] py-[2px] px-[8px] rounded-[16px] bg-[#ECFDF3] text-[#085D3A]`}>Up by {percentage}%</p>
                <button onClick={onClick} className={`font-[600] text-[14px] text-[#095AD3] leading-[20px]`}>View all</button>
            </div>
        </div>

    );
}

export default Cards;