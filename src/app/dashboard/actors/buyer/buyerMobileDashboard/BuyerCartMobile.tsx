"use client";
import { useState } from "react";
import { Nunito_Sans } from "next/font/google";
import Carousel from "react-multi-carousel";
import Cards from "../../../../../components/Homepage/Card";
import "react-multi-carousel/lib/styles.css";
import HomeImage1 from "../../../../assets/images/homeImage1.png";
import HomeImage2 from "../../../../assets/images/HomeImage2.png";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito_sans",
  adjustFontFallback: false,
  display: "swap",
});
import {
  MdChevronRight,
  MdMenu,
  MdOutlineShoppingCart,
  MdSearch,
  MdMoreVert,
  MdOutlineExpandMore,
  MdCircle,
  MdKeyboardArrowDown,
  MdDeleteOutline,
  MdCheckCircle,
} from "react-icons/md";
import HeaderPage from "../../../../reusables/Header/page";
import Parts from "../../../../../assets/images/parts.png";
import Image from "next/image";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Alert, Card } from "@mui/material";
import Footer from "../../../../../components/footer/Footer";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import Link from "next/link";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
// import MoreVertIcon from "@mui/icons-material/MoreVert";

import { useRouter } from "next/navigation";
import { useAppSelector } from "../../../../../redux/hooks";
import Header from "../../../components/ui/header";
import Searchbox from "../../../components/ui/searchbox";
import TruncateText from "../../../../../components/utils/utils";

interface State extends SnackbarOrigin {
  open: boolean;
}

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

const cardCartItems = [
  {
    id: "1",
    Image: Parts,
    header: "E46 Engine 1996 Model",
    subHeader: "Tractor parts",
    new: "Refurbished",
    quantity: "Quantity",
    quantityAmount: "10",
    icon1: <MdOutlineExpandMore />,
    icondropdown: <MdKeyboardArrowDown />,
    delete: <MdDeleteOutline />,
    // icon2: <MdMoreVert />,
    icondot: <MdCircle />,
    remove: "Remove",
    price: "₦900,000.00",
  },

  {
    id: "2",
    Image: Parts,
    header: "E46 Engine 1996 Model",
    subHeader: "Tractor parts",
    new: "New",
    quantity: "Quantity",
    quantityAmount: "100",
    icon1: <MdOutlineExpandMore />,
    icondropdown: <MdKeyboardArrowDown />,
    delete: <MdDeleteOutline />,
    remove: "Remove",
    // icon2: <MdMoreVert />,
    icondot: <MdCircle />,
    price: "₦9,000,000.00",
  },

  {
    id: "3",
    Image: Parts,
    header: "E46 Engine 1996 Model",
    subHeader: "Tractor parts",
    new: "New",
    quantity: "Quantity",
    quantityAmount: "5",
    icon1: <MdOutlineExpandMore />,
    delete: <MdDeleteOutline />,
    remove: "Remove",
    icondropdown: <MdKeyboardArrowDown />,
    // icon2: <MdMoreVert />,
    icondot: <MdCircle />,
    price: "₦450,000.00",
  },
  {
    id: "4",
    Image: Parts,
    header: "E46 Engine 1996 Model",
    subHeader: "Tractor parts",
    new: "New",
    quantity: "Quantity",
    quantityAmount: "5",
    icon1: <MdOutlineExpandMore />,
    delete: <MdDeleteOutline />,
    remove: "Remove",
    icondropdown: <MdKeyboardArrowDown />,
    // icon2: <MdMoreVert />,
    icondot: <MdCircle />,
    price: "₦450,000.00",
  },
  {
    id: "5",
    Image: Parts,
    header: "E46 Engine 1996 Model",
    subHeader: "Tractor parts",
    new: "New",
    quantity: "Quantity",
    quantityAmount: "5",
    icon1: <MdOutlineExpandMore />,
    delete: <MdDeleteOutline />,
    remove: "Remove",
    icondropdown: <MdKeyboardArrowDown />,
    // icon2: <MdMoreVert />,
    icondot: <MdCircle />,
    price: "₦450,000.00",
  },

  {
    id: "6",
    Image: Parts,
    header: "E46 Engine 1996 Model",
    subHeader: "Tractor parts",
    new: "New",
    quantity: "Quantity",
    quantityAmount: "5",
    icon1: <MdOutlineExpandMore />,
    delete: <MdDeleteOutline />,
    remove: "Remove",
    icondropdown: <MdKeyboardArrowDown />,
    // icon2: <MdMoreVert />,
    icondot: <MdCircle />,
    price: "₦450,000.00",
  },

  {
    id: "7",
    Image: Parts,
    header: "E46 Engine 1996 Model",
    subHeader: "Tractor parts",
    new: "New",
    quantity: "Quantity",
    quantityAmount: "5",
    icon1: <MdOutlineExpandMore />,
    delete: <MdDeleteOutline />,
    remove: "Remove",
    icondropdown: <MdKeyboardArrowDown />,
    // icon2: <MdMoreVert />,
    icondot: <MdCircle />,
    price: "₦450,000.00",
  },

  {
    id: "8",
    Image: Parts,
    header: "E46 Engine 1996 Model",
    subHeader: "Tractor parts",
    new: "New",
    quantity: "Quantity",
    quantityAmount: "5",
    icon1: <MdOutlineExpandMore />,
    delete: <MdDeleteOutline />,
    remove: "Remove",
    icondropdown: <MdKeyboardArrowDown />,
    // icon2: <MdMoreVert />,
    icondot: <MdCircle />,
    price: "₦450,000.00",
  },
];

const itemSelected = [
  {
    count: 4,
    totalPrice: "₦360,000.00",
    shippingPrice: "₦0",
    subtotal: "₦360,000.00",
  },
];

const ITEM_HEIGHT = 48;

const BuyerCartMobile = () => {
  const [visibleButtons, setVisibleButtons] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleButton = (id: string) => {
    setVisibleButtons((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const [number, setNumber] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setNumber(event.target.value as string);
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  //  const { cart } = useAppSelector((state) => state.product);
  const { cart } = useAppSelector((state) => state.product);
  console.log("cart ", cart);
  const [OpenA, setOpenA] = useState(false);
  const handleNav = () => {
    setOpenA(!OpenA);
  };

  const [state, setState] = useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleSucessClick = (newState: SnackbarOrigin) => () => {
    setState({ ...newState, open: true });
  };

  const handleSucessClose = () => {
    setState({ ...state, open: false });
  };

  const [carts, setCarts] = useState(cardCartItems);

  const removeFromCart = (id: string) => {
    setCarts((prevCart) => prevCart.filter((item) => item.id !== id));
  };
  const router = useRouter();

  const [showButton, setShowButton] = useState(false);

  const [quantity, setQuantity] = useState<string | number>("");
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [isUpdateButtonVisible, setIsUpdateButtonVisible] = useState(false);

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "10+") {
      setIsInputVisible(true);
      setIsUpdateButtonVisible(true);
      setQuantity("");
    } else {
      setIsInputVisible(false);
      setQuantity(Number(value));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value);
    setIsUpdateButtonVisible(true);
  };

  const handleUpdateClick = () => {
    if (Number(quantity) >= 1) {
      setIsUpdateButtonVisible(false);
    }
  };

  return (
    <div>
      {/* mobile */}
      <div className="lg:hidden w-full" id="contentContainerAddToCartMobile">
        <div className="w-[90%]" style={{ margin: "0px auto" }}>
          <div style={{ width: "100%" }} className={nunito.className}>
            <div className={`flex flex-col gap-6`}>
              <Header
                subtitle={`Keep track of items in your cart.`}
                title={`Cart`}
                amount={``}
              />
              <Searchbox />
            </div>

            <div className="flex  flex-col w-full">
              <div className="" style={{ width: "100%" }}>
                {carts.length === 0 ? (
                  <p className="text-lg font-bold text-center mt-20 mb-20">
                    Your Cart is Empty!
                  </p>
                ) : (
                  <div className="">
                    {carts.map((cardCartItem) => (
                      <div key={cardCartItem.id} className="mt-6 mb-5 ">
                        <div
                          className="h-52 p-4 rounded-lg bg-white "
                          style={{
                            boxShadow: "0px 0px 0px 1px rgba(42, 59, 81, 0.12)",
                          }}
                        >
                          <div className="flex justify-between h-full">
                            <div className="flex justify-between gap-x-4 w-full h-full relative">
                              <div className="flex justify-start">
                                <div className="bg-mecaActiveBackgroundNavColor z-50   h-20 flex justify-center items-center w-24 rounded-lg">
                                  <Image
                                    className="m-auto p-3 "
                                    src={cardCartItem.Image}
                                    id="cardCartItemImage"
                                    alt="mobile spear part image"
                                  />
                                </div>
                              </div>
                              <div className="h-full flex-1">
                                <CardContent
                                  className=""
                                  style={{
                                    padding: "inherit",
                                    width: "100%",
                                    zIndex: "",
                                  }}
                                >
                                  <div className="text-base font-semibold mb-2">
                                    <div className="" id="cardHeadTitle">
                                      <TruncateText
                                        text={cardCartItem.header}
                                        maxLength={20}
                                      />
                                    </div>
                                  </div>
                                  <div className={`${nunito.className} w-full`}>
                                    <div className="flex gap-x-1 font-normal text-sm text-mecaLightGrayText">
                                      {cardCartItem.subHeader}
                                      <span className="">.</span>
                                      <TruncateText
                                        text={cardCartItem.new}
                                        maxLength={10}
                                      />
                                    </div>
                                  </div>

                                  <div className="flex gap-x-3 mt-4 font-normal text-sm">
                                    <div className="text-black">
                                      {cardCartItem.quantity}
                                    </div>

                                    <div className="relative bottom-4">
                                      <form>
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
                                            {isUpdateButtonVisible && (
                                              <button
                                                onClick={handleUpdateClick}
                                                className="bg-mecaBluePrimaryColor rounded-lg mt-2 text-white cursor-pointer w-16 h-9"
                                              >
                                                Update
                                              </button>
                                            )}
                                          </div>
                                        ) : (
                                          <select
                                            onChange={handleDropdownChange}
                                            title="quantity"
                                            className="w-16 h-9 rounded border-2 p-2 border-mecaVerificationCodeColor mt-2"
                                            name="categoria"
                                            id="categoriesId"
                                          >
                                            <option value="0" selected>
                                              0
                                            </option>
                                            <option value="1">1</option>
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
                                      </form>
                                    </div>
                                  </div>

                                  <div className="mt-1">
                                    <p className="font-nunito font-semibold">
                                      {cardCartItem.price}
                                    </p>
                                  </div>
                                </CardContent>
                              </div>

                              <div className="">
                                <div
                                // style={{
                                //   position: "relative",
                                //   left: "40px",
                                //   cursor: "pointer",
                                // }}
                                >
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
                                        boxShadow: "0px 2px 8px 0px #63636333",
                                      }}
                                      className="absolute right-1 top-7 h-[34px] w-[100px] cursor-pointer bg-white rounded"
                                      onClick={() =>
                                        removeFromCart(cardCartItem.id)
                                      }
                                    >
                                      <div className="px-1 flex items-center hover:shadow-xl gap-x-1 w-full h-full m-auto hover:bg-mecaTableTextErrorBackgroundColor hover:text-mecaErrorInputColor">
                                        <div className="">
                                          {cardCartItem.delete}
                                        </div>
                                        <div className="text-sm font-normal">
                                          {cardCartItem.remove}
                                        </div>
                                      </div>
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Subtotal items */}
              <div className="mb-10" style={{ width: "100%" }}>
                <div className="h-64 bg-mecaSearchColor  rounded-lg pt-5">
                  <div className="w-[90%] m-auto">
                    {itemSelected.map((itemSelect) => (
                      <div className={nunito.className}>
                        <div className="flex justify-between">
                          <div className="flex font-normal text-sm">
                            <p> item</p>
                            <p> ({itemSelect.count})</p>
                          </div>

                          <div className=" font-normal text-sm">
                            <p>{itemSelect.totalPrice}</p>
                          </div>
                        </div>
                        <div className="flex justify-between mt-5 font-normal text-sm">
                          <p>Shipping</p>
                          <p>{itemSelect.shippingPrice}</p>
                        </div>
                        <hr className="mt-5"></hr>
                        <div className="flex justify-between mt-5 mb-9 font-semibold text-xl">
                          <p>Subtotal</p>
                          <p>{itemSelect.subtotal}</p>
                        </div>
                      </div>
                    ))}
                    <div className="">
                      <button
                        onClick={handleSucessClick({
                          vertical: "top",
                          horizontal: "center",
                        })}
                        className="w-full h-11 bg-mecaBluePrimaryColor rounded-full text-white cursor-pointer"
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleSucessClose}
          key={vertical + horizontal}
          // sx={{ position: "relative", top: "71rem" }}
        >
          <Alert
            onClose={handleSucessClose}
            // severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            <div className="flex gap-x-3">
              <span>
                <MdCheckCircle className="w-5 h-5" />
              </span>

              <span className={nunito.className}>
                Item has been removed successfully
              </span>
            </div>
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default BuyerCartMobile;
