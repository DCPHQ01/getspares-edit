"use client";
import * as React from "react";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import {
  MdChevronRight,
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
} from "react-icons/md";
import { Button, Checkbox } from "@mui/material";
import Link from "next/link";
import {
  useRegisterAgentMutation,
  useRegisterBuyerMutation,
  useRegisterVendorMutation,
} from "../../redux/baseQuery";

const userBuyer: User = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const userVendor: UserVendor = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  jobTitle: "",
};

const userAgent: UserAgent = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  companyName: "",
  associatedSeller: "",
};

const SignUpComponentLeft = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [userType, setUserType] = React.useState("vendor");
  const [userBuyerDetails, setUserBuyerDetails] =
    React.useState<User>(userBuyer);
  const [userVendorDetails, setUserVendorDetails] =
    React.useState<UserVendor>(userVendor);
  const [userAgentDetails, setUserAgentDetails] =
    React.useState<UserAgent>(userAgent);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const [
    registerVendor,
    {
      isLoading: isLoadingVendor,
      isError: isErrorVendor,
      isSuccess: isSuccessVendor,
    },
  ] = useRegisterVendorMutation();
  const [
    registerBuyer,
    {
      isLoading: isLoadingBuyer,
      isError: isErrorBuyer,
      isSuccess: isSuccessBuyer,
    },
  ] = useRegisterBuyerMutation();
  const [
    registerAgent,
    {
      isLoading: isLoadingAgent,
      isError: isErrorAgent,
      isSuccess: isSuccessAgent,
    },
  ] = useRegisterAgentMutation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = event.target;
    if (userType === "vendor") {
      setUserVendorDetails((values) => ({ ...values, [id]: value }));
    } else if (userType === "agent") {
      setUserAgentDetails((values) => ({ ...values, [id]: value }));
    } else {
      setUserBuyerDetails((values) => ({ ...values, [id]: value }));
    }
    console.log(value);
  };

  // console.log(userVendorDetails);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (userType === "vendor") {
      registerVendor(userVendorDetails);
    } else if (userType === "agent") {
      registerAgent(userAgentDetails);
    } else {
      registerBuyer(userBuyerDetails);
    }
  };

  return (
    <div id="registerMainBodyLeft1" className="h-screen p-5 overflow-auto">
      <div
        id="registerBodyLeft2"
        className="h-[700px] flex flex-col justify-between bg-white"
      >
        <div>
          <span
            id="e-mecaLogod"
            className="font-bold text-3xl text-mecaActiveIconsNavColor"
          >
            e-meca
          </span>
        </div>
        <div
          id="formMainContainer2"
          className={`flex flex-col justify-between`}
        >
          <div
            id="formSecondContainer3"
            className={`lg:w-[384px] m-auto flex flex-col justify-between `}
          >
            <div id="flexText1" className="flex flex-col">
              <span
                id="niceToMeetid"
                className="font-semibold text-3xl text-mecaDarkBlueBackgroundOverlay"
              >
                Nice to meet you
              </span>
              <span
                id="provideYourDetails"
                className="text-mecaGrayBodyText text-base font-normal"
              >
                Provide your details to get started
              </span>
            </div>
            <div className="py-4" id="RadioBtnSignUp">
              <FormControl id="formcontrolMui">
                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="vendor"
                  name="radio-buttons-group"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUserType(e.target.value)
                  }
                  id="radiogroup1"
                  className="lg:w-96 w-full flex justify-between"
                >
                  <FormControlLabel
                    value="vendor"
                    control={<Radio />}
                    label="Vendor"
                    id="vendorinput2"
                    checked={userType === "vendor"}
                  />
                  <FormControlLabel
                    value="agent"
                    control={<Radio />}
                    label="Agent"
                    id="inputAgentId"
                    checked={userType === "agent"}
                  />
                  <FormControlLabel
                    value="buyer"
                    control={<Radio />}
                    label="Buyer"
                    id="inputBuyerId"
                    checked={userType === "buyer"}
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <form onSubmit={handleSubmit} id={"formsumbitonclick"}>
              <FormControl
                id="inputFilled1"
                className="gap-y-6 flex flex-col justify-between"
              >
                <FormControl className="w-full" variant="filled">
                  <InputLabel htmlFor="firstName">First name</InputLabel>
                  <FilledInput
                    id="firstName"
                    disableUnderline
                    onChange={handleChange}
                    className="bg-mecaInputBgColor w-full rounded-t-[4px] hover:bg-mecaInputBgColor border focus-within:bg-mecaInputBgColor"
                    value={
                      userType === "vendor"
                        ? userVendorDetails.firstName
                        : userType === "agent"
                        ? userAgentDetails.firstName
                        : userBuyerDetails.firstName
                    }
                  />
                </FormControl>

                <FormControl className="w-full" variant="filled">
                  <InputLabel htmlFor="lastName">Last name</InputLabel>
                  <FilledInput
                    id="lastName"
                    disableUnderline
                    onChange={handleChange}
                    className="bg-mecaInputBgColor w-full rounded-t-[4px] hover:bg-mecaInputBgColor border focus-within:bg-mecaInputBgColor"
                    value={
                      userType === "vendor"
                        ? userVendorDetails.lastName
                        : userType === "agent"
                        ? userAgentDetails.lastName
                        : userBuyerDetails.lastName
                    }
                  />
                </FormControl>

                <FormControl className="w-full" variant="filled">
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <FilledInput
                    id="email"
                    disableUnderline
                    onChange={handleChange}
                    className="bg-mecaInputBgColor w-full rounded-t-[4px] hover:bg-mecaInputBgColor border focus-within:bg-mecaInputBgColor"
                    value={
                      userType === "vendor"
                        ? userVendorDetails.email
                        : userType === "agent"
                        ? userAgentDetails.email
                        : userBuyerDetails.email
                    }
                  />
                </FormControl>

                {userType === "agent" || userType === "vendor" ? (
                  <FormControl className="w-full" variant="filled">
                    <InputLabel
                      htmlFor={
                        userType === "agent" ? "Company name" : "Job title"
                      }
                    >
                      {userType === "agent" ? "Merchant ID" : "Job title"}
                    </InputLabel>
                    <FilledInput
                      id={userType === "agent" ? "companyName" : "jobTitle"}
                      disableUnderline
                      onChange={handleChange}
                      className="bg-mecaInputBgColor w-full rounded-t-[4px] hover:bg-mecaInputBgColor border focus-within:bg-mecaInputBgColor"
                      value={
                        userType === "agent"
                          ? userAgentDetails.companyName
                          : userVendorDetails.jobTitle
                      }
                    />
                  </FormControl>
                ) : null}

                <FormControl
                  id="passwordSignUpform"
                  className="w-full"
                  variant="filled"
                >
                  <InputLabel
                    id="passwordWriteup"
                    htmlFor="filled-adornment-password"
                  >
                    Password
                  </InputLabel>
                  <FilledInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    disableUnderline
                    name="password"
                    onChange={handleChange}
                    className="bg-mecaInputBgColor border w-full hover:bg-mecaInputBgColor focus-within:bg-mecaInputBgColor"
                    value={
                      userType === "vendor"
                        ? userVendorDetails.password
                        : userType === "agent"
                        ? userAgentDetails.password
                        : userBuyerDetails.password
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          id="iconbuttonfield"
                        >
                          {showPassword ? (
                            <MdOutlineVisibilityOff />
                          ) : (
                            <MdOutlineVisibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </FormControl>

              <div className="flex justify-between items-center py-2">
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Remember for 30 days"
                  className="text-sm text-mecaGrayBodyText flex"
                  id="checkbox"
                />

                <div id="forgotPassworddiv" className="flex justify-end">
                  <Link
                    href="/forgot-password"
                    id="forgotPasswordLink"
                    className="text-mecaBluePrimaryColor no-underline py-4"
                  >
                    Forgot password
                  </Link>
                </div>
              </div>
              <div id="clickRegisterDiv">
                <Button
                  type="submit"
                  id="clickRegisterBtn"
                  className="w-full h-12 text-white rounded-3xl border-none normal-case font-semibold lg:text-lg bg-mecaBluePrimaryColor"
                  variant="contained"
                  endIcon={<MdChevronRight />}
                >
                  Register
                </Button>
              </div>
            </form>
            <div
              id="notNewHerediv"
              className="flex justify-center items-center py-8"
            >
              <span>Not new here?</span>
              <Link
                href="/login"
                id="loginBtn1"
                className="text-mecaBluePrimaryColor pl-1 normal-case no-underline"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpComponentLeft;
