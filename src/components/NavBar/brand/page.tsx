"use client";

import { Card } from "@mui/material";
import { useEffect, useRef } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, { useState } from "react";

interface BrandPageProps {
  closeDropdown: () => void;
}
const BrandPage: React.FC<BrandPageProps> = ({ closeDropdown }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openA = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeDropdown]);

  const [open, setOpen] = useState(false);
  const handleNav = () => {
    setOpen(!open);
  };
  useEffect(() => setOpen(true), []);

  const brandsCartegory = [
    {
      ListBrands: {
        header: "List of brands (Cars)",
        id: 1,
        toyota: "Toyota",
        honda: "Honda",
        camry: "Camry",
        nissan: "Nissan",
        mercedes: "Mercedes",
        peugeot: "Peugeot",
        hyundai: "Hyundai",
        kia: "KIA",
        lexus: "Lexus",
        volkswagen: "Volkswagen",
        bmw: "BMW",
        ford: "Ford",
        mazda: "Mazda",
        isuzu: "Isuzu",
        mitsubishi: "Mitsubishi",
        volvo: "Volvo",
        rover: "Rover",
        suzuki: "Suzuki",
      },

      ListHeavyDutyBrand: {
        header: "List of brands (Heavy Duty)",
        id: 2,
        john: "John Deere",
        sonalika: "Sonalika",
        farmTrack: "Farm Track",
        mahindra: "Mahindra",
        preet: "Preet",
        case: "CASE",
        tata: "Tata",
        caterpillar: "Caterpillar",
        mack: "Mack",
        iveco: "IVECO",
        komatsu: "Komatsu",
        daf: "DAF",
        volvo: "Volvo",
        changan: "Changan",
      },
    },
  ];
  return (
    <div ref={dropdownRef} className="">
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        className="mt-48"
      >
        {brandsCartegory.map((brands) => (
          <div
            key={brands.ListBrands.id}
            className="h-96 flex scrollbar-none justify-between p-6 leading-10 gap-x-32 overflow-y-scroll "
          >
            <div className="flex-col">
              <MenuItem>
                <p>{brands.ListBrands.header}</p>
              </MenuItem>
              <MenuItem>
                <p>{brands.ListBrands.toyota}</p>
              </MenuItem>
              <MenuItem>
                <p>{brands.ListBrands.honda}</p>
              </MenuItem>
              <MenuItem>
                <p>{brands.ListBrands.camry}</p>
              </MenuItem>
              <MenuItem>
                <p>{brands.ListBrands.nissan}</p>
              </MenuItem>
              <MenuItem>
                <p>{brands.ListBrands.mercedes}</p>
              </MenuItem>
              <MenuItem>
                <p> {brands.ListBrands.peugeot}</p>
              </MenuItem>
              <MenuItem>
                <p> {brands.ListBrands.hyundai}</p>
              </MenuItem>
              <MenuItem>
                <p> {brands.ListBrands.kia}</p>
              </MenuItem>
              <MenuItem>
                <p>{brands.ListBrands.lexus}</p>
              </MenuItem>
              <MenuItem>
                <p>{brands.ListBrands.volkswagen}</p>
              </MenuItem>
              <MenuItem>
                <p>{brands.ListBrands.bmw}</p>
              </MenuItem>
              <MenuItem>
                <p>{brands.ListBrands.ford}</p>
              </MenuItem>
              <MenuItem>
                <p> {brands.ListBrands.mazda}</p>
              </MenuItem>
              <MenuItem>
                <p>{brands.ListBrands.isuzu}</p>
              </MenuItem>
              <MenuItem>
                <p>{brands.ListBrands.mitsubishi}</p>
              </MenuItem>
              <MenuItem>
                <p>{brands.ListBrands.volvo}</p>
              </MenuItem>
              <MenuItem>
                <p>{brands.ListBrands.rover}</p>
              </MenuItem>
              <MenuItem>
                <p>{brands.ListBrands.suzuki}</p>
              </MenuItem>
            </div>

            <div key={brands.ListHeavyDutyBrand.id} className=""></div>

            <div className="flex-col">
              <MenuItem>
                <p>{brands.ListHeavyDutyBrand.header}</p>
              </MenuItem>
              <MenuItem>
                <p>{brands.ListHeavyDutyBrand.case}</p>
              </MenuItem>
              <MenuItem>
                <p>{brands.ListHeavyDutyBrand.caterpillar}</p>
              </MenuItem>
              <MenuItem>
                <p>{brands.ListHeavyDutyBrand.changan}</p>
              </MenuItem>
              <MenuItem>
                <p>{brands.ListHeavyDutyBrand.daf}</p>
              </MenuItem>
              <MenuItem>
                <p>{brands.ListHeavyDutyBrand.farmTrack}</p>
              </MenuItem>
              <MenuItem>
                <p> {brands.ListHeavyDutyBrand.iveco}</p>
              </MenuItem>
              <MenuItem>
                <p> {brands.ListHeavyDutyBrand.john}</p>
              </MenuItem>
              <MenuItem>
                <p> {brands.ListHeavyDutyBrand.komatsu}</p>
              </MenuItem>
              <MenuItem>
                <p>{brands.ListHeavyDutyBrand.mack}</p>
              </MenuItem>
              <MenuItem>
                <p>{brands.ListHeavyDutyBrand.mahindra}</p>
              </MenuItem>
              <MenuItem>
                <p>{brands.ListHeavyDutyBrand.preet}</p>
              </MenuItem>
              <MenuItem>
                <p>{brands.ListHeavyDutyBrand.sonalika}</p>
              </MenuItem>
              <MenuItem>
                <p> {brands.ListHeavyDutyBrand.tata}</p>
              </MenuItem>
              <MenuItem>
                <p>{brands.ListHeavyDutyBrand.volvo}</p>
              </MenuItem>
            </div>
          </div>
        ))}
      </Menu>
    </div>
  );
};

export default BrandPage;
