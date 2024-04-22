import { FormControl, Button } from "@mui/material";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";
import { MdOutlineArrowBack, MdOutlineVpnKey, MdChevronRight } from "react-icons/md";
import TextField from "@mui/material/TextField";

interface EnterEmailProps {
  setHaveSentEmail: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EnterEmail({ setHaveSentEmail }: EnterEmailProps) {
  const [state, setState] = useState({
    email: "",
    validEmail: true,
    isDisabled: true,
  });

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    let isValid = true;

    if (id === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailRegex.test(value);
    }

    if (isValid) {
      setState({
        ...state,
        isDisabled: false,
        [id]: value,
        [`valid${id.charAt(0).toUpperCase() + id.slice(1)}`]: isValid,
      });
    } else {
      setState({
        ...state,
        isDisabled: true,
        [id]: value,
        [`valid${id.charAt(0).toUpperCase() + id.slice(1)}`]: isValid,
      });
    }
  };

  return (
    <>
      <div className="border border-mecaBorderColor p-4 rounded-xl" id="keyIconDiv">
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
        <div>
        <TextField
          id="email"
          label="Email"
          variant="filled"
          error={!state.validEmail}
          InputProps={{ disableUnderline: true }}
          onChange={handleOnChange}
          className="bg-mecaInputBgColor w-full h-full"
        />
        </div>
        <Button
          id="resetPasswordBtn"
          variant="contained"
          disabled={state.isDisabled}
          endIcon={<MdChevronRight />}
          className="bg-mecaBluePrimaryColor normal-case text-[white] text-lg font-semibold rounded-[36px] disabled:bg-meca-gray-400 disabled:text-[white] h-12 hover:bg-mecaBluePrimaryColor"
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
