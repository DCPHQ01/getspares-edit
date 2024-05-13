"use client";
import {
  MdChevronRight,
  MdClear,
  MdExpandMore,
  MdMenu,
  MdOutlineShoppingCart,
  MdSearch,
} from "react-icons/md";
import Header from "./../Header/page";
import NavBar from "./../NavBar/page";
import { useState } from "react";
import MobileNav from "../mobileNav/page";

export default function TopBar() {
  const [open, setOpen] = useState(true);

  const handleNav = () => {
    setOpen(!open);
  };
  return (
    <section className="relative w-full" id="topBar">
      {open ? (
        <div className="fixed top-0 w-full z-[2000]">
          <Header />
          <NavBar open={open} setOpen={setOpen} />
        </div>
      ) : (
        <MobileNav handleNav={handleNav} />
      )}
    </section>
  );
}
