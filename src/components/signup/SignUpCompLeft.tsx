import * as React from "react";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import {
  MdChevronRight,
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
} from "react-icons/md";
import style from "./signup.module.css";
import { Button } from "@mui/material";
import Link from "next/link";

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

  // console.log(userBuyerDetails)
  // console.log(userVendorDetails);
  // console.log(userAgentDetails);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    if (userType === "vendor") {
      setUserVendorDetails((values) => ({ ...values, [name]: value }));
    } else if (userType === "agent") {
      setUserAgentDetails((values) => ({ ...values, [name]: value }));
    } else {
      setUserBuyerDetails((values) => ({ ...values, [name]: value }));
    }
  };

  const handleSubmit = (e: any) => {
    //todo
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <div id="registerMainBodyLeft1" className={style.registerMainBody}>
      <div id="registerBodyLeft2" className={style.registerBody}>
        <div>
          <span id="e-mecaLogod" className="font-bold text-3xl text-primary">
            e-meca
          </span>
        </div>
        <div
          id="formMainContainer2"
          className={`${style.formMainContainer} ${
            userType === "agent"
              ? style.Agent
              : userType === "buyer"
              ? style.Buyer
              : ""
          }`}
        >
          <div
            id="formSecondContainer3"
            className={`${style.formSecondContainer} ${
              userType === "agent"
                ? style.Agent
                : userType === "buyer"
                ? style.Buyer
                : ""
            }`}
          >
            <div id="flexText1" className="flex flex-col">
              <span
                id="niceToMeetid"
                className="font-semibold text-3xl text-meca-black"
              >
                Nice to meet you
              </span>
              <span
                id="provideYourDetails"
                className="text-meca-gray-600 text-base font-normal"
              >
                Provide your details to get started
              </span>
            </div>
            <div className=" " id="RadioBtnSignUp">
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
                  className="w-96 flex justify-between"
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
                className={`${style.formInputs} ${
                  userType === "agent"
                    ? style.Agent
                    : userType === "buyer"
                    ? style.Buyer
                    : ""
                }`}
              >
                <TextField
                  id="filledbasicfirstName"
                  label="First name"
                  variant="filled"
                  InputProps={{ disableUnderline: true }}
                  onChange={handleChange}
                  name="firstName"
                  value={
                    userType === "vendor"
                      ? userVendorDetails.firstName
                      : userType === "agent"
                      ? userAgentDetails.firstName
                      : userBuyerDetails.firstName
                  }
                />
                <TextField
                  id="filledbasiclastName"
                  label="Last name"
                  variant="filled"
                  InputProps={{ disableUnderline: true }}
                  onChange={handleChange}
                  name="lastName"
                  value={
                    userType === "vendor"
                      ? userVendorDetails.lastName
                      : userType === "agent"
                      ? userAgentDetails.lastName
                      : userBuyerDetails.lastName
                  }
                />
                <TextField
                  id="filledbasicemail"
                  label="Email"
                  variant="filled"
                  InputProps={{ disableUnderline: true }}
                  onChange={handleChange}
                  name="email"
                  value={
                    userType === "vendor"
                      ? userVendorDetails.email
                      : userType === "agent"
                      ? userAgentDetails.email
                      : userBuyerDetails.email
                  }
                />
                {userType === "agent" || userType === "vendor" ? (
                  <TextField
                    id="filledbasictitle"
                    label={userType === "agent" ? "Company name" : "Job title"}
                    variant="filled"
                    InputProps={{ disableUnderline: true }}
                    onChange={handleChange}
                    name={userType === "agent" ? "companyName" : "jobTitle"}
                    value={
                      userType === "agent"
                        ? userAgentDetails.companyName
                        : userVendorDetails.jobTitle
                    }
                  />
                ) : null}
                {userType === "agent" ? (
                  <TextField
                    id="filledbasicseller"
                    label="Associated seller"
                    variant="filled"
                    InputProps={{ disableUnderline: true }}
                    onChange={handleChange}
                    name="associatedSeller"
                    value={userAgentDetails.associatedSeller}
                  />
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
                    id="filledadornmentpassword1"
                    type={showPassword ? "text" : "password"}
                    disableUnderline
                    name="password"
                    onChange={handleChange}
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

              <div id="forgotPassworddiv" className="flex justify-end">
                <Link
                  href="/forgot-password"
                  id="forgotPasswordLink"
                  className="link text-primary-500 no-underline py-4"
                >
                  Forgot password
                </Link>
              </div>
              <div id="clickRegisterDiv">
                <Button
                  type="submit"
                  id="clickRegisterBtn"
                  className="btn btn-primary w-full h-12 text-white rounded-3xl border-none normal-case font-semibold lg:text-lg bg-meca-blue-500 "
                  variant="contained"
                  endIcon={<MdChevronRight />}
                >
                  Register
                </Button>
              </div>
            </form>
            <div
              id="notNewHerediv"
              className="flex justify-center items-center"
            >
              <span>Not new here?</span>
              <Link
                href="/login"
                id="loginBtn1"
                className="text-primary-500 pl-1 normal-case no-underline"
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
