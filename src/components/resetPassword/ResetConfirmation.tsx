import CheckIcon from "../../assets/icons/checkIcon";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { MdChevronRight } from "react-icons/md";

import { paths } from "../../path/paths";

export default function ResetConfirmation() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center">
      <CheckIcon />
      <h2
        className="text-mecaDarkBlueBackgroundOverlay font-bold text-center text-xl pt-8"
        id="resetConfirmationHeader"
      >
        Your password has been successfully reset
      </h2>
      <p
        className="text-mecaGrayBodyText text-center px-8 py-4"
        id="resetConfirmationText"
      >
        Log in to your account with your new password
      </p>
      <Button
        id="resetPasswordBtn"
        variant="contained"
        className="bg-mecaBluePrimaryColor text-[white] text-lg my-8 font-semibold rounded-[36px] h-12 w-full hover:bg-mecaBluePrimaryColor"
        onClick={() => router.push(paths.toLogin())}
        endIcon={<MdChevronRight />}
      >
        Login
      </Button>
    </div>
  );
}
