"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";
// import { useRouter } from "next/router";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  TextareaAutosize as BaseTextareaAutosize,
  TextareaAutosize,
} from "@mui/base/TextareaAutosize";

interface Address {
  streetNumber: string;
  town: string;
  city: string;
  state: string;
}

interface ChildProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

import { useAppSelector } from "@/redux";
import { RootState } from "../../../../meca/src/redux";
import { useAppDispatch } from "../../../../meca/src/redux/hooks";
import { setCompanyForm } from "@/redux/features/company/companySlice";

const CalledPagesPageTwoPages = ({ step, setStep, active, setActive }: any) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [inputValues, setInputValues] = useState<string[]>([""]);

  const handleInputChange = (index: number, value: string) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

  const handleAddAddress = () => {
    setInputValues([...inputValues, ""]);
  };
  const handleSaveAddress = () => {
    const newAddresses: Address[] = inputValues.map((inputValue) => {
      const parts = inputValue.split(",").map((part) => part.trim());
      if (parts.length === 4) {
        const [streetNumber, town, city, state] = parts;
        return { streetNumber, town, city, state };
      } else {
        // Handle invalid input
        console.error("Invalid address format");
        return { streetNumber: "", town: "", city: "", state: "" };
      }
    });
    setAddresses([...addresses, ...newAddresses]);
  };

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // const router = useRouter();
  console.log("step ", step);
  console.log("active ", active);
  const goToNextPage = () => {
    setStep(step + 1);
    // setActive(active);
  };

  const goToPreviousPage = () => {
    // Navigate to the previous page if it's available
    setStep(step - 1);
  };

  // const [emailError, setEmailError] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  // const [addressError, setAddressError] = useState("");
  // const [phoneError, setPhoneError] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const addressRegex = /^.{5,}$/; // Example: Address should be at least 5 characters
  const phoneRegex = /^\d{11}$/; // Example: Phone number should be 11 digits
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email validation regex

  const handleAddressChange = () => {
    if (!addressRegex.test(address)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        address: "Address must be at least 5 characters",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        address: "",
      }));
    }
  };

  const handlePhoneChange = () => {
    if (!phoneRegex.test(phoneNumber)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: "Phone number must be 11 digits",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, phoneNumber: "" }));
    }
  };

  const handleEmailChange = () => {
    if (!emailRegex.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email address",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }
  };

  const validateImage = () => {
    if (!image) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        image: "Image is required",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, image: "" }));
    }
  };

  // const router = useRouter();
  const [input2, setInput2] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // router.push(`/preview?email=${email}`);
    // router.push(`/preview?phoneNumber=${phoneNumber}`);
    // router.push(`/preview?address=${address}`);
    // router.push(`/preview?image=${image}`);

    e.preventDefault();
    handleAddressChange();
    handlePhoneChange();
    handleEmailChange();
    validateImage();

    if (!Object.values(errors).some((error) => error)) {
      console.log("Form submitted successfully");
    }
  };

  const dispatch = useAppDispatch();

  const { company } = useAppSelector((state: RootState) => state);
  console.log("company ", company.companyForm);

  // const handleClick = (e: any) => {
  //   e.preventDefault();
  // };

  // console.log(value);

  // const handleChange = (e: any) => {
  //   setValue({ ...value, [e.target.name]: e.target.value });
  // };
  return (
    <div className="" style={{ width: "85%", margin: "auto" }}>
      <div className="pageWrapper">
        <div className="hidden md:flex flex-col mt-8">
          <div className="mb-16 pageHeader w-94">
            <header className="font-bold text-base">Location</header>
            <div className="flex subheaders" id="subheader1">
              <sub className="text-xs font-normal">Provide details</sub>

              <form method="dialog">
                <button className="text-sm font-semibold skip " id="skip1">
                  Skip
                </button>
              </form>
            </div>
          </div>

          <Box
            component="form"
            className="flex gap-x-16 flex-col flex-col-reverse lg:flex-row lg:items-start   "
            noValidate
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <Box>
              <Box className=" mb-10">
                <TextField
                  required={true}
                  id="filled-basic"
                  label="Email address"
                  variant="filled"
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  InputProps={{ disableUnderline: true }}
                  // className="lg:w-[100%] w-[100%]"
                  className="  w-full lg:w-[364px]  2xl:w-[35rem]"
                  // sx={{ backgroundColor: "porcelain" }}
                  value={company.companyForm.email}
                  onChange={(e) =>
                    dispatch(
                      setCompanyForm({
                        ...company.companyForm,
                        email: e.target.value,
                      })
                    )
                  }
                  onBlur={handleEmailChange}
                />
                {/* {errors.email && <p className="error-color">{errors.email}</p>} */}
              </Box>

              <Box className=" mb-10">
                <TextField
                  required={true}
                  id="filled-basic"
                  label="Phone number"
                  variant="filled"
                  type="number"
                  name="phoneNumber"
                  placeholder="09000000000"
                  InputProps={{ disableUnderline: true }}
                  // className="lg:w-[100%] w-[100%]"
                  className="  w-full lg:w-[364px]  2xl:w-[35rem]"
                  // sx={{ backgroundColor: "porcelain" }}
                  value={company.companyForm.phoneNumber}
                  onChange={(e) =>
                    dispatch(
                      setCompanyForm({
                        ...company.companyForm,
                        phoneNumber: e.target.value,
                      })
                    )
                  }
                  onBlur={handlePhoneChange}
                />
                {/* {errors.phoneNumber && (
                  <p className="error-color">{errors.phoneNumber}</p>
                )} */}
              </Box>

              <Box>
                {" "}
                <div>
                  {addresses.map((address, index) => (
                    <div key={index}>
                      <p>{address.streetNumber}</p>
                      <p>{address.town}</p>
                      <p>{address.city}</p>
                      <p>{address.state}</p>
                    </div>
                  ))}
                  {inputValues.map((inputValue, index) => (
                    <div key={index} className="mb-10">
                      <TextField
                        type="text"
                        required={true}
                        id="filled-basic"
                        label="Address"
                        variant="filled"
                        name="address"
                        style={{ backgroundColor: "#EEF2F6" }}
                        InputProps={{ disableUnderline: true }}
                        className="  w-full lg:w-[364px] 2xl:w-[35rem] "
                        placeholder="Enter address (Street Number, Town, City, State)"
                        value={company.companyForm.address}
                        onChange={(e) =>
                          dispatch(
                            setCompanyForm({
                              ...company.companyForm,
                              address: e.target.value,
                            })
                          )
                        }
                        // className="mr-2"
                      />
                      {/* <button
                        onClick={handleSaveAddress}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                      >
                        Save Address
                      </button> */}
                    </div>
                  ))}

                  <button
                    onClick={handleAddAddress}
                    className="add-address"
                    id="addAnotherid"
                  >
                    Add another address
                  </button>
                </div>
              </Box>
            </Box>

            <Box>
              <div className="inputImage imagetext h-[283px] w-[316px]">
                <TextField
                  required={true}
                  type="file"
                  name="image"
                  value={image}
                  // accept="image/*"
                  onChange={(e) =>
                    setImage(e.target.files ? e.target.files[0] : null)
                  }
                  // className="inputImage imagetext"
                  className=""
                  id="secondImageid"
                  // placeholder="Add logo by clicking or drag and drop"
                />
                {/* {errors.image && <p className="error-color">{errors.image}</p>} */}
              </div>
            </Box>
          </Box>

          <div className="flex gap-x-5 justify-between mt-40 mb-6 ">
            <div
              onClick={goToPreviousPage}
              className="previousbtn"
              id="firstPreviousbtn"
            >
              <button type="submit">Previous</button>
            </div>
            <div onClick={goToNextPage} className="nextbtn ">
              <button type="submit" id="secondFormSubmit">
                Next
              </button>
            </div>
          </div>
        </div>

        <div className="absolute  w-11/12">
          <div className="md:hidden m-auto">
            <div className="mb-16 mt-10 pageHeader">
              <header className="font-bold text-base">Location</header>
              <div className="flex subheaders" id="subheader1">
                <sub className="text-xs font-normal">Provide details</sub>
                <form method="dialog">
                  <button className="text-sm font-semibold skip " id="skip1">
                    Skip
                  </button>
                </form>
              </div>
              <Box className="form-display flex flex-col flex-col-reverse mt-8">
                <Box onSubmit={handleSubmit} className="companyInputWrap">
                  <Box className="">
                    <TextField
                      required={true}
                      id="filled-basic"
                      label="Email address"
                      variant="filled"
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      InputProps={{ disableUnderline: true }}
                      // className="lg:w-[100%] w-[100%]"
                      className="  w-full lg:w-[364px]  2xl:w-[35rem]"
                      // sx={{ backgroundColor: "porcelain" }}
                      value={company.companyForm.email}
                      onChange={(e) =>
                        dispatch(
                          setCompanyForm({
                            ...company.companyForm,
                            email: e.target.value,
                          })
                        )
                      }
                      onBlur={handleEmailChange}
                    />
                    {/* {errors.email && (
                      <p className="error-color">{errors.email}</p>
                    )} */}
                  </Box>

                  <br></br>
                  <Box className="">
                    <TextField
                      required={true}
                      id="filled-basic"
                      label="Phone number"
                      variant="filled"
                      type="number"
                      name="number"
                      placeholder="09000000000"
                      InputProps={{ disableUnderline: true }}
                      // className="lg:w-[100%] w-[100%]"
                      className="  w-full lg:w-[364px]  2xl:w-[35rem]"
                      // sx={{ backgroundColor: "porcelain" }}
                      value={company.companyForm.phoneNumber}
                      onChange={(e) =>
                        dispatch(
                          setCompanyForm({
                            ...company.companyForm,
                            phoneNumber: e.target.value,
                          })
                        )
                      }
                      onBlur={handlePhoneChange}
                    />
                    {/* {errors.phoneNumber && (
                      <p className="error-color">{errors.phoneNumber}</p>
                    )} */}
                  </Box>

                  <br></br>

                  <Box>
                    {" "}
                    <div>
                      {addresses.map((address, index) => (
                        <div key={index}>
                          <p>{address.streetNumber}</p>
                          <p>{address.town}</p>
                          <p>{address.city}</p>
                          <p>{address.state}</p>
                        </div>
                      ))}
                      {inputValues.map((inputValue, index) => (
                        <div key={index} className="mb-6">
                          <TextField
                            type="text"
                            required={true}
                            id="filled-basic"
                            label="Address"
                            variant="filled"
                            name="address"
                            style={{ backgroundColor: "#EEF2F6" }}
                            InputProps={{ disableUnderline: true }}
                            className="  w-full lg:w-[364px]  2xl:w-[35rem] "
                            placeholder="Enter address (Street Number, Town, City, State)"
                            value={company.companyForm.address}
                            onChange={(e) =>
                              dispatch(
                                setCompanyForm({
                                  ...company.companyForm,
                                  address: e.target.value,
                                })
                              )
                            }
                            // className="mr-2"
                          />
                          {/* <button
                        onClick={handleSaveAddress}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                      >
                        Save
                      </button> */}
                        </div>
                      ))}

                      <button
                        onClick={handleAddAddress}
                        className="add-address"
                        id="addAnotherid"
                      >
                        Add another address
                      </button>
                    </div>
                  </Box>
                </Box>

                <div className="inputImage imagetext h-[283px] w-[316px]">
                  <Box>
                    <TextField
                      required={true}
                      type="file"
                      name="image"
                      // accept="image/*"
                      onChange={(e) =>
                        setImage(e.target.files ? e.target.files[0] : null)
                      }
                      // className="inputImage imagetext"
                      className=""
                      id="secondImageid"
                      // placeholder="Add logo by clicking or drag and drop"
                    />
                    {errors.image && (
                      <p className="error-color">{errors.image}</p>
                    )}
                  </Box>
                </div>
              </Box>
              {/* <div className="mt-2 flex justify-center items-center">
                <button
                  className="w-full h-[48px] rounded-lg text-lg"
                  id="companyButton"
                >
                  Next
                </button>
              </div> */}

              <div className="flex gap-x-5 justify-between mt-40">
                <div
                  onClick={goToPreviousPage}
                  className="previousbtn"
                  id="firstPreviousbtn"
                >
                  <button type="submit">Previous</button>
                </div>
                <div onClick={goToNextPage} className="nextbtn nextmobile ">
                  <button type="submit" id="secondFormSubmit">
                    Next
                  </button>
                </div>
              </div>

              {/* <div className="mt-8 flex items-center justify-evenly gap-4 h-[8px] w-full">
                <div
                  className="h-full w-1/3 bg-blue-800 rounded-lg"
                  id="switchedButton1"
                ></div>
                <div
                  className="h-full w-1/3 bg-blue-800 rounded-lg"
                  id="switchedButton2"
                ></div>
                <div
                  className="h-full w-1/3 bg-blue-800 rounded-lg"
                  id="switchedButton3"
                ></div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalledPagesPageTwoPages;
