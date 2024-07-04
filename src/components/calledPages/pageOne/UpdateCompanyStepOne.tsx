"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import ImageComponent from "../../../components/imageComp/ImageComponent";
import TextField from "@mui/material/TextField";
import { MdPhotoLibrary } from "react-icons/md";

import { TextareaAutosize } from "@mui/base/TextareaAutosize";
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
import { useUpdateCompanyMutation } from "../../../redux/features/company/companyQuery";
import { uploadImage } from "../../utils";

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

const UpdateCompanyStepOne: React.FC<PageOneProps> = ({ companyData }) => {
  const dispatch = useAppDispatch();
  const [formImage, setFormImage] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [updateCompanyDetails, { isLoading, isError }] =
    useUpdateCompanyMutation();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  const validateWebsite = () => {
    const websiteRegex =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;
    if (inputs.websiteUrl && !websiteRegex.test(inputs.websiteUrl)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        website: "Invalid website address",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, website: "" }));
    }
  };

  function validateCac() {
    if (!inputs.cac.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        cac: "CAC number is required",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, cac: "" }));
    }
  }

  const setUploadedImage = (e: string) => {
    setInputs((values) => ({ ...values, imageUrl: e }));
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

  const deleteImage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setFormImage("");
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleNextPage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let res;

    if (Object.values(errors).some((error) => error)) {
      return;
    }
    try {
      res = await updateCompanyDetails(inputs).unwrap();
      dispatch(setCurrentStep(1));
    } catch (e: any) {
      e.data;
    }
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

  useEffect(() => {
    if (companyData) {
      populateData(companyData);
    }
  }, [companyData]);

  return (
    <>
      <div className="tw-w-full md:w-11/12" id="pageone1">
        {/* desktop */}
        <div className="pageWrapper" id="pageone2">
          <div className="md:flex flex-col mt-8" id="pageone3">
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
              className="flex md:gap-x-16 flex-col-reverse lg:flex-row lg:items-start w-full "
              noValidate
              autoComplete="off"
            >
              <Box className={"flex flex-col gap-0.5 md:gap-4"}>
                <Box>
                  <TextField
                    id="filledbasic"
                    label="Name"
                    variant="filled"
                    type="text"
                    name="name"
                    onChange={handleChange}
                    placeholder="Enter name"
                    InputProps={{ disableUnderline: true, readOnly: true }}
                    className="lg:w-[364px] w-[100%] mb-10 2xl:w-[35rem]"
                    sx={{ backgroundColor: "porcelain" }}
                    value={inputs.name}
                  />
                </Box>
                <Box>
                  <TextField
                    id="filledbasic"
                    label="C.A.C number or Business registration number"
                    variant="filled"
                    type="text"
                    name="cac"
                    onChange={handleChange}
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
                    id="filledbasic"
                    label="Description"
                    variant="filled"
                    type="text"
                    name="description"
                    multiline
                    onChange={handleChange}
                    minRows={6}
                    maxRows={7}
                    placeholder="Say something about your company"
                    InputProps={{ disableUnderline: true }}
                    className="lg:w-[364px] w-[100%] mb-10 2xl:w-[35rem]"
                    sx={{ backgroundColor: "porcelain" }}
                    value={inputs.description}
                  />
                </Box>
                <Box>
                  <TextField
                    value={inputs.websiteUrl}
                    onBlur={validateWebsite}
                    onChange={handleChange}
                    type="url"
                    id="filledbasic"
                    label="Website"
                    variant="filled"
                    name="websiteUrl"
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
            <div className="nextbtn-wrapper">
              <div>
                <button
                  type="submit"
                  id="thirdFormSubmit"
                  onClick={(e) => handleNextPage(e)}
                  className="nextbtn md:mt-40  mb-16 cursor-pointer"
                >
                  Save & Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateCompanyStepOne;
