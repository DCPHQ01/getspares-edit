"use client";

import Card from "@/components/Homepage/Card";
import TopBar from "../reusables/TopBar/page";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import HomeImage1 from "@/assets/images/homeImage1.png";
import HomeImage2 from "@/assets/images/homeImage2.png";
import { useRef } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Footer from "@/components/footer/Footer";

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

export default function ProductDescription() {
  const carouselRef = useRef<Carousel>(null);

  const handleNext = () => {
    if (carouselRef.current) carouselRef.current.next(0);
  };

  const handlePrevious = () => {
    if (carouselRef.current) carouselRef.current.previous(0);
  };

  return (
    <div>
      <TopBar />
      <div id="mainContainer" className="container mx-auto px-5">
        <div
          className="text-mecaDarkBlueBackgroundOverlay py-8"
          id="productDescriptionCarousel"
        >
          <div
            className="flex justify-between items-center my-8"
            id="carouselContainer"
          >
            <p className="text-3xl font-semibold" id="carouselTitle">
              More Products Like This
            </p>
            <span className="flex gap-8" id="carouselButtonSpan">
              <button
                id="previousBtn"
                className="text-mecaVerificationCodeColor bg-mecaGrayBackgroundColor rounded-full flex justify-center items-center w-[60px] h-[60px] hover:text-mecaDarkBlueBackgroundOverlay"
                onClick={handlePrevious}
              >
                <MdChevronLeft size={40} />
              </button>
              <button
                id="nextBtn"
                className="text-mecaVerificationCodeColor bg-mecaGrayBackgroundColor rounded-full flex justify-center items-center w-[60px] h-[60px] hover:text-mecaDarkBlueBackgroundOverlay"
                onClick={handleNext}
              >
                <MdChevronRight size={40} />
              </button>
            </span>
          </div>
          <div id="carousel">
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
              <Card image={HomeImage1} />
              <Card image={HomeImage2} />
              <Card image={HomeImage1} />
            </Carousel>
          </div>
        </div>
        <div
          className="text-mecaDarkBlueBackgroundOverlay py-8"
          id="productDescriptionCarousel"
        >
          <div
            className="flex justify-between items-center my-8"
            id="carouselContainer"
          >
            <p className="text-3xl font-semibold" id="carouselTitle">
              More Products Like This
            </p>
            <span className="flex gap-8" id="carouselButtonSpan">
              <button
                id="previousBtn"
                className="text-mecaVerificationCodeColor bg-mecaGrayBackgroundColor rounded-full flex justify-center items-center w-[60px] h-[60px] hover:text-mecaDarkBlueBackgroundOverlay"
                onClick={handlePrevious}
              >
                <MdChevronLeft size={40} />
              </button>
              <button
                id="nextBtn"
                className="text-mecaVerificationCodeColor bg-mecaGrayBackgroundColor rounded-full flex justify-center items-center w-[60px] h-[60px] hover:text-mecaDarkBlueBackgroundOverlay"
                onClick={handleNext}
              >
                <MdChevronRight size={40} />
              </button>
            </span>
          </div>
          <div id="carousel">
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
              <Card image={HomeImage1} />
              <Card image={HomeImage2} />
              <Card image={HomeImage1} />
            </Carousel>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
