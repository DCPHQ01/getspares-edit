"use client";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
// import ImageComponent from "../../../components/imageComp/ImageComponent";
import TextField from "@mui/material/TextField";
import { MdChevronRight, MdPhotoLibrary } from "react-icons/md";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { paths } from "../../../path/paths";
import { useGetCategoryQuery } from "../../../redux/features/users/authQuery";
import { ColorRing } from "react-loader-spinner";
import { useAppSelector } from "../../../redux/hooks";
interface ProductData {
  name: string;
  amount: string;
  description: string;
  category: string;
  quantity: string;
}
const CalledPagesPageOnePages = () => {
  const productData = useAppSelector(
    (state) => state?.company?.productData as ProductData
  );
  const [descriptionError, setDescriptionError] = useState("");
  const [basicInfoValues, setBasicInfoValues] = useState({
    name: "",
    category: "",
    description: "",
    amount: "",
    quantity: "",
  });

  const { data: getCategoriesData, isFetching } = useGetCategoryQuery({});

  useEffect(() => {
    const savedData = sessionStorage?.getItem("basicInfoValues");
    if (savedData) {
      setBasicInfoValues(JSON?.parse(savedData));
    } else if (productData) {
      populateData(productData);
    }
  }, [productData]);

  const router = useRouter();

  const handleBasicInfoChange = (e: any) => {
    const { name, value } = e.target;

    if (name === "amount") {
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

  const populateData = (userData: any) => {
    const userDataKeys = Object.keys(basicInfoValues);
    if (userData) {
      userDataKeys.forEach((key) => {
        if (key === "quantity") {
          console.log("quantity ", userData?.productInformation?.quantity);
          setBasicInfoValues((values: any) => ({
            ...values,
            [key]: userData?.productInformation?.quantity,
          }));
        } else {
          setBasicInfoValues((values: any) => ({
            ...values,
            [key]: userData[key] ? userData[key] : "",
          }));
        }
      });
    }
  };

  const [errors, setErrors] = useState({
    name: "",
    category: "",
    description: "",
    amount: "",
    quantity: "",
  });

  const handleNextPage = () => {
    let newErrors = {
      name: "",
      category: "",
      description: "",
      amount: "",
      quantity: "",
    };

    if (!basicInfoValues.name) {
      newErrors.name = "Product name is required";
    }
    if (!basicInfoValues.category) {
      newErrors.category = "Product category is required";
    }
    if (!basicInfoValues.description) {
      newErrors.description = "Product description is required";
    }
    if (!basicInfoValues.amount) {
      newErrors.amount = "Product amount is required";
    }
    if (!basicInfoValues.quantity) {
      newErrors.quantity = "Quantity is required";
    }

    setErrors(newErrors);

    if (
      !newErrors.name &&
      !newErrors.category &&
      !newErrors.description &&
      !newErrors.amount &&
      !newErrors.quantity
    ) {
      router.push(paths.toAddProductDashboardAddImages());
    }
  };

  const checkDescriptionLength = (value: string) => {
    if (value.length > 5000) {
      setDescriptionError("Description exceeds the 5000 word limit.");
    } else {
      setDescriptionError("");
      setBasicInfoValues((prevValues) => ({
        ...prevValues,
        description: value,
      }));
    }
  };

  // useEffect(() => {
  //   if (productData) {
  //     populateData(productData);
  //   }
  // }, [productData]);

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
                      "#095AD3",
                      "#095AD3",
                      "#095AD3",
                      "#095AD3",
                      "#095AD3",
                    ]}
                  />
                </div>
              ) : (
                <>
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
                          id="name"
                          label="Product name"
                          variant="filled"
                          type="text"
                          name="name"
                          placeholder="Enter name"
                          InputProps={{ disableUnderline: true }}
                          className=" w-[29.4rem] mb-5 "
                          value={basicInfoValues.name}
                          onChange={handleBasicInfoChange}
                          error={!!errors.name}
                          helperText={errors.name || ""}
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
                          disableUnderline
                          value={basicInfoValues.category}
                          name="category"
                          onChange={handleBasicInfoChange}
                          renderValue={(selected) => {
                            if (!basicInfoValues.category) {
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
                              <MenuItem value={category.name} key={category.id}>
                                {category.name}
                              </MenuItem>
                            )
                          )}
                        </Select>
                      </FormControl>

                      <TextField
                        required={true}
                        id="description"
                        aria-label="Description"
                        name="description"
                        label="Description"
                        multiline
                        InputProps={{ disableUnderline: true }}
                        placeholder="Say something about the product"
                        className="w-[29.4rem] mb-5 outline-none"
                        variant="filled"
                        minRows={4}
                        maxRows={6}
                        value={basicInfoValues.description}
                        onChange={(e) => checkDescriptionLength(e.target.value)}
                        error={!!descriptionError}
                        helperText={descriptionError}
                      />

                      <Box>
                        <TextField
                          required={true}
                          id="productamount"
                          type="text"
                          label="Product amount"
                          variant="filled"
                          name="amount"
                          placeholder="NGN 2000.00"
                          InputProps={{ disableUnderline: true }}
                          className="w-[29.4rem] mb-5"
                          sx={{ backgroundColor: "porcelain" }}
                          value={basicInfoValues.amount}
                          onChange={handleBasicInfoChange}
                          error={!!errors.amount}
                          helperText={errors.amount || ""}
                        />
                      </Box>

                      <Box>
                        <TextField
                          required={true}
                          type="number"
                          id="quantity"
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
                          {basicInfoValues.name ? (
                            <p className="capitalize font-bold text-lg text-mecaDarkBlueBackgroundOverlay">
                              {basicInfoValues.name}
                            </p>
                          ) : (
                            <p className="capitalize font-bold text-lg text-mecaDarkBlueBackgroundOverlay">
                              product name
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col items-end justify-center w-[120px] h-[40px]">
                          {basicInfoValues.amount ? (
                            <p className="capitalize font-normal text-sm text-mecaDarkBlueBackgroundOverlay">
                              ₦{basicInfoValues.amount}
                            </p>
                          ) : (
                            <p className="capitalize font-normal text-sm text-mecaDarkBlueBackgroundOverlay">
                              amount
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="mt-8">
                        <p>Description</p>
                        <textarea
                          title="textArea"
                          value={basicInfoValues.description}
                          readOnly={true}
                          className="scrollbar-none border-white pl-0  w-full h-32 p-2 bg-white placeholder:text-black outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </>
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
