import { jwtDecode } from "jwt-decode";
import { useAppSelector } from "../../redux/hooks";
import { JwtPayload as BaseJwtPayload } from "jsonwebtoken";
import * as JWT from "jwt-decode";

interface JwtPayload extends BaseJwtPayload {
  role?: string;
}

export function useUserRole() {
  const { user } = useAppSelector((state: RootState) => state.user); // Add type annotation to 'state' parameter
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
  return userRole;
}
