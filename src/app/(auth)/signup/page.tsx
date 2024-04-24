"use client";

import React from "react";
import SignUpComponentRight from "@/components/signup/SignUpCompRight";
import SignUpComponentLeft from "@/components/signup/SignUpCompLeft";

const SignUp = () => {
  return (
    <>
      <div
        id="signUpPage"

        className="grid h-full sm:grid-cols-1 md:grid-cols-2"
      >
        <SignUpComponentLeft />
        {!isMobile && <SignUpComponentRight />}
        className="grid grid-cols-1 lg:grid-cols-2 h-screen "
      >
        <SignUpComponentLeft />
        <SignUpComponentRight />
      </div>
    </>
  );
};
export default SignUp;
