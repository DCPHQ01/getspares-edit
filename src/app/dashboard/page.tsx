import React from 'react';
import SidePanel from "@/app/dashboard/sidepanel";
import Overview from "@/app/dashboard/overview";

function Page() {
    return (
        <div className={`flex`}>
            <SidePanel/>
            <div className={`w-[280px]`}/>
            <div className={`flex-1 my-[52px] ml-[22px] mr-[34px]`}>
                <Overview/>
            </div>
        </div>
    );
}

export default Page;