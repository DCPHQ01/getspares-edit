"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { MdChevronLeft, MdChevronRight, MdPhotoLibrary } from "react-icons/md";
import { paths } from "../../../path/paths";
import { FormControl, MenuItem, Select } from "@mui/base";
import { InputLabel, OutlinedInput, SelectChangeEvent } from "@mui/material";
import { useAppSelector } from "../../../redux/hooks";

const manufacturerData = [
  { id: 1, manufacturer: "Toyota" },
  { id: 2, manufacturer: "Volkswagen" },
  { id: 3, manufacturer: "BMW" },
  { id: 4, manufacturer: "Honda" },
  { id: 5, manufacturer: "Ford Motor" },
  { id: 6, manufacturer: "General Motors" },
  { id: 7, manufacturer: "Tata Motors" },
  { id: 8, manufacturer: "Mahindra & Mahindra" },
  { id: 9, manufacturer: "Mercedes-Benz" },
  { id: 10, manufacturer: "Nissan" },
  { id: 11, manufacturer: "Hyundai Motor Group" },
  { id: 12, manufacturer: " Audi" },
  { id: 13, manufacturer: "Lexus" },
  { id: 14, manufacturer: "Chevrolet" },
  { id: 15, manufacturer: "Porshe" },
  { id: 16, manufacturer: "Fiat Chrysler Automobiles" },
  { id: 17, manufacturer: "Peugeot S.A" },
  { id: 18, manufacturer: "Volvo" },
  { id: 19, manufacturer: " Mazda" },
  { id: 20, manufacturer: " Kia motors" },
  { id: 21, manufacturer: "Opel" },
  { id: 22, manufacturer: "Infinit" },
  { id: 23, manufacturer: "Chysler" },
  { id: 24, manufacturer: "Jeep" },
  { id: 25, manufacturer: "GAC" },
  { id: 26, manufacturer: "DAF" },
  { id: 27, manufacturer: "IVECO" },
  { id: 28, manufacturer: "MAN" },
  { id: 29, manufacturer: "Mahindra" },
  { id: 30, manufacturer: "DAEWOO" },
  { id: 31, manufacturer: "LAND ROVER" },
  { id: 32, manufacturer: "ISUZU" },
  { id: 33, manufacturer: "ACURA" },
];

const conditionOptions = [
  { id: 1, condition: "New" },
  { id: 2, condition: "Refurbished" },
];

const CalledPagesPageFivePages = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [technicalDetails, setTechnicalDetails] = useState({
    manufacturer: "",
    manufacturerParts: "",
    condition: "",
    model: "",
    weight: "",
    dimension: "",
    countryOfOrigin: "",
  });
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

  useEffect(() => {
    const savedImages = sessionStorage.getItem("images");

    if (savedImages) {
      setImages(JSON.parse(savedImages));
    }
  }, []);
  const handleViewPreviousImages = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  const router = useRouter();

  const handleViewNextImages = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handleTechnicalDetails = (e: any) => {
    const { name, value } = e.target;

    setTechnicalDetails((prevValues) => {
      const newValues = { ...prevValues, [name]: value };
      sessionStorage.setItem("detailsInfo", JSON.stringify(newValues));
      return newValues;
    });
  };

  const handlePreviousPage = () => {
    router.push(paths.toAddProductDashboardSpecifications());
  };

  const populateData = (userData: any) => {
    const userDataKeys = Object.keys(technicalDetails);
    if (userData) {
      userDataKeys.forEach((key) => {
        if (key === "productInformation") {
          console.log(
            "technical details ",
            userData?.productInformation?.brand
          );
          setTechnicalDetails((values: any) => ({
            ...values,
            [key]: userData?.productInformation?.color,
          }));
        } else {
          setTechnicalDetails((values) => ({
            ...values,
            [key]: userData[key] ? userData[key] : "",
          }));
        }
      });
    }
  };
  const productSpec = useAppSelector((state) => state.company.productData);
  console.log("product spec  ", productSpec);
  useEffect(() => {
    const savedData = sessionStorage.getItem("detailsInfo");
    if (savedData) {
      setTechnicalDetails(JSON.parse(savedData));
    } else if (productSpec) {
      populateData(productSpec);
    }
  }, [productSpec]);

  return (
    <>
      <div className="" style={{ width: "48%" }} id="pageone1">
        <div className="pageWrapper" id="pageone2">
          <div className="hidden md:flex flex-col mt-[4.5rem]" id="pageone3">
            <div className="flex gap-x-10 justify-between">
              <div className="flex flex-col gap-y-6">
                <div className="mb-10 pageHeader w-94" id="pageone4">
                  <header className="font-bold text-lg" id="pageone5">
                    Technical details
                  </header>

                  <hr className="w-[80%]"></hr>
                </div>

                <div>
                  <select
                    id="manufacturer"
                    name="manufacturer"
                    style={{ backgroundColor: "porcelain" }}
                    required={true}
                    className="w-[29.4rem] h-14 border bg-mecaInputBgColor rounded-md pl-2 mb-5 outline-none"
                    title="manufacturer"
                    value={technicalDetails.manufacturer}
                    onChange={(e) =>
                      setTechnicalDetails({
                        ...technicalDetails,
                        manufacturer: e.target.value,
                      })
                    }
                  >
                    <option id={`manufacturer`} value="" disabled selected>
                      Brand
                    </option>
                    {manufacturerData.map((data) => (
                      <option
                        key={data.id}
                        value={data.manufacturer}
                        className="border border-b-2 border-gray-400"
                      >
                        {data.manufacturer}
                      </option>
                    ))}
                  </select>
                </div>

                <TextField
                  type="url"
                  id="filledbasic"
                  label="Manufacturer part number"
                  variant="filled"
                  name="manufacturerParts"
                  placeholder="12345"
                  InputProps={{ disableUnderline: true }}
                  className="w-[29.4rem] mb-5 bg-mecaInputBgColor"
                  value={technicalDetails.manufacturerParts}
                  onChange={handleTechnicalDetails}
                />

                {/*<TextField*/}
                {/*  required={true}*/}
                {/*  id="filledbasic"*/}
                {/*  label="Brand"*/}
                {/*  variant="filled"*/}
                {/*  type="text"*/}
                {/*  name="brand"*/}
                {/*  placeholder="E765"*/}
                {/*  InputProps={{ disableUnderline: true }}*/}
                {/*  className=" w-[29.4rem] mb-5 bg-mecaInputBgColor"*/}
                {/*  value={technicalDetails.brand}*/}
                {/*  onChange={handleTechnicalDetails}*/}
                {/*/>*/}

                <div>
                  <select
                    id="condition"
                    name="condition"
                    style={{ backgroundColor: "porcelain" }}
                    required={true}
                    className="w-[29.4rem] h-14 border bg-mecaInputBgColor rounded-md pl-2 mb-5 outline-none"
                    title="condition"
                    value={technicalDetails.condition}
                    onChange={(e) =>
                      setTechnicalDetails({
                        ...technicalDetails,
                        condition: e.target.value,
                      })
                    }
                  >
                    <option id={`condition`} value="" disabled selected>
                      Condition
                    </option>
                    {conditionOptions.map((option) => (
                      <option
                        key={option.id}
                        value={option.condition}
                        className="border border-b-2 border-gray-400"
                      >
                        {option.condition}
                      </option>
                    ))}
                  </select>
                </div>

                <TextField
                  required={true}
                  id="filledbasic"
                  label="Model"
                  variant="filled"
                  type="text"
                  name="model"
                  placeholder="E765"
                  InputProps={{ disableUnderline: true }}
                  className=" w-[29.4rem] mb-5 bg-mecaInputBgColor"
                  value={technicalDetails.model}
                  onChange={handleTechnicalDetails}
                />

                <TextField
                  id="filledbasic"
                  label="Weight"
                  variant="filled"
                  type="text"
                  name="weight"
                  placeholder="786 kg"
                  InputProps={{ disableUnderline: true }}
                  className=" w-[29.4rem] mb-5 bg-mecaInputBgColor"
                  value={technicalDetails.weight}
                  onChange={handleTechnicalDetails}
                />

                <TextField
                  id="filledbasic"
                  label="Dimension"
                  variant="filled"
                  type="text"
                  name="dimension"
                  placeholder="Medium"
                  InputProps={{ disableUnderline: true }}
                  className=" w-[29.4rem] mb-5 bg-mecaInputBgColor"
                  value={technicalDetails.dimension}
                  onChange={handleTechnicalDetails}
                />

                <TextField
                  id="filledbasic"
                  label="Country of origin"
                  variant="filled"
                  type="text"
                  name="countryOfOrigin"
                  placeholder="Aba"
                  InputProps={{ disableUnderline: true }}
                  className=" w-[29.4rem] mb-5 bg-mecaInputBgColor"
                  value={technicalDetails.countryOfOrigin}
                  onChange={handleTechnicalDetails}
                />

                <div className="flex w-full justify-center mt-8">
                  <div id="firstPreviousbtn9 flex justify-center">
                    <button
                      type="submit"
                      onClick={handlePreviousPage}
                      className="w-[116px] flex justify-center gap-x-3 pt-2 h-10 font-semibold border rounded-full text-mecaBluePrimaryColor border-mecaBluePrimaryColor"
                    >
                      <span>
                        <MdChevronLeft className="mt-1" />
                      </span>
                      <p> Back</p>
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

export default CalledPagesPageFivePages;
