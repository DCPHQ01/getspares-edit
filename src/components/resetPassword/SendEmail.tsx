import Link from "next/link";
import { MdOutlineArrowBack, MdOutlineMail, MdNorthEast } from "react-icons/md";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function SendEmail() {
  const router = useRouter();

  return (
    <>
      <div className="border border-mecaBorderColor p-4 rounded-xl" id="keyIconDiv">
        <MdOutlineMail size={24} className="text-mecaGoBackArrow" id="keyIcon" />
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
        We sent a password reset link to
        <span className="font-bold">Camoly@gmail.com</span>
      </p>

      <Button
        id="resetPasswordBtn"
        className="bg-mecaBluePrimaryColor normal-case text-[white] text-lg font-semibold rounded-[36px] h-12 px-24 w-full mt-6 hover:bg-mecaBluePrimaryColor"
        onClick={() => router.push("mailto:Camoly@gmail.com")}
        endIcon={<MdNorthEast size={24} />}
      >
        Open email app
      </Button>
      <span className="flex items-center gap-1 text-mecaGrayBodyText text-sm my-6">
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
