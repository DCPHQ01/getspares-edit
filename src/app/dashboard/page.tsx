
import React from 'react';
import SearchBox from './components/ui/searchbox'
import AddButton from './components/ui/addbutton'
import TopHeader from "./components/ui/header"
import SortButton from "./components/ui/sortbutton"
import Categories from "./components/ui/categories";
import BuyerCard from "./components/ui/buyercard";
import CartItems from "./components/ui/cartitems";
import Overview from "./actors/mecaadmin/Overview";
function Page() {
  return (
      <div>
        {/*<p className={`pb-16`}>*/}
        {/*  DASHBOARD*/}
        {/*</p>*/}
        {/*<SearchBox/>*/}
        {/*  <AddButton title={'Add Something'}/>*/}
        {/*  <TopHeader subtitle={`See wetin dey shele`} name={`Kunle`}/>*/}
        {/*  <SortButton/>*/}
        {/*  <Categories/>*/}
        {/*  <BuyerCard/>*/}
        {/*  <CartItems/>*/}
          <Overview/>
      </div>
  );
}

export default Page;
// "use client";
// import React from "react";
// import SidePanel from "./activities/sidepanel";
// import Overview from "./activities/overview";
// import { useAppSelector } from "../../redux/hooks";
// import Vendors.tsx from "./activities/vendors";
// import Agents from "./activities/agents";
// import Buyers from "./activities/buyers";
// import Inventory from "./activities/inventory";
// import Category from "./activities/category";
// import Orders from "./activities/orders";
// import { JwtPayload as BaseJwtPayload } from "jsonwebtoken";
// import * as JWT from "jwt-decode";
// import {roles, sidePanel} from "./activities/utils/utils";
//
// interface JwtPayload extends BaseJwtPayload {
//   role?: string;
// }
//
// function Page() {
//   const { user } = useAppSelector((state) => state.user);
//   console.log("dashboard ", user);
//
//   let decoded: JwtPayload | null = null;
//   try {
//     if (
//       user?.access_token &&
//       typeof user.access_token === "string" &&
//       user.access_token.split(".").length === 3
//     ) {
//       decoded = JWT.jwtDecode(user.access_token);
//     }
//   } catch (error) {
//     console.error("Failed to decode token:", error);
//   }
//
//   // const userRole = decoded?.resource_access?.meca?.roles[0];
//   const userRole = "MECA_ADMIN"
//   const names = decoded;
//
//   console.log(names, " names");
//   const SidePanelButton = () => {
//     const role: any = userRole;
//     let header = "";
//     let subheader = "";
//
//     if (role === roles.MECA_ADMIN) {
//       header = "Top performing vendors";
//       subheader = "A quick glance on vendors with highest sales on meca";
//     } else if (role === roles.VENDOR_ADMIN) {
//       header = "Top performing parts";
//       subheader = "A quick glance on parts with highest sales on meca";
//     } else if (role === roles.AGENTS) {
//       header = "Top performing agents";
//       subheader = "A quick glance on agents with highest sales on meca";
//     }
//
//     const clicked = useAppSelector((state) => state.dashboard.sidePanelButton);
//     switch (clicked) {
//       case sidePanel.OVERVIEW:
//         return (
//           <Overview header={header!} subheader={subheader} overviewRoles={userRole} />
//         );
//       case sidePanel.VENDORS:
//         return <Vendors.tsx vendorRoles={userRole} />;
//       case sidePanel.AGENTS:
//         return <Agents header={header!} subheader={subheader} agentRoles={userRole} />;
//       case sidePanel.BUYERS:
//         return <Buyers  buyerRoles={userRole} />;
//       case sidePanel.ORDERS:
//         return <Orders />;
//       case sidePanel.INVENTORY:
//         return (
//           <Inventory inventoryRoles={userRole} />
//         );
//       case sidePanel.CATEGORY:
//         return <Category categoryRoles={userRole} />;
//       default:
//         return null;
//     }
//   };
//   return (
//     <div id={`mainContainer`} className={`flex`}>
//       <SidePanel sidePanelRoles={userRole} />
//       <div
//         id={`contentContainer`}
//         className={`flex-1 my-[3.25rem] ml-[17.5rem] pl-[1.375rem] mr-[2.125rem]`}
//       >
//         <SidePanelButton />
//       </div>
//     </div>
//   );
// }
//
// export default Page;
