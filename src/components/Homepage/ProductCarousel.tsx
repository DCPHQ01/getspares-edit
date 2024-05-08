import Image, { StaticImageData } from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useRef } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Tractor from "@/assets/images/tractor.png";
import Bulldozer from "@/assets/images/bulldozer.png";
import Link from "next/link";

interface CardProps {
  image: StaticImageData;
  type: string;
}

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 2,
    partialVisibilityGutter: 40,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
    partialVisibilityGutter: 40,
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

export default function ProductCarousel() {
  const carouselRef = useRef<Carousel>(null);

  const handleNext = () => {
    if (carouselRef.current) carouselRef.current.next(0);
  };

  const handlePrevious = () => {
    if (carouselRef.current) carouselRef.current.previous(0);
  };

  const Card: React.FC<CardProps> = ({ image, type }) => {
    const urlType = type.replace(/\s+/g, "");
    return (
      <div className="relative">
        <Image src={image} alt="" width={630} height={564} placeholder="blur" />
        <span className="absolute lg:bottom-16 bottom-8 lg:left-16 left-6 flex flex-col lg:gap-10 gap-6">
          <p className="text-white lg:text-3xl text-xl font-bold">{type}</p>
          <Link
            href={{
              pathname: "/category/products/?",
              query: { type: encodeURIComponent(urlType) },
            }}
          >
            <button
              type="button"
              className="lg:text-lg text-sm text-mecaBluePrimaryColor font-semibold bg-white w-fit rounded-[36px] lg:py-[10px] py-[6px] px-6"
            >
              Explore parts
            </button>
          </Link>
        </span>
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center my-8">
        <p className="text-3xl font-semibold">Shop</p>
        <span className="flex gap-8">
          <button
            title="left"
            type="button"
            className="text-mecaVerificationCodeColor bg-mecaGrayBackgroundColor rounded-full flex justify-center items-center w-[60px] h-[60px] hover:text-mecaDarkBlueBackgroundOverlay"
            onClick={handlePrevious}
          >
            <MdChevronLeft size={40} />
          </button>
          <button
            title="right"
            type="button"
            className="text-mecaVerificationCodeColor bg-mecaGrayBackgroundColor rounded-full flex justify-center items-center w-[60px] h-[60px] hover:text-mecaDarkBlueBackgroundOverlay"
            onClick={handleNext}
          >
            <MdChevronRight size={40} />
          </button>
        </span>
      </div>
      <div>
        <Carousel
          partialVisible={true}
          draggable={false}
          responsive={responsive}
          ssr={true}
          infinite
          autoPlay={true}
          arrows={false}
          ref={carouselRef}
          itemClass="lg:pr-8"
        >
          <Card image={Tractor} type="Tractor Parts" />
          <Card image={Bulldozer} type="Bulldozer Parts" />
          <Card image={Bulldozer} type="Bulldozer Parts" />
        </Carousel>
      </div>
    </div>
  );
}
