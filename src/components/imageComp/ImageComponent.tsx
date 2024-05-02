"use client"

import React from "react";

interface ImageComponentProps {
  src: string;
  alt: string;
}

const ImageComponent: React.FC<ImageComponentProps> = ({ src, alt }) => {
  return <img src={src} alt={alt} className="rounded-lg shadow-lg" />;
};

export default ImageComponent;
