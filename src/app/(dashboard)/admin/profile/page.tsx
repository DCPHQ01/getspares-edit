"use client";
import Header from "../../../dashboard/components/ui/header";
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

  return color;
}

function stringAvatar(name: string) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    deliveryAddress: "",
  });

  const router = useRouter();
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
      <Header subtitle={``} title={`Profile`} />
      <div className="flex gap-x-2 mb-12">
        <Avatar
          className="bg-mecaActiveBackgroundNavColor text-mecaBluePrimaryColor w-16 h-16 text-4xl"
          {...stringAvatar(fullName)}
        />
        <div className="mt-1">
          <Header subtitle={formData.email} title={fullName} />
        </div>
      </div>

      <hr></hr>

      <div className="lg:flex justify-between mt-5">
        <div className="lg:mb-0 mb-4 ">
          <p className="text-lg font-semibold">Personal info</p>
          <span className="text-sm text-mecaGrayBodyText">
            Update your photo and personal details.
          </span>
        </div>

        <div className="border-2 lg:w-[60%] h-full p-5 rounded-xl flex flex-col gap-y-4">
          <Box className="flex gap-x-4">
            <TextField
              inputProps={{ readOnly: true }}
              required={true}
              id="filledbasic7"
              label="First name"
              value={formData.firstName}
              variant="filled"
              InputProps={{ disableUnderline: true }}
              className="lg:w-[364px] w-[100%] 2xl:w-[35rem] rounded"
              sx={{ backgroundColor: "porcelain" }}
            />

            <TextField
              inputProps={{ readOnly: true }}
              required={true}
              type="url"
              id="filledbasic7"
              label="Last name"
              value={formData.lastName}
              variant="filled"
              InputProps={{ disableUnderline: true }}
              className="lg:w-[364px]  w-[100%] mb-10 2xl:w-[35rem]"
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
              value={formData.email}
              variant="filled"
              InputProps={{ disableUnderline: true }}
              className="mt-4 w-[100%] rounded"
              sx={{ backgroundColor: "porcelain" }}
            />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Profile;
