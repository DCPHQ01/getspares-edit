"use client";
import { Suspense } from "react";
import Product from "./products/page";

export default function Category() {
  return (
    <section id="categoryContainer">
      <Suspense>
        <Product />
      </Suspense>
    </section>
  );
}
