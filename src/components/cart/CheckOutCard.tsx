import {CartProduct} from "../../types/cart/product";
import Image from "next/image";
import Parts from "../../assets/images/parts.png";
import {MdDeleteOutline, MdMoreVert} from "react-icons/md";
import {formatAmount} from "../utils";
import {useState} from "react";
import {removeFromCart, setCart} from "../../redux/features/product/productSlice";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";


type Props = {
   cardCartItem: CartProduct;
   closeDropDown?: () => void;

   getPrice?: () => void;

};

export const CheckOutCard = ({ cardCartItem, closeDropDown }: Props) => {


   const dispatch = useAppDispatch();


   const [visibleButtons, setVisibleButtons] = useState<{ [key: string]: boolean; }>({});
   const [isInputVisible, setIsInputVisible] = useState(false);
   const [quantity, setQuantity] = useState<string | number>("");



   const { cart } = useAppSelector((state) => state.product);



   const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>, val) => {

      const value = e.target.value;
      if (value === "10+") {
         setIsInputVisible(true);
         setQuantity('');
      } else {
         setIsInputVisible(false);
         setQuantity(value);
         let newCart = JSON.parse(JSON.stringify(cart))
         const targetIndex = cart.findIndex( f => f.id === val.id);
         newCart[targetIndex].quantity = value
         dispatch(
            setCart(newCart)
         );
         localStorage.setItem('savedCartItems', JSON.stringify(newCart));
      }

   };

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuantity(e.target.value);
   };

   const handleUpdateQuantity = (val) => {
      let newCart = JSON.parse(JSON.stringify(cart))
      const targetIndex = cart.findIndex( f => f.id === val.id);
      newCart[targetIndex].quantity = quantity

      dispatch(
         setCart(newCart)
      );
      localStorage.setItem('savedCartItems', JSON.stringify(newCart));

   }

   const toggleButton = (id: string) => {
      setVisibleButtons((prev) => ({
         ...prev,
         [id]: !prev[id],
      }));
   };


   const removeItem = (id: string) => {
      const filteredCart = cart.filter((item) => item.id !== id);

      dispatch(
         setCart(filteredCart)
      );
      localStorage.setItem('savedCartItems', JSON.stringify(filteredCart));
   }

   return (
      <>
         <div
            className="p-4 bg-white rounded-lg w-full mt-6 mb-5"
            style={{boxShadow: "0px 0px 0px 1px rgba(42, 59, 81, 0.12)"}}
         >
            <div className="flex w-full gap-5">
               <div className="bg-mecaActiveBackgroundNavColor rounded-lg">
                  <Image
                     className="w-45 m-auto p-3"
                     src={Parts}
                     id="cardCartItemImage"
                     alt="mobile spear part image"
                  />
               </div>
               <div className={'w-full'}>
                  <div className="w-full">
                     <div className={'flex justify-between w-full'}>
                        <div className="text-base font-semibold mb-2">
                           {cardCartItem.name}
                        </div>
                        <div>
                           <div>
                              <MdMoreVert
                                 onClick={() =>
                                    toggleButton(cardCartItem.id)
                                 }
                                 style={{
                                    fontSize: "20px",
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                    maxWidth: "150px",
                                 }}
                              />
                           </div>

                           {visibleButtons[cardCartItem.id] && (
                              <div
                                 onClick={() =>
                                    toggleButton(cardCartItem.id)
                                 }
                              >
                                 <button
                                    style={{
                                       boxShadow:
                                          "0px 2px 8px 0px #63636333",
                                    }}
                                    onClick={()=>removeItem(cardCartItem.id)}
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
                        <div className="flex font-normal text-sm text-mecaLightGrayText mb-1">
                           {cardCartItem.category }
                           <span>.</span>
                           { cardCartItem.description}
                        </div>
                     </div>

                     <div className="flex items-center justify-between  mt-5">

                        <div className={'flex items-center gap-2'}>
                           <div className="text-black font-normal text-sm">
                              Quantity
                           </div>
                           {isInputVisible ? (
                              <div className="flex gap-x-2">
                                 <input
                                    title="quantity"
                                    type="number"
                                    min="10"
                                    value={quantity}
                                    onChange={handleInputChange}
                                    className="w-16 h-9 rounded border-2 p-2 border-mecaVerificationCodeColor mt-2"
                                 />
                                 <button
                                    onClick={()=>handleUpdateQuantity(cardCartItem)}
                                    className="bg-mecaBluePrimaryColor rounded-lg mt-2 text-white cursor-pointer w-16 h-9"
                                 >
                                    Update
                                 </button>
                              </div>
                           ) : (
                              <select
                                 onChange={e => handleDropdownChange(e, cardCartItem)}
                                 title="quantity"
                                 className="w-16 h-9 rounded border-2 p-2 border-mecaVerificationCodeColor mt-2"
                                 name="categoria"
                                 id="categoriesIdDiv"
                              >
                                 <option value={cardCartItem.quantity} selected>
                                    {cardCartItem.quantity}
                                 </option>
                                 <option value="2">2</option>
                                 <option value="3">3</option>
                                 <option value="4">4</option>
                                 <option value="5">5</option>
                                 <option value="6">6</option>
                                 <option value="7">7</option>
                                 <option value="8">8</option>
                                 <option value="9">9</option>
                                 <option value="10+">10+</option>
                              </select>
                           )}
                        </div>
                        <div className="font-bold">
                           <p>{formatAmount(cardCartItem.amount)}</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}
