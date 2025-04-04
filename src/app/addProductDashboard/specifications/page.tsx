"use client";
import React, { use, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import ImageComponent from "../../../components/imageComp/ImageComponent";
import TextField from "@mui/material/TextField";
import { MdChevronLeft, MdChevronRight, MdPhotoLibrary } from "react-icons/md";
import { paths } from "../../../path/paths";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {setAddImages} from "../../../redux/features/dashboard/dashboardSlice";

const CalledPagesPageFourPages = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [specifications, setSpecifications] = useState({
    quantityInPack: "",
    color: "",
  });

  const dispatch = useAppDispatch()
  useEffect(() => {
    const storedBasicInfoValues = sessionStorage?.getItem("basicInfoValues");
    const parsedBasicInfoValues =
      storedBasicInfoValues && JSON?.parse(storedBasicInfoValues);

    if (parsedBasicInfoValues) {
      setProductName(parsedBasicInfoValues.name);
      setPrice(parsedBasicInfoValues.amount);
      setDescription(parsedBasicInfoValues.description);
    }
  }, []);

  const handleViewPreviousImages = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  const router = useRouter();

  useEffect(() => {
    const storedImages = JSON.parse(sessionStorage.getItem('images') || '[]');
    if (storedImages.length > 0) {
    dispatch(setAddImages(storedImages))
    }
  }, [dispatch]);

  const dashboardImages = useAppSelector((state)=> state.dashboard.image)
  console.log("dashboard images ", dashboardImages)

  const handleViewNextImages = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  };
  const handlePreviousPage = () => {
    router.push(paths.toAddProductDashboardAddImages());
  };
  const handleNextPage = () => {
    router.push(paths.toAddProductDashboardDetails());
    sessionStorage.setItem("specInfo", JSON.stringify(specifications));
  };

  const handleSpecChange = (e: any) => {
    const { name, value } = e.target;

    setSpecifications((prevValues) => {
      const newValues = { ...prevValues, [name]: value };
      sessionStorage.setItem("specInfo", JSON.stringify(newValues));
      return newValues;
    });
  };

  const productSpec = useAppSelector((state) => state.company.productData);

  const populateData = (userData: any) => {
    const userDataKeys = Object.keys(specifications);
    if (userData) {
      userDataKeys.forEach((key) => {
        if (key === "color") {
          setSpecifications((values: any) => ({
            ...values,
            [key]: userData?.productInformation?.color,
          }));
        } else {
          setSpecifications((values) => ({
            ...values,
            [key]: userData[key] ? userData[key] : "",
          }));
        }
      });
    }
  };

  useEffect(() => {
    const savedSpec = sessionStorage.getItem("specInfo");
    if (savedSpec) {
      setSpecifications(JSON.parse(savedSpec));
    } else if (productSpec) {
      populateData(productSpec);
    }
  }, [productSpec]);

  return (
    <>
      <div className="lg:w-[48%] w-[100%]" id="pageone1">
        <div className="pageWrapper" id="pageone2">
          <div className="md:flex flex-col lg:mt-[4.5rem] mt-56" id="pageone3">
            <div className="lg:flex lg:gap-x-10 lg::justify-between ">
              <div className="">
                <div className="mb-10 pageHeader w-94" id="pageone4">
                  <header className="font-bold text-lg" id="pageone5">
                    Specifications
                  </header>

                  <hr className="lg:w-[80%] w-[100%]"></hr>
                </div>
                <Box
                  component="form"
                  id="pageone8"
                  className="flex gap-y-4 flex-col-reverse lg:items-start   "
                  noValidate
                  autoComplete="off"
                >
                  <Box>
                    <TextField
                      required={true}
                      id="quantityInPack"
                      label="Quantity in a pack"
                      variant="filled"
                      type="text"
                      name="quantityInPack"
                      placeholder="12"
                      InputProps={{ disableUnderline: true }}
                      className=" lg:w-[29.4rem] w-[100%] mb-5 "
                      sx={{ backgroundColor: "porcelain" }}
                      value={specifications.quantityInPack}
                      onChange={handleSpecChange}
                    />
                  </Box>

                  <Box>
                    <TextField
                      required={true}
                      type="url"
                      id="filledbasic"
                      label="Color"
                      variant="filled"
                      name="color"
                      placeholder="Select color"
                      InputProps={{ disableUnderline: true }}
                      className="lg:w-[29.4rem] w-[100%]  mb-5 "
                      sx={{ backgroundColor: "porcelain" }}
                      value={specifications.color}
                      onChange={handleSpecChange}
                    />
                  </Box>
                </Box>

                <div className="flex  justify-between w-[100%] mt-32">
                  <div id="firstPreviousbtn9">
                    <button
                      type="submit"
                      onClick={handlePreviousPage}
                      className="w-[116px] flex justify-center gap-x-3 pt-2 h-10 font-semibold border rounded-full text-mecaBluePrimaryColor border-mecaBluePrimaryColor mb-6 "
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
                      onClick={handleNextPage}
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

              <div className="hidden lg:block">
                <div className="mb-10 pageHeader w-[100%]" id="pageone4">
                  <header className="font-bold text-lg" id="pageone5">
                    Product preview
                  </header>

                  <hr className="w-[95%]"></hr>
                </div>
                <Box>
                  <div className="inputImage imagetext  h-[283px] w-[25.1rem]">
                    {/*{dashboardImages && dashboardImages.length > 0 ? (*/}
                    {images && images.length > 0 ? (
                        <div className="relative flex justify-center">
                        <div className="rounded-full">
                          <img
                            src={images[currentImageIndex]}
                            alt="Uploaded"
                            className="h-[283px] w-[28rem] object-cover"
                          />
                        </div>
                        <div className="absolute w-[84%] h-full space-x-4 flex justify-between items-center mt-4">
                          <button
                            type="button"
                            title="icon button"
                            onClick={handleViewPreviousImages}
                            className="bg-white w-[32px] h-[32px] rounded-full text-white p-2"
                          >
                            <MdChevronLeft className="text-black" />
                          </button>
                          <button
                            type="button"
                            title="icon button"
                            onClick={handleViewNextImages}
                            className="bg-white w-[32px] h-[32px] rounded-full text-white p-2"
                          >
                            <MdChevronRight className="text-black" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <div className="border rounded-full mt-20 h-32 w-32 flex justify-center">
                          <div
                            id="prevImgState"
                            className="w-full px-2 py-2 rounded-md pt-9 cursor-pointer border-none"
                          >
                            <MdPhotoLibrary
                              className="text-gray-600 text-7xl w-10 m-auto pb-6"
                              style={{ backgroundColor: "porcelain" }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Box>
                <div className="">
                  <div className="w-full">
                    <div className="flex justify-between">
                      <div className="flex flex-col w-[280px] justify-center h-[40px] px-2">
                        {productName ? (
                          <p className="capitalize font-bold text-lg text-mecaDarkBlueBackgroundOverlay">
                            {productName}
                          </p>
                        ) : (
                          <p className="capitalize font-bold text-lg text-mecaDarkBlueBackgroundOverlay">
                            Product Name
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col items-end justify-center w-[120px] h-[40px]">
                        {price ? (
                          <p className="capitalize font-normal text-sm text-mecaDarkBlueBackgroundOverlay">
                            ₦{price}
                          </p>
                        ) : (
                          <p className="capitalize font-normal text-sm text-mecaDarkBlueBackgroundOverlay">
                            price
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="mt-8 w-full h-32">
                      <p>Description</p>
                      <textarea
                        title="textArea"
                        value={description}
                        readOnly={true}
                        className="scrollbar-none border-white pl-0 w-full h-32 p-2 bg-white placeholder:text-black outline-none"
                      />
                    </div>
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

export default CalledPagesPageFourPages;
