export enum sidePanel {
  OVERVIEW = "OVERVIEW",
  VENDORS = "VENDORS",
  AGENTS = "AGENTS",
  BUYERS = "BUYERS",
  ORDERS = "ORDERS",
  INVENTORY = "INVENTORY",
  CATEGORY = "CATEGORY",
  CART = "CART",
  PROFILE = "PROFILE",
}

export enum roles {
  MECA_ADMIN = "MECA_ADMIN",
  VENDOR_ADMIN = "VENDOR_ADMIN",
  BUYER = "BUYER",
  AGENTS = "AGENTS",
  // MECA_ADMIN = "MECA_ADMIN",
}

// export const userRole = roles.MECA_ADMIN;
export const userRole = roles.VENDOR_ADMIN;
// export const userRole = roles.AGENTS;
// export const userRole = roles.BUYER;
