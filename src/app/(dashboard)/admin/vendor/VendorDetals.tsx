"use client";
import React, {useEffect, useState} from "react";
import Header from "../../../dashboard/components/ui/header";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
// import Addbutton from "../../components/ui/addbutton";
import Modal from "@mui/material/Modal";
import {MdChevronRight} from "react-icons/md";
import Link from "next/link";
import {useGetVendorCompanyDetailsQuery} from "../../../../redux/features/dashboard/mecaAdminQuery";
import dayjs from "dayjs";
import { paths } from "../../../../path/paths";


interface viewProfilesForActors {
  companyName?: string;
  companyEmail?: string;
  companyWebsiteUrl?: string;
  description?: string;
  addressOne?: string;
  addressTwo?: string;
  phoneNumber?: string;
  totalProductInInventory?: string;
  totalProductSold?: string;
  numberOfAgents?: string;
  numberOfAvailableProducts?: string;
  transactionValue?: string;
  dateCreated?: string;
  productOutOfStock?: string;
};


interface VendorDetailsProps {
  vendorId?: string;

}


const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: "40%",
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
};

const formatDateTime = (dateTime: string) => {
  const date = dayjs(dateTime).format("DD-MM-YYYY");
  const time = dayjs(dateTime).format("HH:mm");
  return { date, time };
};



const formatTimeDate = (dateTime: string | undefined) => {
  if (!dateTime) return "";

  const [hours, minutes, day, month, year] = dateTime.split(":");

  const formattedDate = dayjs(`${year}-${month}-${day}`).format("DD MMM YYYY");
  const formattedTime = dayjs(`${year}-${month}-${day} ${hours}:${minutes}`).format("hh:mm A");

  return `${formattedTime}, ${formattedDate}`;
};



const VendorDetails = ({ vendorId }: VendorDetailsProps) => {

  const { data, isLoading, isError } = useGetVendorCompanyDetailsQuery({ vendorId });
  const [viewProfile, setViewProfile] = useState<viewProfilesForActors>({});

  const [viewAdminProfile, setViewAdminProfile] = useState(false);
  const handleViewAdminProfile = () => {
    setViewAdminProfile(true);
  };

  const handleClose = () => {
    setViewAdminProfile(false);
  };



  useEffect(() => {
    if (data) {
      const profileDet = data.data;
      setViewProfile(profileDet);
    }
  });

  const formattedDateCreated = formatTimeDate(viewProfile.dateCreated);

  return (
    <div className="px-4 py-6">
      <div className="flex items-center gap-2">
        <Link href={paths.toAdmin()}>
          <p className="font-nunito text-sm font-medium text-mecaDarkBlueBackgroundOverlay hover:text-black hover:font-bold">
            Vendors
          </p>
        </Link>
        <MdChevronRight size={20} />
        <p className="font-nunito text-sm font-medium text-mecaGoBackArrow">
        {viewProfile.companyName}
        </p>
      </div>

      <div className="flex justify-between w-full mt-5">
        <div className="flex items-center gap-x-2 mb-12">
          <Avatar
            className="bg-mecaActiveBackgroundNavColor text-mecaBluePrimaryColor w-16 h-16 text-4xl"
            {...stringAvatar(viewProfile?.companyName?.slice(0, 1).toUpperCase() || "")}
          />
          <div>
            <Header
              subtitle={`${viewProfile.companyEmail}`}
              title={`${viewProfile.companyName}`}
              // website={
              //   <Link href={viewProfile.companyWebsiteUrl ?? ""} target="_blank" rel="noopener noreferrer" className="flex items-center">
              //     {data?.data.companyWebsiteUrl} <GoArrowUpRight className="ml-1" />
              //   </Link>
              // }
              website={`${data?.data.companyWebSiteUrl}` }            
            />
            <p></p>
          </div>
        </div>

        {/* <div onClick={handleViewAdminProfile} className="">
          <button
            id="addButton"
            className={`bg-[#095AD3] lg:w-[200px] w-[100%] text-white rounded-full py-[0.58rem] px-[1.5rem] 
        `}
          >
            <div className={`flex text-white items-center justify-center`}>
              <span className="">View Admin</span>
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
            className="w-[20%] h-[40%] rounded-lg opacity-6
            "
          >
            <div className=" mt-6 ">
              <div className="flex justify-center">
                <Avatar
                  className="bg-mecaActiveBackgroundNavColor mb-3 text-mecaBluePrimaryColor w-16 h-16 text-4xl"
                  {...stringAvatar(viewProfile?.companyName?.slice(0, 1).toUpperCase() || "")}
                />
              </div>

              <div className="flex justify-center">
                <Header subtitle={``} title={`${viewProfile.companyName}`} />
              </div>

              <div className="flex justify-center">
                <Header subtitle={`${viewProfile.companyEmail}`} title={``} />
              </div>
            </div>

            <div className="mt-5 text-sm mb-14">
              <div className="flex justify-between mb-6">
                <p className="font-normal text-sm text-mecaGrayBodyText">Date onboarded</p>
                <p className="font-bold text-sm">{formattedDateCreated}</p>
                {/* <p>12:00pm, Jan 2023</p> */}
              {/* </div>
            </div>
            <hr></hr>
            <div className="text-center mt-4">
              <button
                className="bg-mecaBluePrimaryColor w-40 text-lg font-semibold h-10 rounded-full pl-6 pr-6 text-center pt-2 pb-2 text-white"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </Box>
        </Modal> */} 
      </div>
      <hr></hr>

      <div className="flex justify-between mt-4">
        <div className="">
          <p className="text-lg font-semibold">Company profile</p>
          <span className="text-sm text-mecaGrayBodyText">
            Update company description or address.
          </span>
        </div>

        <div className="border-2 w-[60%] h-[100%] p-5 rounded-xl overflow-auto scrollbar-none ">
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
              <p className="text-xs text-gray-500">Address1</p>
              <p>{viewProfile.addressOne}</p>
            </div>

            <div
              className="lg:w-[364px] h-16 pl-5 pt-3 w-[100%] 2xl:w-[35rem] rounded  bg-mecaBorderColor"
              style={{ backgroundColor: "porcelain" }}
            >
              <p className="text-xs text-gray-500">Address2</p>
              <p>{viewProfile.addressTwo}</p>
            </div>
          </div>

          <div className="flex gap-x-4 mt-5">
            <div
              className="lg:w-[364px] h-16 pl-5 pt-3 w-[100%] 2xl:w-[35rem] rounded  bg-mecaBorderColor"
              style={{ backgroundColor: "porcelain" }}
            >
              <p className="text-xs text-gray-500">Phone Number</p>
              <p>{viewProfile.phoneNumber}</p>
            </div>

            <div
              className=" lg:w-[364px] h-16 pl-5 pt-3 w-[100%] 2xl:w-[35rem] rounded  bg-mecaBorderColor"
              style={{ backgroundColor: "porcelain" }}
            >
              <p className="text-xs text-gray-500">Agents</p>
              <p>{viewProfile.numberOfAgents}</p>
            </div>
          </div>

          <div className="flex gap-x-4 mt-5">
            <div
              className=" lg:w-[364px] h-16 pl-5 pt-3 w-[100%] 2xl:w-[35rem] rounded  bg-mecaBorderColor"
              style={{ backgroundColor: "porcelain" }}
            >
              <p className="text-xs text-gray-500">Total products</p>
              <p>{viewProfile.totalProductSold}</p>
            </div>

            <div
              className=" lg:w-[364px] h-16 pl-5 pt-3 w-[100%] 2xl:w-[35rem] rounded  bg-mecaBorderColor"
              style={{ backgroundColor: "porcelain" }}
            >
              <p className="text-xs text-gray-500">Available products</p>
              <p>{viewProfile.numberOfAvailableProducts}</p>
            </div>

          </div>

          <div className="flex gap-x-4 mt-5">
            <div
              className=" lg:w-[364px] h-16 pl-5 pt-3 w-[100%] 2xl:w-[35rem] rounded  bg-mecaBorderColor"
              style={{ backgroundColor: "porcelain" }}
            >
              <p className="text-xs text-gray-500">Total item sold</p>
              <p>{viewProfile.totalProductSold}</p>
            </div>

            <div
              className=" lg:w-[364px] h-16 pl-5 pt-3 w-[100%] 2xl:w-[35rem] rounded  bg-mecaBorderColor"
              style={{ backgroundColor: "porcelain" }}
            >
              <p className="text-xs text-gray-500">Date and time joined</p>
              <p>{formattedDateCreated}</p>
            </div>
          </div>

          <div className="flex gap-x-4 mt-5">
            <div
              className=" lg:w-[364px] h-16 pl-5 pt-3 w-[100%] 2xl:w-[35rem] rounded  bg-mecaBorderColor"
              style={{ backgroundColor: "porcelain" }}
            >
              <p className="text-xs text-gray-500">Out of stock</p>
              <p>{viewProfile.productOutOfStock}</p>
            </div>

            <div
              className=" lg:w-[364px] h-16 pl-5 pt-3 w-[100%] 2xl:w-[35rem] rounded  bg-mecaBorderColor"
              style={{ backgroundColor: "porcelain" }}
            >
              <p className="text-xs text-gray-500">Transaction value</p>
              <p>{viewProfile.transactionValue}</p>
            </div>

          </div>

          {/* <div className="flex gap-x-4 mt-5">
            <div
              className="lg:w-[364px] h-16 pl-5 pt-3 w-full 2xl:w-[27.7rem] rounded bg-mecaBorderColor"
              style={{ backgroundColor: "porcelain" }}
            >
              <p className="text-xs text-gray-500">Last active</p>
              <p>{viewProfile.lastActive}</p>
            </div>
          </div> */}



        </div>
      </div>
    </div>
  );
};

export default VendorDetails;
