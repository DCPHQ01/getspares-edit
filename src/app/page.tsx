"use client";
import { Header } from "./reusables/Header/page";
import { NavBar } from "./reusables/NavBar/page";

export default function Home() {
  const handleClick = () => {
    alert("clicked");
  };
  return (
    <main className="">
      <Header />
      <NavBar />
    </main>
  );
}
