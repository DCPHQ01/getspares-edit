"use client";
import AgentOrder from "./AgentOrder";
import AgentOverview from "./AgentOverview";
import AgentVendors from "./AgentVendors";
import Profile from "./Profile";
import { sidePanel } from "../../components/utils/utils";
import { useAppSelector } from "../../../../redux";

const AgentDashboardMobilePage = () => {
  const agentmobile = useAppSelector(
    (state) => state.dashboard.sidePanelButton
  );

  switch (agentmobile) {
    case sidePanel.OVERVIEW:
      return <AgentOverview />;
    case sidePanel.VENDORS:
      return <AgentVendors />;
    case sidePanel.ORDERS:
      return <AgentOrder />;
    case sidePanel.PROFILE:
      return <Profile />;
  }
};

export default AgentDashboardMobilePage;
