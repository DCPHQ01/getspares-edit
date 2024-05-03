import Image from "next/image";
import { MdStar } from "react-icons/md";

const Card = ({ image }: any) => {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-mecaGrayBackgroundColor w-full flex justify-center items-center h-[287px] rounded-lg">
        <Image
          src={image}
          alt="image of an engine"
          width={315}
          height={247}
        />
      </div>
      <span className="flex justify-between py-4 w-full">
        <p className="text-lg">E46 Engine 1996 Model</p>
        <button className="text-sm bg-mecaGrayLightBg flex items-center gap-1 outline-none border border-mecaBorderColor rounded-[20px] py-[2px] px-2">
          <MdStar className="text-mecaYellowStarColor" size={15} /> 5
        </button>
      </span>
      <span className="flex justify-start w-full items-center">
        <button className="text-lg font-bold bg-mecaGrayBackgroundColor rounded-[32px] py-2 px-3">
          ₦97,500.00
        </button>
      </span>
    </div>
  );
};

export default Card;