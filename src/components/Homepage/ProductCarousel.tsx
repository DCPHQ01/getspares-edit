import Image, { StaticImageData } from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useRef } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Tractor from "../../assets/images/tractor.png";
import Bulldozer from "../../assets/images/bulldozer.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { paths } from "../../path/paths";
import { useGetCategoryQuery } from "../../redux/features/users/authQuery";
import { ColorLens } from "@mui/icons-material";
import { ColorRing } from "react-loader-spinner";

interface CardProps {
  image: string | StaticImageData;
  type: string;
  categoryId?: string | undefined;
}

interface DataProps {
  name: string;
  imageUrl: string;
  id: string;
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

  const { data: categoryData, isLoading } = useGetCategoryQuery({});

  const handleNext = () => {
    if (carouselRef.current) carouselRef.current.next(0);
  };

  const handlePrevious = () => {
    if (carouselRef.current) carouselRef.current.previous(0);
  };

  const Card: React.FC<CardProps> = ({ image, type, categoryId }) => {
    const urlType = type?.replace(/\s+/g, "");
    const router = useRouter();
    const handleRouteToProductPage = () => {
      if (categoryId) {
        sessionStorage.setItem("categoryId", categoryId);
      }
      router.push(paths.toCategoryProducts(urlType));
    };

    return (
      <div
        className="relative cursor-pointer w-[560px]"
        id="productContainer"
        onClick={handleRouteToProductPage}
      >
        <img
          src={image?.toString()}
          alt="category image"
          className="w-full h-[564px] p-4 object-cover"
          // placeholder="blur"
          id="productImage"
        />
        <div className="w-full h-[206px] p-6 bg-mecaOverlay bg-opacity-60 rounded-lg">
          <span
            className="absolute lg:bottom-16 bottom-8 lg:left-16 left-6 flex flex-col lg:gap-10 gap-6"
            id="subContainer"
          >
            <p
              className="text-white lg:text-3xl text-xl font-bold"
              id="productText"
            >
              {type}
            </p>
            <button
              type="button"
              className="lg:text-lg text-sm text-mecaBluePrimaryColor font-semibold bg-white w-fit rounded-[36px] lg:py-[10px] py-[6px] px-6"
              id="exploreBtn"
            >
              Explore parts
            </button>
          </span>
        </div>
      </div>
    );
  };

  return (
    <div id="productCarousel">
      <div
        className="flex justify-between items-center my-8"
        id="carouselContainer"
      >
        <p className="text-3xl font-semibold" id="carouselTitle">
          Categories
        </p>
        <span className="flex gap-8" id="carouselButtonSpan">
          <div
            id="previousBtn"
            className="text-mecaVerificationCodeColor bg-mecaGrayBackgroundColor rounded-full flex justify-center items-center w-[60px] h-[60px] hover:text-mecaDarkBlueBackgroundOverlay cursor-pointer"
            onClick={handlePrevious}
          >
            <MdChevronLeft size={30} />
          </div>
          <div
            id="nextBtn"
            className="text-mecaVerificationCodeColor bg-mecaGrayBackgroundColor rounded-full flex justify-center items-center w-[60px] h-[60px] hover:text-mecaDarkBlueBackgroundOverlay cursor-pointer"
            onClick={handleNext}
          >
            <MdChevronRight size={30} />
          </div>
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
          {isLoading ? (
            <div className="w-full flex justify-center items-center">
              <ColorRing
                visible={true}
                height="40"
                width="40"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["#095AD3", "#095AD3", "#095AD3", "#095AD3", "#095AD3"]}
              />
            </div>
          ) : (
            (categoryData?.data || []).map((data: DataProps) => (
              <Card
                key={data.id}
                image={
                  data?.imageUrl === "" ||
                  (data?.imageUrl || "").includes("image.png") ||
                  (data?.imageUrl || "").includes("string")
                    ? Tractor
                    : data.imageUrl
                }
                type={data.name}
                categoryId={data.id}
              />
            ))
          )}
        </Carousel>
      </div>
    </div>
  );
}
