import React from 'react';
import { cn } from "../../../../utils";
import Greeting from "../../utils/Greeting";

interface IProps {
    title?: string;
    subtitle: string;
    amount?: string;
    name?: string;
}

const Index: React.FC<IProps> = ({ title, subtitle, amount, name }) => {
    return (
        <div>
            <div className="flex items-center gap-0.5">
                <h1
                    id="topHeaderTitle"
                    className={cn(`font-semibold text-[1.5rem] text-[#101828] ${name ? 'text-[1.9rem]' : ''}`)}
                >
                    {name ? (
                        <>
                            <Greeting /> <span>{name}</span>
                        </>
                    ) : (
                        <span>{title}</span>
                    )}
                </h1>
                {amount && (
                    <p className="border inline-block border-[#9AA4B2] text-center text-[#9AA4B2] rounded-full px-3">
                        {amount}
                    </p>
                )}
            </div>

            <p id="topHeaderSubtitle" className="text-[#364152]">
                {subtitle}
            </p>
        </div>
    );
};

export default Index;
