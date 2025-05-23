import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Radio from "@mui/material/Radio";
import { Nunito_Sans } from "next/font/google";

import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import {
  MdChevronRight,
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
} from "react-icons/md";
import { Button, Checkbox, Snackbar, SnackbarOrigin } from "@mui/material";
import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";
import {
  useGetAllCompaniesQuery,
  useRegisterAgentMutation,
  useRegisterBuyerMutation,
  useRegisterVendorMutation,
} from "../../redux/features/users/authQuery";
import { useRouter } from "next/navigation";
import { ColorRing } from "react-loader-spinner";
import { paths } from "../../path/paths";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito_sans",
  adjustFontFallback: false,
  display: "swap",
});

const userBuyer: User = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  roleName: "BUYER",
};

const userVendor: UserVendor = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  companyName: "",
  roleName: "VENDOR_ADMIN",
};

const userAgent: UserAgent = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  companyName: "",
  roleName: "AGENT",
};

interface State extends SnackbarOrigin {
  open: boolean;
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// const emailRegex = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

type RegisterError = string | { data: { password?: string; message?: string } };

const SignUpComponentLeft = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("buyer");
  const [userBuyerDetails, setUserBuyerDetails] = useState<User>(userBuyer);
  const [userVendorDetails, setUserVendorDetails] =
    useState<UserVendor>(userVendor);
  const [userAgentDetails, setUserAgentDetails] =
    useState<UserAgent>(userAgent);
  const [isLoading, setIsLoading] = useState(false);
  const [registerError, setRegisterError] = useState<RegisterError>("");
  const router = useRouter();
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [companyError, setCompanyError] = useState<string | null>(null);
  const [agentCompanyError, setAgentCompanyError] = useState<string | null>(
    null
  );

  const { data: companyData, isFetching } = useGetAllCompaniesQuery(
    userVendorDetails.companyName.charAt(0) ||
      userAgentDetails.companyName.charAt(0),
    { skip: !userVendorDetails.companyName && !userAgentDetails.companyName }
  );

  const [state, setState] = React.useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const validateEmail = (email: string) => {
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return passwordRegex.test(password);
  };

  const { vertical, horizontal, open } = state;
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = event.target;
    if (userType === "vendor") {
      setUserVendorDetails((values) => ({ ...values, [id]: value }));
    } else if (userType === "agent") {
      setUserAgentDetails((values) => ({ ...values, [id]: value }));
    } else {
      setUserBuyerDetails((values) => ({ ...values, [id]: value }));
    }
  };

  useEffect(() => {
    setUserVendorDetails(userVendor);
    setUserAgentDetails(userAgent);
    setUserBuyerDetails(userBuyer);
    setEmailError(null);
    setPasswordError(null);
    setCompanyError(null);
    setAgentCompanyError(null);
  }, [userType]);

  const handleEmailError = () => {
    if (
      userBuyerDetails.email ||
      userAgentDetails.email ||
      userVendorDetails.email
    ) {
      if (
        validateEmail(
          userBuyerDetails.email ||
            userAgentDetails.email ||
            userVendorDetails.email
        )
      ) {
        setEmailError(null);
      } else {
        setEmailError("Please enter a valid email address.");
      }
    } else {
      setEmailError(null);
    }
  };

  const handlePassword = () => {
    if (
      userBuyerDetails.password ||
      userAgentDetails.password ||
      userVendorDetails.password
    ) {
      if (
        validatePassword(
          userBuyerDetails.password ||
            userAgentDetails.password ||
            userVendorDetails.password
        )
      ) {
        setPasswordError(null);
      } else {
        setPasswordError(
          "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character."
        );
      }
    } else {
      setPasswordError(null);
    }
  };

  const handleCompanyError = () => {
    if (userVendorDetails.companyName || userAgentDetails.companyName) {
      if (
        !companyData.data.includes(
          userVendorDetails.companyName || userAgentDetails.companyName
        )
      ) {
        setCompanyError(null);
      } else {
        setCompanyError("Company already exist");
      }
    } else {
      setCompanyError(null);
    }
  };

  const handleAgentCompanyError = () => {
    if (userAgentDetails.companyName) {
      if (!companyData.data.includes(userAgentDetails.companyName)) {
        setAgentCompanyError("Company does not exist");
      } else {
        setAgentCompanyError(null);
      }
    } else {
      setAgentCompanyError(null);
    }
  };

  const [registerVendor, { data: VendorData, error: VendorError }] =
    useRegisterVendorMutation();
  const [registerBuyer, { data: buyerData, error: BuyerError }] =
    useRegisterBuyerMutation();
  const [registerAgent, { data: AgentData, error: AgentError }] =
    useRegisterAgentMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (emailError || companyError || agentCompanyError) {
      return;
    } else {
      try {
        setIsLoading(true);
        let userEmail = "";
        let response;
        switch (userType) {
          case "vendor":
            response = await registerVendor(userVendorDetails).unwrap();
            userEmail = userVendorDetails.email;
            break;
          case "agent":
            response = await registerAgent(userAgentDetails).unwrap();
            userEmail = userAgentDetails.email;
            break;
          case "buyer":
            response = await registerBuyer(userBuyerDetails).unwrap();
            userEmail = userBuyerDetails.email;
            break;
        }
        router.push(paths.toVerifyEmail());
        sessionStorage.setItem("userEmail", userEmail);
      } catch (error: any) {
        setRegisterError(error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  const routerToHomePage = () => {
    router.push(paths.toHome());
  };

  const handleFocus = () => {
    setRegisterError("");
  };

  return (
    <div className={nunito.className}>
      <div
        id="registerMainBodyLeft1"
        className="h-screen p-5 overflow-auto scrollbar-none"
      >
        <div
          id="registerBodyLeft2"
          className="h-[700px] flex flex-col justify-between bg-white "
        >
          <div>
            <span
              onClick={routerToHomePage}
              id="e-mecaLogod"
              className="font-bold text-2xl cursor-pointer text-mecaActiveIconsNavColor"
            >
              e-meca
            </span>
          </div>
          <div
            id="formMainContainer2"
            className={`flex flex-col justify-between lg:mt-6 mt-20`}
          >
            <div
              id="formSecondContainer3"
              className={`lg:w-[384px] m-auto flex flex-col justify-between w-[100%]`}
            >
              <div id="flexText1" className="flex flex-col">
                <span
                  id="niceToMeetid"
                  className="font-semibold text-2xl text-mecaDarkBlueBackgroundOverlay"
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
                <FormControl id="formcontrolMui" className={nunito.className}>
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
                      value="buyer"
                      control={<Radio />}
                      label="Buyer"
                      id="inputBuyerId"
                      checked={userType === "buyer"}
                    />
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
                  </RadioGroup>
                </FormControl>
              </div>
              <form
                style={{ borderRadius: "4px, 4px, 0px, 0px" }}
                onSubmit={handleSubmit}
                id={"formsumbitonclick"}
                className={nunito.className}
              >
                <FormControl
                  id="inputFilled1"
                  className="gap-y-6 flex flex-col justify-between"
                >
                  <FormControl className="w-full" variant="filled">
                    <InputLabel htmlFor="firstName">First name</InputLabel>
                    <FilledInput
                      id="firstName"
                      disableUnderline
                      onFocus={handleFocus}
                      required
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
                      onFocus={handleFocus}
                      required
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
                      onFocus={handleFocus}
                      onMouseLeave={handleEmailError}
                      required
                      onChange={handleChange}
                      className="bg-mecaInputBgColor w-full rounded-t-[4px] hover:bg-mecaInputBgColor border focus-within:bg-mecaInputBgColor"
                      value={
                        userType === "vendor"
                          ? userVendorDetails.email
                          : userType === "agent"
                          ? userAgentDetails.email
                          : userBuyerDetails.email
                      }
                      error={!!emailError}
                    />
                    {emailError && (
                      <span className="text-mecaErrorText text-base">
                        {emailError}
                      </span>
                    )}
                  </FormControl>

                  {userType === "vendor" ? (
                    <FormControl className="w-full" variant="filled">
                      <InputLabel htmlFor="">
                        {userType === "vendor" && "Company name"}
                      </InputLabel>

                      <FilledInput
                        id={userType === "vendor" ? "companyName" : ""}
                        disableUnderline
                        onFocus={handleFocus}
                        onChange={handleChange}
                        onMouseLeave={handleCompanyError}
                        className="bg-mecaInputBgColor w-full rounded-t-[4px] hover:bg-mecaInputBgColor border focus-within:bg-mecaInputBgColor"
                        value={
                          userType === "vendor"
                            ? userVendorDetails.companyName
                            : ""
                        }
                      />
                      {companyError && (
                        <span className="text-mecaErrorText text-base">
                          {companyError}
                        </span>
                      )}
                    </FormControl>
                  ) : null}

                  {userType === "agent" ? (
                    <FormControl className="w-full" variant="filled">
                      <InputLabel htmlFor="">
                        {userType === "agent" && "Associated vendor"}
                      </InputLabel>

                      <FilledInput
                        id={userType === "agent" ? "companyName" : ""}
                        disableUnderline
                        onFocus={handleFocus}
                        onMouseLeave={handleAgentCompanyError}
                        onChange={handleChange}
                        className="bg-mecaInputBgColor w-full rounded-t-[4px] hover:bg-mecaInputBgColor border focus-within:bg-mecaInputBgColor"
                        value={
                          userType === "agent"
                            ? userAgentDetails.companyName
                            : ""
                        }
                      />

                      <span className="text-xs  font-normal text-mecaGoBackArrow">
                        More sellers can be added later
                      </span>
                      {agentCompanyError && (
                        <span className="text-mecaErrorText text-base">
                          {agentCompanyError}
                        </span>
                      )}
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
                      onFocus={handleFocus}
                      onMouseLeave={handlePassword}
                      required
                      onChange={handleChange}
                      error={!!passwordError}
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
                    {passwordError && (
                      <span className="text-mecaErrorText text-base">
                        {passwordError}
                      </span>
                    )}
                  </FormControl>
                </FormControl>

                <div className="flex items-center py-2 justify-end"></div>
                <div id="clickRegisterDiv">
                  <Button
                    type="submit"
                    id="clickRegisterBtn"
                    className="w-full flex justify-center items-center h-12 text-white rounded-3xl border-none normal-case font-semibold lg:text-lg bg-mecaBluePrimaryColor disabled:bg-mecaBgDisableColor disabled:text-[white] hover:bg-mecaBluePrimaryColor"
                    variant="contained"
                    endIcon={<MdChevronRight />}
                    disabled={isLoading}
                    disableElevation
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
                      "Register"
                    )}
                  </Button>
                </div>

                {/* {registerError && (
                  <p className="text-red-500 text-lg">
                    {(
                      registerError as {
                        data: {
                          password?: string | undefined;
                          message?: string | undefined;
                        };
                      }
                    ).data?.password ||
                      (
                        registerError as {
                          data: {
                            password?: string | undefined;
                            message?: string | undefined;
                          };
                        }
                      ).data?.message}
                  </p>
                )} */}
                {typeof registerError === "string" ? (
                  registerError
                ) : (
                  <>
                    {registerError.data.password && (
                      <p className="text-red-500 text-xs mt-2">
                        {registerError.data.password}
                      </p>
                    )}
                    {registerError.data?.message && (
                      <p className="text-red-500 text-xs mt-2">
                        {registerError.data.message ===
                        "Name should be provided"
                          ? "Please provide company name"
                          : registerError.data.message}
                      </p>
                    )}
                  </>
                )}
              </form>
              <div
                id="notNewHerediv"
                className="flex justify-center items-center py-8"
              >
                <span>Not new here?</span>
                <Link
                  href={paths.toLogin()}
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
    </div>
  );
};

export default SignUpComponentLeft;
