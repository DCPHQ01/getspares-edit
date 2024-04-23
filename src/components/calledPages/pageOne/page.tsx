"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  TextareaAutosize as BaseTextareaAutosize,
  TextareaAutosize,
} from "@mui/base/TextareaAutosize";

interface ChildProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const CalledPagesPageOnePages: React.FC<ChildProps> = ({
  step,
  setStep,
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

  return (
    <>
      <div className="" style={{ width: "85%", margin: "auto" }}>
        <div className="pageWrapper">
          <div className="hidden md:flex flex-col mt-8">
            <div className="mb-16 pageHeader w-94">
              <header className="font-bold text-base">Company details</header>
              <div className="flex subheaders" id="subheader1">
                <sub className="text-xs font-normal">Provide details</sub>

                <form method="dialog">
                  <button className="text-sm font-semibold skip " id="skip1">
                    Skip
                  </button>
                </form>
              </div>
            </div>

            {/* here */}

            <Box
              component="form"
              className="flex gap-x-16 flex-col flex-col-reverse lg:flex-row lg:items-start   "
              noValidate
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <Box>
                <Box>
                  <TextField
                    required={true}
                    id="filled-basic"
                    label="Name"
                    variant="filled"
                    type="text"
                    name="fullName"
                    placeholder="Enter name"
                    InputProps={{ disableUnderline: true }}
                    className="lg:w-[364px] w-[100%] mb-10 2xl:w-[35rem]"
                    sx={{ backgroundColor: "porcelain" }}
                    onChange={(e) => setFullName(e.target.value)}
                    onBlur={validateFullName}
                  />
                  {errors.fullName && (
                    <p className="error-color">{errors.fullName}</p>
                  )}
                </Box>
                <Box>
                  <TextareaAutosize
                    required={true}
                    onChange={(e) => setMessage(e.target.value)}
                    onBlur={validateMessage}
                    id="filled-basic"
                    aria-label="Description"
                    variant="filled"
                    type="text"
                    name="fullName"
                    placeholder="Say something about your company"
                    InputProps={{ disableUnderline: true }}
                    className="lg:w-[364px]  w-[100%] mb-10 2xl:w-[35rem]"
                    style={{
                      backgroundColor: "#EFF2F3",
                      height: "223px",
                      borderColor: "none",
                      padding: "20px",
                    }}
                  />
                  {errors.message && (
                    <p className="error-color">{errors.message}</p>
                  )}
                </Box>
                <Box>
                  <TextField
                    required={true}
                    onChange={(e) => setWebsite(e.target.value)}
                    onBlur={validateWebsite}
                    type="url"
                    id="filled-basic"
                    label="Website"
                    variant="filled"
                    name="fullName"
                    placeholder="www.ideytryam.com"
                    InputProps={{ disableUnderline: true }}
                    className="lg:w-[364px]  w-[100%] mb-10 2xl:w-[35rem]"
                    sx={{ backgroundColor: "porcelain" }}
                  />
                  {errors.website && (
                    <p className="error-color">{errors.website}</p>
                  )}
                </Box>
                <Box>
                  <TextField
                    required={true}
                    onChange={(e) => setDate(e.target.value)}
                    onBlur={validateDate}
                    id="filled-basic"
                    label=""
                    variant="filled"
                    type="date"
                    name="fullName"
                    placeholder=""
                    InputProps={{ disableUnderline: true }}
                    className="lg:w-[364px] w-[100%] 2xl:w-[35rem]"
                    sx={{ backgroundColor: "porcelain" }}
                  />
                  {errors.date && <p className="error-color">{errors.date}</p>}
                </Box>
              </Box>
              <Box>
                <div className="inputImage imagetext h-[283px] w-[316px]">
                  <TextField
                    required={true}
                    type="file"
                    name="image"
                    // accept="image/*"
                    onChange={(e) =>
                      setImage(e.target.files ? e.target.files[0] : null)
                    }
                    // className="inputImage imagetext"
                    sx={{ backgroundColor: "porcelain" }}
                    id="secondImageid"
                    // placeholder="Add logo by clicking or drag and drop"
                  />
                  {errors.image && (
                    <p className="error-color">{errors.image}</p>
                  )}
                </div>
              </Box>
            </Box>
            <div className="">
              <div onClick={goToNextPage} className="nextbtn-wrapper">
                <button
                  type="submit"
                  id="thirdFormSubmit"
                  className="nextbtn w-96 mt-40 mb-6 "
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute  w-11/12">
          <div className="md:hidden m-auto">
            <div className="mb-16 pageHeader">
              <header className="font-bold text-base">Company details</header>
              <div className="flex subheaders" id="subheader1">
                <sub className="text-xs font-normal">
                  Double-check all the information you provided
                </sub>
                <form method="dialog">
                  <button className="text-sm font-semibold skip " id="skip1">
                    Skip
                  </button>
                </form>
              </div>
              <div className="form-display flex flex-col flex-col-reverse mt-8">
                <form
                  id="firstFormWrapper"
                  onSubmit={handleSubmit}
                  className="companyInputWrap"
                >
                  <div className="flex flex-col flex-col-reverse">
                    <div>
                      <input
                        required={true}
                        onChange={(e) => setFullName(e.target.value)}
                        onBlur={validateFullName}
                        type="text"
                        name="fullname"
                        id="fullnameid"
                        className="companyInput w-full mb-4"
                        // className="w-[394px] h-[50px]"
                        placeholder="Name Enter name"
                      />
                      {errors.fullName && (
                        <p className="error-color">{errors.fullName}</p>
                      )}

                      <br></br>

                      <textarea
                        required={true}
                        onChange={(e) => setMessage(e.target.value)}
                        onBlur={validateMessage}
                        name="message"
                        id="messageid"
                        placeholder="Description Say something about your company"
                        className=" companyInput inputText w-full mb-8 lg:w-[364px]"
                      ></textarea>
                      {errors.message && (
                        <p className="error-color">{errors.message}</p>
                      )}

                      <br></br>

                      <input
                        required={true}
                        onChange={(e) => setWebsite(e.target.value)}
                        onBlur={validateWebsite}
                        type="url"
                        name="website"
                        id="websiteid"
                        placeholder="Website www.123.com"
                        className="companyInput mb-4 w-full lg:w-[364px]"
                      />
                      {errors.website && (
                        <p className="error-color">{errors.website}</p>
                      )}
                      <br></br>
                      <input
                        required={true}
                        onChange={(e) => setDate(e.target.value)}
                        onBlur={validateDate}
                        type="date"
                        name="date"
                        id="dateid"
                        placeholder="date funded 12/12/21"
                        className=" companyInput mb-4"
                      />
                      {errors.date && (
                        <p className="error-color">{errors.date}</p>
                      )}
                    </div>

                    <div>
                      <div className="inputImage imagetext h-[283px] w-[316px]">
                        <input
                          required={true}
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            setImage(e.target.files ? e.target.files[0] : null)
                          }
                          name="image"
                          // className="inputImage imagetext"
                          className="mb-4"
                          id="firstImageId"
                        />
                        {errors.image && (
                          <p className="error-color">{errors.image}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="nextbtn nextmobile cursor-pointer ">
                    <button
                      onClick={goToNextPage}
                      type="submit"
                      id="firstFormSubit"
                    >
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
