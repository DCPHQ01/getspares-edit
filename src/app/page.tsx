"use client";

import TopBar from "./reusables/TopBar/page";
import Index from "../components/Homepage/Index";
import Footer from "../components/footer/Footer";
import {useEffect} from "react";
import {getUserRole} from "./dashboard/utils/utils";

export default function Home() {

    useEffect(()=>{
        getUserRole()
    }, [])
  return (
    <main id="completehomeSection">
      <TopBar />
      <Index />
      <Footer />
    </main>
  );
}
