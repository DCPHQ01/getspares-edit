"use client";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
// import ImageComponent from "../../../components/imageComp/ImageComponent";
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
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { paths } from "../../../path/paths";
import { useGetCategoryQuery } from "../../../redux/features/users/authQuery";
import { ColorRing } from "react-loader-spinner";

const CalledPagesPageOnePages = () => {
  const [basicInfoValues, setBasicInfoValues] = useState({
    productName: "",
    productCategory: "",
    productDescription: "",
    price: "",
    quantity: "",
  });

  const { data: getCategoriesData, isFetching } = useGetCategoryQuery({});
  console.log(getCategoriesData?.data, "get categories data");

  useEffect(() => {
    const savedData = sessionStorage.getItem("basicInfoValues");
    if (savedData) {
      setBasicInfoValues(JSON.parse(savedData));
    }
  }, []);

  const router = useRouter();

  const handleBasicInfoChange = (e: any) => {
    const { name, value } = e.target;

    if (name === "price") {
      const numericValue = value.replace(/[^0-9]/g, "");
      const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      setBasicInfoValues((prevValues) => {
        const newValues = { ...prevValues, [name]: formattedValue };
        sessionStorage.setItem("basicInfoValues", JSON.stringify(newValues));
        return newValues;
      });
    } else {
      setBasicInfoValues((prevValues) => {
        const newValues = { ...prevValues, [name]: value };
        sessionStorage.setItem("basicInfoValues", JSON.stringify(newValues));
        return newValues;
      });
    }
  };

  console.log("category data ", getCategoriesData);

  const [errors, setErrors] = useState({
    productName: "",
    productCategory: "",
    productDescription: "",
    price: "",
    quantity: "",
  });

  const handleNextPage = () => {
    let newErrors = {
      productName: "",
      productCategory: "",
      productDescription: "",
      price: "",
      quantity: "",
    };

    if (!basicInfoValues.productName) {
      newErrors.productName = "Product name is required";
    }
    if (!basicInfoValues.productCategory) {
      newErrors.productCategory = "Product category is required";
    }
    if (!basicInfoValues.productDescription) {
      newErrors.productDescription = "Product description is required";
    }
    if (!basicInfoValues.price) {
      newErrors.price = "Product price is required";
    }
    if (!basicInfoValues.quantity) {
      newErrors.quantity = "Quantity is required";
    }

    setErrors(newErrors);

    if (
      !newErrors.productName &&
      !newErrors.productCategory &&
      !newErrors.productDescription &&
      !newErrors.price &&
      !newErrors.quantity
    ) {
      router.push(paths.toAddProductDashboardAddImages());
    }
  };

  console.log("values ", basicInfoValues);
  return (
    <>
      <div className="" style={{ width: "80%" }} id="pageone1">
        <div className="pageWrapper" id="pageone2">
          <div className="hidden md:flex flex-col mt-[4.5rem]" id="pageone3">
            <div className="flex gap-x-10 justify-between">
              {isFetching ? (
                <div className="w-full h-[50vh] flex justify-center items-center">
                  <ColorRing
                    visible={true}
                    height="60"
                    width="60"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={[
                      "#0000FF",
                      "#0000FF",
                      "#0000FF",
                      "#0000FF",
                      "#0000FF",
                    ]}
                  />
                </div>
              ) : (
                <Fragment>
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
                      className="flex flex-col gap-y-4 lg:items-start"
                      noValidate
                      autoComplete="off"
                    >
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
                          error={!!errors.productName}
                          helperText={errors.productName || ""}
                        />
                      </Box>

                      <FormControl
                        variant="filled"
                        sx={{
                          borderBottom: "none",
                          width: "470px",
                        }}
                      >
                        <InputLabel id="demo-simple-select-filled-label">
                          Category
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-filled-label"
                          id="demo-simple-select-filled"
                          value={basicInfoValues.productCategory}
                          name="productCategory"
                          onChange={handleBasicInfoChange}
                          renderValue={(selected) => {
                            if (!basicInfoValues.productCategory) {
                              return <p>Select a category</p>;
                            }
                            return selected;
                          }}
                        >
                          {getCategoriesData?.data.map(
                            (category: {
                              id: number;
                              name: string;
                            }): JSX.Element => (
                              <MenuItem value={category.name}>
                                {category.name}
                              </MenuItem>
                            )
                          )}
                        </Select>
                      </FormControl>

                      <TextField
                        required={true}
                        id="productDescription"
                        aria-label="Description"
                        name="productDescription"
                        label="Description"
                        multiline
                        placeholder="Say something about the product"
                        className="w-[29.4rem] mb-5 outline-none"
                        variant="filled"
                        minRows={4}
                        maxRows={6}
                        value={basicInfoValues.productDescription}
                        onChange={handleBasicInfoChange}
                      />

                      <Box>
                        <TextField
                          required={true}
                          id="productPrice"
                          type="text"
                          label="Product price"
                          variant="filled"
                          name="price"
                          placeholder="NGN 2000.00"
                          InputProps={{ disableUnderline: true }}
                          className="w-[29.4rem] mb-5"
                          sx={{ backgroundColor: "porcelain" }}
                          value={basicInfoValues.price}
                          onChange={handleBasicInfoChange}
                          error={!!errors.price}
                          helperText={errors.price || ""}
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
                          error={!!errors.quantity}
                          helperText={errors.quantity || ""}
                        />
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
                        <div className="flex flex-col w-[280px] justify-center h-[40px] px-2">
                          {basicInfoValues.productName ? (
                            <p className="capitalize font-bold text-lg text-mecaDarkBlueBackgroundOverlay">
                              {basicInfoValues.productName}
                            </p>
                          ) : (
                            <p className="capitalize font-bold text-lg text-mecaDarkBlueBackgroundOverlay">
                              product name
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col items-end justify-center w-[120px] h-[40px]">
                          {basicInfoValues.price ? (
                            <p className="capitalize font-normal text-sm text-mecaDarkBlueBackgroundOverlay">
                              ₦{basicInfoValues.price}
                            </p>
                          ) : (
                            <p className="capitalize font-normal text-sm text-mecaDarkBlueBackgroundOverlay">
                              price
                            </p>
                          )}
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
                </Fragment>
              )}
            </div>

            <div className=" flex">
              <hr className="w-44 mt-10"></hr>

              <div className=" ">
                <div className="w-[100%] m-auto">
                  <button
                    onClick={handleNextPage}
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
