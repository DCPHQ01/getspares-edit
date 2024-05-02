"use client";

import Image from "next/image";
import emeca from "../../assets/mecaLogo/emeca.png";
import mail from "../../assets/icons/Icon.svg";
import connectorwrap from "../../assets/images/connectorwrap.svg";
import locationwrap from "../../assets/images/locationwrap.svg";
import previewwrap from "../../assets/images/previewwrap.svg";
import { useEffect, useState } from "react";
import { title } from "process";

import React from "react";

// import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

const drawerWidth = 240;
// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//   },
//   drawer: {
//     [theme.breakpoints.up("sm")]: {
//       width: drawerWidth,
//       flexShrink: 0,
//     },
//   },
//   appBar: {
//     [theme.breakpoints.up("sm")]: {
//       width: `calc(100% - ${drawerWidth}px)`,
//       marginLeft: drawerWidth,
//     },
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//     [theme.breakpoints.up("sm")]: {
//       display: "none",
//     },
//   },
//   // necessary for content to be below app bar
//   toolbar: theme.mixins.toolbar,
//   drawerPaper: {
//     width: drawerWidth,
//   },
//   content: {
//     flexGrow: 1,
//     padding: theme.spacing(3),
//   },
// }));

function ResponsiveDrawer({ step, setStep }: any) {
  // const { window } = props;
  // const classes = useStyles();
  // const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = <div>{/* <div className={classes.toolbar} /> */}</div>;

  const [activeTab, setActiveTab] = useState<number | null>(null);

  const handleTabClick = (index: number) => {
    setActiveTab(index === activeTab ? null : index);
  };

  const details = [
    {
      id: 1,
      title: "Company details",
      description: "Provide the name, description, logo etc",
      image: connectorwrap,
    },
    {
      id: 2,
      title: "Location",
      description: "Provide addresses, contacts & email",
      image: locationwrap,
    },
    {
      id: 3,
      title: "Preview",
      description: "On your mark, get ready, lets go live",
      image: previewwrap,
    },
  ];
  const handleToggle = (step: number) => {
    console.log("step ", step);
    setStep(step);
  };

  interface dataObject {
    id: number;
    title: string;
    description: string;
    image: any;
  }

  useEffect(() => {
    setActiveTab(1);
  }, []);

  return (
    <div className="relative md:flex h-[800px] p-4 w-full" id="sidebar">
      <div className="hidden md:flex gap-x-4 w-full h-1/2 mt-6 ">
        <div className="flex flex-col justify-center mt-8 gap-y-12">
          <Image src={emeca} alt="logo" className="w-[90px]" />
          <div className="flex flex-col justify-center h-full ">
            {details.map((item: dataObject) => (
              <div
                className="flex gap-x-4 items-center cursor-pointer"
                key={item.id}
                onClick={() => handleToggle(item.id)}
              >
                <Image width={40} src={item.image} alt={item.title} />
                <div
                  onClick={() => handleTabClick(item.id)}
                  className={`text-gray-400 flex flex-col -mt-4 lg:-mt-10 ${
                    activeTab === item.id ? "text-gray-800" : "`text-gray-800"
                  }`}
                  // sx="flex flex-col -mt-4 lg:-mt-10"
                >
                  <p className="font-bold text-base font-nunito_sans">
                    {item.title}
                  </p>
                  <p className="text-base font-nunito_sans">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="hidden md:flex w-full h-[50px] justify-between text-sm items-center absolute bottom-0 left-0 p-2">
        <p>© Meca 2024</p>
        <div className="flex gap-x-2 ">
          <Image src={mail} alt="mail" className="w-auto" />
          <p>info@meca.com.ng</p>
        </div>
      </div>
    </div>
  );
}

export default ResponsiveDrawer;
