"use client";

import React from "react";
import SignUpComponentRight from "@/components/signup/SignUpCompRight";
import SignUpComponentLeft from "@/components/signup/SignUpCompLeft";

const SignUp = () => {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  if (typeof window === undefined) {
    let width = window.innerWidth;
    console.log(width);
  }

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      const ismobile = window.innerWidth < 760;
      setIsMobile(ismobile);
    });
  }, [isMobile]);

  return (
    <>
      <div
        id="signUpPage"
        className="grid h-full sm:grid-cols-1 md:grid-cols-2"
      >
        <SignUpComponentLeft />
        {!isMobile && <SignUpComponentRight />}
      </div>
    </>
  );
};
export default SignUp;
