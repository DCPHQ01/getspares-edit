"use client"

import TopBar from "./reusables/TopBar/page";
import Index from "../components/Homepage/Index";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <main>
      <TopBar />
      <Index />
      <Footer />
    </main>
  );
}
