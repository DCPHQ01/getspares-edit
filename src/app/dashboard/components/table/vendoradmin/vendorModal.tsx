import React,{useState} from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { MdCancel } from 'react-icons/md';
import tractor from "../../../../../assets/images/tractors.png"
import Image from 'next/image';
import {BsArrowLeftCircleFill, BsArrowRightCircleFill} from "react-icons/bs"


interface VendorModalProps {
    open: boolean;
    handleClose: () => void;
  }

  const images = [
    { src: tractor, alt: "Front View" },
    { src: tractor, alt: "Back View" },
    { src: tractor, alt: "Right Side View" },
    { src: tractor, alt: "Left Side View" },
    
  ];

const VendorModal: React.FC<VendorModalProps> = ({open,handleClose}) => {
  const [slide, setSlide] = useState(0);

    const nextSlide = () => {
        setSlide(slide === images.length - 1 ? images.length - 1 : slide + 1);
    };

    const previousSlide = () => {
        setSlide(slide === 0 ? 0 : slide - 1);
    };

    
  return (
    <div id='modal'>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            borderRadius: 6,
            border: '1px solid #D0DCE4',
            backdropFilter: 'blur(3px)',
            justifyItems:"center",
            display:"flex",
            flexDirection:"column",
            alignItems: 'center',
          
            
            
          }}
        >  
            <div id='container'>
            <div id='iconbutton' className=' relative h-10 mt-10 lg:left-[31%]'>
              <IconButton style={{ position: 'absolute', right: 0 }} onClick={handleClose}>
                <MdCancel style={{color:"white",zIndex:"4px",fontSize:"2.2rem"}}/>
              </IconButton>
              </div>
             
            <div id='box' className="p-6 lg:max-w-7xl max-w-2xl mx-auto">
            
            <BsArrowLeftCircleFill className="absolute w-8 h-8 text-white drop-shadow-md left-10 bottom-[50%] cursor-pointer z-50" onClick={previousSlide}/>
             <Box
             sx={{
              position: 'relative',
              backgroundColor: 'white',
              zIndex:"100%",
              padding: '24px',
              borderRadius: '8px',
              boxShadow: 24,
              
             
             
               }}>
             
                
                {
                  images.map((item, idx)=>{
                    return <div 
                    
                    >
                     
                      <Image 
                           className={`${slide === idx ? 'rounded-md shadow-md ' : 'hidden'}`}
                           src={item.src}  
                           alt={item.alt}
                           key={idx}
                           layout="fixed" 
                           width={1200} 
                           height={1000} 
                           />
                           </div>
                  } )
                }
                  
            
               
             </Box>
            
             <BsArrowRightCircleFill className="absolute w-8 h-8 text-white drop-shadow-md right-10 top-[46%] cursor-pointer" onClick={nextSlide}/>
            
            </div>
            </div>
        </Modal>
    </div>
   
  )
}

export default VendorModal