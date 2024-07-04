import {AppBar, Autocomplete, TextField, Toolbar} from "@mui/material";
import React, {useEffect, useState} from "react";
import {MdSearch} from "react-icons/md";
import {useSearchAllProductsQuery} from "../../redux/features/users/authQuery";
import {ColorRing} from "react-loader-spinner";
import {useRouter} from "next/navigation";


const MecaGlobalSearch = () => {
   const router = useRouter();


   const [open, setOpen] = useState(false)

   const [payloadText, setPayloadText] = useState('')

   const [searchText, setSearchText] = useState('')


   const {data, isFetching} = useSearchAllProductsQuery(payloadText, {skip: !payloadText})


   useEffect(() => {
      if (searchText) {
         setOpen(true)
      } else {
         setOpen(false)
      }
   }, [searchText])

   useEffect(() => {
      if(searchText !== ''){
         const delayDebounceFn = setTimeout(() => {
            // Send Axios request here
            setPayloadText(searchText)
         }, 1000);
         return () => clearTimeout(delayDebounceFn);
      }

   }, [searchText])

   const handleProductDescription = (id: string, categoryId: string, category:string) => {
      if (categoryId) {
         sessionStorage.setItem("categoryId", categoryId);
      }
      router.push(`/category/products/${category}/${id}`);
   };


   return (
      <>
         <div>
            <MdSearch
               size={24}
               className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mecaGoBackArrow"
            />
            <input
               id="inputSearchDesktop"
               placeholder="Search for anything"
               onChange={(e) => setSearchText(e.target.value)}
               className="bg-mecaSearchColor w-full h-[44px] rounded-full pl-12 pr-4 outline-none"
               // onBlur={()=>setOpen(false)}
            />
         </div>
         {open && (<div className={'max-w-[580px] w-full max-h-[400px] mt-10 top-1 absolute bg-mecaSearchColor rounded'} >
            {isFetching
               ?
                  <div className="flex justify-center items-center">
                     <ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={[
                           "#095AD3",
                           "#095AD3",
                           "#095AD3",
                           "#095AD3",
                           "#095AD3",
                        ]}
                     />
                  </div>
               :
               <>
                  {data?.data?.length === 0 ? <div>
                     <div className="flex justify-center items-center text-bold text-lg text-mecaGrayBodyText">
                        No result found
                     </div>
                     </div> : <>
                     {data?.data?.map((item:any)=><div onClick={()=>handleProductDescription(item.productId, item.categoryId, item.productCategory)} className={'text-bold text-base cursor-pointer hover:text-mecaBluePrimaryColor text-mecaGrayBodyText px-10 mb-2 mt-2'}>
                        {item.productName}
                     </div>)}
                  </>
                  }
            </>}
         </div>)}
      </>
   )


}



export default MecaGlobalSearch
