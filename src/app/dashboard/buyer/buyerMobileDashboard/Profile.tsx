"use client";
import Header from "../../components/ui/header";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useLayoutEffect, useState } from "react";

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

interface UserDetails {
  firstName: string;
  lastName: string;
  email: string;
}

const Profile = () => {
  const [details, setDetails] = useState<UserDetails | null>(null);

  useLayoutEffect(() => {
    const savedItem = sessionStorage.getItem("userDetails");
    if (savedItem) {
      setDetails(JSON.parse(savedItem) as UserDetails);
    }
  }, []);
  return (
    <div>
      <Header subtitle={``} title={`Profile`} />

      <div className="flex gap-x-2 mb-12">
        <Avatar
          className="bg-mecaActiveBackgroundNavColor -z-50 text-mecaBluePrimaryColor w-16 h-16 text-4xl"
          {...stringAvatar(`${details?.firstName} ${details?.lastName}`)}
        />
        <div className="mt-1">
          <Header
            subtitle={`${details?.email}`}
            title={`${details?.firstName} ${details?.lastName}`}
          />
        </div>
      </div>

      <hr></hr>

      <div className=" justify-between mt-5">
        <div className="">
          <p className="font-semibold text-lg">Personal info</p>
          <span className="text-sm text-mecaGrayBodyText">
            Update your photo and personal details.
          </span>
        </div>

        <div className="border-2 w-[100%] mt-10 h-[100%] p-5 rounded-xl ">
          <div>
            <div className=" h-16 mb-5  pl-5 pt-3 w-[100%] rounded  bg-mecaBorderColor">
              <p className="text-sm text-gray-500">Firstname</p>
              <p className="text-lg">{details?.firstName}</p>
            </div>
          </div>

          <div className="flex gap-x-4">
            <div
              className="lg:w-[364px] h-16 pl-5 pt-3 w-[100%] 2xl:w-[35rem] rounded  bg-mecaBorderColor"
              style={{ backgroundColor: "porcelain" }}
            >
              <p className="text-xs text-gray-500">Lastname</p>
              <p>{details?.lastName}</p>
            </div>

            <div
              className="lg:w-[364px] h-16 pl-5 pt-3 w-[100%] 2xl:w-[35rem] rounded  bg-mecaBorderColor"
              style={{ backgroundColor: "porcelain" }}
            >
              <p className="text-xs text-gray-500">Email</p>
              <p>{details?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
