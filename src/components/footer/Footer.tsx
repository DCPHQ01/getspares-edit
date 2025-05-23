import FormControl from "@mui/material/FormControl";
import { Button, FilledInput, InputLabel } from "@mui/material";
import { ChangeEvent, useState } from "react";
import RightSideList from "./footerList";
import { useRouter } from "next/navigation";
import { paths } from "../../path/paths";
import mecaLogo from "../../assets/images/getspares_logo.png"
import Image from "next/image";


export default function Footer() {
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

  const router = useRouter();

  return (
    <footer
      className="px-10 py-10 bg-mecaSearchColor w-full"
      id="footerContainer"
    >
      <div id="mecaFooterLogo">
        {/* <p
          className="text-mecaActiveIconsNavColor text-5xl font-nunito font-bold cursor-pointer"
          onClick={() => router.push(paths.toHome())}
        >
          e-meca
        </p> */}

                <Image src={mecaLogo} width={200} alt="company logo" />
        
        <div className="lg:flex justify-between" id="subContainer">
          <div className="lg:w-1/2">
            <div className="lg:w-1/2">
              <p className="py-4 text-sm" id="footerSubText">
                Stay up-to-date with information and updates about e-meca
              </p>
              <form id="form">
                <FormControl className="w-full mb-5" variant="filled">
                  <InputLabel htmlFor="emailAddress">Email Address</InputLabel>
                  <FilledInput
                    id="email"
                    disableUnderline
                    onChange={handleOnChange}
                    error={state.emailError}
                    className={`bg-mecaInputBgColor border w-full hover:bg-mecaInputBgColor focus-within:bg-mecaInputBgColor ${
                      state.emailError ? "border-mecaTableTextErrorColor" : ""
                    }`}
                  />
                  {state.emailError && (
                    <span className="text-mecaTableTextErrorColor text-xs mt-1">
                      Invalid email address
                    </span>
                  )}
                </FormControl>
                <Button
                  id="footerBtn"
                  variant="contained"
                  disabled={!isFormValid()}
                  className="bg-mecaBluePrimaryColor normal-case text-[white] text-lg font-semibold rounded-[36px] disabled:bg-mecaBgDisableColor disabled:text-[white] h-12 w-full hover:bg-mecaBluePrimaryColor"
                >
                  Join our waitlist
                </Button>
              </form>
            </div>
          </div>

          <div
            className="flex flex-wrap gap-8 justify-between lg:w-1/2 lg:mt-0 mt-10"
            id="rightSection"
          >
            {RightSideList.map((list, index) => (
              <div
                className="text-mecaDarkBlueBackgroundOverlay"
                id={list.title}
                key={index}
              >
                <h6 className="text-[#91959C]" id="title">
                  {list.title}
                </h6>
                <ul className="flex flex-col gap-8 pt-8" id="linkList">
                  {list.children.map((item, i) => (
                    <a
                      href={item.link}
                      key={i}
                      id={item.title.replace(/\s/g, "")}
                      className="font-semibold"
                    >
                      {item.title}
                    </a>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
