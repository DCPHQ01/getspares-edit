"use client";
import Header from "../../../../dashboard/components/ui/header";
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
      <Header subtitle={``} title={`Profile`} amount={``} />

      <div className="flex gap-x-2 mb-12">
        <Avatar
          className="bg-mecaActiveBackgroundNavColor -z-50 text-mecaBluePrimaryColor w-16 h-16 text-4xl"
          {...stringAvatar(`${details?.firstName} ${details?.lastName}`)}
        />
        <Header
          subtitle={`${details?.email}`}
          title={`${details?.firstName} ${details?.lastName}`}
          amount={``}
        />
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
          <Box className="">
            <TextField
              inputProps={{ readOnly: true }}
              required={true}
              id="filledbasic7"
              label={details?.firstName}
              variant="filled"
              InputProps={{ disableUnderline: true }}
              className="lg:w-[364px] w-[100%] 2xl:w-[35rem] -z-50 rounded"
              sx={{ backgroundColor: "porcelain", marginBottom: "20px" }}
            />

            <TextField
              inputProps={{ readOnly: true }}
              required={true}
              type="url"
              id="filledbasic7"
              label={details?.lastName}
              variant="filled"
              InputProps={{ disableUnderline: true }}
              className="lg:w-[364px]  w-[100%] -z-50 2xl:w-[35rem]"
              sx={{ backgroundColor: "porcelain", marginBottom: "20px" }}
            />
          </Box>

          <Box className="mb-5">
            <TextField
              inputProps={{ readOnly: true }}
              required={true}
              type="url"
              id="filledbasic7"
              label={details?.email}
              variant="filled"
              InputProps={{ disableUnderline: true }}
              className=" w-[100%] -z-50 rounded"
              sx={{ backgroundColor: "porcelain" }}
            />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Profile;
