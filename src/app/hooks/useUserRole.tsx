import { jwtDecode } from "jwt-decode";
import { useAppSelector } from "../../redux/hooks";
import { JwtPayload as BaseJwtPayload } from "jsonwebtoken";
import * as JWT from "jwt-decode";
import { RootState } from "../../redux";

interface JwtPayload extends BaseJwtPayload {
  role?: string;
}

export function useUserRole() {
  const userRoles = process.env.NEXT_PUBLIC_KEYCLOAK_REALM;
  const getToken = () => {
    if (typeof window !== "undefined") {
      return JSON.parse(sessionStorage.getItem("token") || "{}");
    }
    return {};
  };

  let tokens = getToken();
  let decoded: JwtPayload | null = null;
  try {
    if (
      tokens &&
      typeof tokens === "string" &&
      tokens.split(".").length === 3
    ) {
      decoded = JWT.jwtDecode(tokens);
    }
  } catch (error) {
    console.error("Failed to decode token:", error);
  }

  const userRole = decoded?.resource_access[`${userRoles}`]?.roles[0];
  return userRole;
}
