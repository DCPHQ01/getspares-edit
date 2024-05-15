import HeaderPage from "../Header/page";
import NavBarWhileInsideApp from "./NavBarWhileInsideApp/page";

export default function TopBarWhileInside() {
  return (
    <div className="w-full z-50 fixed top-0">
      <HeaderPage />
      <NavBarWhileInsideApp />
    </div>
  );
}
