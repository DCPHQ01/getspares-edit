import { FilledInput, FormControl, Button, InputLabel } from "@mui/material";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";
import {
  MdOutlineArrowBack,
  MdOutlineVpnKey,
  MdChevronRight,
} from "react-icons/md";
import { paths } from "../../path/paths";
import { useResetPasswordVerifyEmailMutation } from "../../redux/features/users/authQuery";
import { ColorRing } from "react-loader-spinner";

interface EnterEmailProps {
  setHaveSentEmail: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EnterEmail({ setHaveSentEmail }: EnterEmailProps) {
  const [state, setState] = useState({
    email: "",
    emailError: false,
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resetPasswordVerifyEmail, { isError }] =
    useResetPasswordVerifyEmailMutation();

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    setState((prevState) => ({
      ...prevState,
      email,
      emailError: !isValidEmail(email),
    }));
  };

  const handleResetPassword = async () => {
    setIsLoading(true);
    sessionStorage.setItem("email", JSON.stringify(state.email));

    try {
      const response = await resetPasswordVerifyEmail(state.email).unwrap();

      if (response.message === "Password update successfully") {
        setHaveSentEmail(true);
        setIsLoading(false);
      } else if (!response.message) {
        setHaveSentEmail(false);
        setState((prevState) => ({
          ...prevState,
          emailError: true,
        }));
        setError(response.message);
        setIsLoading(false);
      }
    } catch (error: any) {
      error.message;
      setIsLoading(false);
    }
  };
  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const isFormValid = () => {
    return isValidEmail(state.email);
  };

  return (
    <>
      <div
        className="relative border border-mecaBorderColor p-4 rounded-xl"
        id="keyIconDiv"
      >
        <MdOutlineVpnKey
          size={24}
          className="text-mecaGoBackArrow"
          id="keyIcon"
        />
        {isError ? (
          <div>
            <span className="text-mecaTableTextErrorColor text-sm mt-1 absolute top-6">
              {error}
            </span>
          </div>
        ) : (
          ""
        )}
      </div>
      <h2
        className="text-mecaDarkBlueBackgroundOverlay font-bold text-center text-3xl"
        id="forgotPasswordHeader"
      >
        Forgot password?
      </h2>
      <p
        className="text-mecaGrayBodyText text-center px-8"
        id="forgotPasswordText"
      >
        No worries, we’ll send you reset instructions.
      </p>
      <FormControl className="flex flex-col gap-8 w-full mt-6" id="form">
        <FormControl className="w-full" variant="filled">
          <InputLabel htmlFor="email">Email</InputLabel>
          <FilledInput
            id="email"
            disableUnderline
            onChange={handleOnChange}
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
        <Button
          id="resetPasswordBtn"
          variant="contained"
          disabled={!isFormValid()}
          endIcon={isLoading ? "" : <MdChevronRight />}
          className="bg-mecaBluePrimaryColor normal-case text-[white] text-lg flex justify-center items-center font-semibold rounded-[36px] disabled:bg-mecaBgDisableColor disabled:text-[white] h-12 hover:bg-mecaBluePrimaryColor"
          onClick={handleResetPassword}
        >
          {isLoading ? (
            <ColorRing
              visible={true}
              height="40"
              width="40"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={["#ffff", "#ffff", "#ffff", "#ffff", "#ffff"]}
            />
          ) : (
            "Reset password"
          )}
        </Button>
      </FormControl>
      <Link
        href={paths.toLogin()}
        id="loginLink"
        className="text-mecaGoBackText flex items-center text-sm gap-4 mt-6"
      >
        <MdOutlineArrowBack
          size={24}
          className="text-mecaGoBackArrow"
          id="arrowBackIcon"
        />
        Back to log in
      </Link>
    </>
  );
}
