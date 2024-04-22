import Link from "next/link";
import React, { ChangeEvent, useState } from "react";
import {
  MdOutlineArrowBack,
  MdOutlineVpnKey,
  MdChevronRight,
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
} from "react-icons/md";
import FormControl from "@mui/material/FormControl";
import {
  Button,
  FilledInput,
  IconButton,
  InputAdornment,
  InputLabel,
} from "@mui/material";

interface CreateNewPasswordProps {
  setHavePasswordReset: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateNewPassword({
  setHavePasswordReset,
}: CreateNewPasswordProps) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState({
    new_password: "",
    confirm_password: "",
    passwordError: "",
    // confirmPasswordError: "",
  });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword({ ...password, [e.target.id]: e.target.value });
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
        className="text-mecaDarkBlueBackgroundOverlay font-bold text-center text-3xl mt-4"
        id="forgotPasswordHeader"
      >
        Set new password
      </h2>
      <p
        className="text-mecaGrayBodyText text-center px-8"
        id="forgotPasswordText"
      >
        Secure your account with a new password
      </p>
      <FormControl className="flex flex-col gap-8 w-full mt-6" id="form">
        <FormControl className="w-full" variant="filled">
          <InputLabel htmlFor="newPassword">New password</InputLabel>
          <FilledInput
            id="newPassword"
            type={showNewPassword ? "text" : "password"}
            disableUnderline
            onChange={handleOnChange}
            className="bg-mecaInputBgColor w-full h-full"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  edge="end"
                >
                  {showNewPassword ? (
                    <MdOutlineVisibilityOff />
                  ) : (
                    <MdOutlineVisibility />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
          {password.passwordError && (
            <p className="text-[red] text-sm">{password.passwordError}</p>
          )}
        </FormControl>
        <FormControl className="w-full" variant="filled">
          <InputLabel htmlFor="confirmPassword">
            Confirm new password
          </InputLabel>
          <FilledInput
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            disableUnderline
            onChange={handleOnChange}
            className="bg-mecaInputBgColor w-full h-full"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  {showConfirmPassword ? (
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
          id="createPasswordBtn"
          variant="contained"
          // disabled={!isDisabled}
          endIcon={<MdChevronRight />}
          className="bg-mecaBluePrimaryColor text-[white] normal-case h-12 text-lg font-semibold rounded-[36px] disabled:bg-meca-gray-400 disabled:text-[white] hover:bg-mecaBluePrimaryColor"
          onClick={() => setHavePasswordReset(true)}
        >
          Set password
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
