import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const formatAmount = (price: string) => {
    if(price){
        return new Intl.NumberFormat("en-US", {
            style: 'currency',
            currency: 'NGN',
        }).format(price);
    }
    // const numericPrice = parseFloat(price?.replace(/[^0-9.-]+/g, ""));

};
