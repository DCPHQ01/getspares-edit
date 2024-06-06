"use client";
import Header from "../../../../dashboard/components/ui/header";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

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
  return (
    <div>
      <Header subtitle={``} title={`Profile`} amount={``} />
      <div className="flex gap-x-2 mb-12">
        <Avatar
          className="bg-mecaActiveBackgroundNavColor -z-50 text-mecaBluePrimaryColor w-16 h-16 text-4xl"
          {...stringAvatar("Obinna Jesse")}
        />
        <Header
          subtitle={`obinnajesse@gmail.com`}
          title={`Obinna Jesse`}
          amount={``}
        />
      </div>

      <hr></hr>

      <div className=" justify-between mt-5">
        <div className="">
          <p>Personal info</p>
          <span>Update your photo and personal details.</span>
        </div>

        <div className="border-2 w-[100%] mt-10 h-[100%] p-5 rounded-xl ">
          <Box className="">
            <TextField
              inputProps={{ readOnly: true }}
              required={true}
              id="filledbasic7"
              label="First name"
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
              label="Last name"
              variant="filled"
              InputProps={{ disableUnderline: true }}
              className="lg:w-[364px]  w-[100%] -z-50 2xl:w-[35rem]"
              sx={{ backgroundColor: "porcelain", marginBottom: "20px" }}
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
              className="lg:w-[364px] mb-5  w-[100%] -z-50 2xl:w-[35rem] rounded"
              sx={{ backgroundColor: "porcelain", marginBottom: "20px" }}
            />

            <TextField
              inputProps={{ readOnly: true }}
              required={true}
              type="url"
              id="filledbasic7"
              label="Gender"
              variant="filled"
              InputProps={{ disableUnderline: true }}
              className="lg:w-[364px] mb-5  w-[100%] -z-50 2xl:w-[35rem] rounded"
              sx={{ backgroundColor: "porcelain", marginBottom: "20px" }}
            />
          </Box>

          <Box className=" gap-x-4 mb-10">
            <TextField
              inputProps={{ readOnly: true }}
              required={true}
              type="url"
              id="filledbasic7"
              label="Date account was created"
              variant="filled"
              //   value={company.companyForm.website}
              name="website"
              InputProps={{ disableUnderline: true }}
              className="lg:w-[364px] mb-5 w-[100%] -z-50 2xl:w-[35rem] rounded"
              sx={{ backgroundColor: "porcelain", marginBottom: "20px" }}
            />

            <TextField
              inputProps={{ readOnly: true }}
              required={true}
              type="url"
              id="filledbasic7"
              label="Last active"
              variant="filled"
              InputProps={{ disableUnderline: true }}
              className="lg:w-[364px] -z-50 w-[100%] 2xl:w-[35rem]"
              sx={{ backgroundColor: "porcelain", marginBottom: "20px" }}
            />
          </Box>

          <Box className="mb-5">
            <TextField
              inputProps={{ readOnly: true }}
              required={true}
              type="url"
              id="filledbasic7"
              label="Email"
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
