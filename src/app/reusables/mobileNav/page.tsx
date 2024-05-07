import { MdChevronRight, MdClear, MdExpandMore } from "react-icons/md";

const mobileNavData = [
  {
    id: 1,
    title: "home",
    icon: "",
    icon2: "",
  },
  {
    id: 2,
    title: "categories",
    icon1: <MdExpandMore size={24} className="text-mecaGoBackArrow" />,
    icon2: <MdChevronRight size={24} className="text-mecaGoBackArrow" />,
  },
  {
    id: 3,
    title: "brands",
    icon: <MdExpandMore size={24} className="text-mecaGoBackArrow" />,
    icon2: <MdChevronRight size={24} className="text-mecaGoBackArrow" />,
  },
  {
    id: 4,
    title: "mechanics",
    icon: <MdExpandMore size={24} className="text-mecaGoBackArrow" />,
    icon2: <MdChevronRight size={24} className="text-mecaGoBackArrow" />,
  },
  {
    id: 5,
    title: "vendors",
    icon: <MdExpandMore size={24} className="text-mecaGoBackArrow" />,
    icon2: <MdChevronRight size={24} className="text-mecaGoBackArrow" />,
  },
  {
    id: 6,
    title: "listings",
    icon: <MdExpandMore size={24} className="text-mecaGoBackArrow" />,
    icon2: <MdChevronRight size={24} className="text-mecaGoBackArrow" />,
  },
  {
    id: 7,
    title: "advertise",
    icon: <MdExpandMore size={24} className="text-mecaGoBackArrow" />,
    icon2: <MdChevronRight size={24} className="text-mecaGoBackArrow" />,
  },
];
interface MobileNavProps {
  // mobileNavData: { id: number; title: string; icon2: any; icon: any }[];
  handleNav: () => void;
}
export default function MobileNav({ handleNav }: MobileNavProps) {
  return (
    <div
      className="w-full h-screen bg-white fixed overflow-y-hidden"
      id="mobileMenuContainer"
    >
      <div
        className="w-full h-[60px] border-b-2 border-b-mecaBottomBorder px-4 flex justify-between items-center lg:hidden"
        id="topBarContentContainer"
      >
        <p className="text-mecaActiveIconsNavColor text-xl font-nunito font-bold">
          e-meca
        </p>
        <div className="flex" id="mdClear">
          <MdClear
            size={24}
            className="text-mecaGoBackArrow"
            onClick={handleNav}
          />
        </div>
      </div>
      <div
        className="flex flex-col gap-y-8
           px-4 mt-4"
        id="navDataMenuWhenClosed"
      >
        {mobileNavData.map((data) => (
          <div
            className="flex justify-between items-center"
            id="navDatum"
            key={data.id}
          >
            <p className="text-mecaGoBackText text-lg capitalize">
              {data.title}
            </p>
            <div className="flex" id="mdMenu">
              {data.icon2}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
