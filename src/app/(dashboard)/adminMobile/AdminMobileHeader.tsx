import Link from "next/link";
import router from "next/router";
import { MdMenu, MdOutlineShoppingCart, MdSearch } from "react-icons/md";
import { paths } from "../../../path/paths";

interface NavBarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function AdminMobileHeader({ open, setOpen }: NavBarProps) {
  return (
    <div>
      <div
        className="w-full h-[60px] border-b-2 z-50 border-b-mecaBottomBorder px-4 flex justify-between items-center lg:hidden"
        id="contentContainer"
      >
        <p
          className="text-mecaActiveIconsNavColor text-xl font-nunito font-bold cursor-pointer"
          onClick={() => router.push(paths.toHome())}
        >
          e-meca
        </p>
        <div className="flex items-center gap-x-2" id="menuSearchCart">
          <MdSearch size={18} />

          <div id="mobileMenuBtn" onClick={() => setOpen(!open)}>
            <MdMenu size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

