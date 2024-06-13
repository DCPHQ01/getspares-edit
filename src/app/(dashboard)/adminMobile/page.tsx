"use client";
import { useAppSelector } from "../../../redux";
import { sidePanel } from "../../dashboard/components/utils/utils";
import AgentsMobile from "./AgentsMobile";
import BuyersMobile from "./BuyersMobile";
import CategoryMobile from "./CategoryMobile";
import InventoryMobile from "./InventoryMobile";
import OverviewMobile from "./OverviewMobile";
import Profile from "./Profile";
import VendorsMobile from "./VendorsMobile";

const AdminMobilePage = () => {
  const mecaAdmin = useAppSelector((state) => state.dashboard.sidePanelButton);

  switch (mecaAdmin) {
    case sidePanel.OVERVIEW:
      return <OverviewMobile />;
    case sidePanel.VENDORS:
      return <VendorsMobile />;
    case sidePanel.AGENTS:
      return <AgentsMobile />;
    case sidePanel.BUYERS:
      return <BuyersMobile />;
    case sidePanel.INVENTORY:
      return <InventoryMobile />;
    case sidePanel.CATEGORY:
      return <CategoryMobile />;
    case sidePanel.PROFILE:
      return <Profile />;
  }
};

export default AdminMobilePage;
