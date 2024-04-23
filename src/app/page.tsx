"use client";
import Image from "next/image";

export default function Home() {
  const handleClick = () => {
    alert("clicked");
  };
  return (
    <main className="flex flex-col items-center mt-60">
      <h1 className="text-lg font-semibold ">Welcome to E-Meca</h1>
    </main>
  );
}
