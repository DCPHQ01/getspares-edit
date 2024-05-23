import React from "react";
import MecaAdminTable from "./mecaAdminTable";
import VendorAdminTable from "./vendorAdminTable";
import { useAppSelector } from "../../../../redux/hooks";
import * as JWT from "jwt-decode";
import { JwtPayload as BaseJwtPayload } from "jsonwebtoken";
import {roles} from "../utils/utils";

interface JwtPayload {
  resource_access: {
    meca: {
      roles: string[];
    };
  };
}
function Index() {
  const { user } = useAppSelector((state) => state.user);

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
  const userRole = decoded?.resource_access?.meca?.roles[0];
  console.log(decoded, "decoded dashboard");
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
