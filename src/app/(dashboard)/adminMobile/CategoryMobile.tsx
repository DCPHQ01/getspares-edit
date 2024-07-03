"use client";
import React, { useRef, useState, useEffect } from "react";
import Header from "../../dashboard/components/ui/header";
import SearchBox from "../../dashboard/components/ui/searchbox";
import PeriodRadios from "../../dashboard/components/ui/periodradios";
import Addbutton from "../../dashboard/components/ui/addbutton";
import CategoryTable from "../../dashboard/components/table/mecaadmin/categoryTable";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { ColorRing } from "react-loader-spinner";
import {
  useGetViewAllMecaAdminCategoryQuery,
  useAddCategoryMutation,
} from "../../../redux/features/dashboard/mecaAdminQuery";

interface category {
  id: string;
  name: string;
  imageUrl?: string;
  productsInCategory: number;
  createdBy: string;
  dateCreated: string;
  email: string;
  options: string;
}

import {
  MdAdd,
  MdArrowBack,
  MdArrowForward,
  MdChevronLeft,
  MdChevronRight,
  MdClose,
  MdPhotoLibrary,
} from "react-icons/md";

import { TextField } from "@mui/material";
import { uploadImage } from "../../../components/utils";
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
function CategoryMobile() {
  const [page, setPage] = useState(0);
  const size = 10;
  const [first, setFirst] = useState(false);
  const [last, setLast] = useState(false);
  const [activityPeriod, setActivityPeriod] = useState("month");
  const { data, isError, refetch } = useGetViewAllMecaAdminCategoryQuery({
    page: page,
    size: size,
    options: activityPeriod,
  });
  const [categoryList, setCategoryList] = useState<category[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");
  const [image_url, setImage_url] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [categoryData, { isLoading }] = useAddCategoryMutation();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (data && Array.isArray(data.data.content)) {
      const list = data.data.content;
      const lists = data.data;
      setCategoryList(list);
      setFirst(lists.first);
      setLast(lists.last);
    }
  }, [data]);
  "THIS IS CATEGORY", categoryList;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [formImage, setFormImage] = useState<string | null>(null);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormImage(reader.result as string);
      };
      await uploadImage(file, setImage_url);

      reader.readAsDataURL(file);
    }
  };
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const lowerCaseCategoryName = categoryName.toLowerCase();
    if (
      categoryList.some(
        (category) => category.name.toLowerCase() === lowerCaseCategoryName
      )
    ) {
      setErrorMessage("Category name already exists.");
      return;
    }
    try {
      const response = await categoryData({
        name: categoryName,
        image: image_url,
      }).unwrap();
      if ("data" in response) {
        response.data.data;
        setCategoryList((prev) => [response.data.data, ...prev]);
        refetch();
        handleClose();
      }
    } catch (error: any) {
      error;
      setError(error.data.message);
    }
  };

  // const handlePeriodChange = (newPeriod: string) => {
  //   setActivityPeriod(newPeriod);
  // };

  const handlePeriodChange = () => {
    setActivityPeriod((prevValue) =>
      prevValue === "month" ? "year" : "month"
    );
  };

  const handleNextPage = () => {
    if (first) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (last) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <>
      <div
        className={`mb-[1.25rem] lg:flex  flex-col justify-between items-center`}
      >
        <Header
          subtitle={`Keep track of categories and their products`}
          title={`Category`}
          amount={`500,607`}
        />
        <div className="mt-4" onClick={handleOpen}>
          <Addbutton title={`Create`} />
        </div>

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
                    title="Upload Image"
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
                  <p className="font-bold">Add logo</p>
                  <p className="font-normal">by clicking or drag and drop</p>
                </div>

                <TextField
                  required={true}
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  label="category Name"
                  variant="filled"
                  type="text"
                  name="categoryName"
                  placeholder="Enter category name"
                  InputProps={{ disableUnderline: true }}
                  className="w-[21rem] mb-10 mt-10"
                  sx={{ backgroundColor: "porcelain" }}
                  onFocus={() => setErrorMessage("")}
                />

                <button
                  id="addButton"
                  className="bg-[#095AD3] flex justify-center items-center w-[21rem] text-white rounded-full py-[0.38rem] px-[1.5rem]"
                  onClick={handleSubmit}
                >
                  {isLoading ? (
                    <ColorRing
                      visible
                      height="40"
                      width="40"
                      ariaLabel="color-ring-loading"
                      wrapperStyle={{}}
                      wrapperClass="color-ring-wrapper"
                      colors={["#ffff", "#ffff", "#ffff", "#ffff", "#ffff"]}
                    />
                  ) : (
                    <p
                      className="flex text-white items-center justify-center"
                      id="addCategory"
                    >
                      Create category
                    </p>
                  )}
                </button>
                {error && (
                  <p className="text-red-500 text-center text-sm mt-2">
                    {error}
                  </p>
                )}
              </div>
            </div>
          </Box>
        </Modal>
      </div>
      <div
        className={`flex justify-between gap-[100px] mr-[2rem] items-center mb-[1.25rem]`}
      >
        <SearchBox placeholder={`Search for category`} />
        {/*<PeriodRadios activityPeriod={activityPeriod} onPeriodChange={handlePeriodChange} />*/}

        <PeriodRadios
          activityPeriod={activityPeriod}
          onPeriodChange={handlePeriodChange}
        />
      </div>

      <CategoryTable categoryList={categoryList} isLoading={isLoading} />

      <div className=" flex justify-end mt-10 mb-10 font-bold text-lg">
        <button
          title="previous"
          className={`flex gap-x-2 border border-[#EAECF0]  rounded-md h-[36px] w-[36px] pl-1 ${
            last ? "text-gray-400 cursor-not-allowed" : ""
          }`}
          onClick={handlePreviousPage}
          disabled={first}
        >
          <MdChevronLeft className="mt-1 text-2xl" />
        </button>
        <button
          title="next"
          className={`flex gap-x-2 border border-[#EAECF0] rounded-md h-[36px] w-[36px] pl-1 ${
            last ? "text-gray-400 cursor-not-allowed" : ""
          }`}
          onClick={handleNextPage}
          disabled={last}
        >
          <MdChevronRight className="mt-1 text-2xl" />
        </button>
      </div>
    </>
  );
}

export default CategoryMobile;
