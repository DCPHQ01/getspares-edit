"use client"
import React from 'react';
import SidePanel from "@/app/dashboard/sidepanel";
import Overview from "@/app/dashboard/overview";
import {useAppSelector} from "@/redux/hooks";
import {roles, sidePanel, userRole} from "@/app/dashboard/utils";
import Vendors from "@/app/dashboard/vendors";
import Agents from "@/app/dashboard/agents";
import Buyers from "@/app/dashboard/buyers";
import Inventory from "@/app/dashboard/inventory";
import Category from "@/app/dashboard/category";

function Page() {
    const SidePanelButton = () => {
        const role: any = userRole;
        let header = "";
        let subheader = "";

        if (role === roles.MECA_ADMIN) {
            header = "Top performing vendors";
            subheader = "A quick glance on vendors with highest sales on meca";
        } else if (role === roles.VENDOR_ADMIN) {
            header = "Top performing parts";
            subheader = "A quick glance on parts with highest sales on meca";
        } else {
            header = "";
            subheader = "";
        }


        const clicked = useAppSelector(state => state.dashboard.sidePanelButton);
        switch(clicked){
            case sidePanel.OVERVIEW:
                return(
                    <Overview header={header!} subheader={subheader}/>
                );
            case sidePanel.VENDORS:
                return(
                    <Vendors/>
                );
            case sidePanel.AGENTS:
                return(
                    <Agents/>
                );
            case sidePanel.BUYERS:
                return(
                    <Buyers />
                );
            case sidePanel.INVENTORY:
                return(
                    <Inventory/>
                );
            case sidePanel.CATEGORY:
                return(
                    <Category/>
                );
            default:
                return null;
        }
    }
    return (
        <div className={`flex`}>
            <SidePanel/>
            <div className={`w-[280px]`}/>
            <div className={`flex-1 my-[52px] ml-[22px] mr-[34px]`}>
                <SidePanelButton/>
            </div>
        </div>
    );
}

export default Page;