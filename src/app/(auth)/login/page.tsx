"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import FormControl from "@mui/material/FormControl";
import { Nunito_Sans } from "next/font/google";
import * as JWT from "jwt-decode";
import { ColorRing } from "react-loader-spinner";
import { JwtPayload as BaseJwtPayload } from "jsonwebtoken";
import { useLoginMutation } from "../../../redux/features/users/authQuery";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito_sans",
  adjustFontFallback: false,
  display: "swap",
});

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
import { useRouter } from "next/navigation";
import { useGetUserDetailsMutation } from "../../../redux/features/users/userQuery";
import { paths } from "../../../path/paths";

interface JwtPayload extends BaseJwtPayload {
  role?: string;
}

export default function Login() {
  const router = useRouter();

  const [state, setState] = useState({
    showPassword: false,
    email: "",
    password: "",
    emailError: false,
    passwordError: false,
    loginError: "",
  });

  const [login, { isLoading }] = useLoginMutation();

  const [getUserData] = useGetUserDetailsMutation({});

  const handleEmailOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    setState((prevState) => ({
      ...prevState,
      email,
      emailError: !isValidEmail(email),
    }));
  };

  const handleFocus = () => {
    setState((prevState) => ({
      ...prevState,
      loginError: "",
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

  const isFormValid = Boolean(
    isValidEmail(state.email) && isValidPassword(state.password)
  );

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await login({
        email: state.email,
        password: state.password,
      }).unwrap();

      if (response.access_token) {
        let token = response.access_token;
        let decoded: JwtPayload = JWT.jwtDecode(token);
        sessionStorage.setItem("token", JSON.stringify(token));

        const userDetails = await getUserData(token).unwrap();
        if (userDetails) {
          sessionStorage.setItem("userDetails", JSON.stringify(userDetails));
        }

        switch (decoded?.resource_access["e-meca"]?.roles[0]) {
          case "MECA_ADMIN":
            router.push(paths.toAdmin());
            break;
          case "VENDOR_ADMIN":
            router.push(paths.toDashboard());
            break;
          case "AGENT":
            router.push(paths.toDashboard());
            break;
          case "BUYER":
            router.push(paths.toHome());
            break;
          default:
            setState((prevState) => ({
              ...prevState,
              loginError: "Unknown role. Please try again.",
            }));
        }
      } else {
        setState((prevState) => ({
          ...prevState,
          loginError: "Login failed. Please try again.",
        }));
      }
    } catch (error: any) {
      setState((prevState) => ({
        ...prevState,
        loginError:
          error?.data?.message || "An error occurred. Please try again.",
      }));
    }
  };

  const routerToHomePage = () => {
    router.push(paths.toHome());
  };

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     sessionStorage.clear();
  //     sessionStorage.removeItem("userDetails");
  //   }
  // }, []);

  return (
    <div className={nunito.className}>
      <div className="absolute top-16  lg:left-16 left-8" id="eMecaLogin">
        <span
          className="font-bold lg:text-3xl text-2xl text-mecaActiveIconsNavColor"
          onClick={routerToHomePage}
        >
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
              onFocus={handleFocus}
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
              onFocus={handleFocus}
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
            className="bg-mecaBluePrimaryColor normal-case text-[white] text-lg font-semibold rounded-[36px]   h-12 hover:bg-mecaBluePrimaryColor"
            variant="contained"
            endIcon={!isLoading ? <MdChevronRight /> : ""}
            disableElevation
            onClick={handleSubmit}
          >
            {isLoading ? (
              <div className="w-full h-screen flex justify-center items-center">
             
                <ColorRing
                  visible={true}
                  height="40"
                  width="40"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={[
                    "#FFFFFF",
                    "#FFFFFF",
                    "#FFFFFF",
                    "#FFFFFF",
                    "#FFFFFF",
                  ]}
                />
              </div>
            ) : (
              "Login"
            )}
          </Button>
        </FormControl>
        {state.loginError && (
          <span className="text-mecaTableTextErrorColor text-lg mt-1">
            {state.loginError}
          </span>
        )}
        <div id="forgotPassworddiv" className="w-full flex justify-end">
          <Link
            href="/forgot-password"
            id="forgotPasswordLink"
            className="text-mecaBluePrimaryColor no-underline py-4"
          >
            Forgot password
          </Link>
        </div>
        <span className="flex items-center gap-1 text-meca-gray-600 text-sm mt-6">
          New on Meca?
          <Link
            href={paths.toSignUp()}
            id="resendEmailLink"
            className="text-mecaBluePrimaryColor font-semibold"
          >
            Create an account
          </Link>
        </span>
      </div>
    </div>
  );
}
