"use client";
import React, { useState } from "react";
import styles from "../styles.module.css";
import image1 from "../../../../../assets/dashboardAssets/Avatar.png";
import image2 from "../../../../../assets/dashboardAssets/Avatar1.png";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import {MdMoreVert, MdPreview, MdEdit, MdDeleteOutline, MdBusinessCenter} from "react-icons/md";
import { Menu, MenuItem, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { title } from "process";
import { ColorRing } from "react-loader-spinner";
import { MdInventory2 } from 'react-icons/md';
import {useGetAProductQuery} from "../../../../../redux/features/users/authQuery";
import ViewItemDetails from "./ViewItemDetails";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from "dayjs";
import {formatAmount} from "../../../../../components/utils";
import {formatAllTime, formatAllDate} from "../../utils/utils";

dayjs.extend(customParseFormat);

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



const VendorInventoryTable: React.FC<InventoryTableProps> = ({
  inventoryData,
  isLoading,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openOption = Boolean(anchorEl);
  const router = useRouter();
  const [id, setId] = useState('')


  // const { data, isLoading } = useGetAProductQuery(productId, {
  //   skip: !productId,
  // });

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

  const stopPagination = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
  }

  const navigateTo = (val:string) => {
    setId(val)
    setRoutInventory((routInventory) => !routInventory);
  };



  return (
     <>
       <div id="tableContainer">
         {!routInventory && (<div
               id="mecaAdminTable"
               className={`my-[1.25rem] w-full max-h-[40rem] overflow-y-auto scrollbar-none overscroll-contain ${styles.table}`}
            >
              <table id="adminTable" className={`w-full`}>
                <thead style={{position:'sticky', zIndex:1000}}>
                <tr className="truncate">
                  <th style={{position:'sticky'}}  id="companyNameHeader">Item name</th>
                  <th style={{position:'sticky'}}  id="transactionValueHeader">Price</th>
                  <th style={{position:'sticky'}}  id="totalItemsSoldHeader">Quantity sold</th>
                  <th id="transactionValueHeader" style={{ paddingLeft: "2rem", position:'sticky' }}>
                    Category
                  </th>
                  <th style={{position:'sticky'}}  id="dateTime">Date and Time</th>
                  <th style={{position: 'sticky'}}  id="actionHeader"></th>
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
                ) : inventoryData?.length === 0 ? (<div className="relative right-[100%] left-[100%] flex flex-col justify-center items-center pt-32 leading-10">
                  <div className=" h-28">
                  <div className="w-[5.6rem] h-[5.6rem] bg-blue-100 flex justify-center items-center rounded-full">
                  <MdBusinessCenter style={{fontSize:"2rem", color:"#0852C0"}}/>
                  </div>
                  </div>
                  <h1 className="text-xl">No product here yet</h1>
                  <h1 className="text-gray-500">All your products will appear here</h1>
                  </div>) : (
                   inventoryData?.map((d, index) => {

                     return (
                        <tr
                           key={index}
                           id={`row_${index}`}
                           onClick={()=>navigateTo(d?.id)}
                           className="cursor-pointer truncate hover:bg-gray-50"
                        >
                          <td id={`companyData_${index}`}>
                            <div
                               className={`flex gap-3 text-[0.88rem] py-[1rem] px-[1.25rem]`}
                            >
                              <div id={`companyDetails_${index}`}>
                                <div>{d.itemName}</div>
                              </div>
                            </div>
                          </td>

                          <td
                             className={`text-[0.88rem] py-[1rem] px-[1.13rem]`}
                             id={`itemsSold_${index}`}
                          >
                            {formatAmount( Number(d.price))}
                          </td>
                          <td
                             className={`text-[0.88rem] py-[1rem] px-[2rem] `}
                             id={`transactionValue_${index}`}
                          >
                            {d.quantitySold}
                          </td>
                          <td
                             className={`text-[0.88rem] py-[1rem] px-[2rem] `}
                             id={`transactionValue_${index}`}
                          >
                      <span className="c pl-2 pr-2 border border-solid border-gray-400 rounded-xl pt-1 pb-1">
                        {d.categoryName}
                      </span>
                          </td>
                          <td
                             className={`text-[0.88rem] py-[1rem] px-[2rem] flex`}
                             id={`transactionValue_${index}`}
                          >
                            <div>
                              {formatAllDate(d.dateCreated)}
                              <br />
                              {formatAllTime(d.dateCreated)}
                            </div>

                          </td>
                          <td
                             onClick={(e) => stopPagination(e)}
                             className={`text-[0.88rem] py-[1rem] px-[2rem]`}
                             id={`transactionValue_${index}`}
                          >
                            <div>
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
         )}
       </div>
       {routInventory && (
          <div>
            <div className="absolute top-0 bg-white lg:w-[85%] w-[100%] h-[100vh] z-50 sm:left-0 lg:left-auto">
              <ViewItemDetails routeBack={()=>navigateTo('')} productId={id}/>
            </div>
          </div>
       )}
     </>

  );
};

export default VendorInventoryTable;
