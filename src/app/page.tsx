"use client";

import TopBar from "./reusables/TopBar/page";
import Index from "../components/Homepage/Index";
import Footer from "../components/footer/Footer";
import { Suspense } from "react";

export default function Home() {
  return (
    <main id="completehomeSection">
      <Suspense>
        <TopBar />
        <Index />
        <Footer />
      </Suspense>
    </main>
  );
}
