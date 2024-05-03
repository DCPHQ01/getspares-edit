
import { FilledInput, FormControl, Button, InputLabel } from "@mui/material";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";
import {
  MdOutlineArrowBack,
  MdOutlineVpnKey,
  MdChevronRight,
} from "react-icons/md";


interface EnterEmailProps {
  setHaveSentEmail: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EnterEmail({ setHaveSentEmail }: EnterEmailProps) {
  const [state, setState] = useState({
    email: "",

    emailError: false,
  });

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    setState((prevState) => ({
      ...prevState,
      email,
      emailError: !isValidEmail(email),
    }));
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
          endIcon={<MdChevronRight />}
          className="bg-mecaBluePrimaryColor normal-case text-[white] text-lg font-semibold rounded-[36px] disabled:bg-mecaBgDisableColor disabled:text-[white] h-12 hover:bg-mecaBluePrimaryColor"

          onClick={() => setHaveSentEmail(true)}
        >
          Reset password
        </Button>
      </FormControl>
      <Link
        href="/login"
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
