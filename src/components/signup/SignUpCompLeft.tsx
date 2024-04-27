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
import { FormEvent, useState } from "react";
import {
  useRegisterAgentMutation,
  useRegisterBuyerMutation,
  useRegisterVendorMutation,
} from "@/redux/baseQuery";
import { useRouter } from "next/navigation";

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
  jobTitle: "",
  roleName: "VENDOR",
};

const userAgent: UserAgent = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  vendorMerchantId: [],
  roleName: "AGENT",
};

const SignUpComponentLeft = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("vendor");
  const [userBuyerDetails, setUserBuyerDetails] = useState<User>(userBuyer);
  const [userVendorDetails, setUserVendorDetails] =
    useState<UserVendor>(userVendor);
  const [userAgentDetails, setUserAgentDetails] =
    useState<UserAgent>(userAgent);
  // const [successAlert, setSuccessAlert] = useState(false);
  // const [errorAlert, setErrorAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

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

  console.log(userAgentDetails, "userAgentDetails");

  const [registerVendor] = useRegisterVendorMutation();
  const [registerBuyer] = useRegisterBuyerMutation();
  const [registerAgent] = useRegisterAgentMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      let userEmail = "";
      if (userType === "vendor") {
        await registerVendor(userVendorDetails);
        userEmail = userVendorDetails.email;
        setSuccessMessage("Vendor registered successfully!");
      } else if (userType === "agent") {
        await registerAgent(userAgentDetails);
        userEmail = userAgentDetails.email;
        setSuccessMessage("Agent registered successfully!");
      } else {
        await registerBuyer(userBuyerDetails);
        userEmail = userBuyerDetails.email;
        setSuccessMessage("Buyer registered successfully!");
      }
      sessionStorage.setItem("userEmail", userEmail);
      router.push("/verify-email");
    } catch (error: any) {
      setErrorMessage(
        error.message || "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
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
                      id={
                        userType === "agent" ? "vendorMerchantId" : "jobTitle"
                      }
                      disableUnderline
                      onChange={handleChange}
                      className="bg-mecaInputBgColor w-full rounded-t-[4px] hover:bg-mecaInputBgColor border focus-within:bg-mecaInputBgColor"
                      value={
                        userType === "agent"
                          ? userAgentDetails.vendorMerchantId
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
                    required
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
                  disabled={isLoading}
                  disableElevation
                >
                  {isLoading ? "Loading..." : "Register"}
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
