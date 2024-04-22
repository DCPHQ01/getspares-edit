"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import FormControl from "@mui/material/FormControl";
// import TextField from "@mui/material/TextField";
import {
  Button,
  FilledInput,
  IconButton,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import {
  MdChevronRight,
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
} from "react-icons/md";

export default function Login() {
  const [state, setState] = useState({
    showPassword: false,
    email: "",
    password: "",
    validEmail: true,
    validPassword: false,
  });

  const handleEmailOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setState((prevState) => ({
      ...prevState,
      email,
      validEmail: isValid,
    }));
  };

  const handlePasswordOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isValid = passwordRegex.test(password);
    setState((prevState) => ({
      ...prevState,
      password,
      validPassword: isValid,
      isDisabled: !isValid || !prevState.validEmail,
    }));
  };

  const handleClickShowPassword = () => {
    setState((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword,
    }));
  };

  return (
    <div>
      <div className="absolute top-16 lg:left-16 left-8" id="eMecaLogin">
        <span className="font-bold lg:text-3xl text-2xl text-mecaActiveIconsNavColor">
          e-meca
        </span>
      </div>
      <div
        className="flex flex-col lg:justify-center items-center mx-auto gap-2 h-screen w-fit px-6 lg:mt-0 mt-40"
        id="container"
      >
        <h2
          className="text-meca-black font-bold text-center text-3xl"
          id="forgotPasswordHeader"
        >
          Login to your account
        </h2>
        <p
          className="text-meca-gray-600 text-center px-8"
          id="forgotPasswordText"
        >
          Welcome back! Please input your details
        </p>
        <FormControl className="flex flex-col gap-8 w-full mt-6" id="form">
          <FormControl className="w-full" variant="filled">
            <InputLabel htmlFor="password">Email</InputLabel>
            <FilledInput
              id="email"
              disableUnderline
              onChange={handleEmailOnChange}
              className="bg-mecaInputBgColor w-full hover:bg-mecaInputBgColor focus-within:bg-mecaInputBgColor"
            />
          </FormControl>
          <FormControl className="w-full" variant="filled">
            <InputLabel htmlFor="password">Password</InputLabel>
            <FilledInput
              id="password"
              type={state.showPassword ? "text" : "password"}
              disableUnderline
              onChange={handlePasswordOnChange}
              className="bg-mecaInputBgColor w-full hover:bg-mecaInputBgColor focus-within:bg-mecaInputBgColor"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {state.showPassword ? (
                      <MdOutlineVisibilityOff />
                    ) : (
                      <MdOutlineVisibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button
            id="loginBtn"
            className="bg-mecaBluePrimaryColor capitalize text-[white] text-lg font-semibold rounded-[36px] h-12 hover:bg-mecaBluePrimaryColor"
            variant="contained"
            endIcon={<MdChevronRight />}
          >
            Login
          </Button>
        </FormControl>
        <span className="flex items-center gap-1 text-meca-gray-600 text-sm mt-6">
          New on Meca?
          <Link
            href="/signup"
            id="resendEmailLink"
            className="text-mecaBluePrimaryColor font-bold"
          >
            Register
          </Link>
        </span>
      </div>
    </div>
  );
}
