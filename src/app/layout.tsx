import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import "../styles/addCompanyPageStyle/addCompanyDetails.css";
import "../styles/addCompanyPageStyle/addCompanyModal.css";
// import "../styles/removetocart/removetoCart.css";
import "../styles/categorybg/category.css";
// import "./overview/styles.module.css";
import { Providers } from "./provider";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito_sans",
  adjustFontFallback: false,
  display: "swap",
});

export const metadata: Metadata = {
  title: "E Meca",
  description:
    "Your number one sales and inventory store for Agricultural products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers >
        <body className={nunito.className}>{children}</body>
      </Providers>
    </html>
  );
}
