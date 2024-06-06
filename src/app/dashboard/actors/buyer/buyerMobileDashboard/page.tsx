import BuyerCartMobile from "./BuyerCartMobile";
import BuyerOrderMobile from "./BuyerOrderMobile";
import BuyerOverviewMobile from "./BuyerOverviewMobile";
import Profile from "./Profile";
import { sidePanel } from "../../../../dashboard/components/utils/utils";
import { useAppSelector } from "../../../../../redux";

const BuyerMobileDashboardPage = () => {
  const buyermobile = useAppSelector(
    (state) => state.dashboard.sidePanelButton
  );

  switch (buyermobile) {
    case sidePanel.OVERVIEW:
      return <BuyerOverviewMobile />;
    case sidePanel.ORDERS:
      return <BuyerOrderMobile />;
    case sidePanel.CART:
      return <BuyerCartMobile />;
    case sidePanel.PROFILE:
      return <Profile />;
    default:
      return null;
  }
};

export default BuyerMobileDashboardPage;
