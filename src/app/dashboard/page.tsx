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
import Orders from "@/app/dashboard/orders";

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
            case sidePanel.ORDERS:
                return(
                    <Orders />
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
        <div id={`mainContainer`} className={`flex`}>
            <SidePanel/>
            <div id={`contentContainer`} className={`flex-1 my-[3.25rem] ml-[17.5rem] pl-[1.375rem] mr-[2.125rem]`}>
                <SidePanelButton/>
            </div>
        </div>
    );
}

export default Page;