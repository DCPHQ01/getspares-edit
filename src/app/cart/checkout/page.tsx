"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Link from "next/link";
import { MdChevronRight } from "react-icons/md";
import { Nunito_Sans } from "next/font/google";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FilledInput,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  Modal,
  SnackbarOrigin,
  Typography,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
// import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { useRouter } from "next/navigation";
import { ColorRing } from "react-loader-spinner";
import Footer from "../../../components/footer/Footer";
import HeaderPage from "../../reusables/Header/page";
import NavBarWhileInsideApp from "../../reusables/TopBarWhileInside/NavBarWhileInsideApp/page";
import { paths } from "../../../path/paths";
import { useCheckoutMutation } from "../../../redux/features/dashboard/buyerQuery";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import { formatAmount } from "../../../components/utils";
import {setCart} from "../../../redux/features/product/productSlice";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "8px",
  // boxShadow: 24,
  p: 4,
  opacity: 1,
  gap: 12,
};

const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito_sans",
  adjustFontFallback: false,
  display: "swap",
});

const itemSelected = [
  {
    count: 4,
    totalPrice: "₦360,000.00",
    shippingPrice: "₦0",
    subtotal: "₦23,000,000.98",
  },
];

const Checkout = () => {
  const dispatch = useAppDispatch();
  const [deliveryMode, setDeliveryMode] = useState("delivery");
  const [showAddressSelection, setShowAddressSelection] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [totalItemPrice, setTotalItemPrice] = useState<string>("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    deliveryAddress: "",
  });

  const router = useRouter();
  const { cart } = useAppSelector((state) => state.product);

  const [checkoutData, { isLoading, error }] = useCheckoutMutation();

  const handleDeliveryModeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDeliveryMode(event.target.value);
  };

  const handleRouteToMarketPlace = () => {
    paths.toHome();
  };

  const getAllTotalPrice = () => {
    let newTotal = "0";

    if (cart.length !== 0) {
      const total = cart
        .map((item) => Number(item.amount) * Number(item.quantity))
        .reduce((a, b) => a + b, 0);

      newTotal = String(total);
    }
    if (totalItemPrice !== newTotal) {
      setTotalItemPrice(newTotal);
    }
  };

  useEffect(() => {
    getAllTotalPrice();
  }, [cart]);

  const handleAddressSelectionToggle = () => {
    setShowAddressSelection(!showAddressSelection);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    let parsedUserDetails = JSON.parse(sessionStorage.getItem("userDetails")!);
    if (parsedUserDetails) {
      setFormData({
        ...formData,
        firstName: parsedUserDetails.firstName || "",
        lastName: parsedUserDetails.lastName,
      });
    }
  }, [router]);


  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const payload = {
      location: formData.deliveryAddress,
      otherInformation: "Some other information",
      phoneNumber: formData.phoneNumber,
    };
    localStorage.removeItem("savedCartItems");
    dispatch(setCart([]));


    try {
      const response = await checkoutData(payload).unwrap();
      setOpen(true);
      localStorage.removeItem("savedCartItems");
      dispatch(setCart([]));

    } catch (error:any) {
      console.log(error.data);
    }
  };

  return (
    // add screen
    <>
      <div id="topHeader" className="fixed top-0 left-0 right-0 z-10">
        <HeaderPage />
        <div className="px-2">
          <NavBarWhileInsideApp />
        </div>
      </div>
      <div
        id="checkoutContent"
        className="w-[95%] m-auto mt-[200px] lg:mt-[150px] "
      >
        <div style={{ width: "100%" }}>
          <div className="flex items-center gap-4" id="breadCrumbsDivDesktop">
            <Link href={paths.toHome()}>
              <p className="font-nunito text-sm font-medium text-mecaDarkBlueBackgroundOverlay hover:text-black hover:font-bold">
                Home
              </p>
            </Link>
            <MdChevronRight size={20} />
            <Link href={paths.toCart()}>
              <p className="font-nunito text-sm font-medium text-mecaDarkBlueBackgroundOverlay hover:text-black hover:font-bold">
                Shopping Cart
              </p>
            </Link>
            <MdChevronRight size={20} />
            <p className="font-nunito text-sm font-medium text-mecaGoBackArrow">
              Order
            </p>
          </div>
          <div className="">
            <h1 className="text-lg font-semibold font-nunito text-mecaDarkBlueBackgroundOverlay mt-6">
              Place Order
            </h1>
          </div>
          <div className="flex flex-col lg:flex-row gap-x-6">
            <Card
              className="rounded-lg lg:w-[70%] mt-6"
              style={{
                border: "2px solid #FFFFF",
                boxShadow: "0px 0px 0px 1px #12376914",
              }}
            >
              <CardContent>
                <p className={`${nunito.className} text-lg font-semibold p-4`}>
                  Basic Information
                </p>
                <Divider />
                <div className="flex flex-col p-4 gap-4">
                  <FormControl>
                    <div className="grid grid-cols-2 md:flex-row gap-5">
                      <FormControl className="w-full" variant="filled">
                        <InputLabel
                          htmlFor="firstName"
                          style={{
                            color: "#697586",
                            fontSize: "12px",
                            fontWeight: "400",
                          }}
                        >
                          First name
                        </InputLabel>
                        <FilledInput
                          id="firstName"
                          disableUnderline
                          placeholder="Enter first name"
                          className="bg-mecaInputBgColor w-full rounded-t-[4px] hover:bg-mecaInputBgColor border focus-within:bg-mecaInputBgColor"
                          inputProps={{
                            style: { color: "#364152" },
                            fontSize: "16px",
                            fontWeight: "400",
                          }}
                          type="text"
                          value={formData.firstName}
                          onChange={handleChange}
                        />
                      </FormControl>
                      <FormControl className="w-full" variant="filled">
                        <InputLabel
                          htmlFor="lastName"
                          style={{
                            color: "#697586",
                            fontSize: "12px",
                            fontWeight: "400",
                          }}
                        >
                          Last name
                        </InputLabel>
                        <FilledInput
                          id="lastName"
                          disableUnderline
                          placeholder="Enter last name"
                          className="bg-mecaInputBgColor w-full rounded-t-[4px] hover:bg-mecaInputBgColor border focus-within:bg-mecaInputBgColor"
                          inputProps={{
                            style: { color: "#364152" },
                            fontSize: "16px",
                            fontWeight: "400",
                          }}
                          type="text"
                          value={formData.lastName}
                          onChange={handleChange}
                        />
                      </FormControl>
                      <FormControl className="w-full" variant="filled">
                        <InputLabel
                          htmlFor="phoneNumber"
                          style={{
                            color: "#697586",
                            fontSize: "12px",
                            fontWeight: "400",
                          }}
                        >
                          Phone number
                        </InputLabel>
                        <FilledInput
                          id="phoneNumber"
                          disableUnderline
                          placeholder="Enter phone number"
                          className="bg-mecaInputBgColor w-full rounded-t-[4px] hover:bg-mecaInputBgColor border focus-within:bg-mecaInputBgColor"
                          inputProps={{
                            style: { color: "#364152" },
                            fontSize: "16px",
                            fontWeight: "400",
                          }}
                          type="tel"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                        />
                      </FormControl>
                    </div>
                  </FormControl>

                  <FormControl>
                    <FormLabel
                      id="demo-controlled-radio-buttons-group"
                      style={{ color: "#000000" }}
                      className="text-black text-base font-semibold"
                    >
                      Mode of delivery
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      className="flex flex-row gap-5"
                      value={deliveryMode}
                      onChange={handleDeliveryModeChange}
                    >
                      <div className="flex row">
                        <FormControlLabel
                          className="text-black text-sm font-normal"
                          value="delivery"
                          control={<Radio />}
                          label="Delivery"
                        />
                        <FormControlLabel
                          className="text-black text-sm font-normal"
                          value="pickup"
                          control={<Radio />}
                          label="Pickup"
                        />
                      </div>
                    </RadioGroup>
                  </FormControl>
                  {deliveryMode === "delivery" ? (
                    <FormControl className="w-full" variant="filled">
                      <InputLabel
                        htmlFor="deliveryAddress"
                        style={{
                          color: "#697586",
                          fontSize: "12px",
                          fontWeight: "400",
                        }}
                      >
                        Delivery address
                      </InputLabel>
                      <FilledInput
                        id="deliveryAddress"
                        disableUnderline
                        placeholder="Enter delivery address"
                        multiline
                        minRows={4}
                        maxRows={6}
                        className="bg-mecaInputBgColor w-full rounded-t-[4px] hover:bg-mecaInputBgColor border focus-within:bg-mecaInputBgColor"
                        inputProps={{
                          style: { color: "#364152" },
                          fontSize: "16px",
                          fontWeight: "400",
                          overflow: "auto",
                        }}
                        type="text"
                        value={formData.deliveryAddress}
                        onChange={handleChange}
                      />
                    </FormControl>
                  ) : (
                    <>
                      {showAddressSelection ? (
                        <Card
                          className="w-full p-4"
                          style={{
                            border: "2px solid #FFFFF",
                            boxShadow: "0px 0px 0px 1px #12376914",
                          }}
                        >
                          <div className="flex flex-row">
                            <p
                              className={`${nunito.className} text-sm font-semibold text-black`}
                            >
                              Pickup station
                            </p>
                            <Link
                              href=""
                              className={`${nunito.className} flex ml-auto items-center text-sm font-semibold text-blue-500`}
                            >
                              change address
                              <MdChevronRight />
                            </Link>
                          </div>
                          <Divider />
                          <p
                            className={`${nunito.className} font-semibold text-sm text-black mt-2`}
                          >
                            vendor address
                          </p>
                          <p className={`${nunito.className} text-gray-500`}>
                            No 56b, Moleye by Total filling station, Alago-meji,
                            Sabo, Yaba,Lagos, Total Filling Station | Lagos -
                            Yaba-(Sabo)
                          </p>
                        </Card>
                      ) : (
                        <Button
                          variant="outlined"
                          disableRipple
                          onClick={handleAddressSelectionToggle}
                          style={{
                            gap: "10px",
                            borderRadius: "36px",
                            border: "2px solid #095AD3",
                            opacity: 1,
                            color: "#095AD3",
                            textTransform: "none",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                          className="w-36 h-8"
                        >
                          Select Address
                        </Button>
                      )}
                    </>
                  )}
                </div>
                {/* <div className='flex justify-end px-4'>
                  <Button
                    sx={{
                      padding: '10px 24px',
                      gap: '10px',
                      borderRadius: '36px',
                      opacity: 1,
                      backgroundColor: '#9AA4B2',
                      fontSize: '16px',
                      fontWeight: '400',
                      textTransform: 'none',
                      color: '#FFFFFF',
                      lineHeight: '24px',
                      fontFamily: 'Nunito Sans',
                      '&:hover': {
                        backgroundColor: '#9AA4B2',
                      },
                    }}
                    onClick={handleSaveCick}
                  >
                    Save & Continue
                  </Button>
                </div> */}
              </CardContent>
            </Card>
            <div className="mt-6 w-full md:w-[30%]">
              <div className="h-64 bg-mecaSearchColor  rounded-lg pt-5">
                <div className="w-[90%] m-auto">
                  <div>
                    <div className="flex justify-between">
                      <div className="flex font-normal text-sm">
                        <p> Item{cart?.length > 1 && "s"}</p>
                        <p> ({cart?.length})</p>
                      </div>

                      <div className=" font-normal text-sm">
                        <p>{formatAmount(totalItemPrice)}</p>
                      </div>
                    </div>
                    <div className="flex justify-between mt-5 font-normal text-sm">
                      <p>Shipping</p>
                      <p>{"₦0"}</p>
                    </div>
                    <hr className="mt-5"></hr>
                    <div className="flex justify-between mt-5 mb-9 font-semibold text-xl">
                      <p>Subtotal</p>
                      <p>{formatAmount(totalItemPrice)}</p>
                    </div>
                  </div>
                  <div className="">
                    <button
                      onClick={handleSubmit}
                      disabled={!formData.deliveryAddress || !formData.phoneNumber}
                      className={`w-full h-11 flex items-center justify-center rounded-full text-white cursor-pointer ${
                      !formData.deliveryAddress || !formData.phoneNumber
                         ? "bg-gray-500"
                         : "bg-mecaBluePrimaryColor"
                    }`}
                    >
                      {isLoading ? (
                        <ColorRing
                          visible
                          height="40"
                          width="40"
                          ariaLabel="color-ring-loading"
                          wrapperStyle={{}}
                          wrapperClass="color-cart-wrapper"
                          colors={["#ffff", "#ffff", "#ffff", "#ffff", "#ffff"]}
                        />
                      ) : (
                        "Place Order"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <Modal
              // open={open}
              // onClose={handleClose}
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              sx={{ backdropFilter: "blur(5px)" }}
            >
              <Box sx={style}>
                <CheckOutlinedIcon
                  sx={{
                    background: "#B2CCFF",
                    color: "#095AD3",
                    borderRadius: "28px",
                    border: "8px solid #B2CCFF",
                    fontSize: "40px",
                  }}
                />
                <div className="flex flex-col gap-3">
                  <p
                    id="modal-modal-title"
                    className="text-lg font-semibold mt-5"
                  >
                    Order successful!
                  </p>
                  <p
                    id="modal-modal-description"
                    className="text-sm font-normal text-mecaCheckoutMessage"
                  >
                    Thank you for your purchase. Your order has been placed
                    successfully. A confirmation email with your order details
                    will be sent shortly.
                  </p>
                </div>
                <div className="mt-4">
                  <button
                    onClick={handleRouteToMarketPlace}
                    className="w-full h-11 bg-mecaBluePrimaryColor rounded-full text-white cursor-pointer"
                  >
                    Go to Marketplace
                  </button>
                </div>
              </Box>
            </Modal>
          </div>
        </div>
      </div>
      <div className="mt-14" id="contentContainerAddToCartFooter">
        <Footer />
      </div>
    </>
  );
};

export default Checkout;
