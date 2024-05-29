"use client";
import React from 'react';
import {useAppSelector} from "../../../../redux";
import Sidepanel from "../../components/sidepanel";
import {sidePanel} from "../../components/utils/utils";
import Overview from "./Overview";
import Agents from "./Agents";
import Orders from "./Orders";
import Inventory from "./Inventory";
import Profile from './Profile';


function Index() {

    const SidePanelButton = () => {
        const clicked = useAppSelector((state) => state.dashboard.sidePanelButton);
        switch (clicked) {
          case sidePanel.OVERVIEW:
            return <Overview />;
          case sidePanel.AGENTS:
            return <Agents />;
          case sidePanel.ORDERS:
            return <Orders />;
          case sidePanel.INVENTORY:
            return <Inventory />;
          case sidePanel.PROFILE:
            return <Profile />;
          default:
            return null;
        }
    };

    return (
        <>
            <div className={`flex`}>
                <Sidepanel/>
                <div
                    className={`flex-1 my-[3.25rem] ml-[17.5rem] pl-[1.375rem] mr-[2.125rem]`}
                >
                    <SidePanelButton/>
                </div>
            </div>
        </>
    );
}

export default Index;