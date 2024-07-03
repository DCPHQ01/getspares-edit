import Link from "next/link";
import React, { ChangeEvent, useEffect, useState } from "react";
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
import { paths } from "../../path/paths";
import { useResetPasswordMutation } from "../../redux/features/users/authQuery";
import { ColorRing } from "react-loader-spinner";

interface CreateNewPasswordProps {
  setHavePasswordReset: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateNewPassword({
  setHavePasswordReset,
}: CreateNewPasswordProps) {
  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: "",
    showNewPassword: false,
    showConfirmPassword: false,
    passwordError: false,
    confirmPasswordError: false,
  });

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    const newPassword = id === "newPassword" ? value : password.newPassword;
    const confirmPassword =
      id === "confirmPassword" ? value : password.confirmPassword;
    setPassword((prevState) => ({
      ...prevState,
      [id]: value,
      passwordError:
        id === "newPassword"
          ? !isValidPassword(newPassword)
          : prevState.passwordError,
      confirmPasswordError:
        id === "confirmPassword"
          ? confirmPassword !== password.newPassword
          : prevState.confirmPasswordError,
    }));
  };
  const [dataForOtp, setDataForOtp] = useState({} as any);
  const [isLoading, setIsLoading] = useState(false);
  const handleClickShowPassword = (field: keyof typeof password) => {
    setPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const [resetPassword] = useResetPasswordMutation();

  const isValidPassword = (password: string) => {
    return password.length >= 8;
  };

  const isFormValid = () => {
    return (
      password.newPassword === password.confirmPassword &&
      password.newPassword.length >= 8
    );
  };

  const handleResetPassword = async () => {
    let response;
    const data = {
      email: dataForOtp.email,
      otpCode: dataForOtp.otpCode,
      newPassword: password.newPassword,
    };

    setIsLoading(true);
    try {
      response = await resetPassword(data);
      if ("data" in response) {
        response.data.message, " verify";
        if (response?.data?.message === "Password changed successful") {
          setIsLoading(false);
          setHavePasswordReset(true);
        } else if (response?.data?.statusCode === 400) {
          setIsLoading(false);
          setHavePasswordReset(false);
        }
      }
    } catch (error: any) {
      error.message;
    }
  };

  useEffect(() => {
    const savedData = JSON.parse(sessionStorage.getItem("otp") || "{}");
    setDataForOtp(savedData);
  }, []);

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
            type={password.showNewPassword ? "text" : "password"}
            disableUnderline
            onChange={handleOnChange}
            className="bg-mecaInputBgColor w-full h-full"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => handleClickShowPassword("showNewPassword")}
                  edge="end"
                >
                  {password.showNewPassword ? (
                    <MdOutlineVisibilityOff />
                  ) : (
                    <MdOutlineVisibility />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />

          {password.passwordError && (
            <span className="text-red-500 text-sm mt-1">
              Passwords must be at least 8 characters long
            </span>
          )}
        </FormControl>
        <FormControl className="w-full" variant="filled">
          <InputLabel htmlFor="confirmPassword">
            Confirm new password
          </InputLabel>
          <FilledInput
            id="confirmPassword"
            type={password.showConfirmPassword ? "text" : "password"}
            disableUnderline
            onChange={handleOnChange}
            className="bg-mecaInputBgColor w-full h-full"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => handleClickShowPassword("showConfirmPassword")}
                  edge="end"
                >
                  {password.showConfirmPassword ? (
                    <MdOutlineVisibilityOff />
                  ) : (
                    <MdOutlineVisibility />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />

          {password.confirmPasswordError && (
            <span className="text-red-500 text-sm mt-1">
              Passwords must must match
            </span>
          )}
        </FormControl>

        <Button
          id="createPasswordBtn"
          variant="contained"
          disabled={!isFormValid()}
          endIcon={isLoading ? "" : <MdChevronRight />}
          className="bg-mecaBluePrimaryColor text-[white] normal-case h-12 text-lg font-semibold rounded-[36px] disabled:bg-mecaBgDisableColor disabled:text-[white] hover:bg-mecaBluePrimaryColor"
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
            "Set password"
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
