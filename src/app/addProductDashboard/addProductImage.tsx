import Image from "next/image";
import addProduct from "../../assets/images/addProduct.svg";
import * as React from 'react';
import { useCreateProductMutation } from "../../redux/features/product/productsQuery";
import { ColorRing } from "react-loader-spinner";

import { paths } from "../../path/paths";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useRouter } from "next/navigation";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '1px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',
};

const AddProductImage = () => {
  const [addProductdata, { isLoading }] = useCreateProductMutation();

  const basicInfoData =
    typeof window !== "undefined" && window.sessionStorage
      ? JSON.parse(sessionStorage.getItem("basicInfoValues") || "{}")
      : {};

  const imagesData =
    typeof window !== "undefined" && window.sessionStorage
      ? JSON.parse(sessionStorage.getItem("clickedImage") || "[]")
      : [];

  const specsData =
    typeof window !== "undefined" && window.sessionStorage
      ? JSON.parse(sessionStorage.getItem("specInfo") || "{}")
      : {};
  const detailsData =
    typeof window !== "undefined" && window.sessionStorage
      ? JSON.parse(sessionStorage.getItem("detailsInfo") || "{}")
      : {};

  const userDetails =
    typeof window !== "undefined" && window.sessionStorage
      ? JSON.parse(sessionStorage.getItem("userDetails") || "{}")
      : {};

  const priceWithoutCommas = basicInfoData?.price?.replace(/,/g, "");
  // console.log("company name ", userDetails.companyDetails[0].name);
  const handleAddProduct = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
   

    try {
      const response = await addProductdata({
        name: basicInfoData.productName,
        price: {
          amount: priceWithoutCommas,
          currency: "NGN",
        },
        description: basicInfoData.productDescription,
        categoryName: basicInfoData.productCategory,
        productCondition: "NEW",
        productImages: ["string"],
        productInformation: {
          manufacturer: detailsData.manufacturer,
          brand: detailsData.brand,
          model: detailsData.model,
          itemWeight: detailsData.weight,
          productionDimension: detailsData.dimension,
          countryOfOrigin: detailsData.countryOfOrigin,
          itemModelNumber: "string",
          manufacturerPartNumber: detailsData.manufacturerParts,
        },
        productSpecification: {
          color: specsData.color,
          quantityInPack: +specsData.quantityInPack,
        },
        quantity: +basicInfoData.quantity,
        tags: ["string"],
        companyName: userDetails.companyDetails[0].name,
      });
      if ("data" in response) {
        console.log(response.data);
        setOpen(true);
      }
    } catch (error) {}
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();

  const handleDashBoard = () => {
    router.push(paths.toDashboard());
  };

    
  return (
    <div className=" z-50 fixed top-0  h-40 w-[100%]">
      <div>
        {/* <div className="">
          <Image
            className="h-40 w-[100%] object-cover"
            src={addProduct}
            id="add product"
            alt="mobile spear part image"
          />
        </div> */}
      </div>

      <div className="bg-white h-">
        <div className="pt-[3rem]  mb-3 w-[80%] m-auto flex justify-between">
          <h1 className="text-xl font-semibold">Add new product</h1>

          {/* <button
            onClick={handleAddProduct}
            className="text-base flex justify-center items-center bg-mecaBluePrimaryColor text-white w-40 h-10 rounded-full font-semibold"
          > */}
            {/* {isLoading ? (
              <ColorRing
                visible={true}
                height="40"
                width="40"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["#ffff", "#ffff", "#ffff", "#ffff", "#ffff"]}
              />
            ) : (
              "Publish now"
            )} */}
          {/* </button> */}
          <div className="">
            <button 
              onClick={handleAddProduct}
              className="text-base flex justify-center items-center bg-mecaBluePrimaryColor text-white w-40 h-10 rounded-full font-semibold lowercase"
            >
               {isLoading ? (
                <ColorRing
                  visible={true}
                  height="40"
                  width="40"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={["#ffff", "#ffff", "#ffff", "#ffff", "#ffff"]}
                />
              ) : (
                "Publish now"
              )}
            </button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <div className="flex flex-col justify-center items-center gap-4">
                    <p id="modal-modal-title" className="text-2xl font-nunito" >
                      Product added successfully.
                    </p>
                    <button
                      onClick={handleDashBoard}
                      className="text-base flex justify-center items-center bg-mecaBluePrimaryColor text-white w-40 h-10 rounded-full font-semibold "
                    >
                      Go to dashboard
                    </button>
                  </div>
                 
                </Box>
              </Modal>
          </div>
          
           
                  
        </div>
        <hr className="w-[80%] m-auto "></hr>
      </div>
    </div>
  );
};
// sx={{ mt: 2 }}

export default AddProductImage;
