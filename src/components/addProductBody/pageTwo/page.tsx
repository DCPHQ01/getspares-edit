"use client";
import React, { useRef } from "react";
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

interface ImageUploadProps {
  onUpload: (files: FileList) => void;
}

import { useAppSelector } from "../../../redux";
import { useAppDispatch } from "../../../redux/hooks";
import { RootState } from "../../../redux";
import { setCompanyForm } from "../../../redux/features/company/companySlice";
import {
  MdChevronLeft,
  MdChevronRight,
  MdClose,
  MdPhotoLibrary,
} from "react-icons/md";

const CalledPagesPageTwoPages = ({ step, setStep, active, setActive }: any) => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = event.target.files;
  //   setSelectedFiles(files);
  //   if (files) {
  //     onUpload(files);
  //   }
  // };

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

  const [formImage, setFormImage] = useState<string | null>(null);

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

  return (
    <div className="" style={{ width: "48%" }} id="pageTwo1">
      <div className="pageWrapper" id="pageTwo2">
        <div className="hidden md:flex flex-col mt-[4.5rem]" id="pageTwo3">
          <div className="mb-10 pageHeader w-94" id="pageone4">
            <div className="flex gap-x-10 justify-between">
              <div className="">
                <div className="">
                  <div className="flex gap-x-5">
                    <header className=" font-bold text-lg" id="pageone5">
                      Images
                    </header>
                    <span className="text-sm mt-1">
                      you can add up to 10 images
                    </span>
                  </div>

                  <hr className="w-[100%]"></hr>
                </div>

                <Box
                  id="pageTwo7"
                  component="form"
                  className="relative flex gap-x-16 flex-col-reverse lg:flex-row lg:items-start   "
                  noValidate
                  onSubmit={handleSubmit}
                  autoComplete="off"
                >
                  <Box>
                    <div
                      style={{ backgroundColor: "#EFF2F3" }}
                      className=" h-60 w-[27rem] mb-5 mt-10 pt-6"
                    >
                      <div className="">
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageChange}
                          ref={fileInputRef}
                          className="hidden w-full px-3 py-2 "
                        />
                      </div>
                      <div className="flex flex-col  items-center justify-center">
                        <div className="border rounded-full mt-12 h-16 w-[60px] flex justify-center">
                          <div
                            id="prevImgState"
                            onClick={handleImageClick}
                            className="w-full px-2 py-2  rounded-md  cursor-pointer border-none"
                          >
                            <MdPhotoLibrary
                              className="text-gray-600 text-7xl w-10 pb-6 "
                              style={{ backgroundColor: "porcelain" }}
                            />
                          </div>
                        </div>
                      </div>
                      {formImage && (
                        <div className="w-20 h-16 absolute -bottom-16 bg-mecaProfileColor ">
                          <MdClose className="absolute right-0 cursor-pointer" />
                          <div className="w-11  h-10 m-auto  ">
                            <div className="mt-3 h-10 w-11">
                              <img
                                src={formImage}
                                alt="Uploaded"
                                className="w-full h-full object-cover "
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="text-gray-600 text-base mt-2 text-center">
                        <p className="font-bold">Add logo</p>
                        <p className="font-normal">
                          by clicking or drag and drop
                        </p>
                      </div>
                    </div>
                  </Box>
                </Box>
              </div>

              <div className="">
                <div className="mb-10 pageHeader w-[100%]" id="pageone4">
                  <header className="font-bold text-lg" id="pageone5">
                    Product preview
                  </header>

                  <hr className="w-[100%]"></hr>
                </div>
                <Box>
                  <div
                    style={{ backgroundColor: "#EFF2F3" }}
                    className=" h-[283px] w-[28rem]"
                  >
                    <div className="">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        ref={fileInputRef}
                        className="hidden w-full px-3 py-2 "
                      />
                    </div>

                    {formImage ? (
                      <div className="flex justify-center">
                        <div className="rounded-full   ">
                          <img
                            src={formImage}
                            alt="Uploaded"
                            className="h-[283px] w-[28rem] object-cover"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col  items-center justify-center">
                        <div className="border  rounded-full mt-20 h-32 w-32 flex justify-center ">
                          <div
                            id="prevImgState"
                            onClick={handleImageClick}
                            className="w-full px-2 py-2  rounded-md pt-9 cursor-pointer border-none"
                          >
                            <MdPhotoLibrary
                              className="text-gray-600 text-7xl w-10 m-auto pb-6 "
                              style={{ backgroundColor: "porcelain" }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Box>
                <div className="">
                  <div className="flex justify-between">
                    <div className="">
                      <p>Product name</p>
                    </div>
                    <div className="">
                      <p>Price</p>
                    </div>
                  </div>
                  <div className="mt-8">
                    <p>Description</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex  justify-between w-[84%]">
            <div onClick={goToPreviousPage} id="firstPreviousbtn9">
              <button
                type="submit"
                className="w-[116px] flex justify-center gap-x-3 pt-2 h-10 font-semibold border rounded-full text-mecaBluePrimaryColor border-mecaBluePrimaryColor mb-6 "
              >
                <span>
                  <MdChevronLeft className="mt-1 " />
                </span>
                <p> Previous</p>
              </button>
            </div>
            <div onClick={goToNextPage} className="">
              <button
                type="submit"
                id="thirdFormSubmit"
                className="w-[116px] flex justify-center gap-x-3 pt-2 h-10 font-semibold border rounded-full text-mecaBluePrimaryColor border-mecaBluePrimaryColor  mb-6 "
              >
                <p>Next </p>
                <span>
                  <MdChevronRight className="mt-1 " />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* mobile */}

        {/* <div className="absolute  w-11/12" id="pageTwo13">
          <div className="md:hidden m-auto " id="pageTwo14">
            <div className="mb-16 mt-10 pageHeader" id="pageTwo15">
              <header className="font-bold text-base" id="pageTwo16">
                Location
              </header>
              <div className="flex subheaders" id="subhea1">
                <sub className="text-xs font-normal" id="pageTwo17">
                  Provide details
                </sub>
                <form method="dialog" id="pageTwo18">
                  <button
                    className="text-sm font-semibold skip "
                    id="skipper34"
                  >
                    Skip
                  </button>
                </form>
              </div>
              <Box
                className="form-display flex flex-col flex-col-reverse mt-8"
                id="pageTwo19"
              >
                <form onSubmit={handleSubmit} id="pageTwo20">
                  <Box className="companyInputWrap">
                    <Box className="">
                      <TextField
                        required={true}
                        id="filleasic"
                        label="Email address"
                        variant="filled"
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        InputProps={{ disableUnderline: true }}
                      
                        className="  w-full lg:w-[364px]  2xl:w-[35rem]"
                      
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
                 
                    </Box>

                    <br></br>
                    <Box className="">
                      <TextField
                        required={true}
                        id="fillesic"
                        label="Phone number"
                        variant="filled"
                        type="number"
                        name="number"
                        placeholder="09000000000"
                        InputProps={{ disableUnderline: true }}
                        
                        className="  w-full lg:w-[364px]  2xl:w-[35rem]"
                    
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
              
                    </Box>

                    <br></br>

                    <Box>
                      {" "}
                      <div id="pageTwo21">
                        {addresses.map((address, index) => (
                          <div key={index}>
                            <p>{address.streetNumber}</p>
                            <p>{address.town}</p>
                            <p>{address.city}</p>
                            <p>{address.state}</p>
                          </div>
                        ))}
                        {inputValues.map((inputValue, index) => (
                          <div key={index} className="mb-6" id="pageTwo22">
                            <TextField
                              type="text"
                              required={true}
                              id="filasic"
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
                             
                            />
                       
                          </div>
                        ))}

                        <button
                          onClick={handleAddAddress}
                          className="add-address"
                          id="addAnotheraddress"
                        >
                          Add another address
                        </button>
                      </div>
                    </Box>
                  </Box>
                </form>

                <Box>
                  <div className="inputImage imagetext h-[283px] w-[316px] pt-6">
                    <div className="">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        ref={fileInputRef}
                        className="hidden w-full px-3 py-2 "
                      />
                    </div>

              
                    {formImage ? (
                      <div className="">
                        <form
                          method="dialog"
                          id="confirmpageButton"
                          className="absolute right-0 pr-4"
                         
                        >
                          <Link href="/modalPage">
                            <button
                              id="cancelbtn"
                              className="btn btn-sm btn-circle btn-ghost font-bold w-3 h-3 "
                            >
                              ✕
                            </button>
                          </Link>
                        </form>

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
                        id="prevImgState"
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
        

              <div className="flex gap-x-5 justify-between mt-40">
                <div
                  onClick={goToPreviousPage}
                  className="previousbtn"
                  id="seondPreviousbtn4"
                >
                  <button type="submit">Previous</button>
                </div>
                <div onClick={goToNextPage} className="nextbtn nextmobile ">
                  <button type="submit" id="secondFormSubmitNext">
                    Next
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default CalledPagesPageTwoPages;
