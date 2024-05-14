import * as React from "react";
import userImage from "../../assets/images/150727131450-01-cnnphotos-nigerian-identity-tease 1.png";
import TextRating from "../rating/rating";
import Envelope from "../../assets/icons/EnvelopeIcon";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Indicator from "../../assets/icons/indicatorRectangle";

interface CustomDotProps {
  onClick: () => void;
  active: boolean;
}

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

const SignUpComponentRight = () => {
  const value = 5;
  const year = new Date().getFullYear();

  const CustomDot = ({ onClick, active }: CustomDotProps) => {
    return (
      <li onClick={() => onClick()}>
        <Indicator active={active} />
      </li>
    );
  };

  return (
    <div
      id="mainWrapperRightComponent"
      className="h-screen flex flex-col justify-between bg-mecaLightBackgroundColor"
    >
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
        <div
          id="flexContainerRighttag"
          className="h-[90vh] flex flex-col justify-center"
        >
          <div
            id="textContainerRightTag"
            className="flex flex-col justify-between lg:w-4/5 h-[326px] m-auto text-3xl leading-[38px] text-center"
          >
            <span
              id="weHaveBeenid"
              className="sm:text-xl lg:text-2xl xl:text-3xl px-4"
            >
              We’ve been using{" "}
              <span id="mecaTextBoldtag" className="font-black">
                meca{" "}
              </span>
              to kick start the sales and inventory of all our products for
              sustainable agriculture.
            </span>
            <div id="userImageDiv" className="flex justify-center pt-[10px]">
              <img id="userImagetag" src={userImage.src} alt="user" />
            </div>
            <div
              id="flexTextRighttag"
              className="flex flex-col text-mecaDarkBlueBackgroundOverlay text-base	"
            >
              <span id="rightTextNameUser">Adebayo Emmanuel</span>
              <span id="rightTextUser" className="text-mecaLightGrayText">
                Head of Sales, Ladipo Market
              </span>
            </div>
            <TextRating id="ratingContainerRight" value={value} />
          </div>
        </div>
      </Carousel>

      <div
        id="Meca2024Element"
        className="flex justify-between text-mecaGrayBodyText font-normal text-sm w-10/12 m-auto"
      >
        <p id="mecaYearText">© Meca {year}</p>
        <p id="mecainfomessage" className="flex items-center gap-1">
          <Envelope />
          info@meca.com.ng
        </p>
      </div>
    </div>
  );
};

export default SignUpComponentRight;
