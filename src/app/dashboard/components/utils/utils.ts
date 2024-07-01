import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);



export enum sidePanel {
  OVERVIEW = "OVERVIEW",
  VENDORS = "VENDORS",
  AGENTS = "AGENTS",
  BUYERS = "BUYERS",
  ORDERS = "ORDERS",
  INVENTORY = "INVENTORY",
  CATEGORY = "CATEGORY",
  CART = "CART",
  PROFILE = "PROFILE",
}

export enum roles {
  MECA_ADMIN = "MECA_ADMIN",
  VENDOR_ADMIN = "VENDOR_ADMIN",
  BUYER = "BUYER",
  AGENTS = "AGENT",
}

export const formatAllDate = (date: string, format='YYYY-MM-DD') => {
  if(date){
    let val = date.split(' ')[0];
    const finalDate = dayjs(val, format).format("DD-MM-YYYY");
    return finalDate;
  }
};

export const formatAllTime = (time: string) => {
  if(time){
    // let val = time.split(' ')[1];
    // console.log(val)
    // const finalTime = dayjs(val, 'HH:MM').format("hh:mm A");
    // console.log(finalTime)
    // return finalTime;
    let [hours, minutes] = time.split(':').map(Number);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
    return `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  }
};

export const userRole = roles.MECA_ADMIN;
// export const userRole = roles.VENDOR_ADMIN;
// export const userRole = roles.AGENTS;
// export const userRole = roles.BUYER;
