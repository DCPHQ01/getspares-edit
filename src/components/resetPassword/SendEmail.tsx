import Link from "next/link";
import { MdOutlineArrowBack, MdOutlineMail, MdNorthEast } from "react-icons/md";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { paths } from "../../path/paths";
import { ColorRing } from "react-loader-spinner";
import { useEffect, useRef, useState } from "react";
import {
  useResetPasswordVerifyEmailMutation,
  useVerifyEmailMutation,
} from "../../redux/features/users/authQuery";

export default function SendEmail() {
  const router = useRouter();

  const emailSet = sessionStorage.getItem("email") ?? "";
  const userMail = JSON.parse(emailSet);

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isDisabled, setIsDisabled] = useState(true);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const length = 6;
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const [resetPasswordVerifyEmail, { isError }] =
    useResetPasswordVerifyEmailMutation();
  const [verifyEmail] = useVerifyEmailMutation();
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
  console.log(otp.join(""));

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleResendOTP = async () => {
    try {
      const response = await resetPasswordVerifyEmail(userMail).unwrap();

      if (response.message === "Password update successfully") {
        setIsLoading(false);
      } else if (!response.message) {
        setIsLoading(false);
      }
    } catch (error: any) {
      console.log(error.message);
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    let response;
    const data = {
      email: userMail,
      otpCode: otp.join(""),
    };
    console.log(data, "data");

    setIsLoading(true);
    try {
      response = await verifyEmail(data);
      if ("data" in response) {
        console.log(response.data.message, " verify");
        if (response?.data?.message === "User verified successfully") {
          sessionStorage.setItem("otp", JSON.stringify(data));
          setIsLoading(false);
          router.push(paths.toResetNewPassword());
        } else if (response?.data?.statusCode === 400) {
          setOpen(true);
          setOtp(Array(6).fill(""));
          setIsLoading(false);
        }
      }
    } catch (error: any) {
      console.log(error.message);
      setOpen(true);
      setOtp(Array(6).fill(""));
    }
    setOtp(Array(6).fill(""));
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
      <h2
        className="text-mecaDarkBlueBackgroundOverlay font-bold text-center text-3xl pt-4"
        id="checkEmailHeader"
      >
        Check your email
      </h2>
      <p
        className="text-mecaGrayBodyText text-center px-8 flex flex-col pt-2"
        id="checkEmailText"
      >
        We sent a verification code to
        <span className="font-bold">{emailSet}</span>
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
                  placeholder="0"
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => {
                    inputsRef.current[index] = el as HTMLInputElement;
                  }}
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
            type="submit"
            className="w-full flex justify-center items-center bg-mecaBluePrimaryColor text-[white] lg:text-lg text-sm font-semibold rounded-[36px] lg:h-12 h-8 disabled:bg-mecaBgDisableColor disabled:text-[white]"
            disabled={isDisabled}
            onClick={handleSubmit}
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
              "Verify email"
            )}
          </button>
        </div>
      </div>
      <span
        className="flex items-center gap-1 text-mecaGrayBodyText text-sm my-6"
        onClick={handleResendOTP}
      >
        Didn’t receive the otp?
        <Link
          href="#"
          id="resendEmailLink"
          className="text-mecaBluePrimaryColor font-bold"
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
    </>
  );
}
