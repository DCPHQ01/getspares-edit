"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, useState } from "react";
import Link from "next/link";
import FormControl from "@mui/material/FormControl";
import { Nunito_Sans } from "next/font/google";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito_sans",
  adjustFontFallback: false,
  display: "swap",
});

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
  MdOutlineVpnKey,
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
} from "react-icons/md";

export default function Login() {
  const [state, setState] = useState({
    showPassword: false,
    email: "",
    password: "",
    emailError: false,
    passwordError: false,
  });

  const handleEmailOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    setState((prevState) => ({
      ...prevState,
      email,
      emailError: !isValidEmail(email),
    }));
  };

  const handlePasswordOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    setState((prevState) => ({
      ...prevState,
      password,
      passwordError: !isValidPassword(password),
    }));
  };

  const handleClickShowPassword = () => {
    setState((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword,
    }));
  };

  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const isValidPassword = (password: string) => {
    return password.length >= 8;
  };

  const isFormValid = () => {
    return isValidEmail(state.email) && isValidPassword(state.password);
  };

  return (
    <div className={nunito.className}>
      <div className="absolute top-16  lg:left-16 left-8" id="eMecaLogin">
        <span className="font-bold lg:text-3xl text-2xl text-mecaActiveIconsNavColor">
          e-meca
        </span>
      </div>

      <div
        className="flex flex-col lg:justify-center items-center lg:mx-auto gap-2 h-screen lg:w-fit w-[100%] px-6 lg:mt-10 mt-60"
        id="container"
      >
        <div
          className="border border-mecaBorderColor p-4 rounded-xl"
          id="keyIconDiv"
        >
          <MdOutlineVpnKey
            size={24}
            className="text-mecaGoBackArrow"
            id="keyIcon"
          />
        </div>
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
          Welcome back! Please input your correct details
        </p>
        <FormControl className="flex flex-col gap-8 w-full mt-6" id="form">
          <FormControl className="w-full" variant="filled">
            <InputLabel htmlFor="email">Email</InputLabel>
            <FilledInput
              id="email"
              disableUnderline
              onChange={handleEmailOnChange}
              error={state.emailError}
              className={`bg-mecaInputBgColor w-full rounded-t-[4px] hover:bg-mecaInputBgColor border focus-within:bg-mecaInputBgColor ${
                state.emailError ? "border-mecaTableTextErrorColor" : ""
              }`}
            />
            {state.emailError && (
              <span className="text-mecaTableTextErrorColor text-sm mt-1">
                Invalid email address
              </span>
            )}
          </FormControl>
          <FormControl className="w-full" variant="filled">
            <InputLabel htmlFor="password">Password</InputLabel>
            <FilledInput
              id="password"
              type={state.showPassword ? "text" : "password"}
              disableUnderline
              onChange={handlePasswordOnChange}
              error={state.passwordError}
              className={`bg-mecaInputBgColor border w-full hover:bg-mecaInputBgColor focus-within:bg-mecaInputBgColor ${
                state.passwordError ? "border-mecaTableTextErrorColor" : ""
              }`}
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
            {state.passwordError && (
              <span className="text-mecaTableTextErrorColor text-sm mt-1">
                Password must be at least 8 characters
              </span>
            )}
          </FormControl>
          <Button
            id="loginBtn"
            className="bg-mecaBluePrimaryColor normal-case text-[white] text-lg font-semibold rounded-[36px] disabled:bg-mecaBgDisableColor disabled:text-[white] h-12 hover:bg-mecaBluePrimaryColor"
            variant="contained"
            endIcon={<MdChevronRight />}
            disabled={!isFormValid()}
            disableElevation
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
