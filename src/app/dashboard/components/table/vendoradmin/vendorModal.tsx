import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import { MdCancel } from "react-icons/md";
import tractor from "../../../../../assets/images/tractors.png";
// import caterpillar from "../../../../../assets/images/caterpilla.jpg";
import Image from "next/image";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

interface VendorModalProps {
  handleModalClose: () => void;
}

const images = [
  { src: tractor, alt: "Front View" },
  { src: tractor, alt: "Back View" },
  { src: tractor, alt: "Right Side View" },
  { src: tractor, alt: "Left Side View" },
];

const VendorModal: React.FC<VendorModalProps> = ({ handleModalClose }) => {
  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    setSlide(slide === images.length - 1 ? images.length - 1 : slide + 1);
  };

  const previousSlide = () => {
    setSlide(slide === 0 ? 0 : slide - 1);
  };

  return (
    <div className="fixed h-[100%] z-[1500] inset-0 bg-black bg-opacity-50">
      <div>
        <div id="iconbutton" className=" flex justify-end h-10 mt-10 mr-7 ">
          <IconButton>
            <MdCancel
              onClick={handleModalClose}
              style={{ color: "white", zIndex: "4px", fontSize: "2.2rem" }}
            />
          </IconButton>
        </div>
        <div className="flex justify-between">
          <div className="">
            <BsArrowLeftCircleFill
              className="absolute w-8 h-8 text-white drop-shadow-md left-10 bottom-[50%] cursor-pointer z-50"
              onClick={previousSlide}
            />
          </div>
          <div
            style={{
              position: "relative",
              backgroundColor: "white",
              zIndex: "100%",
              padding: "24px",
              borderRadius: "8px",
              boxShadow: "24px",
              width: "38rem",
            }}
            className="mt-16"
          >
            {images.map((item, idx) => {
              return (
                <div>
                  <Image
                    className={`${
                      slide === idx ? "rounded-md " : "hidden"
                    }  h-96 `}
                    src={item.src}
                    alt={item.alt}
                    key={idx}
                    layout="fixed"
                  />
                </div>
              );
            })}
          </div>
          <div className="">
            <BsArrowRightCircleFill
              className="absolute w-8 h-8 text-white drop-shadow-md right-10 top-[46%] cursor-pointer"
              onClick={nextSlide}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorModal;
