"use client";
import Header from "../../dashboard/components/ui/header";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    deliveryAddress: "",
  });

  const router = useRouter();

  useEffect(() => {
    const userDetails = sessionStorage.getItem("userDetails");
    if (userDetails) {
      const parsedUserDetails = JSON.parse(userDetails);
      "User details:", parsedUserDetails;
      setFormData({
        firstName: parsedUserDetails.firstName || "",
        lastName: parsedUserDetails.lastName || "",
        email: parsedUserDetails.email || "",
        deliveryAddress: parsedUserDetails.deliveryAddress || "",
      });
    }
  }, [router]);

  const fullName = `${formData.firstName} ${formData.lastName}`;

  return (
    <div>
      <Header subtitle={``} title={`Profile`} amount={``} />
      <div className="flex gap-x-2 mb-12">
        <Avatar
          className="bg-mecaActiveBackgroundNavColor text-mecaBluePrimaryColor w-16 h-16 text-4xl -z-50"
          {...stringAvatar(fullName)}
        />
        <div>
          <Header subtitle={formData.email} title={fullName} amount={``} />
        </div>
      </div>

      <hr></hr>

      <div className="lg:flex flex-col justify-between mt-5 ">
        <div className="">
          <p className="text-lg font-semibold">Personal info</p>
          <span className="text-sm text-mecaGrayBodyText">
            Update your photo and personal details.
          </span>
        </div>

        <div className="border-2 lg:w-[60%] w-[100%] mt-5 mb-5 h-full p-5 rounded-xl">
          <Box className="mt-10 gap-x-4">
            <TextField
              inputProps={{ readOnly: true }}
              required={true}
              id="filledbasic7"
              label="First name"
              variant="filled"
              InputProps={{ disableUnderline: true }}
              className="lg:w-[364px]  w-[100%] mb-5 2xl:w-[35rem] rounded -z-50"
              sx={{ backgroundColor: "porcelain" }}
            />

            <TextField
              inputProps={{ readOnly: true }}
              required={true}
              type="url"
              id="filledbasic7"
              label="Last name"
              variant="filled"
              InputProps={{ disableUnderline: true }}
              className="lg:w-[364px]  w-[100%] mb-5 2xl:w-[35rem] -z-50"
              sx={{ backgroundColor: "porcelain" }}
            />
          </Box>

          <Box>
            <TextField
              inputProps={{ readOnly: true }}
              required={true}
              type="url"
              id="filledbasic7"
              label="Email"
              variant="filled"
              InputProps={{ disableUnderline: true }}
              className="  w-[100%] mb-5 rounded -z-50"
              sx={{ backgroundColor: "porcelain" }}
            />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Profile;
