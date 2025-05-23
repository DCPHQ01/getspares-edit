import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useEffect, useState, RefObject } from "react";

const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const cloudinary_url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

const my_preset = process.env.NEXT_PUBLIC_UPLOAD_PRESET || "";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatAmount44 = (price: string | number) => {
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
      //   ("image url ", data);
      image_url = data.url;
      setImage(image_url);

      return image_url;
    });
};

export const formatAmount44ToNaira = (price: string | number) => {
  const numericPrice = Number(price);

  if (!isNaN(numericPrice)) {
    const customFormat = (value: number) => {
      return value
        .toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
        })
        .replace("$", "₦");
    };

    return customFormat(numericPrice);
  } else {
    return "₦0.00";
  }
};

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

export const formatAmount442 = (price: string | number) => {
  if (price !== undefined && price !== null) {
    let amountString = price.toString().trim();

    if (amountString.startsWith("NGN")) {
      amountString = amountString.replace("NGN", "").trim();
    } else {
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

export const format = (price: number | string) => {
  if (price !== undefined && price !== null) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NGN",
    }).format(Number(price));
  } else {
    return "₦0.00";
  }
};

export const formatAmount443 = (price: string) => {
  if (price) {
    const newStr = price.split(" ");
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: newStr[0] && "NGN",
    }).format(Number(newStr[1]));
  } else {
    return "₦0.00";
  }
};

export const formatAmount4 = (price: string) => {
  if (price) {
    const amount = parseFloat(price.replace(/,/g, ""));
    const numericPrice = parseFloat(price?.replace(/[^0-9.-]+/g, ""));
    const formattedAmount = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(numericPrice);
    return "₦" + formattedAmount.replace("NGN", "").trim();
  } else {
    return "₦0.00";
  }
};

export const formatAmount5 = (price: string) => {
  if (price) {
    const amount = parseFloat(price.replace(/,/g, ""));
    
    if (amount >= 1_000_000_000) {
      const formattedAmount = (amount / 1_000_000_000).toFixed(1);
      return `₦${formattedAmount}B`;
    } else if (amount >= 1_000_000) {
      const formattedAmount = (amount / 1_000_000).toFixed(1);
      return `₦${formattedAmount}M`;
    } else {
      const formattedAmount = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 2,
      }).format(amount);
      return "₦" + formattedAmount.replace("NGN", "").trim();
    }
  } else {
    return "₦0.00";
  }
};

export const formatAmount6 = (price: string) => {
  if (price) {
    const newStr = price.split(" ");
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: newStr[0] && "NGN",
      currencyDisplay: "narrowSymbol",
    }).format(Number(newStr[1]));
  } else {
    return "₦0.00";
  }
};

export const useNewFocus = (
  ref: RefObject<HTMLElement>,
  defaultState: boolean = false
): boolean => {
  const [state, setState] = useState<boolean>(defaultState);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const onFocus = () => setState(true);
    const onBlur = () => setState(false);

    ref.current.addEventListener("focus", onFocus);
    ref.current.addEventListener("blur", onBlur);

    return () => {
      if (ref.current) {
        ref.current.removeEventListener("focus", onFocus);
        ref.current.removeEventListener("blur", onBlur);
      }
    };
  }, [ref]);

  return state;
};
