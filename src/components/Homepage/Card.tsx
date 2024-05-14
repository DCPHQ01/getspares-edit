import Image, { StaticImageData } from "next/image";
import { MdStar } from "react-icons/md";

interface CardProps {
  image: StaticImageData;
}

const Card: React.FC<CardProps> = ({ image }) => {
  return (
    <div
      className="flex flex-col items-center w-full "
      id="hompageCardContainer"
    >
      <div
        id="hompageCardWrapper"
        className="bg-mecaSearchColor w-full flex justify-center items-center h-[287px] rounded-lg"
      >
        <Image
          src={image}
          alt="image of an engine"
          width={315}
          height={247}
          placeholder="blur"
          id="hompageCardImage"
        />
      </div>
      <span
        className="flex justify-between py-4 w-full gap-4"
        id="hompageCardSpan"
      >
        <p
          className="lg:text-lg font-normal text-sm truncate text-mecaDarkBlueBackgroundOverlay"
          id="hompageCardPtag"
        >
          E46 Engine 1996 Model
        </p>
        <button
          id="hompageCardNumberBtn"
          className="text-sm bg-mecaGrayLightBg flex items-center gap-1 outline-none border border-mecaBorderColor rounded-[20px] lg:py-[2px] lg:px-2 px-1 h-fit"
        >
          <MdStar
            id="hompageCardIcon"
            className="text-mecaYellowStarColor lg:text-[15px] text-sm"
          />{" "}
          5
        </button>
      </span>
      <span
        className="flex justify-start w-full items-center"
        id="hompageCardSapn2"
      >
        <button
          id="hompageCardPrice"
          className="lg:text-lg text-xs font-bold bg-mecaSearchColor   rounded-[32px] py-3 px-8"
        >
          ₦97,500.00
        </button>
      </span>
    </div>
  );
};

export default Card;
