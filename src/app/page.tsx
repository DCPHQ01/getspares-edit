"use client";
import Image from "next/image";
import Button from "./reusables/button/page";
import { BiArrowFromLeft, BiArrowFromRight } from "react-icons/bi";

export default function Home() {
  const handleClick = () => {
    console.log("clicked");
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button
        onClick={handleClick}
        text={"Login"}
        color="white"
        backgroundColor={"mecaIconSuccessColor"}
        width={"50%"}
        leftIcon={<BiArrowFromLeft />}
        rightIcon={<BiArrowFromRight />}
      />
    </main>
  );
}
