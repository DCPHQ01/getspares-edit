"use client";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { useAppSelector } from "../../../redux";
import { useAppDispatch } from "../../../redux/hooks";
import { RootState } from "../../../redux";
import { setCurrentStep } from "../../../redux/features/company/companySlice";
import { useUpdateCompanyMutation } from "../../../redux/features/company/companyQuery";
import { MdPhotoLibrary } from "react-icons/md";
import { uploadImage } from "../../utils";

interface PageTwoProps {
  companyData: {
    name?: string;
    description?: string;
    website?: string;
    companyEmail?: string;
    phoneNumber?: string;
    cac?: string;
    address1?: string;
    address2?: string;
  };
}

const UpdateCompanyStepTwo: React.FC<PageTwoProps> = ({ companyData }) => {
  const dispatch = useAppDispatch();
  const initialFormState = {
    name: "",
    cac: "",
    description: "",
    websiteUrl: "",
    companyEmail: "",
    address1: "",
    address2: "",
    phoneNumber: "",
    imageUrl: "",
  };
  const [inputs, setInputs] = useState(initialFormState);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [secAddress, setSecAddress] = useState(false);
  const [formImage, setFormImage] = useState<string | null>(null);
  const [updateCompanyDetails, { isLoading, isError }] =
    useUpdateCompanyMutation();

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const addressRegex = /^.{5,}$/; // Example: Address should be at least 5 characters
  const phoneRegex = /^\d{11}$/; // Example: Phone number should be 11 digits

  const handleAddressChange = () => {
    if (inputs.address1 && !addressRegex.test(inputs.address1)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        address1: "Address must be at least 5 characters",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        address1: "",
      }));
    }
  };

  const handleSecondAddressChange = () => {
    if (inputs.address2 && !addressRegex.test(inputs.address2)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        address2: "Address must be at least 5 characters",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        address2: "",
      }));
    }
  };

  const handlePhoneChange = () => {
    if (inputs.phoneNumber && !phoneRegex.test(inputs.phoneNumber)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: "Phone number must be 11 digits",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, phoneNumber: "" }));
    }
  };

  const handleNextPage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let res;
    if (Object.values(errors).some((error) => error)) {
      return;
    }
    try {
      res = await updateCompanyDetails(inputs).unwrap();
      dispatch(setCurrentStep(2));
    } catch (e: any) {
      e.data;
    }
  };
  const handlePreviousPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(setCurrentStep(0));
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setFormImage(result);
      };
      await uploadImage(file, setUploadedImage);
      reader.readAsDataURL(file);
    }
  };

  const setUploadedImage = (e: string) => {
    setInputs((values) => ({ ...values, imageUrl: e }));
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const populateData = (userData: any) => {
    const userDataKeys = Object.keys(inputs);
    if (userData) {
      userDataKeys.forEach((key) => {
        if (key === "imageUrl") {
          const img = userData[key];
          setFormImage(img);
          setInputs((values) => ({
            ...values,
            [key]: userData[key] ? userData[key] : "",
          }));
        } else {
          setInputs((values) => ({
            ...values,
            [key]: userData[key] ? userData[key] : "",
          }));
        }
      });
    }
  };

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const showAddress = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSecAddress((prev) => !prev);
  };

  const deleteImage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setFormImage("");
  };

  useEffect(() => {
    if (companyData) {
      populateData(companyData);
    }
  }, [companyData]);

  return (
    <>
      <div className="tw-w-full md:w-11/12" id="pageTwo1">
        <div className="pageWrapper" id="pageTwo2">
          <div className="md:flex flex-col mt-8" id="pageTwo3">
            <div className="mb-16 pageHeader w-94" id="pageTwo4">
              <header className="font-bold text-base" id="pageTwo5">
                Location
              </header>
              <div className="flex subheaders" id="subhead2">
                <sub className="text-xs font-normal">Provide details</sub>

                <form method="dialog" id="pageTwo6">
                  <button
                    className="text-sm font-semibold skip "
                    id="skipper1"
                    onClick={handleNextPage}
                  >
                    Skip
                  </button>
                </form>
              </div>
            </div>

            <Box
              id="pageTwo7"
              component="form"
              className="flex md:h-[33.5rem] gap-x-16 flex-col-reverse lg:flex-row lg:items-start   "
              noValidate
              autoComplete="off"
            >
              <Box>
                <Box className=" mb-10" id="pageTwo8">
                  <TextField
                    id="filledasic1"
                    label="Email address"
                    variant="filled"
                    type="email"
                    name="companyEmail"
                    placeholder="Enter email"
                    InputProps={{ disableUnderline: true, readOnly: true }}
                    className="  w-full lg:w-[364px]  2xl:w-[35rem]"
                    value={inputs.companyEmail}
                  />
                  {errors.email && (
                    <p className="error-color">{errors.email}</p>
                  )}
                </Box>

                <Box className=" mb-10">
                  <TextField
                    id="filledasic2"
                    label="Phone number"
                    variant="filled"
                    type="number"
                    name="phoneNumber"
                    onChange={handleChange}
                    placeholder="09000000000"
                    InputProps={{ disableUnderline: true }}
                    className="  w-full lg:w-[364px]  2xl:w-[35rem]"
                    sx={{ backgroundColor: "porcelain" }}
                    value={inputs.phoneNumber}
                    onBlur={handlePhoneChange}
                  />
                </Box>
                <Box className=" mb-10">
                  <TextField
                    id="filledasic2"
                    label="Address 1"
                    variant="filled"
                    type="text"
                    name="address1"
                    onChange={handleChange}
                    onBlur={handleAddressChange}
                    placeholder="Enter address (Street Number, Town, City, State)"
                    InputProps={{ disableUnderline: true }}
                    className="  w-full lg:w-[364px]  2xl:w-[35rem]"
                    sx={{ backgroundColor: "porcelain" }}
                    value={inputs.address1}
                  />
                </Box>

                <Box>
                  <div id="pageTwo9">
                    {secAddress && (
                      <div className="mb-10">
                        <TextField
                          type="text"
                          id="filledasic4"
                          label="Address 2"
                          variant="filled"
                          name="address2"
                          onChange={handleChange}
                          onBlur={handleSecondAddressChange}
                          sx={{ backgroundColor: "porcelain" }}
                          InputProps={{ disableUnderline: true }}
                          className="  w-full lg:w-[364px] 2xl:w-[35rem] "
                          placeholder="Enter address (Street Number, Town, City, State)"
                          value={inputs.address2}
                        />
                      </div>
                    )}

                    <button
                      className="add-address"
                      id="addAnotherid4"
                      onClick={(e) => showAddress(e)}
                    >
                      {secAddress ? "Hide address" : "Add another address"}
                    </button>
                  </div>
                </Box>
              </Box>
              <Box>
                <div className="inputImage imagetext h-[283px] w-[316px] pt-3">
                  <div className="">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      ref={fileInputRef}
                      className="hidden w-full px-3 py-2 "
                      title="Upload Image"
                      placeholder="Choose an image"
                    />
                  </div>

                  {formImage ? (
                    <div>
                      <div className={"flex justify-end px-5"}>
                        <button
                          type="button"
                          id="cancelbtnDiv"
                          onClick={(e) => deleteImage(e)}
                          className="btn btn-sm btn-circle btn-ghost font-bold w-3 h-3 cursor-pointer"
                        >
                          X
                        </button>
                      </div>
                      <div className="h-[237px] w-[237px] m-auto">
                        <img
                          src={formImage}
                          alt="Uploaded"
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                    </div>
                  ) : (
                    <div
                      id="prevImgStateDiv"
                      onClick={handleImageClick}
                      className="w-full px-3 py-2 border rounded-md flex flex-col items-center justify-center cursor-pointer border-none"
                    >
                      <MdPhotoLibrary className="text-gray-600 text-7xl relative top-12" />
                      <div className="text-gray-600 text-base  text-center relative top-16">
                        <p className="font-bold">Add logo</p>
                        <p className="font-normal">
                          by clicking or drag and drop
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </Box>
            </Box>

            <div className="flex gap-x-5 justify-between mt-16 md:mt-40 mb-6 ">
              <div
                className="previousbtn cursor-pointer"
                id="firstPreviousbtn9"
              >
                <button onClick={(e) => handlePreviousPage(e)}>Previous</button>
              </div>
              <div className="nextbtn cursor-pointer" id="pageTwo12">
                <button
                  id="secondFormSubmit"
                  className="cursor-pointer"
                  onClick={(e) => handleNextPage(e)}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateCompanyStepTwo;
