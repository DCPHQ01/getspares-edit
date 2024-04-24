"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, useState } from "react";
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
            <InputLabel htmlFor="email">Email</InputLabel>
            <FilledInput
              id="email"
              disableUnderline
              onChange={handleEmailOnChange}
              error={state.emailError}
              className={`bg-mecaInputBgColor w-full rounded-t-[4px] hover:bg-mecaInputBgColor border focus-within:bg-mecaInputBgColor ${
                state.emailError ? "border-red-500" : ""
              }`}
            />

            {state.emailError && (
              <span className="text-red-500 text-sm mt-1">
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
                state.passwordError ? "border-red-500" : ""
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
            
          </FormControl>
          <Button
            id="loginBtn"
            className={`bg-mecaBluePrimaryColor capitalize text-[white] text-lg font-semibold rounded-[36px] h-12 hover:bg-mecaBluePrimaryColor ${
              isFormValid()
                ? ""
                : "disabled:bg-meca-gray-400 disabled:text-[white]"
            }`}
            {state.passwordError && (
              <span className="text-red-500 text-sm mt-1">
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
