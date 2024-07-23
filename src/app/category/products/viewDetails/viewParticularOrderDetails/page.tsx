"use client";

import { useEffect, useState } from "react";
import OrderDetailsComponent from "./orderDetailsComponent";

const ViewParticularOrderDetailsPage = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return <div>{isMounted && <OrderDetailsComponent />}</div>;
};

export default ViewParticularOrderDetailsPage;
