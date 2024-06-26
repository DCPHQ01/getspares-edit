import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const cloudinary_url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

const my_preset = process.env.NEXT_PUBLIC_UPLOAD_PRESET || "";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatAmount = (price: string) => {
  if (price) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NGN",
    }).format(Number(price));
  }
  // const numericPrice = parseFloat(price?.replace(/[^0-9.-]+/g, ""));
};

export const uploadImage = async (
  file: File,
  setImage: (url: string) => void
) => {
  let image_url = "";
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", my_preset);
  await fetch(cloudinary_url, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //   console.log("image url ", data);
      image_url = data.url;
      setImage(image_url);
      console.log("image url ", image_url);
      return image_url;
    });
};

export const uploadSeveralImages = async (
  files: File[],
  setImages: (url: string[]) => void
) => {
  let image_url: string[] = [];
  const formData = new FormData();
  files.forEach(async (file) => {
    formData.append("file", file);
    formData.append("upload_preset", my_preset);
    const urls = await Promise.all(
      files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "vnqoc9iz");
        const res = await fetch(cloudinary_url, {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        return data.secure_url;
      })
    );
  });
};
