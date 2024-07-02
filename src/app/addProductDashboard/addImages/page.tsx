"use client";
import React, { useEffect, useRef } from "react";
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
import { useRouter } from "next/navigation";
import { paths } from "../../../path/paths";
import { uploadImage, uploadSeveralImages } from "../../../components/utils";
import { ColorRing } from "react-loader-spinner";

const CalledPagesPageTwoPages = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesUrl, setImagesUrl] = useState<string[]>([] || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newImages: string[] = [];
      const newImageFiles: File[] = Array.from(files);
      const newImagesUrl: string[] = [];

      newImageFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push(reader.result as string);
          if (newImages.length === newImageFiles.length) {
            // Ensuring all images are loaded before updating the state
            setImages((prevImages) => [...newImages, ...prevImages]);
          }
        };
        reader.readAsDataURL(file);
      });
      setIsLoading(true);

      uploadSeveralImages(newImageFiles, handleImage);
    }
    setIsLoading(false);
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageRemove = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const router = useRouter();

  useEffect(() => {
    const savedImages = sessionStorage.getItem("clickedImage");
    setImages(JSON.parse(savedImages || "[]") as string[]);
  }, []);

  const handleViewPreviousImages = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };
  const handleImage = (nf: string[]) => {
    setImagesUrl([...imagesUrl, ...nf]);
  };
  const handleViewNextImages = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePreviousPage = () => {
    router.push(paths.toAddProductDashboardBasicInfo());
  };
  const handleNextPage = () => {
    router.push(paths.toAddProductDashboardSpecifications());
    sessionStorage.setItem("clickedImage", JSON.stringify(imagesUrl));
  };
  useEffect(() => {
    const storedBasicInfoValues = sessionStorage.getItem("basicInfoValues");

    const parsedBasicInfoValues =
      storedBasicInfoValues && JSON.parse(storedBasicInfoValues);

    if (parsedBasicInfoValues) {
      setProductName(parsedBasicInfoValues.productName);
      setPrice(parsedBasicInfoValues.price);
      setDescription(parsedBasicInfoValues.productDescription);
    }
  }, []);

  console.log("file images ", images);
  console.log("set images ", imagesUrl);

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
                  autoComplete="off"
                >
                  <Box>
                    <div
                      onClick={handleImageClick}
                      style={{ backgroundColor: "#EFF2F3" }}
                      className=" h-60 w-[27rem] mb-5 mt-10 pt-6 cursor-pointer"
                    >
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
                      {isLoading && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <ColorRing
                            visible={true}
                            height="40"
                            width="40"
                            ariaLabel="color-ring-loading"
                            wrapperStyle={{}}
                            wrapperClass="color-ring-wrapper"
                            colors={[
                              "#0000FF",
                              "#0000FF",
                              "#0000FF",
                              "#0000FF",
                              "#0000FF",
                            ]}
                          />
                        </div>
                      )}
                      {images && (
                        <div className="flex absolute -bottom-16">
                          {images.slice(0, 4).map((image, index) => (
                            <div
                              key={index}
                              className={`${
                                index === currentImageIndex
                                  ? "border border-red-600"
                                  : ""
                              }  w-20 h-16 bg-mecaProfileColor m-2 relative`}
                            >
                              <MdClose
                                size={14}
                                className="absolute right-0 cursor-pointer"
                                onClick={() => handleImageRemove(index)}
                              />
                              <div className="w-11 h-10 m-auto">
                                <div className="mt-3 h-10 w-11 relative">
                                  <img
                                    src={image}
                                    alt={`Uploaded ${index}`}
                                    className="w-full h-full object-cover"
                                  />
                                  {index === 3 && images.length > 4 && (
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                      <p className="text-white text-2xl">{`${
                                        images.length - 4
                                      }+`}</p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="text-gray-600 text-base mt-2 text-center">
                        <p className="font-bold text-mecaBluePrimaryColor">
                          Add image
                        </p>
                        <p className="font-normal">
                          by clicking or drag and drop
                        </p>
                      </div>
                    </div>
                  </Box>
                </Box>

                <div className="flex  justify-between w-[100%] mt-32 ">
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
                      id="thirdFormSubmit"
                      onClick={handleNextPage}
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
                        title="image uploader"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        ref={fileInputRef}
                        className="hidden w-full px-3 py-2 "
                      />
                    </div>

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
                            onClick={handleImageClick}
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
                  <div className="mt-8">
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
