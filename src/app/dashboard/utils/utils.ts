import {store} from "../../../redux";
import * as JWT from "jwt-decode";
import {JwtPayload} from "jwt-decode";


export enum sidePanel {
  OVERVIEW = "OVERVIEW",
  VENDORS = "VENDORS",
  AGENTS = "AGENTS",
  BUYERS = "BUYERS",
  ORDERS = "ORDERS",
  INVENTORY = "INVENTORY",
  CATEGORY = "CATEGORY",
}

export enum roles {
  MECA_ADMIN = "MECA_ADMIN",
  VENDOR_ADMIN = "VENDOR_ADMIN",
}

// export const userRole = roles.MECA_ADMIN;
export const userRole = roles.VENDOR_ADMIN;


