"use client";
import AgentVendorMobile from "./AgentVendorMobile";
import InventoryVendorMobile from "./InventoryVendorMobile";
import OrderVendorMobile from "./OrderVendorMobile";
import OverviewVendorMobile from "./OverviewVendorMobile";
import Profile from "./Profile";
import { sidePanel } from "../../components/utils/utils";
import { useAppSelector } from "../../../../redux";

const VendorMobilePage = () => {
  const vendormobile = useAppSelector(
    (state) => state.dashboard.sidePanelButton
  );

  switch (vendormobile) {
    case sidePanel.OVERVIEW:
      return <OverviewVendorMobile />;
    case sidePanel.INVENTORY:
      return <InventoryVendorMobile />;
    case sidePanel.AGENTS:
      return <AgentVendorMobile />;
    case sidePanel.ORDERS:
      return <OrderVendorMobile />;
    case sidePanel.PROFILE:
      return <Profile />;
  }
};

export default VendorMobilePage;
