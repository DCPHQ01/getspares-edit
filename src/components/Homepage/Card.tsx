import Image, { StaticImageData } from "next/image";
import { MdStar } from "react-icons/md";

interface CardProps {
  image: StaticImageData;
}

const Card: React.FC<CardProps> = ({ image }) => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="bg-mecaGrayBackgroundColor w-full flex justify-center items-center h-[287px] rounded-lg">
        <Image src={image} alt="image of an engine" width={315} height={247} placeholder="blur" />
      </div>
      <span className="flex justify-between py-4 w-full gap-4">
        <p className="lg:text-lg text-sm truncate">E46 Engine 1996 Model</p>
        <button className="text-sm bg-mecaGrayLightBg flex items-center gap-1 outline-none border border-mecaBorderColor rounded-[20px] lg:py-[2px] lg:px-2 px-1 h-fit">
          <MdStar className="text-mecaYellowStarColor lg:text-[15px] text-sm" />{" "}
          5
        </button>
      </span>
      <span className="flex justify-start w-full items-center">
        <button className="lg:text-lg text-sm font-bold bg-mecaGrayBackgroundColor rounded-[32px] py-2 px-3">
          ₦97,500.00
        </button>
      </span>
    </div>
  );
};

export default Card;
