"use client";
import React from 'react';
import {useAppSelector} from "../../../../redux";
import Sidepanel from "../../components/sidepanel";
import {sidePanel} from "../../components/utils/utils";
import Overview from "./Overview";
import Vendors from "./Vendors";
import Orders from "./Orders";


function Index() {

    const SidePanelButton = () => {
        const clicked = useAppSelector((state) => state.dashboard.sidePanelButton);
        switch (clicked) {
            case sidePanel.OVERVIEW:
                return <Overview/>;
            case sidePanel.VENDORS:
                return <Vendors/>;
            case sidePanel.ORDERS:
                return <Orders/>;
            default:
                return null;
        }
    };

    return (
        <>
            <div className={`flex`}>
                <Sidepanel/>
                <div className={`flex-1 my-[3.25rem] ml-[17.5rem] pl-[1.375rem] mr-[2.125rem]`}>
                    <SidePanelButton/>
                </div>
            </div>
            );
        </>
    );
}

export default Index;