"use client";
import React from "react";
import SidePanel from "../../app/dashboard/sidepanel";
import Overview from "./meca_admin-dashboardFolder/overview";
import { useAppSelector } from "../../redux/hooks";
import { roles, sidePanel } from "../../app/dashboard/utils";
import Vendors from "./meca_admin-dashboardFolder/vendors";
import Agents from "./meca_admin-dashboardFolder/agents";
import Buyers from "./meca_admin-dashboardFolder/buyers";
import Inventory from "./meca_admin-dashboardFolder/inventory";
import Category from "./meca_admin-dashboardFolder/category";
import Orders from "./vendor_admin-dashboardFolder/orders";
import { JwtPayload as BaseJwtPayload } from "jsonwebtoken";
import * as JWT from "jwt-decode";

interface JwtPayload extends BaseJwtPayload {
  role?: string;
}

function Page() {
  const { user } = useAppSelector((state) => state.user);
  console.log("dashboard ", user);

  let decoded: JwtPayload | null = null;
  try {
    if (
      user?.access_token &&
      typeof user.access_token === "string" &&
      user.access_token.split(".").length === 3
    ) {
      decoded = JWT.jwtDecode(user.access_token);
    }
  } catch (error) {
    console.error("Failed to decode token:", error);
  }

  // const userRole = decoded?.resource_access?.meca?.roles[0];
  const userRole = roles.MECA_ADMIN;
  const names = decoded;

  console.log(names, " names");
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

    const clicked = useAppSelector((state) => state.dashboard.sidePanelButton);
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
        return <Orders buyerRoles={userRole} />;
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

export default Page;
