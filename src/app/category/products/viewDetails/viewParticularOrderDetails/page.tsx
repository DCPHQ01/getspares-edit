"use client"; // Ensure this directive is at the top

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const OrderDetailsComponent = dynamic(() => import("./orderDetailsComponent"), {
  ssr: false,
});

const ViewParticularOrderDetailsPage: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Component has mounted
  }, []);

  return <div>{isMounted && <OrderDetailsComponent />}</div>;
};

export default ViewParticularOrderDetailsPage;
