import { Button } from "@mui/material";
import { MdChevronRight } from "react-icons/md";
import Image from "next/image";
import HomeImage1 from "../../assets/images/homeImage1.png";

export default function Hero() {
  return (
    <div className="bg-mecaActiveBackgroundNavColor lg:flex items-center mt-12 gap-8 rounded-lg lg:px-8 px-4 lg:py-16 py-6">
      <div className="lg:w-1/2">
        <h1 className="font-bold lg:text-[54px] text-2xl lg:leading-[56px] leading-8 text-mecaDarkBlueBackgroundOverlay">
          Explore our top picks for a powerful shopping engine experience.
        </h1>
        <p className="text-mecaGrayBodyText lg:text-lg text-sm py-4">
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
      <div className="lg:w-1/2">
        <Image
          src={HomeImage1}
          alt="home image"
          width={564}
          height={376}
          placeholder="blur"
        />
      </div>
    </div>
  );
}
