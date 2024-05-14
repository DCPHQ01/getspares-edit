import { Button } from "@mui/material";
import { MdChevronRight } from "react-icons/md";
import Image from "next/image";
import HomeImage1 from "../../assets/images/homeImage1.png";

export default function Hero() {
  return (
    <div
      className="bg-mecaActiveBackgroundNavColor lg:flex items-center gap-8 mt-52 rounded-lg lg:px-8 px-4 lg:py-16 py-6"
      id="container"
    >
      <div className="lg:w-1/2" id="leftSide">
        <h1
          className="font-bold lg:text-[54px] text-2xl lg:leading-[72px] leading-8 text-mecaDarkBlueBackgroundOverlay"
          id="heroHeader"
        >
          Explore our top picks for a powerful shopping engine experience.
        </h1>
        <p
          className="text-mecaGrayBodyText lg:text-lg text-sm py-4"
          id="heroText"
        >
          Discover the latest additions to our inventory and prepare to elevate
          your outdoor experiences in style.
        </p>
        <Button
          id="exploreEnginesBtn"
          className="bg-mecaBluePrimaryColor normal-case text-white lg:text-lg text-sm font-semibold rounded-[36px] disabled:bg-mecaBgDisableColor disabled:text-white h-12 py-[10px] px-6 hover:bg-mecaBluePrimaryColor my-6"
          variant="contained"
          endIcon={<MdChevronRight />}
          disableElevation
        >
          Explore engines
        </Button>
      </div>
      <div className="lg:w-1/2" id="rightSide">
        <Image
          src={HomeImage1}
          alt="home image"
          width={564}
          height={376}
          placeholder="blur"
          id="homepageImage1"
        />
      </div>
    </div>
  );
}
