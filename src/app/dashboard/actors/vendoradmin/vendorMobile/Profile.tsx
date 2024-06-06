"use client";
import { useState } from "react";
import "../../../../../styles/profile.css";
import Header from "../../../../dashboard/components/ui/header";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Addbutton from "../../../components/ui/addbutton";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  pt: 2,
  px: 4,
  pb: 3,
};

function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

const Profile = () => {
  const [viewAdminProfile, setViewAdminProfile] = useState(false);
  const handleViewAdminProfile = () => {
    setViewAdminProfile(true);
  };

  const handleClose = () => {
    setViewAdminProfile(false);
  };

  return (
    <div>
      <div className="">
        <div className="flex gap-x-2 mb-12">
          <Avatar
            className="bg-mecaActiveBackgroundNavColor text-mecaBluePrimaryColor w-16 h-16 text-4xl "
            {...stringAvatar("Emeka Sons Limited")}
          />
          <Header
            subtitle={`emekaemeka@gmail.com`}
            title={`Emeka & Sons Limited`}
            amount={``}
          />
        </div>
        <div onClick={handleViewAdminProfile} className="">
          <Addbutton title={`View Admin`} />
        </div>
        <Modal
          className="bg-gray-600"
          open={viewAdminProfile}
          onClick={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box
            sx={{ ...style }}
            onClick={handleClose}
            className="w-[90%] h-[399px] rounded-lg 
            "
          >
            <div className=" mt-6 ">
              <div className="flex justify-center ">
                <Avatar
                  className="bg-mecaActiveBackgroundNavColor mb-3  text-mecaBluePrimaryColor w-16 h-16 text-4xl"
                  {...stringAvatar("Emeka Sons Limited")}
                />
              </div>

              <div className=" flex justify-center ">
                <Header
                  subtitle={``}
                  title={`Emeka & Sons Limited`}
                  amount={``}
                />
              </div>
              <div className="flex justify-center ">
                <Header
                  subtitle={`emekaemeka@gmail.com`}
                  title={``}
                  amount={``}
                />
              </div>
            </div>

            <div className="mt-5 text-sm">
              <div className="flex justify-between mb-6">
                <p>Date onboarded</p>
                <p>12:00pm, Jan 2023</p>
              </div>

              <div className="flex justify-between mb-14">
                <p>Last seen</p>
                <p>2:00pm, Sep 2023</p>
              </div>
            </div>
            <div className="text-center">
              <button
                className="bg-mecaBluePrimaryColor w-40 text-lg font-semibold h-10 rounded-full pl-6 pr-6 text-center pt-2 pb-2 text-white"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </Box>
        </Modal>
      </div>

      <hr className="mt-10"></hr>

      <div className="lg:flex justify-between mt-5">
        <div className="">
          <p>Company profile</p>
          <span>Update company description or address.</span>
        </div>

        <div className="border-2 lg:w-[60%] mt-10 w-[100%] h-screen p-5 rounded-xl overflow-auto scrollbar-none">
          <Box>
            <TextareaAutosize
              readOnly={true}
              required={true}
              id="filledbasic6"
              aria-label="Description"
              name="description"
              placeholder="Description"
              className="  w-[100%] mb-10 -z-50"
              style={{
                backgroundColor: "#EFF2F3",
                height: "223px",
                borderColor: "none",
                padding: "20px",
              }}
            />
          </Box>
          <Box className=" gap-x-4">
            <TextField
              inputProps={{ readOnly: true }}
              required={true}
              id="filledbasic7"
              label="Address1"
              variant="filled"
              InputProps={{ disableUnderline: true }}
              className="lg:w-[364px]  w-[100%] mb-10 2xl:w-[35rem] rounded -z-50"
              sx={{ backgroundColor: "porcelain" }}
            />

            <TextField
              inputProps={{ readOnly: true }}
              required={true}
              type="url"
              id="filledbasic7"
              label="Address2"
              variant="filled"
              InputProps={{ disableUnderline: true }}
              className="lg:w-[364px]  w-[100%] mb-10 2xl:w-[35rem] -z-50"
              sx={{ backgroundColor: "porcelain" }}
            />
          </Box>
          <Box className=" gap-x-4">
            <TextField
              inputProps={{ readOnly: true }}
              required={true}
              type="url"
              id="filledbasic7"
              label="Phone number"
              variant="filled"
              InputProps={{ disableUnderline: true }}
              className="lg:w-[364px]  w-[100%] mb-10 2xl:w-[35rem] rounded -z-50"
              sx={{ backgroundColor: "porcelain" }}
            />

            <TextField
              inputProps={{ readOnly: true }}
              required={true}
              type="url"
              id="filledbasic7"
              label="Agents"
              variant="filled"
              InputProps={{ disableUnderline: true }}
              className="lg:w-[364px]  w-[100%] mb-10 2xl:w-[35rem] rounded -z-50"
              sx={{ backgroundColor: "porcelain" }}
            />
          </Box>

          <Box className=" gap-x-4">
            <TextField
              inputProps={{ readOnly: true }}
              required={true}
              type="url"
              id="filledbasic7"
              label="Total item sold"
              variant="filled"
              InputProps={{ disableUnderline: true }}
              className="lg:w-[364px]  w-[100%] mb-10 2xl:w-[35rem] rounded -z-50"
              sx={{ backgroundColor: "porcelain" }}
            />

            <TextField
              inputProps={{ readOnly: true }}
              required={true}
              type="url"
              id="filledbasic7"
              label="Date and time joined"
              variant="filled"
              InputProps={{ disableUnderline: true }}
              className="lg:w-[364px]  w-[100%] mb-10 2xl:w-[35rem] -z-50"
              sx={{ backgroundColor: "porcelain" }}
            />
          </Box>

          <Box className=" gap-x-4">
            <TextField
              inputProps={{ readOnly: true }}
              required={true}
              type="url"
              id="filledbasic7"
              label="Out of stock"
              variant="filled"
              //   value={company.companyForm.website}
              name="website"
              InputProps={{ disableUnderline: true }}
              className="lg:w-[364px]  w-[100%] mb-10 2xl:w-[35rem] rounded -z-50"
              sx={{ backgroundColor: "porcelain" }}
            />

            <TextField
              inputProps={{ readOnly: true }}
              required={true}
              type="url"
              id="filledbasic7"
              label="Transaction value"
              variant="filled"
              InputProps={{ disableUnderline: true }}
              className="lg:w-[364px]  w-[100%] mb-10 2xl:w-[35rem] rounded -z-50"
              sx={{ backgroundColor: "porcelain" }}
            />
          </Box>

          <Box className=" gap-x-4">
            <TextField
              inputProps={{ readOnly: true }}
              required={true}
              type="url"
              id="filledbasic7"
              label="Last active"
              variant="filled"
              InputProps={{ disableUnderline: true }}
              className=" w-[100%] mb-10 -z-50"
              sx={{ backgroundColor: "porcelain" }}
            />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Profile;
