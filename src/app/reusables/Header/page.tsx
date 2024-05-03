import { MdOutlineCelebration, MdOutlineEast } from "react-icons/md";

export default function Header() {
  return (
    <div className="max-w-full w-full flex flex-col" id="headerMainMobile">
      {/* mobile and tab */}
      <div
        className="w-full h-32 bg-mecaActiveIconsNavColor flex flex-col items-center gap-y-4 justify-center px-4 lg:hidden"
        id="mobileHeader"
      >
        <div
          className="w-[62px] h-6 flex gap-x-1 justify-center items-center bg-mecaTagColor rounded-full px-2"
          id="newIconButtonMobile"
        >
          <MdOutlineCelebration className="text-white" size={32} />
          <p className="text-white text-[12px] font-semibold font-nunito">
            New
          </p>
        </div>
        <div className="w-[229px]" id="textInformationDivMobile">
          <p className="text-white text-center text-sm">
            Check out these popular stores to get your farming equipments
          </p>
        </div>
        <MdOutlineEast className="text-white w-5 h-5" />
      </div>
      {/* desktop */}
      <div
        className="hidden lg:flex justify-center items-center gap-x-2 w-full h-12 bg-mecaActiveIconsNavColor"
        id="desktopHeader"
      >
        <div
          className="w-[76px] h-6 flex gap-x-1 justify-center items-center bg-mecaTagColor rounded-full px-2"
          id="newIconButtonDesktop"
        >
          <MdOutlineCelebration className="text-white" size={18} />
          <p className="text-white text-sm font-semibold font-nunito">New</p>
        </div>
        <div
          className="flex gap-x-2 items-center"
          id="textInformationDivDesktop"
        >
          <p className="text-white text-sm font-bold font-nunito">
            Check out these popular stores to get your farming equipments
          </p>
          <MdOutlineEast className="text-white w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
