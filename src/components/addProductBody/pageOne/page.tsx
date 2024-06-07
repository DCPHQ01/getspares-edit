"use client";
import React, { useRef, useState } from "react";
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

  const validateDate = () => {
    // You can implement your own validation logic for the date field
    if (!date.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        date: "Date is required",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, date: "" }));
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateWebsite();
    validateFullName();
    validateMessage();
    validateDate();
    validateImage();

    if (!Object.values(errors).some((error) => error)) {
      console.log("Form submitted successfully");
    }
  };
  const router = useRouter();

  const goToNextPage = () => {
    setStep(step + 1);
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

  const [inputs, setInputs] = useState<{ [key: string]: string }>({
    input1: "",
    input2: "",
    input3: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

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
                  onSubmit={handleSubmit}
                  autoComplete="off"
                >
                  <Box>
                    <Box>
                      <TextField
                        required={true}
                        id="filledbasic"
                        label="Product name"
                        variant="filled"
                        type="text"
                        name="input1"
                        placeholder="Enter name"
                        InputProps={{ disableUnderline: true }}
                        className=" w-[29.4rem] mb-5 "
                        value={inputs.input1}
                        onChange={handleChange}
                      />
                    </Box>

                    <Box>
                      <TextField
                        required={true}
                        value={company.companyForm.website}
                        onChange={(e) =>
                          dispatch(
                            setCompanyForm({
                              ...company.companyForm,
                              website: e.target.value,
                            })
                          )
                        }
                        onBlur={validateWebsite}
                        type="url"
                        id="filledbasic"
                        label="Product category"
                        variant="filled"
                        name="website"
                        placeholder="Select category"
                        InputProps={{ disableUnderline: true }}
                        className="w-[29.4rem] mb-5 "
                        sx={{ backgroundColor: "porcelain" }}
                      />
                    </Box>
                    <Box>
                      <TextareaAutosize
                        required={true}
                        value={inputs.input3}
                        onChange={handleChange}
                        id="filledbasic"
                        aria-label="Description"
                        name="input3"
                        placeholder="Say something about the product"
                        className="w-[29.4rem] mb-5"
                        style={{
                          backgroundColor: "#EFF2F3",
                          height: "223px",
                          borderColor: "none",
                          padding: "20px",
                        }}
                      />
                    </Box>

                    <Box>
                      <TextField
                        required={true}
                        value={inputs.input2}
                        onChange={handleChange}
                        onBlur={validateWebsite}
                        id="filledbasic"
                        type="number"
                        label="Product price"
                        variant="filled"
                        name="input2"
                        placeholder="$ 2000.00"
                        InputProps={{ disableUnderline: true }}
                        className="w-[29.4rem] mb-5"
                        sx={{ backgroundColor: "porcelain" }}
                      />
                    </Box>

                    <Box>
                      <TextField
                        required={true}
                        value={company.companyForm.website}
                        onChange={(e) =>
                          dispatch(
                            setCompanyForm({
                              ...company.companyForm,
                              website: e.target.value,
                            })
                          )
                        }
                        onBlur={validateWebsite}
                        type="url"
                        id="filledbasic"
                        label="Quality availability"
                        variant="filled"
                        name="Quality availability"
                        placeholder="Enter value"
                        InputProps={{ disableUnderline: true }}
                        className="w-[29.4rem] mb-5"
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
                    <div className="">
                      <p>Product name</p>
                      <input
                        readOnly={true}
                        className="scrollbar-none p-2 pl-0 border-white bg-white placeholder:text-black"
                        value={inputs.input1}
                      />
                    </div>
                    <div className="">
                      <p className="flex justify-end mr-6">Price</p>
                      <input
                        readOnly={true}
                        className="scrollbar-none p-2 pl-0 bg-white border-white placeholder:text-black"
                        value={inputs.input2}
                      />
                    </div>
                  </div>
                  <div className="mt-8">
                    <p>Description</p>
                    <textarea
                      readOnly={true}
                      className="scrollbar-none border-white pl-0  w-full h-32 p-2 bg-white placeholder:text-black"
                      value={inputs.input3}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className=" flex">
              <hr className="w-44 mt-10"></hr>

              <div className=" ">
                <div onClick={goToNextPage} className="w-[100%] m-auto">
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

        {/* <div className="absolute  w-11/12" id="pageone9">
          <div className="md:hidden m-auto" id="pageone10">
            <div className="mb-16 pageHeader" id="pageone11">
              <header className="font-bold text-base" id="pageone12">
                Company details
              </header>
              <div className="flex subheaders" id="subheader2">
                <sub className="text-xs font-normal" id="pageoneDescription">
                  Double-check all the information you provided
                </sub>
                <form method="dialog" id="pageoneSkip">
                  <button className="text-sm font-semibold skip " id="skipbtn2">
                    Skip
                  </button>
                </form>
              </div>
              <div
                className="form-display flex flex-col flex-col-reverse mt-8"
                id="pageone13"
              >
                <form
                  id="firstFormWrapper"
                  onSubmit={handleSubmit}
                  className="companyInputWrap"
                >
                  <div
                    className="flex flex-col flex-col-reverse"
                    id="pageone14"
                  >
                    <div>
                      <input
                        required={true}
                        value={company.companyForm.name}
                        onChange={(e) =>
                          dispatch(
                            setCompanyForm({
                              ...company.companyForm,
                              name: e.target.value,
                            })
                          )
                        }
                        onBlur={validateFullName}
                        type="text"
                        name="fullname"
                        id="fullnameid2"
                        className="companyInput w-full mb-4"
                        placeholder="Name Enter name"
                      />
                     

                      <br></br>

                      <textarea
                        required={true}
                        value={company.companyForm.description}
                        onChange={(e) =>
                          dispatch(
                            setCompanyForm({
                              ...company.companyForm,
                              description: e.target.value,
                            })
                          )
                        }
                        onBlur={validateMessage}
                        name="message"
                        id="messageid2"
                        placeholder="Description Say something about your company"
                        className=" companyInput inputText w-full mb-8 lg:w-[364px]"
                      ></textarea>
                  
                      <br></br>

                      <input
                        required={true}
                        value={company.companyForm.website}
                        onChange={(e) =>
                          dispatch(
                            setCompanyForm({
                              ...company.companyForm,
                              website: e.target.value,
                            })
                          )
                        }
                        onBlur={validateWebsite}
                        type="url"
                        name="website"
                        id="websiteid2"
                        placeholder="Website www.123.com"
                        className="companyInput mb-4 w-full lg:w-[364px]"
                      />
                    
                      <br></br>
                      <input
                        required={true}
                        value={company.companyForm.date_founded}
                        onChange={(e) =>
                          dispatch(
                            setCompanyForm({
                              ...company.companyForm,
                              date_founded: e.target.value,
                            })
                          )
                        }
                        onBlur={validateDate}
                        type="date"
                        name="date"
                        id="dateid2"
                        placeholder="date funded 12/12/21"
                        className=" companyInput mb-4"
                      />
                     
                    </div>

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
                  </div>

                  <div className="nextbtn nextmobile cursor-pointer ">
                    <button
                      onClick={goToNextPage}
                      type="submit"
                      id="firstFormSubit2"
                    >
                      Next
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default CalledPagesPageOnePages;
