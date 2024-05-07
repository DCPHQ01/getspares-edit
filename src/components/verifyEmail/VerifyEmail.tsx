import { Fragment, useEffect, useState } from "react";
import { MdOutlineArrowBack, MdOutlineMail } from "react-icons/md";
import Link from "next/link";
import { useVerifyEmailMutation } from "@/redux/baseQuery";

interface VerifyEmailProps {
  setHaveVerifiedEmail: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function VerifyEmail({
  setHaveVerifiedEmail,
}: VerifyEmailProps) {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isDisabled, setIsDisabled] = useState(true);

  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("userEmail");
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);
  console.log(userEmail);

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
      const nextInput = document.getElementsByName("otp")[nextIndex];
      if (nextInput) {
        (nextInput as HTMLInputElement).focus();
      }
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  };
  console.log(otp.join(""));

  const [verifyEmail] = useVerifyEmailMutation();

  const handleSubmit = async () => {
    const data = {
      email: userEmail,
      otpCode: otp.join(""),
    };
    console.log(data, "data");

    try {
      await verifyEmail(data);
      setHaveVerifiedEmail(true);
    } catch (error) {
      console.log(error);
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
              <Fragment key={index}>
                <input
                  className="w-16 lg:text-5xl text-xl text-center text-mecaVerificationCodeColor placeholder:text-transparent font-semibold rounded-lg outline-none border border-mecaBorderColor"
                  type="text"
                  name="otp"
                  value={data}
                  onChange={(e) => handleChangeOtp(e.target, index)}
                />
                {index === 2 && (
                  <span className="text-mecaVerificationCodeColor text-5xl flex items-center">
                    -
                  </span>
                )}
              </Fragment>
            );
          })}
        </div>

        <div className="lg:w-4/5 mx-auto pt-12">
          <button
            className="w-full bg-mecaBluePrimaryColor text-[white] lg:text-lg text-sm font-semibold rounded-[36px] lg:h-12 h-8 disabled:bg-mecaBgDisableColor disabled:text-[white]"
            onClick={handleSubmit}
            disabled={isDisabled}
          >
            Verify email
          </button>
        </div>
      </div>
      <span className="flex items-center gap-1 text-mecaGrayBodyText text-sm py-6">
        Didn’t receive the email?
        <Link
          href="#"
          id="resendEmailLink"
          className="text-mecaBluePrimaryColor font-bold"
        >
          Click to resend
        </Link>
      </span>
      <Link
        href="/login"
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
