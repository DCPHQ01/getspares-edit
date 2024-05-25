import React from 'react';
import {MdSort} from "react-icons/md";

function Index() {
    return (
        <button className={`flex items-center gap-1 text-[#095AD3]`}>
            <MdSort size={18}/>
            <p>Sort by</p>
        </button>
    );
}

export default Index;