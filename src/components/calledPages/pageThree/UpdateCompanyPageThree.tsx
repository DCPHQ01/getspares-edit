"use client";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import * as React from "react";

import { useAppSelector } from "../../../redux";
import { useAppDispatch } from "../../../redux/hooks";
import { RootState } from "../../../redux";
import { setCurrentStep } from "../../../redux/features/company/companySlice";
import { useUpdateCompanyMutation } from "../../../redux/features/company/companyQuery";
import { useRouter } from "next/navigation";
import { paths } from "../../../path/paths";
import { useGetUserDetailsMutation } from "../../../redux/features/users/userQuery";
import {useEffect, useState} from "react";


interface PageThreeProps {
   companyData: {
      name?: string;
      description?: string;
      website?: string;
      companyEmail?: string;
      phoneNumber?: string;
      cac?: string;
      address1?: string;
      address2?:string;
   };
}

const UpdateCompanyPageThree : React.FC<PageThreeProps> = ({companyData}) => {
   const dispatch = useAppDispatch();
   const router = useRouter();
   const initialFormState = {
      name: "",
      cac: "",
      description: "",
      websiteUrl: "",
      companyEmail: "",
      address1: "",
      address2: "",
      phoneNumber: "",
      imageUrl:''
   };
   const [inputs, setInputs] = useState(initialFormState);


   const handlePreviousPage = () => {
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
         <div className="tw-w-full md:w-11/12" id="pageThree1">
            <div className="pageWrapper" id="pageThree2">
               <div className="md:flex flex-col mt-8" id="pageThree3">
                  <div className="mb-16 pageHeader w-94" id="pageThree4">


                     <div className="flex items-center subheaders" id="subheader3">
                        <div>
                           <header className="font-bold text-base" id="pageThree5">
                              Preview
                           </header>
                           <sub className="text-xs font-normal" id="pageThree6">
                              Double-check all the information you provided
                           </sub>
                        </div>

                        <div className="flex gap-x-3 justify-between">
                           <div
                              className="editBtn cursor-pointer"
                              id="firstPreviousbtn9"
                           >
                              <button
                                 onClick={handlePreviousPage}
                              >Edit
                              </button>
                           </div>
                           <div
                              className="saveBtn cursor-pointer"
                              id="pageTwo12"
                           >
                              <button
                                 id="secondFormSubmit"
                                 className="cursor-pointer"
                                 onClick={()=>router.push(paths.toDashboard())}
                              >
                                 Save
                              </button>
                           </div>
                        </div>

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
                              required={true}
                              id="filledbasic5"
                              label="Name"
                              value={inputs.name}
                              variant="filled"
                              type="text"
                              name="fullName"
                              InputProps={{ disableUnderline: true , readOnly: true}}
                              className="lg:w-[364px] w-[100%] mb-10 2xl:w-[35rem]"
                              sx={{ backgroundColor: "porcelain" }}
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
                              minRows={6}
                              InputProps={{ disableUnderline: true , readOnly: true}}
                              className="lg:w-[364px] w-[100%] mb-10 2xl:w-[35rem]"
                              sx={{ backgroundColor: "porcelain" }}
                              value={inputs.description}
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
                              value={inputs.websiteUrl}
                              name="website"
                              InputProps={{ disableUnderline: true , readOnly: true}}
                              className="lg:w-[364px]  w-[100%] mb-10 2xl:w-[35rem]"
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
                              value={inputs.companyEmail}
                              type="email"
                              name="email"
                              placeholder="Enter email"
                              InputProps={{ disableUnderline: true , readOnly: true}}
                              className="  w-full lg:w-[364px]  mb-10 2xl:w-[35rem]"
                              sx={{ backgroundColor: "porcelain" }}
                           />
                        </Box>

                        <Box>
                           <TextField
                              required={true}
                              id="filledbasic10"
                              label="Phone number"
                              variant="filled"
                              type="phoneNumber"
                              value={inputs.phoneNumber}
                              name="number"
                              sx={{ backgroundColor: "porcelain" }}
                              InputProps={{ disableUnderline: true , readOnly: true}}
                              className="  w-full lg:w-[364px]  mb-10 2xl:w-[35rem]"
                           />
                        </Box>
                        <Box>
                           <TextField
                              type="text"
                              required={true}
                              id="filledbasic11"
                              label="Address 1"
                              variant="filled"
                              value={inputs.address1}
                              InputProps={{ disableUnderline: true , readOnly: true}}
                              name="address1"
                              sx={{ backgroundColor: "porcelain" }}
                              className="  w-full lg:w-[364px]  mb-10 2xl:w-[35rem]"
                           />
                        </Box>
                        <Box>
                           <TextField
                              type="text"
                              required={true}
                              id="filledbasic11"
                              label="Address 2"
                              variant="filled"
                              value={inputs.address2}
                              InputProps={{ disableUnderline: true , readOnly: true}}
                              name="address2"
                              sx={{ backgroundColor: "porcelain" }}
                              className="  w-full lg:w-[364px]  mb-10 2xl:w-[35rem]"
                           />
                        </Box>
                     </Box>

                     <Box>
                        <div className="inputImage  flex justify-center items-center h-[283px] w-[316px]">
                           <div className="h-[237px] w-[237px] m-auto">
                              <img
                                 src={inputs.imageUrl}
                                 alt="Uploaded"
                                 className="w-full h-full object-cover rounded-full"
                              />
                           </div>

                        </div>
                     </Box>
                  </Box>
               </div>
            </div>
         </div>
      </>
   );
};

export default UpdateCompanyPageThree;
