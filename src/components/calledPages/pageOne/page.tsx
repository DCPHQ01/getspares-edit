"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import ImageComponent from "../../../components/imageComp/ImageComponent";
import TextField from "@mui/material/TextField";
import { MdPhotoLibrary } from "react-icons/md";

import {
  TextareaAutosize,
} from "@mui/base/TextareaAutosize";
import formLogo from "../../../assets/images/formLogo.jpg";
import { useAppSelector } from "../../../redux";
import { useAppDispatch } from "../../../redux/hooks";
import { RootState } from "../../../redux";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import dayjs from "dayjs";
import {
  setCompanyForm,
  setCurrentStep,
} from "../../../redux/features/company/companySlice";
import { FaUpload } from "react-icons/fa";
import Link from "next/link";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { paths } from "../../../path/paths";

const ProSpan = styled("span")({
  display: "inline-block",
  height: "1em",
  width: "1em",
  verticalAlign: "middle",
  marginLeft: "0.3em",
  marginBottom: "0.08em",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundImage: "url(https://mui.com/static/x/pro.svg)",
});
function Label({
  componentName,
  valueType,
  isProOnly,
}: {
  componentName: string;
  valueType: string;
  isProOnly?: boolean;
}) {
  const content = (
    <span>
      <strong>{componentName}</strong>
    </span>
  );
  if (isProOnly) {
    return (
      <Stack direction="row" spacing={0.5} component="span">
        <Tooltip title="Included on Pro package">
          <a
            href="https://mui.com/x/introduction/licensing/#pro-plan"
            aria-label="Included on Pro package"
          >
            <ProSpan />
          </a>
        </Tooltip>
        {content}
      </Stack>
    );
  }

  return content;
}

interface PageOneProps {
  companyData?: {
    name: string;
    description: string;
    website: string;
    companyEmail: string;
    phoneNumber: string;
    cac: string;
    address1: string;
    address2:string;
  };
}



const CalledPagesPageOnePages: React.FC<PageOneProps> = ({companyData}) => {
  const [website, setWebsite] = useState("");
  const [fullName, setFullName] = useState("");
  const [cacNumber, setCacNumber] = useState("");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const initialFormState = {
    name: "",
    cac: "",
    description: "",
    website: "",
  };
  const [inputs, setInputs] = useState(initialFormState);


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

  function validateCac() {
    if (!cacNumber.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        cac: "CAC number is required",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, cac: "" }));
    }
  }

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

  const dispatch = useAppDispatch();

  const {companyForm} = useAppSelector((state: RootState) => state.company);

  const [formImage, setFormImage] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      const storedImage = sessionStorage.getItem("companyImage");
      return storedImage ? storedImage : null;
    }
    return null;
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setFormImage(result);
        sessionStorage.setItem("companyImage", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleNextPage = () => {
    dispatch(setCurrentStep(1));
  };

  const populateData = (userData:any) => {
    const userDataKeys = Object.keys(inputs)
    if(userData){
      userDataKeys.forEach(key => {
        setInputs((values) => ({ ...values, [key]: userData[key] ? userData[key] : '' }));
      })
    }
  }


  useEffect(() => {
    if(companyData){
      populateData(companyData)
    }
  },[companyData])

  return (
    <>
      <div className="" style={{ width: "85%", margin: "auto" }} id="pageone1">
        {/* desktop */}
        <div className="pageWrapper" id="pageone2">
          <div className="hidden md:flex flex-col mt-8" id="pageone3">
            <div className="mb-16 pageHeader w-94" id="pageone4">
              <header className="font-bold text-base" id="pageone5">
                Company details
              </header>
              <div className="flex subheaders" id="subheader1">
                <sub className="text-xs font-normal" id="pageone6">
                  Provide details
                </sub>
              </div>
            </div>


            <Box
              component="form"
              id="pageone8"
              className="flex gap-x-16 flex-col-reverse lg:flex-row lg:items-start   "
              noValidate
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <Box className={'flex flex-col gap-8'}>
                <Box>
                  <TextField
                    required={true}
                    id="filledbasic"
                    label="Name"
                    variant="filled"
                    type="text"
                    name="fullName"
                    placeholder="Enter name"
                    InputProps={{ disableUnderline: true }}
                    className="lg:w-[364px] w-[100%] mb-10 2xl:w-[35rem]"
                    sx={{ backgroundColor: "porcelain" }}
                    value={inputs.name}
                    onBlur={validateFullName}
                  />
                </Box>
                <Box>

                  <TextField
                    required={true}
                    id="filledbasic"
                    label="C.A.C number or Business registration number"
                    variant="filled"
                    type="text"
                    name="cacNumber"
                    placeholder="Enter number"
                    InputProps={{ disableUnderline: true }}
                    className="lg:w-[364px] w-[100%] mb-10 2xl:w-[35rem]"
                    sx={{ backgroundColor: "porcelain" }}
                    value={inputs.cac}
                    onBlur={validateCac}
                  />
                </Box>
                <Box>
                  <TextField
                     required={true}
                     id="filledbasic"
                     label="Description"
                     variant="filled"
                     type="text"
                     name="cacNumber"
                     multiline
                     minRows={7}
                     maxRows={9}
                     placeholder="Say something about your company"
                     InputProps={{ disableUnderline: true }}
                     className="lg:w-[364px] w-[100%] mb-10 2xl:w-[35rem]"
                     sx={{ backgroundColor: "porcelain" }}
                     value={inputs.description}
                  />

                  {/* {errors.message && (
                    <p className="error-color">{errors.message}</p>
                  )} */}
                </Box>
                <Box>
                  <TextField
                    required={true}
                    value={inputs.website}
                    onBlur={validateWebsite}
                    type="url"
                    id="filledbasic"
                    label="Website"
                    variant="filled"
                    name="website"
                    placeholder="www.ideytryam.com"
                    InputProps={{ disableUnderline: true }}
                    className="lg:w-[364px]  w-[100%] mb-10 2xl:w-[35rem]"
                    sx={{ backgroundColor: "porcelain" }}
                  />
                  {errors.website && (
                    <p className="error-color -mt-8">{errors.website}</p>
                  )}
                </Box>
              </Box>
              <Box>
                <div className="inputImage imagetext h-[283px] w-[316px] pt-6">
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
                    <div className="">
                      <form
                        method="dialog"
                        id="confirmpageButton"
                        className="absolute lg:ml-72 ml-96"

                        // className={nunito_sans.className}
                      >
                        <Link href={paths.toModalPage()}>
                          <button
                            type="button"
                            id="cancelbtnDiv"
                            className="btn btn-sm btn-circle btn-ghost font-bold w-3 h-3 cursor-pointer"
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
            <div className="">
              <div className="nextbtn-wrapper" onClick={handleNextPage}>
                <button
                  type="submit"
                  id="thirdFormSubmit"
                  className="nextbtn w-96 mt-40 mb-6 cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* mobile */}

        <div className="absolute  w-11/12" id="pageone9">
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
                  <button
                    type="button"
                    className="text-sm font-semibold skip cursor-pointer"
                    id="skipbtn2"
                    onClick={handleNextPage}
                  >
                    Skip
                  </button>
                </form>
              </div>
              <div
                className="form-display flex flex-col-reverse mt-8"
                id="pageone13"
              >
                <form
                  id="firstFormWrapper"
                  onSubmit={handleSubmit}
                  className="companyInputWrap"
                >
                  <div className="flex flex-col-reverse" id="pageone14">
                    <div>
                      <input
                        required={true}
                        value={companyForm?.name}
                        onChange={(e) =>
                          dispatch(
                            setCompanyForm({
                              ...companyForm,
                              name: e.target.value,
                            })
                          )
                        }
                        onBlur={validateFullName}
                        type="text"
                        name="fullname"
                        id="fullnameid2"
                        className="companyInput w-full mb-4"
                        // className="w-[394px] h-[50px]"
                        placeholder="Name Enter name"
                      />
                      {/* {errors.fullName && (
                        <p className="error-color">{errors.fullName}</p>
                      )} */}

                      <br></br>

                      <textarea
                       required={true}
                       value={companyForm?.description}
                       onChange={(e) =>
                          dispatch(
                             setCompanyForm({
                               ...companyForm,
                               description: e.target.value,
                             })
                          )
                       }
                       onBlur={validateMessage}
                       name="message"
                       id="messageid2"
                       placeholder="Description Say something about your company"
                       className=" companyInput inputText w-full mb-8 lg:w-[364px]"
                       />
                      {/* {errors.message && (
                        <p className="error-color">{errors.message}</p>
                      )} */}

                      <br></br>

                      <input
                        required={true}
                        value={companyForm?.website}
                        onChange={(e) =>
                          dispatch(
                            setCompanyForm({
                              ...companyForm,
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
                      {/* {errors.website && (
                        <p className="error-color">{errors.website}</p>
                      )} */}
                      <br></br>

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
                            title="Upload Image"
                            placeholder="Choose an image"
                          />
                        </div>

                        {/* {formImage && (

                  )} */}
                        {formImage ? (
                          <div className="">
                            <form
                              method="dialog"
                              id="confirmpageButton"
                              className="absolute right-0 pr-4"
                              // className={nunito_sans.className}
                            >
                              <Link href={paths.toModalPage()}>
                                <button
                                  id="cancelbtn"
                                  className="btn btn-sm btn-circle btn-ghost font-bold w-3 h-3 cursor-pointer"
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

                  <div
                    className="nextbtn nextmobile cursor-pointer"
                    onClick={handleNextPage}
                  >
                    <button type="submit" id="firstFormSubit2">
                      Next
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalledPagesPageOnePages;
