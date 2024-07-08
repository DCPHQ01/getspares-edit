"use client"
import {useEffect, useState} from 'react'
import { MdChevronRight } from 'react-icons/md';
import Image from "next/image";
import * as React from "react";
import tractor from "../../../../../assets/images/tractors.png"
import { usePathname } from "next/navigation";
// import BasicTabs from "../../../../../dashboard/components/table/buyerAdmin/tab";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {useGetAProductQuery} from "../../../../../redux/features/users/authQuery";
import {paths} from "../../../../../path/paths";
import {formatAmount} from "../../../../../components/utils";
import BasicTabs from "./BasicTabs";

interface State {
   open: boolean;
}

interface NavProps {
   routeBack ?: () => void;
   productId: string
}

const images = [
   { src: tractor, alt: "Front View" },
   { src: tractor, alt: "Back View" },
   { src: tractor, alt: "Right Side View" },
   { src: tractor, alt: "Left Side View" },

];


const ViewItemDetails : React.FC<NavProps> = ({routeBack, productId}) => {


   const [opens, setOpens] = React.useState<boolean>(false);
   const [state, setState] = React.useState<State>({
      open: false,
   });
   const [id, setId] = useState('')

   const handleOpen = () => setOpens(true);
   const handleClose = () => setOpens(false);
   const router = useRouter();

   const { data, isLoading } = useGetAProductQuery(productId, {
      skip: !productId,
   });


   useEffect(()=>{
      if(productId){
         setId(productId)
      }
   },[productId])





   const onClick = () => {
      router.push(paths.toDashboard())
   }

   const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
   const handleImageClick = (index: number) => {
      setSelectedImageIndex(index);
   };

   const [productDescription, setProductDescription] = useState(false);
   const handleProductDescription = () => {
      setProductDescription(!productDescription);
   };


   return (

      <div className="relative h-[100%] top-14">
         <div id="mainContainer" className="container mx-auto px-2">
            <div
               className="flex flex-col space-y-8 w-full"
               id="productDescriptionContentContainer"
            >
               <div
                  id="productDescriptionBreadcrumbs"
                  className="flex items-center gap-x-2"
               >
                  {/* <Link href={paths.toDashboard()}> */}
                  <button className="text-lg capitalize cursor-pointer font-nunito font-normal text-mecaDarkBlueBackgroundOverlay"
                          onClick={routeBack}
                  >
                     {data?.data?.name}
                  </button>
                  {/* </Link> */}
                  <MdChevronRight size={20} />
                  <p className="text-lg font-nunito font-normal text-mecaGoBackArrow">
                     View details
                  </p>
               </div>

               <div className="flex flex-col">
                  <div
                     id="productDescriptionDetails"
                     className="w-full lg:flex justify-between"
                  >
                     <div
                        id="productImage"
                        className="lg:w-[56%] w-full h-auto flex flex-col gap-y-4"
                     >
                        <div
                           id="imageDiv"
                           className="w-[458px] h-[266px] bg-mecaSearchColor flex justify-center items-center cursor-pointer"
                           onClick={handleOpen}
                        >
                           <img
                              src={data?.data.images[selectedImageIndex]}
                              alt={images[selectedImageIndex].alt}
                              className="w-[272px] h-[190px]"
                           />
                        </div>
                        <div
                           id="otherImagesDiv"
                           className="w-full flex flex-wrap gap-10 justify-center lg:justify-start"
                        >
                           {data?.data.images.map((image: string, i: number) => (
                              <div
                                 className={`h-[75px] w-[98px] cursor-pointer rounded-lg flex justify-center items-center bg-mecaSearchColor relative ${
                                    selectedImageIndex === i
                                       ? "border-4 border-blue-500"
                                       : ""
                                 }`}
                                 key={i}
                                 onClick={() => handleImageClick(i)}
                              >
                                 <img
                                    src={image}
                                    alt="images"
                                    className=" h-[45px] w-[59px]object-cover"
                                 />
                              </div>
                           ))}
                        </div>
                     </div>
                     <div
                        id="productDetails"
                        className="lg:w-[42%] max-w-full flex flex-col h-auto mt-8 lg:mt-0"
                     >
                        <div
                           id="titleCompanyDiv"
                           className="w-full flex flex-col gap-y-4 bg-white"
                        >
                           <h2 className="capitalize text-2xl text-mecaDarkBlueBackgroundOverlay font-normal font-nunito ">
                              {data?.data?.name}
                           </h2>
                           <div id="aboutProduct" className="w-full mt-3">
                              <p className="text-lg font-nunito font-normal text-mecaGrayBodyText">
                                 {data?.data?.description}
                              </p>
                           </div>
                           <div id="priceButtonDiv" className="flex flex-col mt-6">
                              <div id="priceDiv" className="flex gap-x-6 items-center">
                                 <p className="text-mecaDarkBlueBackgroundOverlay text-3xl font-extrabold">
                                    {
                                       formatAmount(data?.data?.amount)
                                    }
                                 </p>
                                 {data?.data?.availabilityStatus !== 'IN_STOCK' ? <div
                                    id="inStockBtn"
                                    className="w-[68px] h-[22px] bg-mecaSuccess rounded-full flex justify-center items-center"
                                 >
                                    <p className="text-mecaIconSuccessColor text-sm font-normal">
                                       In stock
                                    </p>
                                 </div> : <div
                                    id="inStockBtn"
                                    className="bg-mecaErrorBackground rounded-full flex justify-center items-center p-2"
                                 >
                      <span className="text-mecaErrorText text-sm font-normal">
                        Not in stock
                      </span>
                                 </div>}

                              </div>
                              <div id="buttonDiv" className="w-full h-full mt-4 flex flex-col gap-y-4"/>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className=' mt-5'>
                     <BasicTabs productInformation={data?.data?.productInformation}/>
                  </div>
               </div>
            </div>
            <div>

               {/*{<DetailImageModal  open={opens} handleClose={handleClose}/>}*/}
            </div>
         </div>
      </div>
   );
}

export default ViewItemDetails
