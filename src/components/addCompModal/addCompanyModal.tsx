import check from "../../assets/addCompanyModalAssets/check.png";
import Image from "next/image";
import { Nunito_Sans } from "next/font/google";
import Link from "next/link";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import Button from "@mui/material/Button";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  borderRadius: 6,
  height: 274,
  bgcolor: "background.paper",
  border: "2px solid white",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const nunito_sans = Nunito_Sans({
  weight: "400",
  subsets: ["latin"],
});

const AddCompanyModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}

      <div className="w-[100%] h-[100vh] bg-mecaDarkBlueBackgroundOverlay">
        <Box sx={{ ...style, width: 400 }}>
          <div
            className="flex justify-between flex-row-reverse"
            id="confirmpage"
          >
            <form
              method="dialog"
              id="confirmpageButton"
              className={nunito_sans.className}
            >
              <Link href="/dashboard">
                <button
                  id="cancelbtn"
                  className="btn btn-sm btn-circle btn-ghost"
                >
                  ✕
                </button>
              </Link>
            </form>

            <Image
              id="confirmpageImage"
              src={check}
              width={50}
              height={50}
              className="checkImg"
              alt="Picture of the author"
            />
          </div>

          <div className={nunito_sans.className} id="confirmpageForm">
            <h3 className="addCompany mt-2" id="confirmpageHeader">
              Add company
            </h3>
            <p className="py-4 addCompanySub" id="confirmpageSubHeader">
              Increase the confidence and trust of buyers by adding your company
              account on meca
            </p>
            <div
              className="modalbtn gap-y-3 text-lg font-semibold"
              id="confirmpageButton2"
            >
              <form
                method="dialog"
                id="confirmpageForm2"
                className={nunito_sans.className}
              >
                <Link href="/dashboard">
                  <button
                    id="laterbtn"
                    className="btn w-40 font-semibold text-lg text-mecaBluePrimaryColor min-h-12 rounded-full maybe-later"
                  >
                    Maybe later
                  </button>
                </Link>
              </form>

              <Link id="continuebtnLink" href="/modalPage/vendor">
                <button
                  id="continuebtn"
                  className="btn bg-mecaBluePrimaryColor  text-white  font-semibold rounded-full w-40 min-h-12"
                >
                  Continue
                </button>
              </Link>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default AddCompanyModal;
