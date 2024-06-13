"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import ImageComponent from "../../../components/imageComp/ImageComponent";
import TextField from "@mui/material/TextField";
import {
  MdArrowForward,
  MdArrowRight,
  MdChevronLeft,
  MdChevronRight,
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

const CalledPagesPageFivePages: React.FC<ChildProps> = ({
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
    // setActive(active);
  };

  const goToPreviousPage = () => {
    // Navigate to the previous page if it's available
    setStep(step - 1);
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

  const dimension = [
    {
      value: "medium",
      label: "Medium",
    },
    {
      value: "small",
      label: "Small",
    },
    {
      value: "large",
      label: "Large",
    },
    {
      value: "x-large",
      label: "X-Large",
    },
  ];

const CalledPagesPageFivePages = () => {

  return (
    <>
      <div className="" style={{ width: "48%" }} id="pageone1">
        <div className="pageWrapper" id="pageone2">
          <div className="hidden md:flex flex-col mt-[4.5rem]" id="pageone3">
            <div className="flex gap-x-10 justify-between">
              <div className="">
                <div className="mb-10 pageHeader w-94" id="pageone4">
                  <header className="font-bold text-lg" id="pageone5">
                    Technical details
                  </header>

                  <hr className="w-[80%]"></hr>
                </div>

                {/* here */}

                <Box
                  component="form"
                  id="pageone8"
                  className="flex gap-x-16 flex-col-reverse lg:flex-row lg:items-start   "
                  noValidate
                  autoComplete="off"
                >
                  <Box>
                    <Box>
                      <TextField
                        required={true}
                        id="filledbasic"
                        label="Manufacturer"
                        variant="filled"
                        type="text"
                        name="fullName"
                        placeholder="Enter"
                        InputProps={{ disableUnderline: true }}
                        className=" w-[29.4rem] mb-5 "
                        sx={{ backgroundColor: "porcelain" }}
                      />
                    </Box>

                    <Box>
                      <TextField
                        required={true}
                        type="url"
                        id="filledbasic"
                        label="Manufacturer part number"
                        variant="filled"
                        name="website"
                        placeholder="12345"
                        InputProps={{ disableUnderline: true }}
                        className="w-[29.4rem] mb-5 "
                        sx={{ backgroundColor: "porcelain" }}
                      />
                    </Box>

                    <Box>
                      <TextField
                        required={true}
                        id="filledbasic"
                        label="Brand"
                        variant="filled"
                        type="text"
                        name="fullName"
                        placeholder="E765"
                        InputProps={{ disableUnderline: true }}
                        className=" w-[29.4rem] mb-5 "
                        sx={{ backgroundColor: "porcelain" }}
                      />
                    </Box>

                    <Box>
                      <TextField
                        required={true}
                        id="filledbasic"
                        label="Model"
                        variant="filled"
                        type="text"
                        name="fullName"
                        placeholder="E765"
                        InputProps={{ disableUnderline: true }}
                        className=" w-[29.4rem] mb-5 "
                        sx={{ backgroundColor: "porcelain" }}
                      />
                    </Box>

                    <Box>
                      <TextField
                        required={true}
                        id="filledbasic"
                        label="Weight"
                        variant="filled"
                        type="text"
                        name="fullName"
                        placeholder="786 kg"
                        InputProps={{ disableUnderline: true }}
                        className=" w-[29.4rem] mb-5 "
                        sx={{ backgroundColor: "porcelain" }}
                      />
                    </Box>

                    <Box>
                      {/* <TextField
                        required={true}
                        id="filledbasic"
                        label="Dimension"
                        variant="filled"
                        type="text"
                        name="fullName"
                        placeholder="Medium"
                        InputProps={{ disableUnderline: true }}
                        className=" w-[29.4rem] mb-5 "
                        sx={{ backgroundColor: "porcelain" }}

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
                      /> */}

                      <TextField
                        className="w-[29.4rem] mb-5 "
                        sx={{
                          backgroundColor: "porcelain",
                          borderBottom: "red",
                        }}
                        id="filled-select-currency"
                        select
                        placeholder="Medium"
                        label="Dimensions"
                        defaultValue="medium"
                        variant="filled"
                      >
                        {dimension.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>

                      />

                    </Box>

                    <Box>
                      <TextField
                        required={true}
                        id="filledbasic"
                        label="Country of origin"
                        variant="filled"
                        type="text"
                        name="fullName"
                        placeholder="Aba"
                        InputProps={{ disableUnderline: true }}
                        className=" w-[29.4rem] mb-5 "
                        sx={{ backgroundColor: "porcelain" }}
                      />
                    </Box>
                  </Box>
                </Box>
                <div className="flex justify-between w-[100%] mt-32">
                  <div id="firstPreviousbtn9">
                    <button
                      type="submit"
                      className="w-[116px] flex justify-center gap-x-3 pt-2 h-10 font-semibold border rounded-full text-mecaBluePrimaryColor border-mecaBluePrimaryColor mt-6 mb-6 "
                    >
                      <span>
                        <MdChevronLeft className="mt-1 " />
                      </span>
                      <p> Previous</p>
                    </button>
                  </div>
                  <div className="">
                    <button
                      type="submit"
                      id="thirdFormSubmit"
                      className="w-[116px] flex justify-center gap-x-3 pt-2 h-10 font-semibold border rounded-full text-mecaBluePrimaryColor border-mecaBluePrimaryColor mt-6 mb-6 "
                    >
                      <p>Next </p>
                      <span>
                        <MdChevronRight className="mt-1 " />
                      </span>
                    </button>
                  </div>
                </div>
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
                        title="inputPreview"
                        readOnly={true}
                        className="scrollbar-none p-2 pl-0 border-white bg-white placeholder:text-black"
                      />
                    </div>
                    <div className="">
                      <p className="flex justify-end mr-6">Price</p>
                      <input
                        title="inputPreview2"
                        readOnly={true}
                        className="scrollbar-none p-2 pl-0 bg-white border-white placeholder:text-black"
                      />
                    </div>
                  </div>
                  <div className="mt-8">
                    <p>Description</p>
                    <textarea
                      title="descriptionPreview"
                      readOnly={true}
                      className="scrollbar-none border-white pl-0  w-full h-32 p-2 bg-white placeholder:text-black"
                    />
                  </div>
                </div>
              </div>
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

export default CalledPagesPageFivePages;
