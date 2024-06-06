"use client";
import { useAppSelector } from "../../../redux";
import { sidePanel } from "../../dashboard/components/utils/utils";
import AgentsMobile from "./AgentsMobile";
import BuyersMobile from "./BuyersMobile";
import CategoryMobile from "./CategoryMobile";
import InventoryMobile from "./InventoryMobile";
import OverviewMobile from "./OverviewMobile";
import Profiles from "./Profiles";
import VendorsMobile from "./VendorsMobile";

const AdminMobilePage = () => {
  const clicked = useAppSelector((state) => state.dashboard.sidePanelButton);

  switch (clicked) {
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
      return <Profiles />;
    default:
      return null;
  }
  // return <div>
  //   <AgentsMobile/>
  //   <BuyersMobile />
  //   <CategoryMobile />
  //   <InventoryMobile/>
  //   <OverviewMobile/>
  //   <VendorsMobile />
  // </div>;
};

export default AdminMobilePage;
