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
      <div className="open-modal-btn"></div>
      <Button className="btn" id="modalButton" onClick={handleOpen}>
        open modal
      </Button>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        id="my_modal_3"
        className="modal"
      >
        <Box sx={{ ...style, width: 400 }}>
          <form method="dialog" className={nunito_sans.className}>
            {/* if there is a button in form, it will close the modal */}
            <button
              onClick={handleClose}
              id="cancelbtn"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-4"
            >
              ✕
            </button>
          </form>

          <Image
            src={check}
            width={50}
            height={50}
            className="checkImg"
            alt="Picture of the author"
          />
          <div className={nunito_sans.className}>
            <h3 className="addCompany">Add company</h3>
            <p className="py-4 addCompanySub">
              Increase the confidence and trust of buyers by adding your company
              account on meca
            </p>
            <div className="modalbtn gap-y-3 text-lg font-semibold">
              <form method="dialog" className={nunito_sans.className}>
                <button
                  onClick={handleClose}
                  id="laterbtn"
                  className="btn text-primary w-40  min-h-12 rounded-full maybe-later"
                >
                  Maybe later
                </button>
              </form>

              <Link href="/modalPage/vendor">
                <button
                  id="continuebtn"
                  className="btn btn-primary rounded-full w-40 min-h-12"
                >
                  Continue
                </button>
              </Link>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AddCompanyModal;
