import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const formatAmount = (price: string | number) => {
    if(price){
        return new Intl.NumberFormat("en-US", {
            style: 'currency',
            currency: 'NGN',
        }).format(Number(price));
    }else{
        return "N/A";
    }
    // const numericPrice = parseFloat(price?.replace(/[^0-9.-]+/g, ""));

};
 
export const format = (price: string | number) => {
    if (price !== undefined && price !== null) {
        return new Intl.NumberFormat("en-US", {
            style: 'currency',
            currency: 'NGN',
        }).format(Number(price));
    } else {
        return "₦0.00"; // Return a properly formatted zero value
    }
};