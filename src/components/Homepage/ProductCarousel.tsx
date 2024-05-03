import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useRef } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Tractor from "@/assets/images/tractor.png";
import Bulldozer from "@/assets/images/bulldozer.png";

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

  return (
    <div>
      <div className="flex justify-between items-center my-8">
        <p className="text-3xl font-semibold">Shop</p>
        <span className="flex gap-8">
          <button
            className="text-mecaVerificationCodeColor bg-mecaGrayBackgroundColor rounded-full flex justify-center items-center w-[60px] h-[60px] hover:text-mecaDarkBlueBackgroundOverlay"
            onClick={handlePrevious}
          >
            <MdChevronLeft size={40} />
          </button>
          <button
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
          <div className="relative">
            <Image
              src={Tractor}
              alt="image of a tractor"
              width={630}
              height={564}
            />
            <span className="absolute bottom-16 left-16 flex flex-col gap-10">
              <p className="text-white text-3xl font-bold">Tractor Parts</p>
              <button className="text-lg text-mecaBluePrimaryColor font-semibold bg-white h-12 w-fit rounded-[36px] py-[10px] px-6">
                Explore parts
              </button>
            </span>
          </div>
          <div className="relative">
            <Image
              src={Bulldozer}
              alt="image of a tractor"
              width={630}
              height={564}
            />
            <span className="absolute bottom-16 left-16 flex flex-col gap-10">
              <p className="text-white text-3xl font-bold">Bulldozer Parts</p>
              <button className="text-lg text-mecaBluePrimaryColor font-semibold bg-white h-12 w-fit rounded-[36px] py-[10px] px-6">
                Explore parts
              </button>
            </span>
          </div>
          <div className="relative">
            <Image
              src={Bulldozer}
              alt="image of a tractor"
              width={630}
              height={564}
            />
            <span className="absolute bottom-16 left-16 flex flex-col gap-10">
              <p className="text-white text-3xl font-bold">Bulldozer Parts</p>
              <button className="text-lg text-mecaBluePrimaryColor font-semibold bg-white h-12 w-fit rounded-[36px] py-[10px] px-6">
                Explore parts
              </button>
            </span>
          </div>
        </Carousel>
      </div>
    </div>
  );
}
