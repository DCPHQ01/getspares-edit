"use client";
import { useState, useEffect } from "react";
import "../../../../../styles/profile.css";
import Header from "../../../../dashboard/components/ui/header";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "../../../../../styles/addCompanyPageStyle/addCompanyModal.css";
import { useGetUserAllUsersProfileQuery } from "../../../../../redux/features/profile/profileQuery";

interface viewProfilesForActors {
  name?: string;
  description?: string;
  cac?: string;
  companyEmail?: string;
  imageUrl?: string;
  address1?: string;
  address2?: string;
  websiteUrl?: string;
  phoneNumber?: string;
}

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
    children: `${name
      .split(" ")
      .map((word) => word[0])
      .join("")}`,
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
  const { data } = useGetUserAllUsersProfileQuery({});

  const [viewProfile, setViewProfile] = useState<viewProfilesForActors>({
    name: "",
    description: "",
    cac: "",
    companyEmail: "",
    imageUrl: "",
    address1: "",
    address2: "",
    websiteUrl: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (data) {
      const profileDet = data.data;
      setViewProfile(profileDet);
    }
  });
  return (
    <div>
      <div className="">
        <div className="flex gap-x-2 mb-12">
          <Avatar
            className="bg-mecaActiveBackgroundNavColor text-mecaBluePrimaryColor w-16 h-16 text-4xl -z-50"
            {...stringAvatar(`${viewProfile.name}`)}
          />
          <div className="mt-1">
            <Header
              subtitle={`${viewProfile.companyEmail}`}
              title={`${viewProfile.name}`}
            />
          </div>
        </div>
        <div onClick={handleViewAdminProfile} className="">
          <button
            id="addButton"
            className={`bg-[#095AD3] lg:w-[250px] w-[100%] text-white rounded-full py-[0.58rem] px-[1.5rem] 
        `}
          >
            <div className={`flex text-white items-center justify-center`}>
              <span className="ml-5">View Admin</span>
            </div>
          </button>
        </div>
        <Modal
          className=""
          open={viewAdminProfile}
          onClick={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
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
                  {...stringAvatar(`${viewProfile.name}`)}
                />
              </div>

              <div className=" flex justify-center ">
                <Header
                  subtitle={``}
                  title={`${viewProfile.name}`}
                  amount={``}
                />
              </div>
              <div className="flex justify-center ">
                <Header
                  subtitle={`${viewProfile.companyEmail}`}
                  title={``}
                  amount={``}
                />
              </div>
            </div>

            <div className="mt-5 text-sm mb-14">
              <div className="flex justify-between mb-6">
                <p>Date onboarded</p>
                <p>12:00pm, Jan 2023</p>
              </div>
            </div>
            <div className="text-center ">
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
          <p className="text-lg font-semibold">Company profile</p>
          <span className="text-sm text-mecaGrayBodyText">
            Update company description or address.
          </span>
        </div>

        <div className="border-2 lg:w-[60%] mt-10 w-[100%] h-[100%] p-5 rounded-xl overflow-auto scrollbar-none">
          <div>
            <div className=" h-52 mb-5  pl-5 pt-3 w-[100%] rounded  bg-mecaBorderColor">
              <p className="text-sm text-gray-500">Description</p>
              <p className="text-lg">{viewProfile.description}</p>
            </div>
          </div>

          <div className="flex gap-x-4">
            <div
              className="text-wrap lg:w-[364px] pl-5 pt-3 w-[100%] 2xl:w-[35rem] rounded  bg-mecaBorderColor"
              style={{ backgroundColor: "porcelain" }}
            >
              <p className="text-xs text-gray-500 ">Address1</p>
              <p className="scrollbar-none overflow-x-scroll w-[100%]">
                {viewProfile.address1}
              </p>
            </div>

            <div
              className="lg:w-[364px] pl-5 pt-3 w-[100%] 2xl:w-[35rem] rounded  bg-mecaBorderColor"
              style={{ backgroundColor: "porcelain" }}
            >
              <p className="text-xs w-[100%] text-gray-500 ">Address2</p>
              <p className="scrollbar-none overflow-x-scroll w-[100%]">
                {viewProfile.address2}
              </p>
            </div>
          </div>
          <div className="flex gap-x-4 mt-5">
            <div
              className=" lg:w-[364px] h-16 pl-5 pt-3 w-[100%] 2xl:w-[35rem] rounded  bg-mecaBorderColor"
              style={{ backgroundColor: "porcelain" }}
            >
              <p className="text-xs text-gray-500">Email</p>
              <p>{viewProfile.companyEmail}</p>
            </div>

            <div
              className=" lg:w-[364px] h-16 pl-5 pt-3 w-[100%] 2xl:w-[35rem] rounded  bg-mecaBorderColor"
              style={{ backgroundColor: "porcelain" }}
            >
              <p className="text-xs text-gray-500">Phone Number</p>
              <p>{viewProfile.companyEmail}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
