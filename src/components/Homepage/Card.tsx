import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { MdStar } from "react-icons/md";
import { ColorRing } from "react-loader-spinner";
import TruncateText from "../utils/utils";
import { formatAmount4 } from "../utils";

interface CardProps {
  image: StaticImageData;
  productName: string;
  id: string;
  price: string;
  isLoading?: boolean;
  categoryName?: string;
  categoryId?: string;
  productImage?: string;
}

const Card: React.FC<CardProps> = ({
  image,
  id,
  price,
  productName,
  isLoading,
  categoryName,
  categoryId,
  productImage,
}) => {
  const searches = categoryName?.replace(/ /g, "-") ?? "";
  const router = useRouter();
  const handleProductDescription = (id: string, categoryId: string) => {
    if (categoryId) {
      sessionStorage.setItem("categoryId", categoryId);
    }
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
      className="flex flex-col items-center w-full cursor-pointer"
      id="CardContainer"
      onClick={() => handleProductDescription(id, categoryId!)}
    >
      {isLoading && (
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
      )}
      <div
        className="bg-mecaGrayBackgroundColor w-[413px] flex justify-center items-center h-[287px] rounded-lg"
        id="cardImageContainer"
        key={id}
      >
        <img
          src={productImage}
          alt="image of an engine"
          id="cardImage"
          className="w-[268px] h-[219px] object-cover"
        />
      </div>
      <div className="w-[400px] h-full" id="productDescriptionSpanDiv">
        <span className="flex justify-between py-4 w-full gap-4" id="cardSpan">
          <p className="lg:text-lg text-sm truncate" id="cardText">
            {<TruncateText text={productName} maxLength={20} />}
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
            {price === null ? 0 : formatAmount4(price)}
          </button>
        </span>
      </div>
    </div>
  );
};

export default Card;
