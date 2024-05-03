import Card from "./Card";
import Hero from "./Hero";
import Image from "next/image";
import HomeImage1 from "@/assets/images/homeImage1.png";
import HomeImage2 from "@/assets/images/homeImage2.png";
import HomeImage3 from "@/assets/images/homeImage3.png";
import HomeImage4 from "@/assets/images/homeImage4.png";
import ProductCarousel from "./ProductCarousel";
import { Button } from "@mui/material";
import { MdChevronRight } from "react-icons/md";

export default function Home() {
  return (
    <main className="container mx-auto px-6">
      <Hero />
      <div className="text-mecaDarkBlueBackgroundOverlay">
        <span className="flex justify-between py-6">
          <p className="font-semibold text-3xl">Trending</p>
          <button className="font-medium text-xl underline">
            <p>View more</p>
          </button>
        </span>
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-6">
          <Card image={HomeImage1} />
          <Card image={HomeImage2} />
          <Card image={HomeImage1} />
        </div>
      </div>
      <ProductCarousel />
      <div className="text-mecaDarkBlueBackgroundOverlay py-8">
        <span className="flex justify-between py-8">
          <p className="font-semibold text-3xl">New Products</p>
          <button className="font-medium text-xl underline">
            <p>View more</p>
          </button>
        </span>
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-6">
          <Card image={HomeImage2} />
          <Card image={HomeImage1} />
          <Card image={HomeImage2} />
        </div>
      </div>
      <div className="relative h-[674px] my-8">
        <Image
          src={HomeImage3}
          alt="image of a tractor in a field"
          fill
          className="h-full w-full"
        />
        <span className="absolute bottom-16 left-10 flex flex-col gap-8 lg:w-1/2">
          <h2 className="text-white text-5xl font-bold leading-[60px]">
            Let us help you sell your items and make profit with ease
          </h2>
          <p className="text-white text-lg">
            Showcase your items on our platform and we will take it from there.
            Worry less about the number of people that will buy your products.
          </p>
          <div className="mt-4">
            <Button
              id="exploreEnginesBtn"
              className="bg-white normal-case text-mecaBluePrimaryColor text-lg font-semibold rounded-[36px] disabled:bg-mecaBgDisableColor disabled:text-white h-12 hover:bg-white my-6 py-[10px] px-6"
              variant="contained"
              endIcon={<MdChevronRight />}
              disableElevation
            >
              Learn more
            </Button>
          </div>
        </span>
      </div>
      <div className="bg-mecaActiveBackgroundNavColor rounded-lg my-16 py-16 px-10 lg:flex items-center justify-between">
        <div className="lg:w-3/5">
          <span className="flex gap-4">
            <button className="font-bold text-sm bg-white py-1 px-[10px] rounded-[20px]">
              40+ <span className="font-normal">makes</span>
            </button>
            <button className="font-bold text-sm bg-white py-1 px-[10px] rounded-[20px]">
              1129+ <span className="font-normal">models</span>
            </button>
            <button className="font-bold text-sm bg-white py-1 px-[10px] rounded-[20px]">
              2306+ <span className="font-normal">types</span>
            </button>
            <button className="font-bold text-sm bg-white py-1 px-[10px] rounded-[20px]">
              3000+ <span className="font-normal">auto parts</span>
            </button>
          </span>
          <h2 className="text-mecaDarkBlueBackgroundOverlay text-5xl font-bold py-6">
            Necessary makes of farming vehicles and trucks are available.
          </h2>
          <p className="text-mecaGrayBodyText text-lg">
            From sturdy tractors designed to handle heavy-duty tasks such as
            plowing and planting to versatile trucks that can transport crops,
            livestock, and equipment with ease, farmers have access to the
            necessary machinery to enhance productivity and efficiency on the
            farm.
          </p>
        </div>
        <div className="flex justify-center items-center lg:w-2/5">
          <Image
            src={HomeImage4}
            alt="logo of manufacturers"
            width={416}
            height={286}
          />
        </div>
      </div>
    </main>
  );
}
