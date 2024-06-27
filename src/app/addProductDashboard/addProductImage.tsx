import Image from "next/image";
import addProduct from "../../assets/images/addProduct.svg";
import { useCreateProductMutation } from "../../redux/features/product/productsQuery";
import { ColorRing } from "react-loader-spinner";

import { paths } from "../../path/paths";
import { Router } from "next/router";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
const AddProductImage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
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
        productImages: [...imagesData],
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
      }).unwrap();
      router.push("/dashboard");
    } catch (error: any) {
      console.log(error);
      setError(error);
    }
  };
  const searchParams = useSearchParams();
  const productId = searchParams?.get("id");

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
          <h1 className="text-xl font-semibold">
            {productId ? "Edit product" : "Add new product"}
          </h1>
          {error && <p className="text-red-500">{error}</p>}
          <button
            onClick={handleAddProduct}
            className="text-base flex justify-center items-center bg-mecaBluePrimaryColor text-white w-40 h-10 rounded-full font-semibold"
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
            ) : productId ? (
              "Save"
            ) : (
              "Publish now"
            )}
          </button>
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
      <AddProductImage />;
    </Suspense>
  );
}
