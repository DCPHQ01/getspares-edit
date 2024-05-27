import Header from "../../dashboard/components/ui/header";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

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
          className="bg-mecaActiveBackgroundNavColor text-mecaBluePrimaryColor"
          {...stringAvatar("Sam Immanuel")}
        />
        <Header
          subtitle={`samimmanuel@gmail.com`}
          title={`Sam Immanuel`}
          amount={``}
        />
      </div>

      <hr></hr>

      <div className="flex justify-between mt-5">
        <div className="">
          <p>Personal info</p>
          <span>Update your photo and personal details.</span>
        </div>

        <div className="border-2 w-[60%] h-80 rounded-xl"></div>
      </div>
    </div>
  );
};

export default Profile;
