import React from "react";
import { roles, userRole } from "../../../app/dashboard/utils";
import MecaAdminTable from "../../../app/dashboard/table/mecaAdminTable";
import VendorAdminTable from "../../../app/dashboard/table/vendorAdminTable";

function Index() {
  const role: any = userRole;

  switch (role) {
    case roles.MECA_ADMIN:
      return <MecaAdminTable />;
    case roles.VENDOR_ADMIN:
      return <VendorAdminTable />;
    default:
      return null;
  }
}

export default Index;
