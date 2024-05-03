import FormControl from "@mui/material/FormControl";
import { Button, FilledInput, InputLabel } from "@mui/material";
import { ChangeEvent, useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const handleEmailOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setEmailError(!isValidEmail(email));
  };

  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const isFormValid = () => {
    return isValidEmail(email);
  };

  return (
    <footer className="container mx-auto px-6 my-16">
      <div>
        <h2 className="text-mecaBluePrimaryColor font-medium lg:text-5xl text-2xl">
          e-meca
        </h2>
        <div className="lg:flex justify-between">
          <div className="lg:w-1/2">
            <div className="lg:w-1/2">
              <p className="py-4 text-sm">
                State up-to-date with information and updates about e-meca
              </p>
              <form>
                <FormControl className="w-full mb-5" variant="filled">
                  <InputLabel htmlFor="emailAddress">Email Address</InputLabel>
                  <FilledInput
                    id="email"
                    disableUnderline
                    onChange={handleEmailOnChange}
                    error={emailError}
                    className={`bg-mecaInputBgColor border w-full hover:bg-mecaInputBgColor focus-within:bg-mecaInputBgColor ${
                      emailError ? "border-mecaTableTextErrorColor" : ""
                    }`}
                  />
                  {emailError && (
                    <span className="text-mecaTableTextErrorColor text-xs mt-1">
                      Invalid email address
                    </span>
                  )}
                </FormControl>
                <Button
                  id="resetPasswordBtn"
                  variant="contained"
                  disabled={!isFormValid()}
                  className="bg-mecaBluePrimaryColor normal-case text-[white] text-lg font-semibold rounded-[36px] disabled:bg-mecaBgDisableColor disabled:text-[white] h-12 w-full hover:bg-mecaBluePrimaryColor"
                >
                  Join our waitlist
                </Button>
              </form>
            </div>
          </div>

          <div className="flex flex-wrap gap-8 justify-between lg:w-1/2 lg:mt-0 mt-10">
            <div className="text-mecaDarkBlueBackgroundOverlay">
              <p className="text-[#91959C] ">Sell</p>
              <ul className="flex flex-col gap-8 pt-8">
                <a href="#" className="font-semibold">
                  Start selling
                </a>
                <a href="#" className="font-semibold">
                  Learn to sell
                </a>
              </ul>
            </div>
            <div className="text">
              <p className="text-[#91959C]">Company</p>
              <ul className="flex flex-col gap-8 pt-8">
                <a href="#" className="font-semibold">
                  About us
                </a>
                <a href="#" className="font-semibold">
                  Careers
                </a>
                <a href="#" className="font-semibold">
                  Advertise with us
                </a>
              </ul>
            </div>
            <div>
              <p className="text-[#91959C]">Social</p>
              <ul className="flex flex-col gap-8 pt-8">
                <a href="#" className="font-semibold">
                  Facebook
                </a>
                <a href="#" className="font-semibold">
                  Twitter
                </a>
                <a href="#" className="font-semibold">
                  Instagram
                </a>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
