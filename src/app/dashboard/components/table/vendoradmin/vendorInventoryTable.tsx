"use client";
import React, { useState } from "react";
import styles from "../styles.module.css";
import image1 from "../../../../../assets/dashboardAssets/Avatar.png";
import image2 from "../../../../../assets/dashboardAssets/Avatar1.png";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import { MdMoreVert, MdPreview, MdEdit, MdDeleteOutline } from "react-icons/md";
import { Menu, MenuItem, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { title } from "process";
import ViewItemDetails from "./[viewDetailsInventory]/page";
const option = [
  {
    icon: <MdPreview style={{ color: "gray" }} />,
    title: "View Details",
    id: 1,
  },
  { icon: <MdEdit style={{ color: "gray" }} />, title: "Edit", id: 2 },
  {
    icon: <MdDeleteOutline style={{ color: "gray" }} />,
    title: "Delete",
    id: 3,
  },
];

interface Option {
  icon: JSX.Element;
  title: string;
}

const data = [
  {
    avatar: image1,
    name: "CaterpillarEngine1v2",
    email: "Ebukainternional.com",
    TransactionValue: 123,
    sale: 12,
    vale: "₦ 200,000.00",
    category: "Bumper",
    date: "24 June 2022",
    time: "12:00PM",
  },
  {
    avatar: image2,
    name: "CaterpillarEngine1v2",
    email: "ebuka&sons@gmail.com",
    TransactionValue: 123,
    sale: 83,
    vale: "₦ 1,000,000.00",
    category: "Air filters",
    date: "30 June 2023",
    time: "06:00PM",
  },
  {
    avatar: image1,
    name: "CaterpillarEngine1v2",
    email: "ebuka&sons@gmail.com",
    TransactionValue: 123,
    sale: 45,
    vale: "₦ 600,000.00",
    category: "Bonnets",
    date: "12 May 2024",
    time: "08:45PM",
  },
  {
    avatar: image2,
    name: "CaterpillarEngine1v2",
    email: "ebuka&sons@gmail.com",
    TransactionValue: 123,
    sale: 10,
    vale: "₦ 120,000.00",
    category: "Tractor parts",
    date: "02 Sep 2022",
    time: "11:15AM",
  },
  {
    avatar: image1,
    name: "CaterpillarEngine1v2",
    email: "ebuka&sons@gmail.com",
    TransactionValue: 123,
    sale: 67,
    vale: "₦ 700,000,00",
    category: "Brakes",
    date: "30 Aug 2022",
    time: "04:00PM",
  },
  {
    avatar: image1,
    name: "CaterpillarEngine1v2",
    email: "ebuka&sons@gmail.com",
    TransactionValue: 123,
    sale: 67,
    vale: "₦ 700,000,00",
    category: "Axles",
    date: "30 Aug 2022",
    time: "04:00PM",
  },

  {
    avatar: image1,
    name: "CaterpillarEngine1v2",
    email: "ebuka&sons@gmail.com",
    TransactionValue: 123,
    sale: 67,
    vale: "₦ 700,000,00",
    category: "Tractor parts",
    date: "30 Aug 2022",
    time: "04:00PM",
  },

  {
    avatar: image1,
    name: "CaterpillarEngine1v2",
    email: "ebuka&sons@gmail.com",
    TransactionValue: 123,
    sale: 67,
    vale: "₦ 700,000,00",
    category: "Bumper",
    date: "30 Aug 2022",
    time: "04:00PM",
  },

  {
    avatar: image1,
    name: "CaterpillarEngine1v2",
    email: "ebuka&sons@gmail.com",
    TransactionValue: 123,
    sale: 67,
    vale: "₦ 700,000,00",
    category: "Bonnets",
    date: "30 Aug 2022",
    time: "04:00PM",
  },

  {
    avatar: image1,
    name: "CaterpillarEngine1v2",
    email: "ebuka&sons@gmail.com",
    TransactionValue: 123,
    sale: 67,
    vale: "₦ 700,000,00",
    category: "Axles",
    date: "30 Aug 2022",
    time: "04:00PM",
  },

  {
    avatar: image1,
    name: "CaterpillarEngine1v2",
    email: "ebuka&sons@gmail.com",
    TransactionValue: 123,
    sale: 67,
    vale: "₦ 700,000,00",
    category: "Bumper",
    date: "30 Aug 2022",
    time: "04:00PM",
  },
];

const VendorInventoryTable = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openOption = Boolean(anchorEl);
  const router = useRouter();

  const handleOptionClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const handleMenuItemClick = (title: string, id: number) => {
  //   if (title === "View Details") {
  //     router.push(`/vendoradmin/${id}`);
  //   }
  
  // };

  const [routInventory, setRoutInventory] = useState(false);
  const handleRoutInventory = (id: number) => {
    if (id === 1) {
      setRoutInventory(!routInventory);
    }
    handleOptionClose();
  }

  const navigateTo = ()=>{
    setRoutInventory(!routInventory)
  }


  return (
    <div id="tableContainer">
      <div
        id="mecaAdminTable"
        className={`my-[1.25rem] w-full max-h-[34rem] overflow-y-auto scrollbar-none ${styles.table}`}
      >
        <table id="adminTable" className={`w-full`}>
          <thead>
            <tr className="truncate">
              <th id="companyNameHeader">Item name</th>
              <th id="transactionValueHeader">Transaction Value</th>
              <th id="totalItemsSoldHeader">Quantity sold</th>
              <th id="transactionValueHeader" style={{ paddingLeft: "2rem" }}>
                Transaction value
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, index) => (
              <tr key={index} id={`row_${index}`} className="cursor-pointer truncate hover:bg-gray-50"
              >
               {/* <tr> */}
                <td id={`companyData_${index}`}>
                  <div
                   onClick={navigateTo}
                    className={`flex gap-3 text-[0.88rem] py-[1rem] px-[1.25rem]`}
                  >
                    <Image
                      src={d.avatar}
                      className="object-contain"
                      alt="Avatar"
                      id={`avatar_${index}`}
                     
                    />
                    <div className="mt-2" id={`companyDetails_${index}`}>
                      <div>{d.name}</div>
                    </div>
                  </div>
                </td>

                <td
                onClick={navigateTo}
                 id={`companyData_${index}`}>
                  <div
                    
                    className={`flex gap-3 text-[0.88rem] py-[1rem] px-[3.25rem]`}
                  >
                    {/* <Image
                      src={d.avatar}
                      className="object-contain"
                      alt="Avatar"
                      id={`avatar_${index}`}
                    /> */}
                    <div id={`companyDetails_${index}`}>
                      <div>{d.TransactionValue}</div>
                    </div>
                  </div>
                </td>

                <td
                 onClick={navigateTo}
                  className={`text-[0.88rem] py-[1rem] px-[3.13rem]`}
                  id={`itemsSold_${index}`}
                >
                  {d.sale}
                </td>
                <td
                onClick={navigateTo}
                  className={`text-[0.88rem] py-[1rem] px-[2rem] `}
                  id={`transactionValue_${index}`}
                >
                  <span className="c pl-2 pr-2 border border-solid border-gray-400 rounded-xl pt-1 pb-1">
                    {d.category}
                  </span>
                </td>
                <td
                  className={`text-[0.88rem] py-[1rem] px-[3rem] flex relative`}
                  id={`transactionValue_${index}`}
                > 
                  <div 
                  onClick={navigateTo}
                  >
                    {d.date}<br/>
                  {d.time}
                  </div>
                  
                 
                  <div className="absolute right-0 ">
                    <IconButton onClick={handleClick}>
                      <MdMoreVert />
                    </IconButton>
                  </div>
                  <Menu
                    id="menu"
                    MenuListProps={{ "aria-labelledby": "long-button" }}
                    anchorEl={anchorEl}
                    open={openOption}
                    onClose={handleOptionClose}
                    PaperProps={{
                      style: {
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                        borderRadius: "15px",
                        backgroundColor: "#FFFFFF",
                      },
                    }}
                  >
                    {option.map((opt) => (
                      <MenuItem
                        key={opt.title}
                        selected={opt.id === 1}
                        onClick={() => handleRoutInventory(opt.id)}
                      >
                        {opt.icon}{" "}
                        <span className=" ml-3 text-gray-500 text-sm">
                          {opt.title}
                        </span>
                      </MenuItem>
                    ))}
                  </Menu>
                  </td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {routInventory && (
        <div className="z-50">
          <div className="absolute top-0 bg-white lg:w-[85%] w-[100%] h-[100vh] z-50 sm:left-0 lg:left-auto">
            <ViewItemDetails />
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorInventoryTable;
