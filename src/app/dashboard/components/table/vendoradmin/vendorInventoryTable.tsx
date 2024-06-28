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
import { ColorRing } from "react-loader-spinner";
import { MdInventory2 } from 'react-icons/md';

interface InventoryData {
  categoryName?: string;
  dateCreated: string;
  itemName: string;
  quantitySold: number;
  price?: number;
  id: string;
}

interface InventoryTableProps {
  inventoryData: InventoryData[];
  isLoading: boolean;
}

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

const VendorInventoryTable: React.FC<InventoryTableProps> = ({
  inventoryData,
  isLoading,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openOption = Boolean(anchorEl);
  const router = useRouter();

  const handleOptionClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const [routInventory, setRoutInventory] = useState(false);

  const handleRoutInventory = (id: number, index: string) => {
    console.log(id, " id", index, " index");
    if (id === 1) {
      setRoutInventory(!routInventory);
    } else if (id === 2) {
      router.push(`/addProductDashboard/basicInfo/?id=${index}`);
    }
    handleOptionClose();
  };

  const navigateTo = () => {
    setRoutInventory(!routInventory);
  };

  function getMinutesAndSeconds(time: string) {
    const parts = time.split(":");
    const result = parts[0] + ":" + parts[1];

    return result;
  }

  return (
    <div id="tableContainer">
      <div
        id="mecaAdminTable"
        className={`my-[1.25rem] w-full max-h-[34rem] overflow-y-auto scrollbar-none  ${styles.table}`}
      >
        <table id="adminTable" className={`w-full`}>
          <thead>
            <tr className="truncate">
              <th id="companyNameHeader">Item name</th>
              <th id="transactionValueHeader">Price</th>
              <th id="totalItemsSoldHeader">Quantity sold</th>
              <th id="transactionValueHeader" style={{ paddingLeft: "2rem" }}>
                Category
              </th>
              <th id="dateTime">Date and Time</th>
            </tr>
          </thead>
          <tbody >
            {isLoading ? (
              <div className="text-center mt-28 relative left-[130%] right[130%]">
                <ColorRing
                  visible={true}
                  height="40"
                  width="40"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{
                    position: "absolute",
                    bottom: "75%",
                    left: "44%",
                  }}
                  wrapperClass="color-ring-wrapper"
                  colors={[
                    "#000000",
                    "#000000",
                    "#000000",
                    "#000000",
                    "#000000",
                  ]}
                />
                <p>Loading Inventory...</p>
              </div>
            ) : (
              inventoryData?.map((d, index) => {
                let date = "";
                let time = "";

                if (d.dateCreated) {
                  [date, time] = d.dateCreated.split(" ");
                }

                return (
                  <tr
                    key={index}
                    id={`row_${index}`}
                    className="cursor-pointer truncate hover:bg-gray-50"
                  >
                    <td id={`companyData_${index}`}>
                      <div
                        onClick={navigateTo}
                        className={`flex gap-3 text-[0.88rem] py-[1rem] px-[1.25rem]`}
                      >
                        {/* <Image
                      src={d.avatar}
                      className="object-contain"
                      alt="Avatar"
                      id={`avatar_${index}`}
                    />
                    <div className="mt-2" id={`companyDetails_${index}`}>
                      <div>{d.itemName}</div>
                    </div>
                  </div>
                </td>

                <td onClick={navigateTo} id={`companyData_${index}`}>
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
                          <div>{d.categoryName}</div>
                        </div>
                      </div>
                    </td>

                    <td
                      onClick={navigateTo}
                      className={`text-[0.88rem] py-[1rem] px-[3.13rem]`}
                      id={`itemsSold_${index}`}
                    >
                      {d.price}
                    </td>
                    <td
                      onClick={navigateTo}
                      className={`text-[0.88rem] py-[1rem] px-[2rem] `}
                      id={`transactionValue_${index}`}
                    >
                      {d.quantitySold}
                    </td>
                    <td
                      onClick={navigateTo}
                      className={`text-[0.88rem] py-[1rem] px-[2rem] `}
                      id={`transactionValue_${index}`}
                    >
                      <span className="c pl-2 pr-2 border border-solid border-gray-400 rounded-xl pt-1 pb-1">
                        {d.categoryName}
                      </span>
                    </td>
                    <td
                      className={`text-[0.88rem] py-[1rem] px-[3rem] flex relative`}
                      id={`transactionValue_${index}`}
                    >
                      <div onClick={navigateTo}>
                        {date}
                        <br />
                        {time}
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
                            key={opt.id}
                            id={`option_${opt.id}`}
                            selected={opt.id === 1}
                            onClick={() => handleRoutInventory(opt.id, d?.id)}
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
                );
              })
            )}
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
