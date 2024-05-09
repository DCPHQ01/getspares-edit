"use client";
import { useState } from "react";
import { Nunito_Sans } from "next/font/google";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito_sans",
  adjustFontFallback: false,
  display: "swap",
});
import {
  MdChevronRight,
  MdExpandMore,
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
import { Alert, Button, Card, CardActionArea } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Footer from "../../components/footer/Footer";
import ProductCarousel from "../../components/Homepage/ProductCarousel";
import Home from "../../components/Homepage/Home";
import Box from "@mui/material/Box";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import { MdCheckCircle } from "react-icons/md";

interface State extends SnackbarOrigin {
  open: boolean;
}

const cardCartItems = [
  {
    id: 1,
    Image: Parts,
    header: "E46 Engine 1996 Model",
    subHeader: "Tractor parts",
    new: "Refurbished",
    quantity: "Quantity",
    quantityAmount: "10",
    icon1: <MdOutlineExpandMore />,
    icondropdown: <MdKeyboardArrowDown />,
    delete: <MdDeleteOutline />,
    icon2: <MdMoreVert />,
    icondot: <MdCircle />,
    remove: "Remove",
    price: "₦900,000.00",
  },

  {
    id: 2,
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
    icon2: <MdMoreVert />,
    icondot: <MdCircle />,
    price: "₦9,000,000.00",
  },

  {
    id: 3,
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
    icon2: <MdMoreVert />,
    icondot: <MdCircle />,
    price: "₦450,000.00",
  },
  {
    id: 4,
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
    icon2: <MdMoreVert />,
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

const AddtoCartPage = () => {
  const [openA, setOpenA] = useState(false);
  const handleNav = () => {
    setOpenA(!open);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const opened = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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

  return (
    <div>
      <div className="">
        <div className="">
          <HeaderPage />
        </div>

        <div className="">
          {/* mobile and tab */}
          <div
            className="w-full h-[60px] border-b-2 border-b-mecaBottomBorder px-4 flex justify-between items-center lg:hidden"
            id="contentContainer"
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
                  0
                </p>
              </div>

              <div id="mobileMenuBtn" onClick={() => setOpenA(!openA)}>
                <MdMenu size={18} />
              </div>
            </div>
          </div>
          {/* desktop */}
          <div
            className="hidden lg:flex flex-col border-b-2 border-b-mecaBottomBorder px-10"
            id="menuContainerDesktop"
          >
            <div
              className="w-full h-[83px] flex justify-between items-center"
              id="desktopNavContentContainer"
            >
              <div className="w-[20%]" id="mecaLogoDesktop">
                <p className="text-mecaActiveIconsNavColor text-3xl font-nunito font-bold">
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
                    0
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
      </div>

      <div className="">
        {/* desktop */}
        <div className="hidden lg:flex flex-col">
          <div className="w-[85%]" style={{ margin: "0px auto" }}>
            <div style={{ width: "100%" }} className={nunito.className}>
              <div className="flex items-center gap-4 mt-6" id="breadCrumbsDiv">
                <p className="font-nunito text-sm font-medium text-mecaDarkBlueBackgroundOverlay">
                  Home
                </p>
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
                  {cardCartItems.map((cardCartItem) => (
                    <div key={cardCartItem.id} className="mt-6 mb-5 ">
                      <Card className="h-40 p-4">
                        <div className="flex justify-between">
                          <div>
                            <div className=" flex gap-x-5">
                              <div className="">
                                <Card className="bg-mecaActiveBackgroundNavColor h-32 w-44">
                                  <Image
                                    className="w-44 m-auto p-3"
                                    src={cardCartItem.Image}
                                    id="cardCartItemImage"
                                    alt="mobile spear part image"
                                  />
                                </Card>
                              </div>
                              <div className="mt--4">
                                <CardContent style={{ padding: "inherit" }}>
                                  <Typography className="text-base font-semibold mb-2">
                                    <p className={nunito.className}>
                                      {" "}
                                      {cardCartItem.header}
                                    </p>
                                  </Typography>
                                  <Typography className={nunito.className}>
                                    <div className="flex gap-x-2 font-normal text-sm text-mecaLightGrayText mb-10">
                                      {cardCartItem.subHeader}
                                      {cardCartItem.icondot}
                                      {cardCartItem.new}
                                    </div>
                                  </Typography>

                                  <Typography className="flex gap-x-3 font-normal text-sm">
                                    <div className="text-black mt-2">
                                      {cardCartItem.quantity}
                                    </div>
                                    <div className=" h-3 w-5">
                                      <button
                                        className="h-9 w-16  text-mecaLightGrayText  bg-white flex justify-center gap-x-1"
                                        style={{
                                          border: "1px solid #CDD5DF",
                                          borderRadius: "4px",
                                          padding: "6px",
                                        }}
                                      >
                                        {cardCartItem.quantityAmount}

                                        <span className="mt-1">
                                          {cardCartItem.icondropdown}
                                        </span>
                                      </button>
                                    </div>
                                  </Typography>
                                </CardContent>
                              </div>
                            </div>
                          </div>

                          <div>
                            <div className="">
                              <Typography
                                style={{ position: "relative", left: "81px" }}
                                onClick={handleClick}
                              >
                                {cardCartItem.icon2}
                              </Typography>

                              <Menu
                                id="long-menu"
                                // MenuListProps={{
                                //   "aria-labelledby": "long-button",
                                // }}
                                anchorEl={anchorEl}
                                open={opened}
                                onClose={handleClose}
                                PaperProps={{
                                  style: {
                                    maxHeight: ITEM_HEIGHT * 4.5,
                                    width: "20ch",
                                  },
                                }}
                                className=" "
                              >
                                <div className="flex justify-center  gap-x-2 w-32 h-11 m-auto ">
                                  <div className="mt-4">
                                    {cardCartItem.delete}
                                  </div>
                                  <div className="mt-3">
                                    {cardCartItem.remove}
                                  </div>
                                </div>
                              </Menu>
                            </div>

                            <div className="" style={{ marginTop: "54px" }}>
                              <p>{cardCartItem.price}</p>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  ))}
                </div>
                <div className="" style={{ width: "30%" }}>
                  <div className="h-64 bg-mecaSearchColor  rounded-lg pt-5">
                    <div className="w-[90%] m-auto">
                      {itemSelected.map((itemSelect) => (
                        <>
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
                        </>
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
          {/* 
          <Snackbar
            className={nunito.className}
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={handleSucessClose}
            message="Item has been removed successfully"
            key={vertical + horizontal}
          /> */}

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
        <div className="lg:hidden w-full">
          <div className="w-[90%]" style={{ margin: "0px auto" }}>
            <div style={{ width: "100%" }} className={nunito.className}>
              <div className="flex items-center gap-4 mt-6" id="breadCrumbsDiv">
                <p className="font-nunito text-sm font-medium text-mecaDarkBlueBackgroundOverlay">
                  Home
                </p>
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
                  {cardCartItems.map((cardCartItem) => (
                    <div key={cardCartItem.id} className="mt-6 mb-5 ">
                      <Card className="h-40 p-4">
                        <div className="flex justify-between">
                          <div>
                            <div className=" flex gap-x-5">
                              <div className="">
                                <Card className="bg-mecaActiveBackgroundNavColor h-32 w-44">
                                  <Image
                                    className="w-44 m-auto p-3"
                                    src={cardCartItem.Image}
                                    id="cardCartItemImage"
                                    alt="mobile spear part image"
                                  />
                                </Card>
                              </div>
                              <div className="mt--4">
                                <CardContent style={{ padding: "inherit" }}>
                                  <Typography className="text-sm font-semibold mb-2">
                                    <p className={nunito.className}>
                                      {" "}
                                      {cardCartItem.header}
                                    </p>
                                  </Typography>
                                  <Typography className={nunito.className}>
                                    <div className="flex gap-x-2 font-normal text-xs text-mecaLightGrayText mb-10">
                                      {cardCartItem.subHeader}
                                      <span className="w-0.5">
                                        {cardCartItem.icondot}
                                      </span>

                                      {cardCartItem.new}
                                    </div>
                                  </Typography>

                                  <Typography className="flex gap-x-3 font-normal text-sm">
                                    <div className="text-black mt-2">
                                      {cardCartItem.quantity}
                                    </div>
                                    <div className=" h-3 w-5">
                                      <button
                                        className="h-9 w-16  text-mecaLightGrayText  bg-white flex justify-center gap-x-1"
                                        style={{
                                          border: "1px solid #CDD5DF",
                                          borderRadius: "4px",
                                          padding: "6px",
                                        }}
                                      >
                                        {cardCartItem.quantityAmount}

                                        <span className="mt-1">
                                          {cardCartItem.icondropdown}
                                        </span>
                                      </button>
                                    </div>
                                  </Typography>
                                </CardContent>
                              </div>
                            </div>
                          </div>

                          <div>
                            <div className="">
                              <Typography
                                style={{ position: "relative", left: "81px" }}
                                onClick={handleClick}
                              >
                                {cardCartItem.icon2}
                              </Typography>

                              <Menu
                                id="long-menu"
                                // MenuListProps={{
                                //   "aria-labelledby": "long-button",
                                // }}
                                anchorEl={anchorEl}
                                open={opened}
                                onClose={handleClose}
                                PaperProps={{
                                  style: {
                                    maxHeight: ITEM_HEIGHT * 4.5,
                                    width: "20ch",
                                  },
                                }}
                                className=" "
                              >
                                <div className="flex justify-center  gap-x-2 w-32 h-11 m-auto ">
                                  <div className="mt-4">
                                    {cardCartItem.delete}
                                  </div>
                                  <div className="mt-3">
                                    {cardCartItem.remove}
                                  </div>
                                </div>
                              </Menu>
                            </div>

                            <div className="" style={{ marginTop: "54px" }}>
                              <p>{cardCartItem.price}</p>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  ))}
                </div>
                <div className="" style={{ width: "100%" }}>
                  <div className="h-64 bg-mecaSearchColor  rounded-lg pt-5">
                    <div className="w-[90%] m-auto">
                      {itemSelected.map((itemSelect) => (
                        <>
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
                        </>
                      ))}
                      <div className="">
                        <button className="w-full h-11 bg-mecaBluePrimaryColor rounded-full text-white cursor-pointer">
                          Checkout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="">{/* <Home /> */}</div>

      <div className="">
        <Footer />
      </div>
    </div>
  );
};

export default AddtoCartPage;
