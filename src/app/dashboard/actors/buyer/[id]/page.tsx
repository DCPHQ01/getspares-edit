"use client";
import React, { useState } from 'react'
import HeaderPage from '../../../../reusables/Header/page';
import Link from 'next/link';
import {  MdChevronRight } from "react-icons/md";
import { Nunito_Sans } from "next/font/google";
import { Box, Button, Card, CardContent, Divider, FilledInput, FormControl, FormControlLabel, FormLabel, InputLabel, SnackbarOrigin } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Footer from '../../../../../components/footer/Footer';
import NavBarWhileInsideApp from '../../../../reusables/TopBarWhileInside/NavBarWhileInsideApp/page';
import Carousel from 'react-multi-carousel';

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
    subtotal: "₦230,000,000.98",
  },
];

const Checkout = () => {
  const [deliveryMode, setDeliveryMode] = useState('delivery');
  const [showAddressSelection, setShowAddressSelection] = useState(false);
  const handleDeliveryModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeliveryMode(event.target.value);
  };

  const handleSucessClick = () => {
    console.log('clicked')
  };

  const handleSaveCick = () => {
    console.log('clicked')
  };

  const handleAddressSelectionToggle = () => {
    setShowAddressSelection(!showAddressSelection);
  };
  return (
    <Box>
      <HeaderPage/>
      <NavBarWhileInsideApp/>
      <div className="w-[85%]" style={{ margin: "0px auto" }}>
        <div style={{ width: "100%" }} className={nunito.className}>
          <div
            className="flex mt-16 items-center gap-4"
            id="breadCrumbsDivDesktop">
            <Link href="/">
              <p className="font-nunito text-sm font-medium text-mecaDarkBlueBackgroundOverlay hover:text-black hover:font-bold">
                Home
              </p>
            </Link>
            <MdChevronRight size={20} />
            <Link href="/cart">
              <p className="font-nunito text-sm font-medium text-mecaDarkBlueBackgroundOverlay hover:text-black hover:font-bold">
                Shopping Cart
              </p>
            </Link>
            <MdChevronRight size={20} />
            <p className="font-nunito text-sm font-medium text-mecaGoBackArrow">
              Checkout
            </p>
          </div>
          <div className="">
            <h1 className="text-lg font-semibold font-nunito text-mecaDarkBlueBackgroundOverlay mt-6">
              Checkout
            </h1>
          </div>
          <div className='flex flex-col lg:flex-row gap-x-6'>
            <Card className='rounded-lg lg:w-[55%] mt-6' style={{ border: '2px solid #FFFFF', boxShadow: "0px 0px 0px 1px #12376914" }}>
              <CardContent>
                <p className={`${nunito.className} text-lg font-semibold p-4`}>Basic Information</p>
                <Divider />
                <div className='flex flex-col p-4 gap-4'>
                  <FormControl>
                    <div className='grid grid-cols-2 md:flex-row gap-5'>
                      <FormControl className="w-full" variant="filled">
                        <InputLabel htmlFor="firstName" style={{ color: '#697586', fontSize: '12px', fontWeight: '400' }}>First name</InputLabel>
                        <FilledInput
                          id="firstName"
                          disableUnderline
                          placeholder='Enter first name'
                          className='bg-mecaInputBgColor w-full rounded-t-[4px] hover:bg-mecaInputBgColor border focus-within:bg-mecaInputBgColor'
                          inputProps={{
                            style: { color: '#364152' },
                            fontSize: '16px',
                            fontWeight: '400',
                          }}
                          type='text'
                        />
                      </FormControl>
                      <FormControl className="w-full" variant="filled">
                        <InputLabel htmlFor="lastName" style={{ color: '#697586', fontSize: '12px', fontWeight: '400' }}>Last name</InputLabel>
                        <FilledInput
                          id="lastName"
                          disableUnderline
                          placeholder='Enter last name'
                          className='bg-mecaInputBgColor w-full rounded-t-[4px] hover:bg-mecaInputBgColor border focus-within:bg-mecaInputBgColor'
                          inputProps={{
                            style: { color: '#364152' },
                            fontSize: '16px',
                            fontWeight: '400',
                          }}
                          type='text'
                        />
                      </FormControl>
                      <FormControl className="w-full" variant="filled">
                        <InputLabel htmlFor="phoneNumber" style={{ color: '#697586', fontSize: '12px', fontWeight: '400' }}>Phone number</InputLabel>
                        <FilledInput
                          id="phoneNumber"
                          disableUnderline
                          placeholder='Enter phone number'
                          className='bg-mecaInputBgColor w-full rounded-t-[4px] hover:bg-mecaInputBgColor border focus-within:bg-mecaInputBgColor'
                          inputProps={{
                            style: { color: '#364152' },
                            fontSize: '16px',
                            fontWeight: '400',
                          }}
                          type='tel'
                        />
                      </FormControl>
                    </div>
                  </FormControl>
                  
                  <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group" style={{ color: '#000000' }} className="text-black text-base font-semibold">Mode of delivery</FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      className='flex flex-row gap-5'
                      value={deliveryMode}
                      onChange={handleDeliveryModeChange}
                    >
                      <FormControlLabel className="text-black text-sm font-normal" value="delivery" control={<Radio />} label="Delivery" />
                      <FormControlLabel className="text-black text-sm font-normal" value="pickup" control={<Radio />} label="Pickup" />
                    </RadioGroup>
                  </FormControl>
                  {deliveryMode === 'delivery' ? (
                    <FormControl className="w-full" variant="filled">
                      <InputLabel htmlFor="deliveryAddress" style={{ color: '#697586', fontSize: '12px', fontWeight: '400' }}>Delivery address</InputLabel>
                      <FilledInput
                        id="deliveryAddress"
                        disableUnderline
                        placeholder='Enter delivery address'
                        multiline
                        rows={6}
                        maxRows={6}
                        className='bg-mecaInputBgColor w-full rounded-t-[4px] hover:bg-mecaInputBgColor border focus-within:bg-mecaInputBgColor'
                        inputProps={{
                          style: { color: '#364152' },
                          fontSize: '16px',
                          fontWeight: '400',
                          overflow: 'auto',
                        }}
                        type='text'
                      />
                    </FormControl>
                  ) : (
                    <>
                    {showAddressSelection ? (
                      <Card className="w-full p-4" style={{ border: '2px solid #FFFFF', boxShadow: "0px 0px 0px 1px #12376914"}}>
                        <div className='flex flex-row'>
                          <p className={`${nunito.className} text-sm font-semibold text-black`}>Pickup station</p>
                          <Link href="" className={`${nunito.className} flex ml-auto items-center text-sm font-semibold text-blue-500`}>change address<MdChevronRight/></Link>
                        </div>
                        <Divider />
                        <p className={`${nunito.className} font-semibold text-sm text-black mt-2`}>vendor address</p>
                        <p className={`${nunito.className} text-gray-500`}>No 56b, Moleye by Total filling station, Alago-meji, Sabo, 
                          Yaba,Lagos, Total Filling Station | Lagos - Yaba-(Sabo)</p>
                      </Card>
                    ) : (
                      <Button
                        variant="outlined"
                        disableRipple
                        onClick={handleAddressSelectionToggle}
                        style={{
                          gap: '10px',
                          borderRadius: '36px',
                          border: '2px solid #095AD3',
                          opacity: 1, 
                          color: '#095AD3',
                          textTransform: 'none',
                          fontSize: '14px',
                          fontWeight: '600',
                        }}
                        className="w-36 h-8"
                      >
                        Select Address
                      </Button>
                    )}
                  </>
                )}
                </div>
                <div className='flex justify-end px-4'>
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
                </div>
              </CardContent>
            </Card>
            <Card className="mt-6 lg:h-[64%] lg:w-[30%]">
              <CardContent className="h-64 bg-mecaSearchColor rounded-lg pt-5">
                <div className="w-[90%] m-auto">
                  {itemSelected.map((itemSelect) => (
                    <div className={nunito.className} key={itemSelect.count}>
                      <div className="flex justify-between">
                        <div className="flex font-normal text-sm">
                          <p>Item</p>
                          <p>({itemSelect.count})</p>
                        </div>
                        <p className="font-normal text-sm">{itemSelect.totalPrice}</p>
                      </div>
                      <div className="flex justify-between mt-5 font-normal text-sm">
                        <p>Shipping</p>
                        <p>{itemSelect.shippingPrice}</p>
                      </div>
                      <hr className="mt-5" />
                      <div className="flex justify-between mt-5 mb-9 font-semibold text-xl">
                        <p>Subtotal</p>
                        <p>{itemSelect.subtotal}</p>
                      </div>
                    </div>
                  ))}
                  <div>
                    <button
                      onClick={handleSucessClick}
                      className="w-full h-11 bg-mecaBluePrimaryColor rounded-full text-white cursor-pointer"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
        <div className="mt-14" id="contentContainerAddToCartFooter">
          <Footer />
        </div>  
    </Box>
  )
}

export default Checkout;