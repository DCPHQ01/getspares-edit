"use client";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import * as React from "react";
import Alert from "@mui/material/Alert";

import { useAppSelector } from "../../../redux";
import { useAppDispatch } from "../../../redux/hooks";
import { RootState } from "../../../redux";
import { setCurrentStep } from "../../../redux/features/company/companySlice";

interface CalledPagesPageThreePagesProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const CalledPagesPageThreePages = () => {
  const dispatch = useAppDispatch();

  const company = useAppSelector((state: RootState) => state.company);
  console.log("company ", company.companyForm);

  const handlePreviousPage = () => {
    dispatch(setCurrentStep(1));
  };

  const companyImage = sessionStorage.getItem("companyImage") || "";

  return (
    <div className="" style={{ width: "85%", margin: "auto" }} id="pageThree1">
      <div className="pageWrapper" id="pageThree2">
        <div className="hidden md:flex flex-col mt-8" id="pageThree3">
          <div className="mb-16 pageHeader w-94" id="pageThree4">
            <header className="font-bold text-base" id="pageThree5">
              Preview
            </header>

            <div className="flex subheaders" id="subheader3">
              <sub className="text-xs font-normal" id="pageThree6">
                Double-check all the information you provided
              </sub>
              <form method="dialog" id="pageThree7">
                <button
                  className="text-sm font-semibold skip cursor-pointer"
                  id="skip3"
                  onClick={handlePreviousPage}
                >
                  Back
                </button>
              </form>
            </div>
          </div>

          <Box
            component="form"
            id="pageThree8"
            className="flex gap-x-16 flex-col-reverse lg:flex-row lg:items-start   "
            noValidate
            // onSubmit={handleSubmit}
            autoComplete="off"
          >
            <Box>
              <Box>
                <TextField
                  inputProps={{ readOnly: true }}
                  required={true}
                  id="filledbasic5"
                  label="Name"
                  value={company.companyForm.name}
                  variant="filled"
                  type="text"
                  name="fullName"
                  placeholder="Enter name"
                  InputProps={{ disableUnderline: true }}
                  className="lg:w-[364px] w-[100%] mb-10 2xl:w-[35rem]"
                  sx={{ backgroundColor: "porcelain" }}
                />
              </Box>
              <Box>
                <TextareaAutosize
                  // inputProps={{ readOnly: true }}
                  readOnly={true}
                  required={true}
                  id="filledbasic6"
                  aria-label="Description"
                  name="description"
                  value={company.companyForm.description}
                  placeholder="Say something about your company"
                  // InputProps={{ disableUnderline: true }}
                  className="lg:w-[364px]  w-[100%] mb-10 2xl:w-[35rem]"
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
                  inputProps={{ readOnly: true }}
                  required={true}
                  type="url"
                  id="filledbasic7"
                  label="Website"
                  variant="filled"
                  value={company.companyForm.website}
                  name="website"
                  placeholder="www.ideytryam.com"
                  InputProps={{ disableUnderline: true }}
                  className="lg:w-[364px]  w-[100%] mb-10 2xl:w-[35rem]"
                  sx={{ backgroundColor: "porcelain" }}
                />
              </Box>
              <Box>
                <TextField
                  inputProps={{ readOnly: true }}
                  required={true}
                  id="filledbasic8"
                  label=""
                  variant="filled"
                  type="date"
                  // value={company.companyForm.date_founded}
                  name="date"
                  placeholder=""
                  InputProps={{ disableUnderline: true }}
                  className="lg:w-[364px] w-[100%] 2xl:w-[35rem] mb-10"
                  sx={{ backgroundColor: "porcelain" }}
                />
              </Box>

              <Box>
                <TextField
                  inputProps={{ readOnly: true }}
                  required={true}
                  id="filledbasic9"
                  label="Email address"
                  variant="filled"
                  value={company.companyForm.email}
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  InputProps={{ disableUnderline: true }}
                  // className="lg:w-[100%] w-[100%]"
                  className="  w-full lg:w-[364px]  mb-10 2xl:w-[35rem]"
                  // sx={{ backgroundColor: "porcelain" }}
                />
              </Box>

              <Box>
                <TextField
                  inputProps={{ readOnly: true }}
                  required={true}
                  id="filledbasic10"
                  label="Phone number"
                  variant="filled"
                  type="phoneNumber"
                  value={company.companyForm.phoneNumber}
                  name="number"
                  placeholder="09000000000"
                  InputProps={{ disableUnderline: true }}
                  className="  w-full lg:w-[364px]  mb-10 2xl:w-[35rem]"
                />
              </Box>
              <Box>
                <TextField
                  inputProps={{ readOnly: true }}
                  type="text"
                  required={true}
                  id="filledbasic11"
                  label="Address 1"
                  variant="filled"
                  value={company.companyForm.address}
                  name="address"
                  placeholder="371, Borno way, Lagos Nigeria"
                  InputProps={{ disableUnderline: true }}
                  // className="lg:w-[100%] w-[100%]"
                  className="  w-full lg:w-[364px]  mb-10 2xl:w-[35rem]"
                  // sx={{ backgroundColor: "porcelain" }}
                />
              </Box>

              {/* <Box>
                <TextField
                  inputProps={{ readOnly: true }}
                  type="text"
                  required={true}
                  id="filledbasic12"
                  label="Address 2"
                  variant="filled"
                  name="address"
                  placeholder="371, Borno way, Lagos Nigeria"
                  InputProps={{ disableUnderline: true }}
                  // className="lg:w-[100%] w-[100%]"
                  className="  w-full lg:w-[364px] mb-10 2xl:w-[35rem]"
                  // sx={{ backgroundColor: "porcelain" }}
                />
              </Box> */}

              {/* <Box>
                <TextField
                  inputProps={{ readOnly: true }}
                  type="text"
                  required={true}
                  id="filledbasic14"
                  label="Address 3"
                  variant="filled"
                  name="address"
                  placeholder="371, Borno way, Lagos Nigeria"
                  InputProps={{ disableUnderline: true }}
                  // className="lg:w-[100%] w-[100%]"/
                  className="  w-full lg:w-[364px]  mb-6 2xl:w-[35rem]"
                  // sx={{ backgroundColor: "porcelain" }}
                />
              </Box> */}

              {/* <Box>
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
                    <div key={index} className="mb-4">
                      <input
                        type="text"
                        placeholder="Enter address (Street Number, Town, City, State)"
                        value={inputValue}
                        onChange={(e) =>
                          handleInputChange(index, e.target.value)
                        }
                        className="mr-2"
                      />
                      <button
                        onClick={handleSaveAddress}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                      >
                        Save Address
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={handleAddAddress}
                    className="add-address"
                    id="addAnotherid"
                  >
                    Add another address
                  </button> 
                   <button className="px-4 py-2 bg-green-500 text-white rounded">
                    Add Address
                  </button>
                </div>
              </Box> */}
            </Box>

            <Box>
              <div className="inputImage imagetext flex justify-center items-center h-[283px] w-[316px]">
                <div className="h-[237px] w-[237px] m-auto">
                  <img
                    src={companyImage}
                    alt="Uploaded"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                {/* <TextField
                  inputProps={{ readOnly: true }}
                  required={true}
                  type="file"
                  name="image"
                  // className="inputImage imagetext"
                  sx={{ backgroundColor: "porcelain" }}
                  id="secondImageid5"
                  // placeholder="Add logo by clicking or drag and drop"
                /> */}
              </div>
            </Box>
          </Box>

          <div className="">
            <div className="nextbtn-wrapper cursor-pointer">
              <button
                // onClick={handleClick({
                //   vertical: "top",
                //   horizontal: "center",
                // })}
                type="submit"
                id="thirdFormSubmit6"
                className="nextbtn w-96 mt-40 mb-6 "
              >
                Save
              </button>
            </div>
            {/* <Box sx={{ width: 500 }}>
              <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                // onClose={handleClose}
                // sx={{ backgroundColor: "green" }}

                key={vertical + horizontal}
              >
                <Alert severity="success" variant="filled">
                  Company added successfully !
                </Alert>
              </Snackbar>
            </Box> */}
          </div>
        </div>

        <div className="absolute w-11/12">
          <div className="md:hidden m-auto">
            <div className="mb-16 mt-10 pageHeader ">
              <header className="font-bold text-base">Preview</header>
              <div className="flex subheaders" id="subheader1">
                <sub className="text-xs font-normal">
                  Double-check all the information you provided
                </sub>
                <form method="dialog">
                  <button
                    className="text-sm font-semibold skip cursor-pointer"
                    id="skip8"
                    onClick={handlePreviousPage}
                  >
                    Back
                  </button>
                </form>
              </div>
            </div>

            <div className="form-display flex flex-col-reverse">
              <form id="thirdFormWrapper" className="companyInputWrap">
                <input
                  readOnly={true}
                  type="text"
                  value={company.companyForm.name}
                  name="fullName"
                  id="previewNameId2"
                  className=" companyInput w-full mt-6"
                  placeholder="Name Enter name"
                />

                <br></br>

                <input
                  readOnly={true}
                  type="message"
                  value={company.companyForm.description}
                  name="description"
                  id="previewMessageId3"
                  placeholder="Description Say something about your company"
                  className=" companyInput mt-6"
                />

                <br></br>

                <input
                  readOnly={true}
                  type="url"
                  name="inputName"
                  value={company.companyForm.website}
                  id="previewWebsiteId4"
                  placeholder="Website www.123.com"
                  className=" companyInput mt-6"
                />
                <br></br>

                <input
                  readOnly={true}
                  type="date"
                  name="date"
                  // value={company.companyForm.date_founded}
                  id="previewDateId5"
                  placeholder="date funded 12/12/21"
                  className=" companyInput mt-6"
                />
                <br></br>
                <input
                  readOnly={true}
                  type="email"
                  name="email"
                  id="previewEmailId6"
                  value={company.companyForm.email}
                  className=" companyInput mt-6"
                  placeholder="Enter email"
                />
                <br></br>
                <input
                  readOnly={true}
                  type="number"
                  name="inputName"
                  value={company.companyForm.phoneNumber}
                  id="previewNumberId7"
                  placeholder="phone number"
                  className=" companyInput mt-6"
                />

                <br></br>

                <input
                  readOnly={true}
                  type="text"
                  name="inputName"
                  value={company.companyForm.address}
                  id="previewAddress1Id8"
                  placeholder="Address1"
                  className=" companyInput mt-6"
                />
                <br></br>

                {/* <input
                  readOnly={true}
                  type="text"
                  name="inputName"
                  id="previewAddress2Id9"
                  placeholder="Address2"
                  className=" companyInput mt-6"
                /> */}

                <br></br>

                {/* <input
                  readOnly={true}
                  type="text"
                  name="inputName"
                  id="previewAddress3Id10"
                  placeholder="Address3"
                  className=" companyInput mt-6"
                /> */}
              </form>

              <div className="" id="inputName4">
                <input
                  readOnly={true}
                  type="image"
                  alt="Add logo by clicking or drag and drop"
                  // onChange={handleOnchange}
                  // value={value.date}
                  className=" inputImage imagetext"
                  id="previewImageId11"
                />
                {/* <div className="">
                  <p>Company logo</p>
                </div> */}
                {/* <div className="edit-btn-Wrapper">
                  <div className="edit-btn" id="editBtn1">
                    <button>Edit logo</button>
                  </div>
                  <div className="edit-btn" id="editBtn2">
                    <button>Change logo</button>
                  </div>
                </div> */}
              </div>
            </div>

            <div className="">
              <div className="nextbtn-wrapper">
                <button
                  // onClick={handleClick({
                  //   vertical: "top",
                  //   horizontal: "center",
                  // })}
                  id="thirdFormSubmit2"
                  className="nextbtn nextbtnMobile h-12  mt-6 mb-20 cursor-pointer"
                >
                  Save
                </button>
              </div>
              {/* <Box sx={{ width: 500 }}>
                <Snackbar
                  anchorOrigin={{ vertical, horizontal }}
                  open={open}
                  // onClose={handleClose}
                  // sx={{ backgroundColor: "green" }}

                  key={vertical + horizontal}
                >
                  <Alert severity="success" variant="filled">
                    Company added successfully !
                  </Alert>
                </Snackbar>
              </Box> */}
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

export default CalledPagesPageThreePages;
