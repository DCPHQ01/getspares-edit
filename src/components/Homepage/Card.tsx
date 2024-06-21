import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { MdStar } from "react-icons/md";
import { ColorRing } from "react-loader-spinner";

interface CardProps {
  image: StaticImageData;
  productName: string;
  id: string;
  price: string;
  isLoading?: boolean;
  categoryName?: string;
}

const Card: React.FC<CardProps> = ({
  image,
  id,
  price,
  productName,
  isLoading,
  categoryName,
}) => {
  const searches = categoryName?.replace(/ /g, "-");
  const router = useRouter();
  const handleProductDescription = (id: string) => {
    router.push(`/category/products/${searches}/${id}`);
  };

  const formatPrice = (price: string) => {
    const numericPrice = parseFloat(price?.replace(/[^0-9.-]+/g, ""));
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NGN",
    }).format(numericPrice);
  };
  return (
    <div
      className="flex flex-col items-center w-full"
      id="CardContainer"
      onClick={() => handleProductDescription(id)}
    >
      {isLoading && (
        <ColorRing
          visible={true}
          height="40"
          width="40"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#ffff", "#ffff", "#ffff", "#ffff", "#ffff"]}
        />
      )}
      <div
        className="bg-mecaGrayBackgroundColor w-full flex justify-center items-center h-[287px] rounded-lg"
        id="cardImageContainer"
        key={id}
      >
        <Image
          src={image}
          alt="image of an engine"
          width={315}
          height={247}
          placeholder="blur"
          id="cardImage"
        />
      </div>
      <span className="flex justify-between py-4 w-full gap-4" id="cardSpan">
        <p className="lg:text-lg text-sm truncate" id="cardText">
          {productName}
        </p>
        <button
          type="button"
          className="text-sm bg-mecaGrayLightBg flex items-center gap-1 outline-none border border-mecaBorderColor rounded-[20px] lg:py-[2px] lg:px-2 px-1 h-fit"
          id="cardBtn"
        >
          <MdStar
            className="text-mecaYellowStarColor lg:text-[15px] text-sm"
            id="starIcon"
          />
          5
        </button>
      </span>
      <span className="flex justify-start w-full items-center" id="cardSpan2">
        <button
          type="button"
          className="lg:text-lg text-sm font-bold bg-mecaGrayBackgroundColor rounded-[32px] py-2 px-3"
          id="cardBtn2"
        >
          {price === null ? 0 : formatPrice(price)}
        </button>
      </span>
    </div>
  );
};

export default Card;
