import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React from "react";

interface MenuProps {
  anchorEl: HTMLElement | null;
  openOption: boolean;
  handleOptionClose: (e: any) => void;
  handleRouteInventory: (id: number, index: string) => void;
  optionData: any;
  tableId: string;
}

const MenuOptions = ({
  anchorEl,
  openOption,
  handleOptionClose,
  handleRouteInventory,
  optionData,
  tableId,
}: MenuProps) => {
  return (
    <>
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
        {optionData.map((opt: any) => (
          <MenuItem
            key={opt.id}
            id={`option_${opt.id}`}
            selected={opt.id === 1}
            onClick={() => handleRouteInventory(opt.id, tableId)}
          >
            {opt.icon}{" "}
            <span className=" ml-3 text-gray-500 text-sm">{opt.title}</span>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default MenuOptions;
