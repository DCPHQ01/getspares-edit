import Image from "next/image";
import addProduct from "../../assets/images/addProduct.svg";

const AddProductImage = () => {
  return (
    <div className=" z-50 fixed top-0  h-40 w-[100%]">
      <div>
        <div className="">
          <Image
            className="h-40 w-[100%] object-cover"
            src={addProduct}
            id="add product"
            alt="mobile spear part image"
          />
        </div>
      </div>

      <div className="bg-white h-">
        <div className="pt-[3rem]  mb-3 w-[80%] m-auto flex justify-between">
          <h1 className="text-xl font-semibold">Add new product</h1>

          <button className="text-base bg-mecaBluePrimaryColor text-white w-40 h-10 rounded-full font-semibold">
            Publish now
          </button>
        </div>
        <hr className="w-[80%] m-auto "></hr>
      </div>
    </div>
  );
};

export default AddProductImage;
