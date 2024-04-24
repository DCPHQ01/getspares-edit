"use client";
import EnterEmail from "@/components/resetPassword/EnterEmail";
import SendEmail from "@/components/resetPassword/SendEmail";
import { useState } from "react";

export default function ResetPassword() {
  const [haveSentEmail, setHaveSentEmail] = useState(false);

  return (
    <div>
      <div
        className="absolute top-16 lg:left-16 left-8"
        id="eMecaResetPassword"
      >
        <span className="font-bold lg:text-3xl text-2xl text-primary">
          e-meca
        </span>
      </div>
      <div
        className="flex flex-col lg:justify-center items-center mx-auto gap-2 h-screen w-fit px-6 lg:mt-0 mt-40"
        id="container"
      >
        {!haveSentEmail ? <EnterEmail setHaveSentEmail={setHaveSentEmail} /> : <SendEmail />}
      </div>
    </div>
  );
}
