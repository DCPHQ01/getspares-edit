"use client";
import {
  MdChevronRight,
  MdClear,
  MdExpandMore,
  MdMenu,
  MdOutlineShoppingCart,
  MdSearch,
} from "react-icons/md";
import Header from "../../app/reusables/Header/page";
import NavBar from "../../components/NavBar/NavBar";
import Link from "next/link";
import { useEffect, useState } from "react";
// import MobileNav from "../mobileNav/page";
// import MobileNav from "@/app/reusables/mobileNav/page";
import MobileNav from "../../components/MobileNav/mobileNavbarList.tsx";

const TopBar = () => {
  const [open, setOpen] = useState(false);
  const handleNav = () => {
    setOpen(!open);
  };

  useEffect(() => setOpen(true), []);
  return (
    <section className="relative w-full" id="topBar">
      {open ? (
        <>
          <Header />
          <NavBar open={open} setOpen={setOpen} />
        </>
      ) : (
        <MobileNav handleNav={handleNav} />
      )}
    </section>
  );
};

export default TopBar;
