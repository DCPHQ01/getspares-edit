import { Fragment, useEffect, useRef, useState } from "react";
import { MdOutlineArrowBack, MdOutlineMail } from "react-icons/md";
import Link from "next/link";
import {
  useVerifyEmailMutation,
  useResetOtpMutation,
} from "../../redux/features/users/authQuery";
import { Snackbar } from "@mui/material";
import { paths } from "../../path/paths";
import { ColorRing } from "react-loader-spinner";

interface VerifyEmailProps {
  setHaveVerifiedEmail: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function VerifyEmail({
  setHaveVerifiedEmail,
}: VerifyEmailProps) {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isDisabled, setIsDisabled] = useState(true);
  const [open, setOpen] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const length = 6;
  const inputsRef = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("userEmail");
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  const handleChangeOtp = (element: HTMLInputElement, index: number): void => {
    if (isNaN(Number(element.value))) return;
    const maxLength = 1;
    if (element.value.length > maxLength) {
      element.value = element.value.slice(0, maxLength);
    }
    setOtp((prevOtp: string[]) =>
      prevOtp.map((d, idx) => (idx === index ? element.value : d))
    );

    const nextIndex = index + 1;
    if (nextIndex < otp.length) {
      const nextInput = document.getElementsByName("otp")[
        nextIndex
      ] as HTMLInputElement;
      if (nextInput) {
        (nextInput as HTMLInputElement).focus();
      }
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>): void => {
    event.preventDefault();
    const paste = event.clipboardData.getData("text").slice(0, length);
    const newOtp = Array(length).fill("");
    for (let i = 0; i < paste.length; i++) {
      if (i < length) {
        newOtp[i] = paste[i];
      }
    }
    setOtp(newOtp);
    inputsRef.current[Math.min(paste.length - 1, length - 1)]?.focus();
    setIsDisabled(false);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const [verifyEmail] = useVerifyEmailMutation();
  const [resetOtp] = useResetOtpMutation();

  const handleSubmit = async () => {
    let response;
    const data = {
      email: userEmail,
      otpCode: otp.join(""),
    };

    setIsLoading(true);
    try {
      let response: any;
      response = await verifyEmail(data);
      if ("data" in response) {
        response.data.message, " verify";
        if (response?.data?.message === "User verified successfully") {
          setHaveVerifiedEmail(true);
          setIsLoading(false);
        } else if ("error" in response) {
          const errorMessage =
            response.message || "Verification failed. Please try again.";
          setHaveVerifiedEmail(false);
          setMessage(errorMessage);
          setOpen(true);
          setOtp(Array(6).fill(""));
          setIsLoading(false);
        }
      }
    } catch (error: any) {
      error?.data.message;
      setMessage(
        error?.data.message || "Verification failed. Please try again."
      );
      setOpen(true);
      setOtp(Array(6).fill(""));
    } finally {
      setIsLoading(false);
    }
    setOtp(Array(6).fill(""));
    // const data = {
    //   email: userEmail,
    //   otpCode: otp.join(""),
    // };
    // setIsLoading(true);
    // try {
    //   const response = await verifyEmail(data);
    //   if ("data" in response) {
    //     if (response.data.message === "User verified successfully") {
    //       setHaveVerifiedEmail(true);
    //     } else {
    //       setMessage(
    //         response.data.message || "Verification failed. Please try again."
    //       );
    //       setOpen(true);
    //     }
    //   } else {
    //     setMessage(
    //       response.error?.data?.message ||
    //         "Verification failed. Please try again."
    //     );
    //     setOpen(true);
    //   }
    // } catch (error: any) {
    //   setMessage(
    //     error.data?.message || "Verification failed. Please try again."
    //   );
    //   setOpen(true);
    // } finally {
    //   setIsLoading(false);
    //   setOtp(Array(6).fill(""));
    // }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFocus = () => {
    setMessage("");
  };

  const resetOtpCode = async () => {
    let response;
    const data = {
      email: userEmail,
    };
    try {
      response = await resetOtp(data);
      if ("data" in response) {
        setOtpSent(true);
        setMessage("A new OTP has been sent to your email");
        setOpen(true);
      }
    } catch (error) {
      console.error("Failed to reset OTP", error);
      setMessage("Failed to reset OTP. Please try again.");
      setOpen(true);
    }
  };
  return (
    <>
      <div
        className="border border-mecaBorderColor p-4 rounded-xl"
        id="keyIconDiv"
      >
        <MdOutlineMail
          size={24}
          className="text-mecaGoBackArrow"
          id="keyIcon"
        />
      </div>
      {message && <p className="text-red-600 text-lg">{message}</p>}
      <h2
        className="text-mecaDarkBlueBackgroundOverlay font-bold text-center lg:text-3xl text-xl mt-4"
        id="checkEmailHeader"
      >
        Check your email
      </h2>
      <p
        className="text-mecaGrayBodyText text-center lg:text-base text-sm px-8 flex flex-col"
        id="checkEmailText"
      >
        We sent a password reset link to
        <span className="font-bold">{userEmail}</span>
      </p>
      <div className="mt-8">
        <p className="font-semibold text-sm text-mecaGrayBodyText pb-1">
          Enter code
        </p>
        <div className="flex flex-1 gap-2 h-16 m-auto">
          {otp.map((data, index) => {
            return (
              <div
                className="flex flex-1 gap-2"
                key={index}
                onPaste={handlePaste}
              >
                <input
                  className="w-16 lg:text-5xl text-xl text-center text-mecaVerificationCodeColor placeholder:text-transparent font-semibold rounded-lg outline-none border border-mecaBorderColor"
                  type="text"
                  name="otp"
                  value={data}
                  onChange={(e) => handleChangeOtp(e.target, index)}
                  title="OTP"
                  placeholder="Enter OTP"
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => {
                    inputsRef.current[index] = el as HTMLInputElement;
                  }}
                  onFocus={handleFocus}
                />
                {index === 2 && (
                  <span className="text-mecaVerificationCodeColor text-5xl flex items-center">
                    -
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="lg:w-4/5 mx-auto pt-12">
          <button
            className="w-full flex items-center justify-center bg-mecaBluePrimaryColor text-[white] lg:text-lg text-sm font-semibold rounded-[36px] lg:h-12 h-8 disabled:bg-mecaBgDisableColor disabled:text-[white]"
            onClick={handleSubmit}
            disabled={isDisabled}
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
              "Verify Email"
            )}
          </button>
        </div>
      </div>
      <span className="flex items-center gap-1 text-mecaGrayBodyText text-sm py-6">
        Didn’t receive the email?
        <Link
          href="#"
          id="resendEmailLink"
          className="text-mecaBluePrimaryColor font-bold"
          onClick={resetOtpCode}
        >
          Click to resend
        </Link>
      </span>
      <Link
        href={paths.toLogin()}
        id="loginLink"
        className="text-mecaGoBackText flex items-center text-sm gap-4"
      >
        <MdOutlineArrowBack
          size={24}
          className="text-mecaGoBackArrow"
          id="arrowBackIcon"
        />
        Back to log in
      </Link>
      {/* <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
      /> */}
    </>
  );
}
