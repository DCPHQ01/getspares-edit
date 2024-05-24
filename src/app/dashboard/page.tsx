"use client";
import React from "react";
import SidePanel from "../../app/dashboard/sidepanel";
import Overview from "../../app/dashboard/overview";
import { useAppSelector } from "../../redux/hooks";
import { roles, sidePanel } from "../../app/dashboard/utils";
import Vendors from "../../app/dashboard/vendors";
import Agents from "../../app/dashboard/agents";
import Buyers from "../../app/dashboard/buyers";
import Inventory from "../../app/dashboard/inventory";
import Category from "../../app/dashboard/category";
import Orders from "../../app/dashboard/orders";
import withAuth from "../withAuth";
import { useUserRole } from "../hooks/useUserRole";

function Page() {
  const userRole = useUserRole();

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
    } else if (role === roles.AGENTS) {
      header = "Top performing agents";
      subheader = "A quick glance on agents with highest sales on meca";
    }

    const clicked = useAppSelector(
      (state) => state?.dashboard?.sidePanelButton
    );
    switch (clicked) {
      case sidePanel.OVERVIEW:
        return (
          <Overview
            header={header!}
            subheader={subheader}
            overviewRoles={userRole}
          />
        );
      case sidePanel.VENDORS:
        return <Vendors vendorRoles={userRole} />;
      case sidePanel.AGENTS:
        return (
          <Agents
            header={header!}
            subheader={subheader}
            agentRoles={userRole}
          />
        );
      case sidePanel.BUYERS:
        return <Buyers buyerRoles={userRole} />;
      case sidePanel.ORDERS:
        return <Orders />;
      case sidePanel.INVENTORY:
        return <Inventory inventoryRoles={userRole} />;
      case sidePanel.CATEGORY:
        return <Category categoryRoles={userRole} />;
      default:
        return null;
    }
  };
  return (
    <div id={`mainContainer`} className={`flex`}>
      <SidePanel sidePanelRoles={userRole} />
      <div
        id={`contentContainer`}
        className={`flex-1 my-[3.25rem] ml-[17.5rem] pl-[1.375rem] mr-[2.125rem]`}
      >
        <SidePanelButton />
      </div>
    </div>
  );
}

export default withAuth(Page);
