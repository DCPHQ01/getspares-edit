"use client";

import { CartProduct } from "../../types/cart/product";
import Image from "next/image";
import Parts from "../../assets/images/parts.png";
import { MdDeleteOutline, MdMoreVert } from "react-icons/md";
import { formatAmount4, formatAmount44, useNewFocus } from "../utils";
import { useEffect, useRef, useState } from "react";
import { setCart } from "../../redux/features/product/productSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import TruncateText from "../utils/utils";
import style from "../cart/styles/checkOutcard.module.css";

type Props = {
  cardCartItem: CartProduct;
  getPrice?: () => void;
};

export const CheckOutCard = ({ cardCartItem }: Props) => {
  const dispatch = useAppDispatch();

  const [visibleButtons, setVisibleButtons] = useState<{
    [key: string]: boolean;
  }>({});
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [quantity, setQuantity] = useState<any>("");
  const [quantityNumber, setQuantityNumber] = useState<any>([]);

  const { cart } = useAppSelector((state) => state.product);

  const handleDropdownChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    val: any
  ) => {
    const value = e.target.value;
    if (value === "10+") {
      setIsInputVisible(true);
    } else {
      setIsInputVisible(false);
      setQuantity(value);
      let newCart = JSON.parse(JSON.stringify(cart));
      const targetIndex = cart.findIndex((f) => f.id === val.id);
      newCart[targetIndex].quantity = value;
      dispatch(setCart(newCart));
      localStorage.setItem("savedCartItems", JSON.stringify(newCart));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, min, max } = e.target;
    const newVal = Math.max(Number(min), Math.min(Number(max), Number(value)));
    setQuantity(String(newVal));
  };

  const handleUpdateQuantity = (val: any) => {
    let newCart = JSON.parse(JSON.stringify(cart));
    const targetIndex = cart.findIndex((f) => f.id === val.id);
    newCart[targetIndex].quantity = quantity;

    dispatch(setCart(newCart));
    localStorage.setItem("savedCartItems", JSON.stringify(newCart));
    if (quantity < 10) {
      setIsInputVisible(false);
    }
  };

  const toggleButton = (id: string) => {
    setVisibleButtons((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const populateNumber = (id: number) => {
    let numbers = [];

    for (let i = 1; i <= id; i++) {
      numbers.push(i);
    }
    return numbers;
  };

  useEffect(() => {
    if (cardCartItem) {
      setQuantity(cardCartItem.quantity!);
      if (cardCartItem?.productInformation?.quantity > 9) {
        const newNum = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"];
        setQuantityNumber(newNum);
      } else {
        let val = populateNumber(cardCartItem.productInformation.quantity);
        setQuantityNumber(val);
      }
    }
  }, [cardCartItem]);

  const removeItem = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    const filteredCart = cart.filter((item) => item.id !== id);

    dispatch(setCart(filteredCart));
    if (filteredCart.length > 0) {
      localStorage.setItem("savedCartItems", JSON.stringify(filteredCart));
    } else {
      localStorage.removeItem("savedCartItems");
    }
  };

  return (
    <>
      <div
        className="p-4 bg-white rounded-lg w-full mt-6 mb-5"
        style={{ boxShadow: "0px 0px 0px 1px rgba(42, 59, 81, 0.12)" }}
      >
        <div className="flex w-full gap-5">
          <div className="bg-mecaActiveBackgroundNavColor rounded-lg w-[180px] h-[129px] flex justify-center items-center">
            {cardCartItem?.images.length > 0 && (
              <img
                className="w-[108px] h-[86px] m-auto p-3"
                src={cardCartItem?.images[0]}
                id="cardCartItemImage"
                alt="mobile spear part image"
              />
            )}
          </div>
          <div className={"w-full"}>
            <div className="w-full">
              <div className={"flex justify-between w-full"}>
                <div className="text-base font-semibold mb-2">
                  {cardCartItem.name}
                </div>
                <div>
                  <div>
                    <MdMoreVert
                      onClick={() => toggleButton(cardCartItem.id!)}
                      style={{
                        fontSize: "20px",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        maxWidth: "150px",
                        cursor: "pointer",
                      }}
                    />
                  </div>

                  {visibleButtons[cardCartItem.id] && (
                    <div onClick={() => toggleButton(cardCartItem.id!)}>
                      <button
                        style={{
                          boxShadow: "0px 2px 8px 0px #63636333",
                        }}
                        onClick={(e) => removeItem(e, cardCartItem.id!)}
                        className="px-1 h-12 w-24 cursor-pointer bg-white rounded absolute "
                      >
                        <div className="flex items-center gap-1 w-20 h-9 m-auto hover:text-mecaErrorInputColor">
                          <div>
                            <MdDeleteOutline className="w-[18px] h-[18px] hover:text-mecaErrorInputColor" />
                          </div>
                          <div className="text-base font-normal hover:text-red-600">
                            Remove
                          </div>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <div className="flex font-normal text-sm text-mecaLightGrayText mb-1 max-w-96">
                  {/* {cardCartItem.category}
                  <span>.</span> */}
                  {
                    <TruncateText
                      text={cardCartItem.description}
                      maxLength={100}
                    />
                  }
                </div>
              </div>

              <div className="flex items-center justify-between  mt-5">
                <div className={"flex items-center gap-2"}>
                  <div className="text-black font-normal text-sm">Quantity</div>
                  {isInputVisible || Number(cardCartItem.quantity) > 9 ? (
                    <div className={`flex gap-x-2 cursor-pointer`}>
                      <input
                        title="quantity"
                        type="number"
                        min={1}
                        max={cardCartItem?.productInformation?.quantity}
                        value={quantity}
                        // onChange={(e) => {
                        //   if(e.target.value <= cardCartItem?.productInformation?.quantity){
                        //     handleInputChange(e)
                        //   }
                        // }}
                        onChange={handleInputChange}
                        className={`w-16 h-9 rounded border-2 p-2 border-mecaVerificationCodeColor mt-2`}
                      />
                      <button
                        onClickCapture={() =>
                          handleUpdateQuantity(cardCartItem)
                        }
                        className={`bg-mecaBluePrimaryColor rounded-lg mt-2 text-white cursor-pointer w-16 h-9`}
                      >
                        Update
                      </button>
                    </div>
                  ) : (
                    <select
                      onChange={(e) => handleDropdownChange(e, cardCartItem)}
                      title="quantity"
                      value={quantity}
                      className="w-16 h-9 cursor-pointer rounded border-2 p-1 border-mecaVerificationCodeColor mt-2"
                      name="categoria"
                      id="categoriesIdDiv"
                    >
                      {quantityNumber.map((obj: any, index: number) => (
                        <option key={index} value={obj}>
                          {obj}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                <div className="font-bold">
                  <p>{formatAmount4(String(cardCartItem.amount))}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
