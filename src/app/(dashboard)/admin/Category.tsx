import React, { useRef, useState } from "react";
import Header from "../../dashboard/components/ui/header";
import SearchBox from "../../dashboard/components/ui/searchbox";
import PeriodRadios from "../../dashboard/components/ui/periodradios";
import Addbutton from "../../dashboard/components/ui//addbutton";
import CategoryTable from "../../dashboard/components/table/mecaadmin/categoryTable";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  MdAdd,
  MdArrowBack,
  MdArrowForward,
  MdChevronLeft,
  MdChevronRight,
  MdClose,
  MdPhotoLibrary,
} from "react-icons/md";
import Link from "next/link";
import { TextField } from "@mui/material";
import { useAddCategoryMutation } from "../../../redux/features/dashboard/mecaAdminQuery";
import { ColorRing } from "react-loader-spinner";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 450,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "20px",
  p: 4,
};

function Category() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [formImage, setFormImage] = useState<string>("");
  const [categoryName, setCategoryName] = useState<string>("");
  const [categoryData, { isLoading }] = useAddCategoryMutation();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleSumbit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await categoryData({
        name: categoryName,
        image: "string",
      });
      if ("data" in response) {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={`mb-[1.25rem] flex justify-between items-center`}>
        <Header
          subtitle={`Keep track of categories and their products`}
          title={`Category`}
          amount={`500,607`}
        />

        <button
          id="addButton"
          onClick={handleOpen}
          className={`bg-[#095AD3] lg:w-[28%] w-[100%] text-white rounded-full py-[0.38rem] px-[1.5rem] 
        `}
        >
          <div className={`flex text-white items-center justify-center`}>
            <MdAdd size={20} className="mr-2" />
            <span> Create category</span>
          </div>
        </button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="">
              <div className="flex justify-between">
                <div className="">
                  <p>Create category</p>
                  <p>Create category for your product items</p>
                </div>
                <div className="cursor-pointer ">
                  <MdClose className="text-2xl" onClick={handleClose} />
                </div>
              </div>

              <div className=" h-[283px] w-[316px] pt-6">
                <div className="">
                  <input
                    title="image inputs"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                    className="hidden w-full px-3 py-2 "
                  />
                </div>
                {formImage ? (
                  <div className="w-20 h-20 m-auto">
                    <img
                      src={formImage}
                      alt="Uploaded"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                ) : (
                  <div
                    id="prevImgState"
                    onClick={handleImageClick}
                    className="w-full px-3 py-2 border rounded-md flex flex-col items-center justify-center cursor-pointer border-none"
                  >
                    <MdPhotoLibrary className="text-gray-600 text-7xl w-10" />
                  </div>
                )}

                <div className="text-gray-600 text-base mt-2 text-center">
                  <p className="font-bold text-mecaBluePrimaryColor">
                    Add logo
                  </p>
                  <p className="font-normal">by clicking or drag and drop</p>
                </div>

                <TextField
                  required={true}
                  id="filledbasic"
                  label="category name"
                  variant="filled"
                  type="text"
                  name="categoryName"
                  placeholder="Enter name"
                  InputProps={{ disableUnderline: true }}
                  className="w-[21rem] mt-10"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  sx={{ backgroundColor: "porcelain", marginTop: "1rem" }}
                />

                <button
                  id="addButton"
                  onClick={handleSumbit}
                  className={`bg-[#095AD3] mt-8 w-[21rem] text-white rounded-full py-[0.38rem] px-[1.5rem] 
        `}
                >
                  {isLoading ? (
                    <ColorRing
                      visible={true}
                      height="40"
                      width="40"
                      ariaLabel="color-ring-loading"
                      wrapperStyle={{}}
                      wrapperClass="color-ring-wrapper"
                      colors={["#ffff", "#ffff", "#ffff", "#ffff", "#ffff"]}
                    />
                  ) : (
                    <div
                      className={`flex text-white items-center justify-center`}
                    >
                      Create category
                    </div>
                  )}
                </button>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
      <div className={`flex justify-between items-center mb-[1.25rem]`}>
        <SearchBox placeholder={`Search for category`} />
        <PeriodRadios />
      </div>

      <CategoryTable />
      <div className="flex justify-between mt-10 text-mecaBluePrimaryColor font-bold text-lg">
        <button className="flex gap-x-2">
          <MdChevronLeft className="mt-1 text-2xl" /> <span>Previous</span>
        </button>
        <button className="flex gap-x-2">
          <MdChevronRight className="mt-1 text-2xl" /> <span>Next</span>
        </button>
      </div>
    </>
  );
}

export default Category;
