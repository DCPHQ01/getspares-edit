import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {useEffect, useState, RefObject} from "react";

const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const cloudinary_url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

const my_preset = process.env.NEXT_PUBLIC_UPLOAD_PRESET || "";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatAmount = (price: string | number) => {
  if (price) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NGN",
    }).format(Number(price));
  }
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

// export const uploadSeveralImages = async (
//   files: File[],
//   setImages: (url: string[]) => void
// ) => {
//   let image_url: string[] = [];
//   const formData = new FormData();
//   files.forEach(async (file) => {
//     formData.append("file", file);
//     formData.append("upload_preset", my_preset);
//     const urls = await Promise.all(
//       files.map(async (file) => {
//         const formData = new FormData();
//         formData.append("file", file);
//         formData.append("upload_preset", my_preset);
//         const res = await fetch(cloudinary_url, {
//           method: "POST",
//           body: formData,
//         });
//         const data = await res.json();
//         image_url.push(data.secure_url);
//         return setImages(image_url);
//       })
//     );
//   });
// };

export const uploadSeveralImages = async (
  files: File[],
  setImages: (url: string[]) => void
) => {
  let image_urls: string[] = [];

  const uploadPromises = files.map(async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", my_preset);

    const res = await fetch(cloudinary_url, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.secure_url;
  });

  image_urls = await Promise.all(uploadPromises);

  setImages(image_urls);
};

export const formatAmount2 = (price: string | number) => {
  if (price !== undefined && price !== null) {
    let amountString = price.toString().trim();

    if (amountString.startsWith("NGN")) {
      amountString = amountString.replace("NGN", "").trim();
    }else{

    }

    const amountNumber = Number(amountString);

    if (!isNaN(amountNumber)) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "NGN",
      }).format(amountNumber);
    } else {
      return "Invalid amount";
    }
  } else {
    return "₦0.00";
  }
};

export const format = (price: string | number) => {
  if (price !== undefined && price !== null) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NGN",
    }).format(Number(price));
  } else {
    return "₦0.00";
  }
};

export const formatAmount3 = (price: string) => {
  if (price) {
    const newStr = price.split(' ')
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: newStr[0] && 'NGN',
    }).format(Number(newStr[1]));
  } else {
    return "₦0.00";
  }
};

// export const setInputFocus = (ref, defaultState = false) => {
//   const [state, setState] = useState(defaultState);
//   console.log(ref.current)
//
//   useEffect(() => {
//     const onFocus = () => setState(true);
//     const onBlur = () => setState(false);
//
//     ref.current.addEventListener("focus", onFocus);
//     ref.current.addEventListener("blur", onBlur);
//
//     return () => {
//       ref.current.removeEventListener("focus", onFocus);
//       ref.current.removeEventListener("blur", onBlur);
//     };
//   }, []);
//
//   return state;
// };

export const useNewFocus = (ref: RefObject<HTMLElement>, defaultState: boolean = false): boolean => {
  const [state, setState] = useState<boolean>(defaultState);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const onFocus = () => setState(true);
    const onBlur = () => setState(false);
    if(onFocus){
      ref.current.focus();
    }
    ref.current.addEventListener('blur', onBlur);

    return () => {
      if (ref.current) {
        ref.current.removeEventListener('focus', onFocus);
        ref.current.removeEventListener('blur', onBlur);
      }
    };
  }, [ref]);

  return state;
};

