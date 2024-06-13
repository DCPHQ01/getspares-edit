"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import ImageComponent from "../../../components/imageComp/ImageComponent";
import TextField from "@mui/material/TextField";
import {
  MdArrowForward,
  MdArrowRight,
  MdChevronRight,
  MdClose,
  MdPhotoLibrary,
} from "react-icons/md";

import {
  TextareaAutosize as BaseTextareaAutosize,
  TextareaAutosize,
} from "@mui/base/TextareaAutosize";


interface ChildProps {
  step: number;
  active: boolean;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}
import formLogo from "@/assets/images/formLogo.jpg";
import { useAppSelector } from "../../../redux";
import { useAppDispatch } from "../../../redux/hooks";
import { RootState } from "../../../redux";
import { setCompanyForm } from "../../../redux/features/company/companySlice";
import { FaUpload } from "react-icons/fa";
import Link from "next/link";
import { MenuItem } from "@mui/material";

const CalledPagesPageOnePages: React.FC<ChildProps> = ({
  step,
  setStep,
  setActive,
}: any) => {
  const [website, setWebsite] = useState("");
  const [fullName, setFullName] = useState("");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateWebsite = () => {
    const websiteRegex =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;
    if (!websiteRegex.test(website)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        website: "Invalid website address",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, website: "" }));
    }
  };
  const validateFullName = () => {
    if (!fullName.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        fullName: "Full name is required",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, fullName: "" }));
    }
  };

  const validateMessage = () => {
    if (!message.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        message: "Message is required",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, message: "" }));
    }
  };

const CalledPagesPageOnePages = () => {
  const [basicInfoValues, setBasicInfoValues] = useState({
    productName: "",
    productCategory: "",
    productDescription: "",
    price: "",
    quantity: "",
  });


  // const handleBasicInfoChange = (e: any) => {
  //   setBasicInfoValues({
  //     ...basicInfoValues,
  //     [e.target.name]: e.target.value,
  //   });
  // };
  useEffect(() => {
    const savedData = localStorage.getItem("basicInfoValues");
    if (savedData) {
      setBasicInfoValues(JSON.parse(savedData));
    }
  }, []);

  const handleBasicInfoChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "price") {
      const numericValue = value.replace(/[^0-9]/g, "");
      const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      setBasicInfoValues((prevValues) => {
        const newValues = { ...prevValues, [name]: formattedValue };
        localStorage.setItem("basicInfoValues", JSON.stringify(newValues));
        return newValues;
      });
    } else {
      setBasicInfoValues((prevValues) => {
        const newValues = { ...prevValues, [name]: value };
        localStorage.setItem("basicInfoValues", JSON.stringify(newValues));
        return newValues;
      });
    }
  };


  const currencies = [
    {
      value: "select",
      label: "Select Category",
    },
    {
      value: "bulldozer",
      label: "Bulldozer",
    },
    {
      value: "tractor",
      label: "Tractor",
    },
    {
      value: "lift",
      label: "Forklift",
    },
  ];

  console.log("values ", basicInfoValues);

  return (
    <>
      <div className="" style={{ width: "80%" }} id="pageone1">
        <div className="pageWrapper" id="pageone2">
          <div className="hidden md:flex flex-col mt-[4.5rem]" id="pageone3">
            <div className="flex gap-x-10 justify-between">
              <div className=" ">
                <div className="mb-10 pageHeader w-94" id="pageone4">
                  <header className="font-bold text-lg" id="pageone5">
                    Basic information
                  </header>

                  <hr className="w-[100%]"></hr>
                </div>

                {/* here */}

                <Box
                  component="form"
                  id="pageone8"
                  className="flex gap-x-16 flex-col  lg:flex-row lg:items-start"
                  noValidate
                  autoComplete="off"
                >
                  <Box>
                    <Box>
                      <TextField
                        required={true}
                        id="productName"
                        label="Product name"
                        variant="filled"
                        type="text"
                        name="productName"
                        placeholder="Enter name"
                        InputProps={{ disableUnderline: true }}
                        className=" w-[29.4rem] mb-5 "
                        value={basicInfoValues.productName}
                        onChange={handleBasicInfoChange}
                      />
                    </Box>

                    {/* <Box>
                      <TextField
                        required={true}
                        type="url"
                        id="productCategory"
                        label="Product category"
                        variant="filled"

                        name="website"
                        InputProps={{ disableUnderline: true }}
                        name="productCategory"
                        placeholder="Select category"
                        InputProps={{ disableUnderline: true }}
                        className="w-[29.4rem] mb-5 "
                        sx={{ backgroundColor: "porcelain" }}
                        onChange={handleBasicInfoChange}
                        value={basicInfoValues.productCategory}

                      />
                    </Box> */}

                    <TextField
                      className="w-[29.4rem] mb-5 "
                      sx={{
                        backgroundColor: "porcelain",
                        borderBottom: "porcelain",
                      }}
                      id="filled-select-currency"
                      select
                      placeholder="Select category"
                      label="Product category"
                      defaultValue="select"
                      variant="filled"
                    >
                      {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>

                    <Box>
                      <TextareaAutosize
                        required={true}
                        id="productDescription"
                        aria-label="Description"
                        name="productDescription"
                        placeholder="Say something about the product"
                        className="w-[29.4rem] mb-5"
                        style={{
                          backgroundColor: "#EFF2F3",
                          height: "223px",
                          borderColor: "none",
                          padding: "20px",
                        }}
                        value={basicInfoValues.productDescription}
                        onChange={handleBasicInfoChange}
                      />
                    </Box>

                    <Box>
                      <TextField
                        required={true}
                        id="productPrice"
                        type="text"
                        label="Product price"
                        variant="filled"
                        name="price"
                        placeholder="$ 2000.00"
                        InputProps={{ disableUnderline: true }}
                        className="w-[29.4rem] mb-5"
                        sx={{ backgroundColor: "porcelain" }}
                        value={basicInfoValues.price}
                        onChange={handleBasicInfoChange}
                      />
                    </Box>

                    <Box>
                      <TextField
                        required={true}
                        type="url"
                        id="quantityAvailable"
                        label="Quantity availability"
                        variant="filled"
                        name="quantity"
                        value={basicInfoValues.quantity}
                        onChange={handleBasicInfoChange}
                        placeholder="Enter value"
                        InputProps={{ disableUnderline: true }}
                        className="w-[29.4rem] mb-5 outline-none"
                        sx={{ backgroundColor: "porcelain" }}
                      />
                    </Box>
                  </Box>
                </Box>
              </div>

              <div className="">
                <div className="mb-10 pageHeader w-[100%]" id="pageone4">
                  <header className="font-bold text-lg" id="pageone5">
                    Product preview
                  </header>

                  <hr className="w-[95%]"></hr>
                </div>
                <Box>
                  <div className="inputImage imagetext  h-[283px] w-[25.1rem]">
                    <div className="flex flex-col  items-center justify-center">
                      <div className="border  rounded-full mt-20 h-32 w-32 flex justify-center ">
                        <div
                          id="prevImgState"
                          // onClick={handleImageClick}
                          className="w-full px-2 py-2  rounded-md pt-9 cursor-pointer border-none"
                        >
                          <MdPhotoLibrary
                            className="text-gray-600 text-7xl w-10 m-auto pb-6 "
                            style={{ backgroundColor: "porcelain" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Box>
                <div className="">
                  <div className="flex justify-between">
                    <div className="" id="productNamePreviewDiv">
                      <p>Product name</p>
                      <input
                        title="input1"
                        readOnly={true}
                        value={basicInfoValues.productName}
                        className="scrollbar-none p-2 pl-0 border-white bg-white placeholder:text-black outline-none"
                      />
                    </div>
                    <div className="">
                      <p className="flex justify-end mr-6">Price</p>
                      <input
                        title="input2"
                        readOnly={true}
                        value={basicInfoValues.price}
                        className="scrollbar-none p-2 pl-0 bg-white border-white placeholder:text-black outline-none"
                      />
                    </div>
                  </div>
                  <div className="mt-8">
                    <p>Description</p>
                    <textarea
                      title="textArea"
                      value={basicInfoValues.productDescription}
                      readOnly={true}
                      className="scrollbar-none border-white pl-0  w-full h-32 p-2 bg-white placeholder:text-black outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className=" flex">
              <hr className="w-44 mt-10"></hr>

              <div className=" ">
                <div className="w-[100%] m-auto">
                  <button
                    type="submit"
                    id="thirdFormSubmit"
                    className="w-[116px] flex justify-center gap-x-3 pt-2 h-10 font-semibold border rounded-full text-mecaBluePrimaryColor border-mecaBluePrimaryColor mt-5 mb-6 "
                  >
                    <p>Next </p>
                    <span>
                      <MdChevronRight className="mt-1 " />
                    </span>
                  </button>
                </div>
              </div>

              <hr className="w-44 mt-10"></hr>
            </div>
          </div>
        </div>

        {/* mobile view */}
      </div>
    </>
  );
};

export default CalledPagesPageOnePages;
