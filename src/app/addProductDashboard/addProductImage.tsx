import Image from "next/image";
import addProduct from "../../assets/images/addProduct.svg";
import { useCreateProductMutation } from "../../redux/features/product/productsQuery";
import { ColorRing } from "react-loader-spinner";
import { paths } from "../../path/paths";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Modal } from "@mui/base";
import { Box } from "@mui/material";
import { useGetAProductQuery } from "../../redux/features/users/authQuery";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setProductData } from "../../redux/features/company/companySlice";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

const AddProductImage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [addProductdata, { isLoading }] = useCreateProductMutation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDashBoard = () => {
    router.push(paths.toDashboard());
  };

  const dispatch = useAppDispatch();

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

  function isDataValid() {
    const isBasicInfoValid =
      Object.keys(basicInfoData).length > 0 &&
      basicInfoData.productName &&
      basicInfoData.price &&
      basicInfoData.productDescription &&
      basicInfoData.productCategory &&
      basicInfoData.quantity;
    const areImagesPresent = imagesData.length > 0;
    return isBasicInfoValid && areImagesPresent;
  }

  const priceWithoutCommas = basicInfoData?.price?.replace(/,/g, "");

  const handleAddProduct = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isDataValid()) {
      setError("Please fill all the required fields.");
      return;
    }

    try {
      const companyName = userDetails.companyDetails?.[0]?.name;
      if (!companyName) {
        throw new Error("Company details are missing.");
      }
      const response = await addProductdata({
        name: basicInfoData.productName,
        price: {
          amount: priceWithoutCommas,
          currency: "NGN",
        },
        description: basicInfoData.productDescription,
        categoryName: basicInfoData.productCategory,
        productCondition: "NEW",
        productImages: [...imagesData],
        productInformation: {
          manufacturer: detailsData?.manufacturer,
          brand: detailsData?.brand,
          model: detailsData?.model,
          itemWeight: detailsData?.weight,
          productionDimension: detailsData?.dimension,
          countryOfOrigin: detailsData?.countryOfOrigin,
          itemModelNumber: "string",
          manufacturerPartNumber: detailsData?.manufacturerParts,
        },
        productSpecification: {
          color: specsData?.color,
          quantityInPack: +specsData?.quantityInPack,
        },
        quantity: +basicInfoData.quantity,
        tags: ["string"],
        companyName: userDetails.companyDetails[0].name,
      }).unwrap();

      if (response) {
        sessionStorage.removeItem("basicInfoValues");
        sessionStorage.removeItem("clickedImage");
        sessionStorage.removeItem("specInfo");
        sessionStorage.removeItem("detailsInfo");
        handleOpen();
      }
    } catch (error: any) {
      console.log(error);
      setError(error.message);
    }
  };

  const searchParams = useSearchParams();
  const productId = searchParams?.get("id");

  const { data, isFetching } = useGetAProductQuery(productId || "", {
    skip: !productId,
  });

  useEffect(() => {
    if (data) {
      dispatch(setProductData(data?.data));
    }
  }, []);
  return (
    <div className="z-50 fixed top-0 h-40 w-[100%]">
      <div className="bg-white">
        <div className="pt-[3rem] mb-3 w-[80%] m-auto flex justify-between">
          <h1 className="text-xl font-semibold">
            {productId ? "Edit product" : "Add new product"}
          </h1>
          {error && <p className="text-red-500">{error}</p>}
          <button
            onClick={handleAddProduct}
            disabled={!isDataValid() || isLoading}
            className={`text-base flex justify-center items-center text-white w-40 h-10 rounded-full font-semibold ${
              !isDataValid() || isLoading
                ? "bg-gray-500"
                : "bg-mecaBluePrimaryColor"
            }`}
          >
            {productId ? (
              "Save"
            ) : isLoading ? (
              <ColorRing
                visible={true}
                height="40"
                width="40"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"]}
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
            className="backdrop"
          >
            <Box sx={style}>
              <div className="flex h-56 flex-col justify-center items-center gap-4">
                <p
                  id="modal-modal-title"
                  className="text-xl text-mecaBluePrimaryColor font-nunito"
                >
                  Product added successfully.
                </p>
                <button
                  onClick={handleDashBoard}
                  className="text-base flex justify-center items-center bg-mecaBluePrimaryColor text-white w-40 h-10 rounded-full font-semibold"
                >
                  Go to dashboard
                </button>
              </div>
            </Box>
          </Modal>
        </div>
        <hr className="w-[80%] m-auto "></hr>
      </div>
    </div>
  );
};

export default AddProductImage;

export function WrappedAddProductImage() {
  return (
    <Suspense>
      <AddProductImage />
    </Suspense>
  );
}
