import React from 'react';
import {MdSearch} from "react-icons/md";

function Index({placeholder = "Search for item"}: {placeholder?: string}) {
    return (
        <>
            <div className={`max-w-[254px] flex items-center gap-2 border text-[#667085] py-2.5 px-3.5 rounded-full border-[#D0D5DD]`}>
                <MdSearch size={20}/>
                <input placeholder={placeholder} className={`focus:outline-none`}/>
            </div>
        </>
    );
}

export default Index;