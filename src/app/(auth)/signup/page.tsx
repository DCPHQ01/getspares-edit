"use client";

import React from "react";
import SignUpComponentRight from "../../../components/signup/SignUpCompRight";
import SignUpComponentLeft from "../../../components/signup/SignUpCompLeft";

const SignUp = () => {
  return (
    <>
      <div
        id="signUpPage"
        className="grid grid-cols-1 lg:grid-cols-2 h-screen "
      >
        <SignUpComponentLeft />
        <div className="lg:block hidden">
          <SignUpComponentRight />
        </div>
      </div>
    </>
  );
};
export default SignUp;
