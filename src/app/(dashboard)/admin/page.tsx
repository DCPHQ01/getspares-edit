"use client";
import React from "react";
import Sidepanel from "../../dashboard/components/sidepanel";
import Overview from "./Overview";
import Vendors from "./Vendors";
import Agents from "./Agents";
import Buyers from "./Buyers";
import Inventory from "./Inventory";
import Category from "./Category";
import { useAppSelector } from "../../../redux";
import { sidePanel } from "../../dashboard/components/utils/utils";
import Profile from "./Profile";
import withAuth from "../../withAuth";

function Page() {
  const SidePanelButton = () => {
    const clicked = useAppSelector((state) => state.dashboard.sidePanelButton);
    switch (clicked) {
      case sidePanel.OVERVIEW:
        return <Overview />;
      case sidePanel.VENDORS:
        return <Vendors />;
      case sidePanel.AGENTS:
        return <Agents />;
      case sidePanel.BUYERS:
        return <Buyers />;
      case sidePanel.INVENTORY:
        return <Inventory />;
      case sidePanel.CATEGORY:
        return <Category />;
      case sidePanel.PROFILE:
        return <Profile />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className={`flex`}>
        <Sidepanel />
        <div
          className={`flex-1 my-[3.25rem] ml-[17.5rem] pl-[1.375rem] mr-[2.125rem]`}
        >
          <SidePanelButton />
        </div>
      </div>
    </>
  );
}

export default withAuth(Page);
