import React from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import NavBar from '../../../../../components/NavBar/NavBar'
import TopBarWhileInside from '../../../../reusables/TopBarWhileInside/page'
import sellerImage from '../../../../../assets/images/sellerImage.png'
import emailIcon from '../../../../../assets/icons/emailIcon.png'
import { MdChevronRight } from "react-icons/md";
import Card from '../../../../../components/Homepage/Card'

const sales = () => {
  // const router = useRouter();

  interface productDetails {
    id: string;
    name: string;
    price: number;
    image: string;
    categoryName: string;
  }
  
  return (
    <div>
        <TopBarWhileInside/>
      <div className='px-12'>
        <div className='h-80 w-full mt-48 bg-blue-100'>
          <div className='flex flex-col pl-10 pt-10'>
            <Image 
              src={sellerImage} 
              alt="seller" 
            />
            <div className='flex flex-col justify-start pt-5'>
              <p className='font-bold text-2xl'>Okonkwo Machineries Store</p>
              <p className='mt-5 text-gray-500 text-xl'>okonkwostores@gmail.com</p>
              <div className='flex gap-4'>
                <div className='mt-3'>
                  <Image src={emailIcon} alt='email icon'
                  />
                </div>
                <p className='mt-2 text-mecaBluePrimaryColor text-lg cursor-pointer hover:underline'>okonkwostores.com</p>
              </div>

            </div>
          </div>
        </div>
        <p className='flex justify-start pt-10 text-3xl'>Inventory</p>
      </div>


      <div>
      {/* {salesProduct?.data?.content.map(card => (
        <Card 
        key={card.id} 
        id={card.id} 
        image={}
        productName={}
        price={}
        productImage={}
        categoryName={}
        />
      ))} */}
    </div>
    </div>
  )
}

export default sales