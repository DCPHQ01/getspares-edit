"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AccountCircle } from "@mui/icons-material";
import NavBar from "../../../../components/NavBar/NavBar";
import TopBarWhileInside from "../../../reusables/TopBarWhileInside/page";
import sellerImage from "../../../../assets/images/sellerImage.png";
import emailIcon from "../../../../assets/icons/emailIcon.png";
import Card from "../../../../components/Homepage/Card";
import HomeImage2 from "../../../../assets/images/homeImage1.png";
import { ColorRing } from "react-loader-spinner";
import { useSearchParams } from "next/navigation";
import { useGetAllSalesQuery } from "../../../../redux/features/product/productsQuery";
import { MdChevronRight, MdExpandMore } from "react-icons/md";

interface productDetails {
  id: string;
  name: string;
  image?: string;
  price: string;
  rating: number;
}

const Sales = () => {
  const searchParams = useSearchParams();
  const vendorId = searchParams?.get("vendorId");

  const { data, isFetching } = useGetAllSalesQuery(vendorId || "", {
    skip: !vendorId,
  });

  const [salesProduct, setSalesProduct] = useState<productDetails[]>([]);
  const name = data?.data?.vendorInventoryDetailsResponse.companyName;
  const email = data?.data?.vendorInventoryDetailsResponse.companyEmail;
  const websiteUrl = data?.data?.vendorInventoryDetailsResponse.websiteUrl;
  const companyImg = data?.data?.vendorInventoryDetailsResponse.companyImage;
  const list = data?.data?.vendorProductResponses;

  useEffect(() => {
    if (data && Array.isArray(data.data.vendorProductResponses)) {
      const list = data?.data?.vendorProductResponses;
      setSalesProduct(list);
    }
  }, [data]);

  return (
      <div>
          <TopBarWhileInside/>
        <div className={``}>
          <div className={``}>
            <p className="mt-12 font-nunito text-sm font-medium text-mecaDarkBlueBackgroundOverlay">
              Home
            </p>
            <MdChevronRight size={20}/>
            <p className="font-nunito text-sm font-medium text-mecaGoBackArrow capitalize">
              {/*{searchWords}*/}
            </p>
          </div>
          {isFetching ? (
              <div className="w-full h-[615px] flex justify-center items-center">
                <ColorRing
                    visible={true}
                    height="100"
                    width="100"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={["#095AD3", "#095AD3", "#095AD3", "#095AD3", "#095AD3"]}
              />
            </div>
        ) : (
            <>
              <div className="px-12">
                <div className="h-80 w-full mt-48 bg-blue-100">
                  <div className="flex flex-col pl-10 pt-10">
                    {typeof companyImg !== "string" && companyImg !== "" ? (
                        <img
                            src={companyImg}
                            width="50"
                            height="50"
                            alt="image"
                            className="rounded-full object-cover"
                        />
                    ) : (
                        <AccountCircle
                            style={{fontSize: 100}}
                            className="text-gray-400"
                        />
                    )}
                    <div className="flex flex-col justify-start pt-5">
                      <p className="font-bold text-2xl">{name}</p>
                      <p className="mt-5 text-gray-500 text-xl">{email}</p>
                      <div className="flex gap-4">
                        <div className="mt-3">
                          <Image src={emailIcon} alt="email icon"/>
                        </div>
                        <p className="mt-2 text-mecaBluePrimaryColor text-lg">
                          {websiteUrl}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="flex justify-start pt-10 text-3xl">Inventory</p>
              </div>
              <div className="flex flex-wrap -mx-2 pt-10">
                {list?.map((product: productDetails) => (
                    <div key={product.id} className="w-full sm:w-1/2 md:w-1/3 p-2">
                      <Card
                          id={product.id}
                          productName={product.name}
                          price={product.price}
                          productImage={product.image}
                          rating={product.rating}
                          image={HomeImage2}
                      />
                    </div>
                ))}
              </div>
            </>
        )}
        </div>
      </div>
  );
};

const MyComponentWithSuspense = () => (
    <Suspense fallback={<div>Loading...</div>}>
      <Sales/>
    </Suspense>
);

export default MyComponentWithSuspense;
