"use client";
import { Fragment, useState } from "react";
import { Nunito_Sans } from "next/font/google";
import Carousel from "react-multi-carousel";
import Cards from "../../components/Homepage/Card";
import "react-multi-carousel/lib/styles.css";
import HomeImage1 from "../../assets/images/homeImage1.png";
import HomeImage2 from "../../assets/images/homeImage2.png";

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
import HeaderPage from "../reusables/Header/page";
import Parts from "../../assets/images/parts.png";
import Image from "next/image";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Alert, Card } from "@mui/material";
import Footer from "../../components/footer/Footer";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import Link from "next/link";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
// import MoreVertIcon from "@mui/icons-material/MoreVert";

import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  useRemoveProductFromCartMutation,
  useViewCartQuery,
} from "../../redux/features/product/productsQuery";
import TopBarWhileInside from "../reusables/TopBarWhileInside/page";
import TopBar from "../reusables/TopBar/page";
import TruncateText from "../../components/utils/utils";
import { paths } from "../../path/paths";
import { useGetRelatedProductQuery } from "../../redux/features/users/authQuery";

interface State extends SnackbarOrigin {
  open: boolean;
}

interface ProductType {
  id: string;
  name: string;
  image: string;
  price: string;
  categoryName?: string;
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
    delete: (
      <MdDeleteOutline className="w-[18px] h-[18px] hover:text-mecaErrorInputColor" />
    ),
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
    delete: (
      <MdDeleteOutline className="w-[18px] h-[18px] hover:text-mecaErrorInputColor" />
    ),
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
    delete: (
      <MdDeleteOutline className="w-[18px] h-[18px] hover:text-mecaErrorInputColor" />
    ),
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
    delete: (
      <MdDeleteOutline className="w-[18px] h-[18px] hover:text-mecaErrorInputColor" />
    ),
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

const RemoveToCartPage = () => {
  const [visibleButtons, setVisibleButtons] = useState<{
    [key: string]: boolean;
  }>({});

  const [
    removeProductFromCart,
    { isLoading: isRemovingProductFromCart, error: removeError },
  ] = useRemoveProductFromCartMutation();
  const toggleButton = (id: string) => {
    setVisibleButtons((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const { data: relatedProductData, isLoading } = useGetRelatedProductQuery({});
  // const { data: cartsData, refetch } = useViewCartQuery(buyerId);
  const dispatch = useAppDispatch();

  const [number, setNumber] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setNumber(event.target.value as string);
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const { cart } = useAppSelector((state) => state.product);
  // console.log("cart ", cart);
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
    router.push(paths.toDashboardActorsBuyer());
  };

  const handleSucessClose = () => {
    setState({ ...state, open: false });
  };

  const [carts, setCarts] = useState(cardCartItems);

  // let buyersId: string;
  // if (typeof window !== "undefined") {
  //   const userDetails = JSON.parse(
  //     sessionStorage.getItem("userDetails") || "{}"
  //   );
  //   buyersId = userDetails.buyersId;
  // }

  let userId = "";
  if (typeof window !== "undefined") {
    const userDetails = JSON.parse(
      sessionStorage.getItem("userDetails") || "{}"
    );
    userId = userDetails.userId;
  }

  console.log("User ID: ", userId);

  const removeFromCart = async (productId: string) => {
    try {
      await removeProductFromCart({ productId, buyerId: userId });
    } catch (error) {
      console.error("Failed to remove item from cart", error);
      return error;
    }
  };
  const router = useRouter();
  return (
    <div>
      <div className="w-full flex flex-col z-[2000]">
        {/* <HeaderPage /> */}
        <TopBarWhileInside />
      </div>

      <div className="">
        {/* mobile and tab */}
        <div
          className="w-full h-[60px] border-b-2 border-b-mecaBottomBorder px-4 flex justify-between items-center lg:hidden"
          id="contentContainerCartMobile"
        >
          <p className="text-mecaActiveIconsNavColor text-xl font-nunito font-bold">
            e-meca
          </p>
          <div className="flex items-center gap-x-2" id="menuSearchCart">
            <MdSearch size={18} />

            <div
              className="w-[49px] h-[28px] flex items-center gap-x-2 bg-mecaActiveBackgroundNavColor border border-bg-mecaCartColor rounded-full px-1"
              id="textCart"
            >
              <MdOutlineShoppingCart
                size={18}
                className="text-mecaBluePrimaryColor"
              />
              <p className="text-mecaBluePrimaryColor text-sm font-nunito font-semibold">
                {cart.length}
              </p>
            </div>

            <Link
              href={paths.toReusableMobileNav()}
              id="mobileMenuBtn"
              onClick={() => setOpenA(!OpenA)}
            >
              <MdMenu size={18} />
            </Link>
          </div>
        </div>
        {/* desktop */}
        <div
          className="hidden lg:flex flex-col border-b-2 border-b-mecaBottomBorder px-10"
          id="menuContainerDesktop"
        >
          <div
            className="w-full h-[83px] flex justify-between bg-white items-center"
            id="desktopNavContentContainer"
          >
            <div className="w-[20%]" id="mecaLogoDesktop">
              <p
                className="text-mecaActiveIconsNavColor text-3xl font-nunito font-bold cursor-pointer"
                onClick={() => router.push(paths.toHome())}
              >
                e-meca
              </p>
            </div>
            <div
              className="w-1/3 flex items-center gap-x-2 relative"
              id="searchDesktop"
            >
              <MdSearch
                size={24}
                className="absolute left-1 text-mecaGoBackArrow"
              />
              <input
                id="inputSearchDesktop"
                placeholder="Search for anything"
                className="bg-mecaSearchColor w-[580px] h-[44px] rounded-full px-9 outline-none"
              />
            </div>
            <div
              className="w-[28%] h-8 flex justify-end items-center gap-x-2"
              id="cartDesktop"
            >
              <div
                className="w-[49px] h-[28px] flex items-center gap-x-2 bg-mecaActiveBackgroundNavColor border border-bg-mecaCartColor rounded-full px-1 cursor-pointer"
                id="textCart"
              >
                <MdOutlineShoppingCart
                  size={18}
                  className="text-mecaBluePrimaryColor"
                />
                <p className="text-mecaBluePrimaryColor text-sm font-nunito font-semibold">
                  {cart.length}
                </p>
              </div>

              <button
                className="w-[40%] h-full bg-mecaBluePrimaryColor text-white text-[12px] xl:text-sm font-nunito font-semibold rounded-full"
                id="startShoppingBtn"
              >
                Start shopping
              </button>
              <p className="text-sm font-nunito font-medium">Need Help?</p>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        {/* desktop */}
        <div
          id="contentContainerAddToCartDesktop"
          className="hidden lg:flex flex-col"
        >
          <div className="w-[85%]" style={{ margin: "0px auto" }}>
            <div style={{ width: "100%" }} className={nunito.className}>
              <div
                className="flex mt-24 items-center gap-4"
                id="breadCrumbsDivDesktop"
              >
                <Link href={paths.toHome()}>
                  <p className="font-nunito text-sm font-medium text-mecaDarkBlueBackgroundOverlay hover:text-black hover:font-bold">
                    Home
                  </p>
                </Link>
                <MdChevronRight size={20} />
                <p className="font-nunito text-sm font-medium text-mecaGoBackArrow">
                  Shopping Cart
                </p>
              </div>
              <div className="">
                <h1 className="text-lg font-semibold font-nunito text-mecaDarkBlueBackgroundOverlay mt-6">
                  Shopping Cart
                </h1>
              </div>
              <div className="flex gap-x-6">
                <div className="" style={{ width: "70%" }}>
                  {carts.length === 0 ? (
                    <p className="text-lg font-bold text-center mt-20">
                      Your Cart is Empty!
                    </p>
                  ) : (
                    <div className="">
                      {carts.map((cardCartItem) => (
                        <div key={cardCartItem.id} className="mt-6 mb-5 ">
                          <div
                            className=" h-40 p-4 bg-white rounded-lg"
                            style={{
                              boxShadow:
                                "0px 0px 0px 1px rgba(42, 59, 81, 0.12)",
                            }}
                          >
                            <div className="flex justify-between">
                              <div>
                                <div className=" flex gap-x-5">
                                  <div className="">
                                    <div className="bg-mecaActiveBackgroundNavColor h-32 w-44 rounded-lg">
                                      <Image
                                        className="w-44 m-auto p-3"
                                        src={cardCartItem.Image}
                                        id="cardCartItemImage"
                                        alt="mobile spear part image"
                                      />
                                    </div>
                                  </div>
                                  <div className="mt--4">
                                    <CardContent style={{ padding: "inherit" }}>
                                      <div className="text-base font-semibold mb-2">
                                        <div className={nunito.className}>
                                          {cardCartItem.header}
                                        </div>
                                      </div>
                                      <div className={nunito.className}>
                                        <div className="flex gap-x-2 font-normal text-sm text-mecaLightGrayText mb-10">
                                          {cardCartItem.subHeader}{" "}
                                          <span className="mb--6">.</span>
                                          {cardCartItem.new}
                                        </div>
                                      </div>

                                      <div className="flex gap-x-3 font-normal text-sm">
                                        <div className="text-black">
                                          {cardCartItem.quantity}
                                        </div>

                                        <div className="relative bottom-4">
                                          <form>
                                            <select
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
                                            </select>
                                          </form>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <div className="">
                                  <div
                                    style={{
                                      position: "relative",
                                      left: "81px",
                                      cursor: "pointer",
                                    }}
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
                                          boxShadow:
                                            "0px 2px 8px 0px #63636333",
                                        }}
                                        className="px-1 h-12 w-24 cursor-pointer bg-white rounded absolute "
                                        onClick={() =>
                                          removeFromCart(cardCartItem.id)
                                        }
                                      >
                                        <div className="flex hover:shadow-xl items-center gap-x-2 w-20 h-9 m-auto hover:bg-mecaTableTextErrorBackgroundColor hover:text-mecaErrorInputColor">
                                          <div className="mt-2">
                                            {cardCartItem.delete}
                                          </div>
                                          <div className="text-sm font-normal mt-1 hover:text-red-600">
                                            {cardCartItem.remove}
                                          </div>
                                        </div>
                                      </button>
                                    </div>
                                  )}
                                </div>

                                <div
                                  className="font-bold"
                                  style={{ marginTop: "5rem" }}
                                >
                                  <p>{cardCartItem.price}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="mt-6" style={{ width: "30%" }}>
                  <div className="h-64 bg-mecaSearchColor  rounded-lg pt-5">
                    <div className="w-[90%] m-auto">
                      {itemSelected.map((itemSelect) => (
                        <div
                          className={nunito.className}
                          key={itemSelect.count}
                        >
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
        {/* mobile */}
        <div className="lg:hidden w-full" id="contentContainerAddToCartMobile">
          <div className="w-[90%]" style={{ margin: "0px auto" }}>
            <div style={{ width: "100%" }} className={nunito.className}>
              <div
                className="flex items-center gap-4 mt-52"
                id="breadCrumbsDiv"
              >
                <Link href={paths.toHome()}>
                  <p className="font-nunito text-sm font-medium text-mecaDarkBlueBackgroundOverlay  hover:text-black hover:font-bold">
                    Home
                  </p>
                </Link>
                <MdChevronRight size={20} />
                <p className="font-nunito text-sm font-medium text-mecaGoBackArrow">
                  Shopping Cart
                </p>
              </div>
              <div className="">
                <h1 className="text-lg font-semibold font-nunito text-mecaDarkBlueBackgroundOverlay mt-6">
                  Shopping Cart
                </h1>
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
                            className="h-52 p-4 rounded-lg bg-white"
                            style={{
                              boxShadow:
                                "0px 0px 0px 1px rgba(42, 59, 81, 0.12)",
                            }}
                          >
                            <div className="flex justify-between h-full">
                              <div className="flex justify-between gap-x-4 w-full h-full relative">
                                <div className="flex justify-start">
                                  <div className="bg-mecaActiveBackgroundNavColor h-20 flex justify-center items-center w-24 rounded-lg">
                                    <Image
                                      className="m-auto p-3"
                                      src={cardCartItem.Image}
                                      id="cardCartItemImage"
                                      alt="mobile spear part image"
                                    />
                                  </div>
                                </div>
                                <div className="h-full flex-1">
                                  <CardContent
                                    style={{
                                      padding: "inherit",
                                      width: "100%",
                                    }}
                                  >
                                    <div className="text-base font-semibold mb-2">
                                      <div
                                        className={nunito.className}
                                        id="cardHeadTitle"
                                      >
                                        <TruncateText
                                          text={cardCartItem.header}
                                          maxLength={20}
                                        />
                                      </div>
                                    </div>
                                    <div
                                      className={`${nunito.className} w-full`}
                                    >
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
                                          <select
                                            defaultValue="1"
                                            title="quantity"
                                            className="w-16 h-9 rounded border-2 p-2 border-mecaVerificationCodeColor mt-2"
                                            name="categoria"
                                            id="categoriaId"
                                          >
                                            <option value="0" selected>
                                              0
                                            </option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                          </select>
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
                                        className="absolute right-1 top-7 h-[34px] w-[100px] cursor-pointer bg-white rounded hover:text-mecaErrorInputColor px-1"
                                        onClick={() =>
                                          removeFromCart(cardCartItem.id)
                                        }
                                      >
                                        <div className="flex items-center hover:shadow-xl gap-x-1 w-full h-full m-auto hover:bg-red-300">
                                          <div className="">
                                            {cardCartItem.delete}
                                          </div>
                                          <div className="text-sm font-normal hover:text-blue-500">
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
                <div className="" style={{ width: "100%" }}>
                  <div className="h-64 bg-mecaSearchColor  rounded-lg pt-5">
                    <div className="w-[90%] m-auto">
                      {itemSelected.map((itemSelect) => (
                        <div
                          className={nunito.className}
                          key={itemSelect.count}
                        >
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

      <div className="lg:ml-28 ml-10" id="contentContainerAddToCartCarousel">
        <div className="">
          <div className="mt-24 mb-9">
            <p className="font-semibold lg:text-3xl text-lg ">
              More Products Like This
            </p>
          </div>
          {/* <Carousel
            partialVisible={true}
            draggable={false}
            responsive={responsive}
            ssr={true}
            infinite
            autoPlay={true}
            itemClass="lg:pr-8 pr-4"
          >
            {relatedProductData?.data.map((product: ProductType) => (
              <Cards
                id={product.id}
                image={HomeImage1}
                productName={product.name}
                price={product.price}
              />
            ))}
          </Carousel> */}
          <Fragment>
            {relatedProductData &&
            relatedProductData?.data &&
            relatedProductData?.data.length > 0 ? (
              <Carousel
                partialVisible={true}
                draggable={false}
                responsive={responsive}
                ssr={true}
                infinite
                autoPlay={true}
                itemClass="lg:pr-8 pr-4"
              >
                {relatedProductData.data.map((product: ProductType) => (
                  <Cards
                    key={product.id}
                    id={product.id}
                    image={HomeImage1}
                    productName={product.name}
                    price={product.price}
                  />
                ))}
              </Carousel>
            ) : (
              <p>No related products found.</p>
            )}
          </Fragment>
        </div>
      </div>

      <div className="mt-14" id="contentContainerAddToCartFooter">
        <Footer />
      </div>
    </div>
  );
};

export default RemoveToCartPage;
