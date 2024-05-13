import Card from "./Card";
import Hero from "./Hero";
import Image from "next/image";
import HomeImage1 from "../../assets/images/homeImage1.png";
import HomeImage2 from "../../assets/images/homeImage2.png";
import HomeImage3 from "../../assets/images/homeImage3.png";
import HomeImage4 from "../../assets/images/homeImage4.png";
import HomeImage4Sm from "../../assets/images/HomeImage4-sm.png";
import ProductCarousel from "./ProductCarousel";
import { Button } from "@mui/material";
import { MdChevronRight } from "react-icons/md";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Indicator from "../../assets/icons/indicatorRectangle";

interface CustomDotProps {
  onClick: () => void;
  active: boolean;
}

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
    partialVisibilityGutter: 0,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    partialVisibilityGutter: 0,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  module: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

const responsives = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
    partialVisibilityGutter: 0,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    partialVisibilityGutter: 0,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  module: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function Home() {
  const CustomDot = ({ onClick, active }: CustomDotProps) => {
    return (
      <li onClick={() => onClick()}>
        <Indicator active={active} />
      </li>
    );
  };

  return (
    <main className="container mx-auto px-5 mt-44">
      <div>
        <Carousel
          showDots={true}
          renderDotsOutside={false}
          customDot={
            <CustomDot
              onClick={function (): void {
                throw new Error("Function not implemented.");
              }}
              active={false}
            />
          }
          partialVisible={true}
          draggable={false}
          responsive={responsives}
          ssr={true}
          arrows={false}
          infinite
          autoPlay={true}
          dotListClass="gap-2"
          itemClass="pb-6"
        >
          <Hero />
          <Hero />
          <Hero />
        </Carousel>
      </div>

      <div className="text-mecaDarkBlueBackgroundOverlay">
        <span className="flex justify-between py-6">
          <p className="font-semibold lg:text-3xl text-lg"></p>
          <button
            type="button"
            className="font-medium lg:text-xl text-sm underline"
          >
            <p>View more</p>
          </button>
        </span>
        <div className="">
          <Carousel
            partialVisible={true}
            draggable={false}
            responsive={responsive}
            ssr={true}
            infinite
            autoPlay={true}
            itemClass="lg:pr-8 pr-4"
          >
            <Card image={HomeImage1} />
            <Card image={HomeImage2} />
            <Card image={HomeImage1} />
          </Carousel>
        </div>
      </div>
      <ProductCarousel />
      <div className="text-mecaDarkBlueBackgroundOverlay py-8">
        <span className="flex justify-between py-8">
          <p className="font-semibold lg:text-3xl text-lg">New Products</p>
          <button
            type="button"
            className="font-medium lg:text-xl text-sm underline"
          >
            <p>View more</p>
          </button>
        </span>
        <div className="">
          <Carousel
            partialVisible={true}
            draggable={false}
            responsive={responsive}
            ssr={true}
            infinite
            autoPlay={true}
            itemClass="lg:pr-8 pr-4"
          >
            <Card image={HomeImage2} />
            <Card image={HomeImage1} />
            <Card image={HomeImage2} />
          </Carousel>
        </div>
      </div>
      <div className="relative lg:h-[674px] h-[338px] my-8 rounded-lg">
        <Image
          src={HomeImage3}
          alt="image of a tractor in a field"
          fill
          placeholder="blur"
          className="h-full w-full rounded-lg"
        />
        <span className="absolute lg:bottom-16 bottom-8 lg:left-10 flex flex-col lg:gap-8 gap-4 px-6 lg:w-1/2">
          <h2 className="text-white lg:text-5xl text-xl font-bold lg:leading-[60px]">
            Let us help you sell your items and make profit with ease
          </h2>
          <p className="text-white lg:text-lg text-sm">
            Showcase your items on our platform and we will take it from there.
            Worry less about the number of people that will buy your products.
          </p>
          <div className="mt-4">
            <Button
              id="exploreEnginesBtn"
              className="bg-white normal-case text-mecaBluePrimaryColor lg:text-lg text-sm font-semibold rounded-[36px] disabled:bg-mecaBgDisableColor disabled:text-white hover:bg-white lg:my-6 py-[10px] px-6"
              variant="contained"
              endIcon={<MdChevronRight />}
              disableElevation
            >
              Learn more
            </Button>
          </div>
        </span>
      </div>
      <div className="bg-mecaActiveBackgroundNavColor rounded-lg my-16 lg:py-16 py-8 lg:px-10 px-4 lg:flex items-center justify-between">
        <div className="lg:w-3/5">
          <span className="flex flex-wrap gap-4">
            <button
              type="button"
              className="font-bold text-sm bg-white py-1 px-[10px] rounded-[20px]"
            >
              40+ <span className="font-normal">makes</span>
            </button>
            <button
              type="button"
              className="font-bold text-sm bg-white py-1 px-[10px] rounded-[20px]"
            >
              1129+ <span className="font-normal">models</span>
            </button>
            <button
              type="button"
              className="font-bold text-sm bg-white py-1 px-[10px] rounded-[20px]"
            >
              2306+ <span className="font-normal">types</span>
            </button>
            <button
              type="button"
              className="font-bold text-sm bg-white py-1 px-[10px] rounded-[20px]"
            >
              3000+ <span className="font-normal">auto parts</span>
            </button>
          </span>
          <h2 className="text-mecaDarkBlueBackgroundOverlay lg:text-5xl text-2xl font-bold py-6">
            Necessary makes of farming vehicles and trucks are available.
          </h2>
          <p className="text-mecaGrayBodyText lg:text-lg text-sm">
            From sturdy tractors designed to handle heavy-duty tasks such as
            plowing and planting to versatile trucks that can transport crops,
            livestock, and equipment with ease, farmers have access to the
            necessary machinery to enhance productivity and efficiency on the
            farm.
          </p>
        </div>
        <div className="flex justify-center items-center lg:w-2/5 lg:mt-0 mt-8">
          <Image
            src={HomeImage4}
            alt="logo of manufacturers"
            width={416}
            height={286}
            className="lg:block hidden"
          />
          <Image
            src={HomeImage4Sm}
            alt="logo of manufacturers"
            width={324}
            height={114}
            className="lg:hidden block"
          />
        </div>
      </div>
    </main>
  );
}
