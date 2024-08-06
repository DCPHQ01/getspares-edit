"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import {
  TextareaAutosize as BaseTextareaAutosize,
  TextareaAutosize,
} from "@mui/base/TextareaAutosize";

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
import { uploadSeveralImages } from "../../../components/utils";
import { ColorRing } from "react-loader-spinner";

interface ImageProps {
  images: string[];
}

  const CalledPagesPageTwoPages = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesUrl, setImagesUrl] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState("");

  const handleImageUpload: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newImages: string[] = [];
      const newImageFiles: File[] = Array.from(files);

      setIsLoading(true);

      // Using Promise.all to ensure all images are read and uploaded
      await Promise.all(
        newImageFiles.map((file) => {
          return new Promise<void>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              newImages.push(reader.result as string);
              resolve();
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
        })
      );

      setImagesUrl((prevImages) => [...newImages, ...(prevImages || [])]);

      try {
        await uploadSeveralImages(newImageFiles, handleImage);
      } catch (error) {
        console.error("Error uploading images:", error);
      }
      setIsLoading(false);
    }
  };



  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageRemove = (index: number) => {
    const newImages = [...imagesUrl];
    newImages.splice(index, 1);
    setImagesUrl(newImages);
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const router = useRouter();

  const handleViewPreviousImages = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : imagesUrl.length - 1
    );
  };
  const handleImage = (nf: string[]) => {
    setImagesUrl([...imagesUrl, ...nf]);
  };
  const handleViewNextImages = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < imagesUrl.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePreviousPage = () => {
    router.push(paths.toAddProductDashboardBasicInfo());
  };
  const handleNextPage = () => {
    if (imagesUrl.length === 0) {
      setImageError("Please add at least one image");
      return;
    }
    router.push(paths.toAddProductDashboardSpecifications());
    sessionStorage.setItem("images", JSON.stringify(imagesUrl));
    // sessionStorage.setItem("clickedImage", JSON.stringify(imagesUrl));
  };
  useEffect(() => {
    const storedBasicInfoValues = sessionStorage.getItem("basicInfoValues");

    const parsedBasicInfoValues =
      storedBasicInfoValues && JSON.parse(storedBasicInfoValues);

    if (parsedBasicInfoValues) {
      setProductName(parsedBasicInfoValues.name);
      setPrice(parsedBasicInfoValues.amount);
      setDescription(parsedBasicInfoValues.description);
    }
  }, []);
  const productImage = useAppSelector(
    (state) => state.company.productData as ImageProps
  );

  useEffect(() => {
    const savedImages = sessionStorage.getItem("images");
    if (savedImages) {
      setImagesUrl(JSON.parse(savedImages));
    } else {
      setImagesUrl(productImage?.images);
    }
  }, [productImage]);
  // useEffect(() => {
  //   if (productImage) {
  //     setImagesUrl(productImage?.images);
  //   }
  // }, [productImage]);

  return (
    <div className="lg:w-[48%] w-[100%]" id="pageTwo1">
      <div className="pageWrapper" id="pageTwo2">
        <div className=" md:flex flex-col lg:mt-[4.5rem] mt-56" id="pageTwo3">
          <div className="mb-10 pageHeader w-94" id="pageone4">
            <div className="lg:flex lg:gap-x-10 lg:justify-between">
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
                  <div
                    style={{ backgroundColor: "#EFF2F3" }}
                    className=" h-60 lg:w-[27rem] w-[100%] mb-5 mt-10 pt-6 cursor-pointer"
                  >
                    <div
                      onClick={handleImageClick}
                      id="addImage"
                      className="flex flex-col  items-center justify-center"
                    >
                      <div className="border rounded-full mt-12 h-16 w-[60px] flex justify-center">
                        <div
                          id="prevImgState"
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
                            "#095AD3",
                            "#095AD3",
                            "#095AD3",
                            "#095AD3",
                            "#095AD3",
                          ]}
                        />
                      </div>
                    )}
                    {imagesUrl && (
                      <div className="flex absolute -bottom-16">
                        {imagesUrl.slice(0, 4).map((image, index) => (
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
                                {index === 3 && imagesUrl.length > 4 && (
                                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                    <p className="text-white text-2xl">{`${
                                      imagesUrl.length - 4
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
                      <p className="font-bold text-mecaBluePrimaryColor"
                         onClick={handleImageClick}
                      >
                        Add image
                      </p>
                      <p className="font-normal">by clicking</p>
                    </div>
                  </div>
                </Box>

                <div className="flex  justify-between w-[100%] mt-32 ">
                  <div id="firstPreviousbtn9">
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
                  <div className="">
                    <button
                      type="submit"
                      id="thirdFormSubmit"
                      onClick={handleNextPage}
                      className="w-[116px] flex justify-center gap-x-3 pt-2 h-10 font-semibold border rounded-full text-mecaBluePrimaryColor border-mecaBluePrimaryColor  mb-6 "
                    >
                      <p>Next </p>
                      <span>
                        <MdChevronRight className="mt-1" />
                      </span>
                    </button>
                  </div>
                </div>
                {imageError && <p className="text-red-500"> {imageError}</p>}
              </div>

              <div className="hidden lg:block">
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

                    {imagesUrl && imagesUrl.length > 0 ? (
                      <div className="relative flex justify-center">
                        <div className="rounded-full">
                          <img
                            src={imagesUrl[currentImageIndex]}
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
      </div>
    </div>
  );
};

export default CalledPagesPageTwoPages;
