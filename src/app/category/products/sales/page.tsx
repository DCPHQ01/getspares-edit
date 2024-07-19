"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { AccountCircle } from "@mui/icons-material";
import NavBar from '../../../../components/NavBar/NavBar'
import TopBarWhileInside from '../../../reusables/TopBarWhileInside/page'
import sellerImage from '../../../../assets/images/sellerImage.png'
import emailIcon from '../../../../assets/icons/emailIcon.png'
import { MdChevronRight } from "react-icons/md";
import { useGetAllSalesQuery } from '../../../../redux/features/product/productsQuery'
import Card from "../../../../components/Homepage/Card"
import HomeImage2 from "../../../../assets/images/homeImage1.png"
import { ColorRing } from 'react-loader-spinner';

interface productDetails {
  id: string;
  name: string;
  image?: string;
  price: string;
  rating: number;
}

const Sales = () => {
  const [vendorId, setVendorId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const id = sessionStorage.getItem("vendorsId");
      setVendorId(id);
    }
  }, []);

  const { data, isError, isFetching } = useGetAllSalesQuery({ vendorId });

  const [salesProduct, setSalesProduct] = useState<productDetails[]>([]);
  const name = data?.data?.vendorInventoryDetailsResponse.vendorName;
  const email = data?.data?.vendorInventoryDetailsResponse.vendorEmail;
  const websiteUrl = data?.data?.vendorInventoryDetailsResponse.websiteUrl;
  const companyImg = data?.data?.vendorInventoryDetailsResponse.companyImage;
  const list = data?.data?.vendorProductResponses;

  useEffect(() => {
    if (data && Array.isArray(data.data.vendorProductResponses)) {
      const list = data?.data?.vendorProductResponses;
      setSalesProduct(list);
    }
  }, [data]);

  return (
    <div>
      <TopBarWhileInside />
      {isFetching ?

      <div className='h-screen w-full'>
      <ColorRing
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={[
                    "#0000FF",
                    "#0099ff",
                    "#4800ff",
                    "#00bbff",
                    "#0000FF",
                  ]}
                />
      </div>
     :
      <>
    
      <div className='px-12'>
        <div className='h-80 w-full mt-48 bg-blue-100'>
          <div className='flex flex-col pl-10 pt-10'>
            {companyImg !== "string"? (
              <img
                src={companyImg}
                width="50"
                height="50"
                alt="image"
                className="rounded-full object-cover"
              />
            ) : (
              <AccountCircle
                style={{ fontSize: 100 }}
                className="text-gray-400"
              />
            )}
            <div className='flex flex-col justify-start pt-5'>
              <p className='font-bold text-2xl'>{name}</p>
              <p className='mt-5 text-gray-500 text-xl'>{email}</p>
              <div className='flex gap-4'>
                <div className='mt-3'>
                  <Image src={emailIcon} alt='email icon' />
                </div>
                <p className='mt-2 text-mecaBluePrimaryColor text-lg'>{websiteUrl}</p>
              </div>
            </div>
          </div>
        </div>
        <p className='flex justify-start pt-10 text-3xl'>Inventory</p>
      </div>
      <div className="flex flex-wrap -mx-2 pt-10">
        {list?.map((product: productDetails) => (
          <div key={product.id} className="w-full sm:w-1/2 md:w-1/3 p-2">
            <Card
              id={product.id}
              productName={product.name}
              price={product.price}
              productImage={product.image}
              rating={product.rating}
              image={HomeImage2}
            />
          </div>
        ))}
      </div>
      </>
       }
    </div>
  );
}

export default Sales;


// "use client"
// import React, { useEffect, useState}  from 'react'
// import { useRouter } from 'next/navigation'
// import Image from 'next/image'
// import { AccountCircle } from "@mui/icons-material";
// import NavBar from '../../../../components/NavBar/NavBar'
// import TopBarWhileInside from '../../../reusables/TopBarWhileInside/page'
// import sellerImage from '../../../../assets/images/sellerImage.png'
// import emailIcon from '../../../../assets/icons/emailIcon.png'
// import { MdChevronRight } from "react-icons/md";
// import { useGetAllSalesQuery } from '../../../../redux/features/product/productsQuery'
// import Card from "../../../../components/Homepage/Card"
// import HomeImage2 from "../../../../assets/images/homeImage1.png"

// interface productDetails {
//   id: string;
//   name: string;
//   image?: string;
//   price: string;
//   rating:number;
// }

// const sales = () => {
//   const vendorId = sessionStorage.getItem("vendorsId")
  
//   const { data, isError } = useGetAllSalesQuery({vendorId})
//   const [salesProduct, setSalesProduct] = useState([])
//   const name = data?.data?.vendorInventoryDetailsResponse.vendorName;
//   const email = data?.data?.vendorInventoryDetailsResponse.vendorEmail;
//   const websiteUrl = data?.data?.vendorInventoryDetailsResponse.websiteUrl;
//   const companyImg = data?.data?.vendorInventoryDetailsResponse.companyImage;
//   const list = data?.data?.vendorProductResponses;

//   useEffect(() => {
//     if (data && Array.isArray(data.data.vendorProductResponses)) {
//       const list = data?.data?.vendorProductResponses;
//       setSalesProduct(list);
//     }
//   }, [data])
  
//   return (
//     <div>
//         <TopBarWhileInside/>
//       <div className='px-12'>
//         <div className='h-80 w-full mt-48 bg-blue-100'>
//           <div className='flex flex-col pl-10 pt-10'>
//           {companyImg ? (
//             <Image
//               src={companyImg} 
//               width="50" 
//               height="50"
//               alt="image"
//               className="rounded-full object-cover"
//             />
//           ) : (
//             <AccountCircle
//               style={{ fontSize: 100 }}
//               className="text-gray-400"
//             />
//           )}
//             {/* <Image 
//               src={sellerImage} 
//               alt="seller" 
//             /> */}
//             <div className='flex flex-col justify-start pt-5'>
//               <p className='font-bold text-2xl'>{name}</p>
//               <p className='mt-5 text-gray-500 text-xl'>{email}</p>
//               <div className='flex gap-4'>
//                 <div className='mt-3'>
//                   <Image src={emailIcon} alt='email icon'
//                   />
//                 </div>
//                 <p className='mt-2 text-mecaBluePrimaryColor text-lg'>{websiteUrl}</p>
//               </div>

//             </div>
//           </div>
//         </div>
//         <p className='flex justify-start pt-10 text-3xl'>Inventory</p>
//       </div>
//       <div className="flex flex-wrap -mx-2 pt-10">
//       {list?.map((product:productDetails) => (
//         <div key={product.id} className="w-full sm:w-1/2 md:w-1/3 p-2">
//           <Card
//             id={product.id}
//             productName={product.name}
//             price={product.price}
//             productImage={product.image}
//             rating={product.rating}
//             image={HomeImage2}
//           />
//         </div>
//       ))}
//     </div>
//     </div>
    
//   )
// }

// export default sales;