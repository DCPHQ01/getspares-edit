"use client";
// import Products from "./products/page"
import Products from "./products/[name]/page";

export default function Category() {
  return (
    <section id="categoryContainer">
      <Products />
    </section>
  );
}
