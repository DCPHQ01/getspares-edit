import Image from "next/image";
import addProduct from "../../assets/images/addProduct.svg";
import { useCreateProductMutation } from "../../redux/features/product/productsQuery";
import { paths } from "../../path/paths";
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

  console.log(priceWithoutCommas, "basicInfoData");
  console.log(
    basicInfoData,
    " basicInfo ",
    userDetails,
    " user details ",
    detailsData,
    " details data ",
    specsData,
    " specs data ",
    "basicInfoData"
  );

  const handleAddProduct = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const response = await addProductdata({
        name: basicInfoData.productName,
        description: basicInfoData.productDescription,
        price: {
          amount: Number(priceWithoutCommas),
          currency: "NGN",
        },
        categoryName: basicInfoData.productCategory,
        companyName: userDetails.companyDetails[0].name,
        productImages: ["string", "string"],
        productInformation: {
          manufacturer: detailsData.manufacturer,
          brand: detailsData.brand,
          model: detailsData.model,
          itemWeight: detailsData.weight,
          productionDimension: detailsData.dimension,
          countryOfOrigin: detailsData.country,
          itemModelNumber: "",
          manufacturerPartNumber: detailsData.manufacturerParts,
          voltage: "",
        },
        productSpecification: {
          color: specsData.color,
          quantityInPack: +specsData.quantity,
        },
        availabilityStatus: "IN_STOCK",
        quantity: 1,
      });
      if ("data" in response) {
        console.log(response.data);
      }
    } catch (error) {}
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

          <button
            onClick={handleAddProduct}
            className="text-base bg-mecaBluePrimaryColor text-white w-40 h-10 rounded-full font-semibold"
          >
            Publish now
          </button>
        </div>
        <hr className="w-[80%] m-auto "></hr>
      </div>
    </div>
  );
};

export default AddProductImage;
